//to do
//
// Imports
const express = require('express');
const fs = require('fs');
const passport = require('passport');
const request = require('request');
const {Client} = require('pg');
const bcrypt = require('bcryptjs');
const LocalStrategy = require('passport-local').Strategy;
var bodyParser = require('body-parser');
// create express app
const app = express();

app.use(express.json())

let server = require('http').Server(app);

var port = (process.env.PORT || 8079);
server.listen(port, () => console.log('listening on port ' + port));

// home router
app.get('/', function(req, res){
    res.send("Apollo Stars");
});

// connect to heroku database
const connectionString = fs.readFileSync('src/postgres_setup/credentials.txt').toString();
const client = new Client({
  connectionString: connectionString,
  ssl: true,
});
client.connect();

// ---------------------------------- Authentication Routes ---------------------------------- //

// Login
app.get('/login', (req,res,next)=>{
  res.send("At login");
});

app.get('/logout', (req, res)=>{
  req.logout();
  res.redirect('/');
});

app.post('/login',	passport.authenticate('local', {
  successRedirect: '/account',
  failureRedirect: '/login',
  failureFlash: true
  }), function(req, res) {
  if (req.body.remember) {
    req.session.cookie.maxAge = 30 * 24 * 60 * 60 * 1000; // Cookie expires after 30 days
    } else {
    req.session.cookie.expires = false; // Cookie expires at end of session
  }
  res.redirect('/');
});

passport.use('local', new  LocalStrategy({passReqToCallback : true}, (req, id, password, done) => {
	loginAttempt();
	async function loginAttempt() {		
		try{
			client.query('BEGIN')
			var currentAccountsData = JSON.stringify(client.query('SELECT firstName, email, password FROM Person WHERE "id"=$1', [id], function(err, result) {
				
				if(err) {
					return done(err)
				}	
				if(result.rows[0] == null){
					return done(null, false);
				}
				else{
					bcrypt.compare(password, result.rows[0].password, function(err, check) {
						if (err){
							console.log('Error while checking password');
							return done();
						}
						else if (check){
							return done(null, [{email: result.rows[0].email, firstName: result.rows[0].firstName}]);
						}
						else{
							return done(null, false);
						}
					});
				}
			}))
		}
		catch(e){throw (e);}
  };
}));

  
// ---------------------------------- Student Routes -------------------------------------------- //
// list all courses that a student can register for
app.get('/student/:id/regCourseApply', (req,res)=>{
  q = `SELECT
  DISTINCT c.name FROM Course as c, Prereq, Courses_Taken
  WHERE (Courses_Taken.student_id = $1 AND (c.course_id = Prereq.course_id
    AND Prereq.prereq_id IN (SELECT course_id FROM Courses_Taken)
    AND c.course_id NOT IN (SELECT course_id FROM Courses_Taken)
  )) OR c.course_id NOT IN (SELECT course_id FROM Prereq) AND c.course_id NOT IN (SELECT course_id FROM Courses_Taken);`;

  client.query(q, [req.params.id], (err, result)=>{
    if (err){
      console.log(err);
    }
    else{
      res.send(result);
    }
  });
});

// select and register a course for a student
// the student picks an available section from a course they can take.
app.post('/student/:id/register', (req,res)=>{
 q = `INSERT INTO Courses_Registered VALUES($1, $2, $3);`;
 client.query(q,[req.params.id, req.body.course_id, req.body.section_id], (err, result)=>{
    if (err){
      console.log(err);
    }
    else{
      q = `INSERT INTO Courses_Taken VALUES($1, $2);`;
      client.query(q,[req.params.id, req.body.course_id], (err, result)=>{
        if (err){
          console.log(err);
        }
        else{
          res.send("success");
          return;
        }
      });
    }
  });
});

// list all registered courses of a student
app.get('/student/:id/regCourseView', (req,res)=>{
  q = `SELECT
    course.name
  FROM Course as course,
    Courses_Registered
  WHERE Courses_Registered.student_id = $1 AND
    Course.course_id = Courses_Registered.course_id;`;
  client.query(q,[req.params.id], (err,result)=>{
    if (err){
      console.log(err);
    }
    else{
      res.send(result);
    }
  });
});



// select a course and display grades for that course
app.get('/student/:id/exams/grades/display', (req,res)=>{
  q = `Select grade From Take_Exam, Course_Exam WHERE Take_Exam.student_id = $1 AND
  Take_Exam.exam_id IN ( SELECT exam_id FROM Course_Exam) AND Course_Exam.course_id = $2;`;
  client.query(q,[req.params.id, req.body.course_id], (err,result)=>{
    if (err){
      console.log(err);
    }
    else{
      res.send(result);
    }
  });
});

app.get('/student/:id/assignments/grades/display', (req,res)=>{
  q = `Select grade From Take_Assignment, Course_Assignment WHERE Take_Assignment.student_id = $1 AND
  Take_Assignment.assignment_id IN (SELECT assignment_id FROM Course_Assignment) AND Course_Assignment.course_id = $2;`;
  client.query(q,[req.params.id, req.body.course_id], (err,result)=>{
    if (err){
      console.log(err);
    }
    else{
      res.send(result);
    }
  });
});



// display and update student details such as email and password
app.get('/student/:id/details/display', (req,res)=>{
  q = `SELECT * FROM Student WHERE Student.id = $1;`;
  client.query(q, [req.params.id], (err,result)=>{
    if (err){
      console.log(err);
    }
    else{
      res.send(result);
    }
  });
});

app.post('/student/:id/details/update', (req,res)=>{
  q = `UPDATE Person SET email = $1, password = $2 WHERE id = $3;`;
  client.query(q, [req.body.email, req.body.password, req.params.id], (err,result)=>{
    if (err){
      console.log(err);
    }
    else{
      console.log('Details Updated');
      res.send("success");
      return;
    }
  });
});

// list all exams
app.get('/student/:id/exams/display', (req,res)=>{
  q = `SELECT
  DISTINCT exam_name
FROM Student,
  Take_Exam,
  Exam
WHERE
  Student.id = $1
  AND Take_Exam.student_id = Student.id
  AND Take_Exam.exam_id = Exam.id;`;
  client.query(q, [req.params.id], (err,result)=>{
    if (err){
      console.log(err);
    }
    else{
      res.send(result);
    }
  });
});

// create list assignment stored procedure
app.post('/student/:id/assignments/display/create',(req,res)=>{
  proc = `Drop Procedure If Exists listAssignments; Create FUNCTION  listAssignments(INT) RETURNS SETOF varchar(20) 
      AS $BODY$ BEGIN
      RETURN QUERY SELECT DISTINCT assignment_name FROM Student, Take_Assignment, Assignment
      WHERE Student.id = $1 AND Take_Assignment.student_id = Student.id 
      AND Take_Assignment.assignment_id = Assignment.assignment_id;
      RETURN;
      END $BODY$ Language plpgsql;`;
  client.query(proc, (err,result)=>{
    if (err){
      console.log(err);
    }
    else{
      console.log('stored procedure created');
      res.send("success");
      return;
    }
  });
});

// list all assignments
app.get('/student/:id/assignments/display', (req,res)=>{
  q = `SELECT * FROM listAssignments($1);`;
  client.query(q, [req.params.id], (err,result)=>{
    if (err){
      console.log(err);
    }
    else{
      res.send(result);
    }
  });
});

// join a research group
// if application has been approved
app.post('/student/:id/research/apply', (req, res)=>{
  q = `INSERT INTO Joins_Research Values($1, $2);`;
  var accept = Math.random();
  if (accept){
    client.query(q, [req.body.group_id, req.params.id], (err,result)=>{
      if (err){
        console.log(err);
      }
      else{
        res.send("Reasearch application approved!");
        return;
      }
    });
  }
  else{
    console.log("Application to join the group has been rejected!");
  }
  
});

// create study group
app.post('/student/:id/study/create', (req, res)=>{
  q = `INSERT INTO Study_Group Values($1, $2, $3, $4);`;
  client.query(q, [req.body.group_id, req.params.id, req.body.group_name, req.body.purpose], (err,result)=>{
    if (err){
      console.log(err);
    }
    else{
      res.send('Study group created!')
      return;
    }
  });
});


// join study group
// if application has been approved
app.post('/student/:id/study/apply', (req, res)=>{
  q = `INSERT INTO Participates Values($1, $2);`;
  var accept = Math.random();
  if (accept){
    client.query(q, [req.body.group_id, req.params.id], (err,result)=>{
      if (err){
        console.log(err);
      }
      else{
        res.send("Study application approved!");
        return;
      }
    });
  }
  else{
    res.send("Application to join the group has been rejected!");
  }
  
});

// list study groups
app.get('/student/:id/study_group/', (req,res)=>{
  q = `SELECT DISTINCT group_name FROM Student, Participates, Study_Group
  WHERE Student.id = $1 AND Participates.student_id = Student.id AND Participates.group_id = Study_Group.group_id;`;
  client.query(q, [req.params.id], (err,result)=>{
    if (err){
      console.log(err);
    }
    else{
      res.send(result);
    }
  });
});

//view available career posts
app.get('/student/:id/careers/display', (req,res)=>{
  q = `Select * From Career`;
  client.query(q, (err,result)=>{
    if (err){
      console.log(err);
    }
    else{
      res.send(result);
      return;
    }
  });
});

// assess an instructor
app.post('/student/:id/assess/instructor', (req,res)=>{
  q = `INSERT INTO Reviews VALUES($1, $2, $3, $4);`;
  client.query(q, [req.body.instructor_id, req.params.id, req.body.points, req.body.comments], (err,result)=>{
    if (err){
      console.log(err);
    }
    else{
      res.send("Instructor Assessment Submitted.");
      return;
    }
  });
});
// ---------------------------------- Instructor Routes -------------------------------------- //
// list all the courses of the instructor
app.get('/instructor/:id/courses/display', (req,res)=>{
  q = `SELECT DISTINCT course_name FROM Course, Section, Teaches
  WHERE Teaches.instructor_id = $1 AND Teaches.section_id = Section.section_id AND Course.course_id = Section.course_id;`;
  client.query(q, [req.params.id], (err,result)=>{
    if (err){
      console.log(err);
    }
    else{
      res.send(result);
    }
  });
});

// list TA's of a course
app.get('/instructor/:id/course/TA/display', (req,res)=>{
  q = `SELECT DISTINCT name FROM Course, TA, Assists WHERE Assists.course_id = $1 AND Assists.ta_id = TA.ta_id;`;
  client.query(q, [req.body.course_id], (err,result)=>{
    if (err){
      console.log(err);
    }
    else{
      res.send(result);
    }
  });
});

// list possible tasks for a TA for a specific course
app.get('/instructor/:id/course/TA/tasks/display', (req,res)=>{
  q = `SELECT task_desc FROM Task_List, Teaches WHERE 
  Teaches.instructor_id = $1 AND Teaches.course_id = $2 AND Task_List.course_id = $2;`;
  client.query(q, [req.params.id, req.body.course_id], (err,result)=>{
    if (err){
      console.log(err);
    }
    else{
      res.send(result);
    }
  });
});

// list all exams
app.get('/instructor/:id/exams/display', (req,res)=>{
  q = `SELECT DISTINCT exam_name FROM Instructor, Schedules_Exam, Exam WHERE
  Instructor.id = $1 AND Schedules_Exam.instructor_id = Instructor.id AND Schedules_Exam.exam_id = Exam.id;`;
  client.query(q, [req.params.id], (err,result)=>{
    if (err){
      console.log(err);
    }
    else{
      res.send(result);
    }
  });
});

// authorize TA's for doing specific tasks such as submitting hw grades, attendance etc.
app.post('/instructor/:id/authorize/TA', (req,res)=>{
  q = `INSERT INTO Auth_TA VALUES($1, $2, $3, $4, FALSE);`;
  client.query(q, [req.params.id, req.body.ta_id, req.body.task_desc, req.body.course_id], (err,result)=>{
    if (err){
      console.log(err);
    }
    else{
      console.log("TA Authorized.");
    }
  });
});


// select a course and submit course grade for each student registered in the course
// the section_id is made up of the coursename and an in -- eg OOP-01
// select a course then select a section then select a student
app.get('/instructor/:id/select/course', (req,res)=>{
  q = `SELECT section_id FROM Sec_Course WHERE course_id = $1;`;
  client.query(q, [req.body.course_id], (err,result)=>{
    if (err){
      console.log(err);
    }
    else{
      res.send(result);
    }
  });
});

app.get('/instructor/:id/select/course/section', (req,res)=>{
  q = `SELECT student_id FROM Student_Sec WHERE section_id = $1;`;
  client.query(q, [req.body.section_id], (err,result)=>{
    if (err){
      console.log(err);
    }
    else{
      res.send(result);
    }
  });
});

app.post('/instructor/:id/setGrade', (req,res)=>{
  q = `UPDATE Student_Sec SET grade = $1 WHERE section_id = $2 AND student_id = $3;`;
  client.query(q, [req.body.grade, req.body.section_id, req.body.student_id], (err,result)=>{
    if (err){
      console.log(err);
    }
    else{
      console.log("Grade Submitted.");
    }
  });
});


// AHD Starts Here --------------------------------------------------------------------------- // 

//list all assignments
app.get('/instructor/:id/assignments', (req,res)=>{
  q = `SELECT
  DISTINCT assignment_name
FROM Instructor,
  Schedules_Assignment,
  Assignment
WHERE
  Instructor.id = _instructor_id
  AND Schedules_Assignment.instructor_id = Instructor.id
  AND Schedules_Assignment.assignment_id = Assignment.id;`
  client.query(q, (err, result)=>{
     if (err){
       console.log(err);
     }
     else{
       res.send(result);
     }
   });
 });

// create an exam
 app.post('/instructor/:id/create/exam', (req,res)=>{
  q = `INSERT INTO Exam
  VALUES($1, $2, $3, $4);`
  client.query(q,[req.body.exam_id, req.body.exam_name, req.body.start_time, req.body.end_time], (err, result)=>{
     if (err){
       console.log(err);
     }
     else{
       res.log("Success");
     }
   });
 });

// create research assignment
 app.post('/instructor/:id/create/assignment', (req,res)=>{
  q = `INSERT INTO Assignment
  VALUES($1, $2, $3);`
  client.query(q,[req.body.assignment_id, req.body.assignment_name, req.body.assignment_due_date], (err, result)=>{
     if (err){
       console.log(err);
     }
     else{
       res.log("Success");
     }
   });
 });


 // create a research group
 app.post('/instructor/:id/research/create', (req,res)=>{
  q = `INSERT INTO Research_Group
  VALUES($1, $2, $3, $4);`
  grant = Math.round(1000 + Math.random()*4000);
  client.query(q,[req.body.group_id, req.params.id, grant, req.body.research_topic], (err, result)=>{
     if (err){
       console.log(err);
     }
     else{
       res.send("Success");
       return;
     }
   });
 });

 //select a course and submit exam grade for each student registered in the course
 //sequentially call multiple APIs
 //select a course
 app.get('/instructor/:id/select/exam', (req,res)=>{
  q = `SELECT
  exam_id
  FROM Course_Exam
  WHERE
  course_id = ?;`
  client.query(q, req.body.course_id, (err, result)=>{
     if (err){
       console.log(err);
     }
     else{
       res.send(result);
     }
   });
 });

 //select an student
 app.get('/instructor/:id/select/student', (req,res)=>{
  q = `SELECT
  student_id
FROM Take_Exam
WHERE
  exam_id = ?;`
  client.query(q, req.body.exam_id, (err, result)=>{
     if (err){
       console.log(err);
     }
     else{
       res.send(result);
     }
   });
 });

 //update grade
 app.post('/instructor/:id/exam/change_grade', (req,res)=>{
  q = `UPDATE Take_Exam
  SET
    grade = $1
  WHERE
    exam_id = $2
    AND student_id = $3;`
  client.query(q, [req.body.grade, req.body.exam_id, req.body.student_id], (err, result)=>{
     if (err){
       console.log(err);
     }
     else{
       res.send("Success");
     }
   });
 });

  //select a course and submit assignment grade for each student registered in the course
 //sequentially call multiple APIs
 //select a course
 app.get('/instructor/:id/select/assignment', (req,res)=>{
  q = `SELECT
  assignment_id
FROM Course_Assignment
WHERE
  course_id = ?;`
  client.query(q, req.body.course_id, (err, result)=>{
     if (err){
       console.log(err);
     }
     else{
       res.send(result);
     }
   });
 });

 //select an student
 app.get('/instructor/:id/select/student', (req,res)=>{
  q = `SELECT
  student_id
FROM Take_Assignment
WHERE
  assignment_id = ?;`
  client.query(q, req.body.assignment_id, (err, result)=>{
     if (err){
       console.log(err);
     }
     else{
       res.send(result);
     }
   });
 });

 //update grade
 app.post('/instructor/:iid/assignment/change_grade', (req,res)=>{
  q = `UPDATE Take_Assignment
  SET
    grade = $1
  WHERE
    assignment_id = $2
    AND student_id = $3;`
  client.query(q, [req.body.grade, req.body.assignment_id, req.body.student_id], (err, result)=>{
     if (err){
       console.log(err);
     }
     else{
       res.send("Success");
     }
   });
 });
// ---------------------------------- TA Routes ---------------------------------------------- //

//list all courses that a TA is responsible for
app.get('/ta/:id/courses', (req,res)=>{
  q = `SELECT DISTINCT name FROM Course, TA, Assists
      WHERE Assists.ta_id = $1 AND Assists.course_id = Course.course_id;`
  client.query(q, [req.params.id], (err, result)=>{
     if (err){
       console.log(err);
     }
     else{
       res.send(result);
     }
   });
 });

 //select course and list all authorized tasks for this course
 app.get('/ta/:id/course/:cid/tasks', (req,res)=>{
  q = `SELECT DISTINCT task_desc FROM Auth_TA, Assists WHERE
  Assists.ta_id = $1 AND Assists.course_id = $2 AND Assists.ta_id = $1;`
  client.query(q, [req.params.id, req.body.course_id], (err, result)=>{
     if (err){
       console.log(err);
     }
     else{
       res.send(result);
     }
   });
 });

 //complete the selected task such as submitting hw grades/attendance for each student registered to the course
 // task_desc uniquely identifies a course assignment such as OS-HW-01 or Algs-HW-01
 app.post('/ta/:id/course/:cid/task/:tid/complete', (req,res)=>{
  q = `UPDATE Auth_TA SET is_done = TRUE WHERE ta_id = $1 AND task_desc = $2;`
  client.query(q, [req.params.id, req.body.task_desc], (err, result)=>{
     if (err){
       console.log(err);
     }
     else{
       res.log("Success");
     }
   });
 });


 // Delete the contents of a specific table
 app.post('/delete/:table_name', (req,res)=>{
  client.query("DELETE FROM $1;", [req.params.table_name], (err, result)=>{
    if (err){
      console.log(err);
    }
    else{
      console.log("Specified table removed.");
    }
  });
 })

////////////////////////////////////////////////// Advanced Features //////////////////////////////////////////
// find instructors that have a salary within a certain range
app.get('/general/instructor/salaries', (req, res)=>{
q = `Select name, surname FROM Instructor as i Where i.salary between $1 and $2;`;
  client.query(q, [req.body.minSal, req.body.maxSal], (err, result)=>{
     if (err){
       console.log(err);
     }
     else{
       res.send(result);
     }
   });
});


// allow students to view courses with a certain keyword
app.get('/student/:id/search/course', (req, res)=>{
q = ` Select name From Course Where name Like $1;`;
  client.query(q, [`%${req.body.keyword}%`], (err, result)=>{
     if (err){
       console.log(err);
     }
     else{
       res.send(result);
       return;
     }
   });
});

// Create View
app.get('/rankings/view', (req, res)=>{
q = ` CREATE VIEW view_ranking AS SELECT first_name, surname, gpa FROM Student
  WHERE department_name = _department_name ORDER BY gpa DESC LIMIT 5;
  Select * FROM view_ranking;`;
  client.query(q, [req.body.instructor_id], (err, result)=>{
     if (err){
       console.log(err);
     }
     else{
       res.send(result);
     }
   });
});

// First Report
app.get('/report/one', (req, res)=>{
q = `Select first_name, surname, email, date_joined, sum(research_grant)
FROM Instructor JOIN Research_Group ON Instructor.id = Research_Group.instructor_id
GROUP BY  first_name, surname, email, date_joined;`;
  client.query(q, (err, result)=>{
     if (err){
       console.log(err);
     }
     else{
       res.send(result);
     }
   });
});

// Second Report
app.get('/report/second', (req, res)=>{
q = `SELECT exam_name, avg(grade)
FROM course_exam
JOIN take_exam ON course_exam.exam_id = take_exam.exam_id
JOIN exam ON exam.exam_id = take_exam.exam_id
GROUP BY exam_name;`;
  client.query(q, (err, result)=>{
     if (err){
       console.log(err);
     }
     else{
       res.send(result);
     }
   });
});

// trigger