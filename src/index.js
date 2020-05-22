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

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


app.use(express.json())

let server = require('http').Server(app);

var port = (process.env.PORT || 8079);
server.listen(port, () => console.log('listening on port ' + port));

// home router
app.get('/', function(req, res){
    return res.status(200).send("Apollo Stars");
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
//TESTED
app.post('/login', (req,res,next)=>{
  // res.send("At login");
    q = `SELECT * FROM Person WHERE id=$1`

    client.query(q, [req.body.id], (err, result)=>{
        if (err){
            return res.send(error);
        }
        else{
            // res.send(result);
            if(result.rows[0].password === req.body.password){
                return res.status(200).send(result.rows[0])
            }
            else{
                return res.status(404).send('Not found')
            }
        }
    });
});

// TESTED
app.get('/logout', (req, res)=>{
  res.redirect('/');
});
  
// ---------------------------------- Student Routes -------------------------------------------- //
// list all courses that a student can register for
// TESTED
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
      return;
    }
  });
});

// select and register a course for a student
// the student picks an available section from a course they can take.
// TESTED
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
// TESTED
app.get('/student/:id/regCourseView', (req,res)=>{
  q = `SELECT course.name as course_id,course.credits,section.section_id,i.name as instructor_name, i.surname as instructor_surname
  FROM Course as course, Section as section, Courses_Registered, Teaches, Instructor as i
  WHERE Courses_Registered.student_id = $1 AND
    Course.course_id = Courses_Registered.course_id AND
    Course.course_id = section.course_id AND
    Courses_Registered.student_id = $1 AND 
    Courses_Registered.sec_id = section.section_id AND
    Teaches.instructor_id = i.id AND
    Teaches.section_id = section.section_id`;
  client.query(q,[req.params.id], (err,result)=>{
    if (err){
      console.log(err);
    }
    else{
      res.send(result);
      return;
    }
  });
});



// select a course and display grades for that course
//TESTED
app.get('/student/:id/exams/grades/:course_id/display', (req,res)=>{
  q = `Select grade From Take_Exam, Course_Exam WHERE Take_Exam.student_id = $1 AND
  Take_Exam.exam_id IN ( SELECT exam_id FROM Course_Exam) AND Course_Exam.course_id = $2;`;
  client.query(q,[req.params.id, req.params.course_id], (err,result)=>{
    if (err){
      console.log(err);
    }
    else{
      res.send(result);
      return;
    }
  });
});

// TESTED
app.get('/student/:id/assignments/grades/:course_id/display', (req,res)=>{
  q = `Select grade From Take_Assignment, Course_Assignment WHERE Take_Assignment.student_id = $1 AND
  Take_Assignment.assignment_id IN (SELECT assignment_id FROM Course_Assignment) AND Course_Assignment.course_id = $2;`;
  client.query(q,[req.params.id, req.params.course_id], (err,result)=>{
    if (err){
      console.log(err);
    }
    else{
      res.send(result);
      return;
    }
  });
});


// display and update student details such as email and password
// TESTED
app.get('/student/:id/details/display', (req,res)=>{
  q = `SELECT * FROM Student WHERE Student.id = $1;`;
  client.query(q, [req.params.id], (err,result)=>{
    if (err){
      console.log(err);
    }
    else{
      res.send(result);
      return;
    }
  });
});

// TESTED
app.post('/student/:id/details/update', (req,res)=>{
  q = `UPDATE Person SET email = $1, password = $2, phone_no = $3 WHERE id = $4;`;
  client.query(q, [req.body.email, req.body.password, req.body.phone_no, req.params.id], (err,result)=>{
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
// TESTED
app.get('/student/:id/exams/display', (req,res)=>{
  q = `SELECT DISTINCT exam_name, start_time, end_time FROM Student, Take_Exam, Exam
      WHERE Student.id = $1 AND Take_Exam.student_id = Student.id AND Take_Exam.exam_id = Exam.exam_id;`;
  client.query(q, [req.params.id], (err,result)=>{
    if (err){
      console.log(err);
    }
    else{
      res.send(result);
      return;
    }
  });
});

// create list assignment stored procedure
// TESTED
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
// TESTED
app.get('/student/:id/assignments/display', (req,res)=>{
  q = `SELECT * FROM listAssignments($1);`;
  client.query(q, [req.params.id], (err,result)=>{
    if (err){
      console.log(err);
    }
    else{
      res.send(result);
      return;
    }
  });
});

// join a research group
// if application has been approved
// TESTED
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
// TESTED
app.post('/student/:id/study/create', (req, res)=>{
  q = `INSERT INTO Study_Group Values($1, $2, $3);`;
  client.query(q, [req.body.group_id, req.body.group_name, req.body.purpose], (err,result)=>{
    if (err){
      console.log(err);
    }
    else{
      q = `INSERT INTO Participates Values($1, $2);`;
      client.query(q, [req.body.group_id, req.params.id], (err,result)=>{
        if (err){
          console.log(err);
        }
        else{
          return;
        }
      });
      res.send('Study group created!')
      return;
    }
  });
});


// join study group
// if application has been approved
// TESTED
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
// TESTED
app.get('/student/:id/study_group/', (req,res)=>{
  q = `SELECT DISTINCT group_name FROM Student, Participates, Study_Group
  WHERE Student.id = $1 AND Participates.student_id = Student.id AND Participates.group_id = Study_Group.group_id;`;
  client.query(q, [req.params.id], (err,result)=>{
    if (err){
      console.log(err);
    }
    else{
      res.send(result);
      return;
    }
  });
});

//view available career posts
// TESTED
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
// TESTED
app.post('/student/:id/assess/instructor/', (req,res)=>{
  q = `INSERT INTO Reviews(instructor_id, student_id, points, comments)
  SELECT id, $3, $4, $5
  FROM Instructor 
  WHERE Instructor.name = $1 and Instructor.surname = $2`;
    client.query(q, [req.body.name, req.body.surname, req.params.id, req.body.points, req.body.comments], (err,result)=>{
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
// TESTED
app.get('/instructor/:id/courses/display', (req,res)=>{
  q = `SELECT DISTINCT name FROM Course, Section, Teaches
  WHERE Teaches.instructor_id = $1 AND Teaches.section_id = Section.section_id AND Course.course_id = Section.course_id;`;
  client.query(q, [req.params.id], (err,result)=>{
    if (err){
      console.log(err);
    }
    else{
      res.send(result);
      return;
    }
  });
});

// list TA's of a course
// TESTED
app.get('/instructor/:id/course/:course_id/TA/display', (req,res)=>{
  q = `SELECT DISTINCT t.name, t.surname FROM Course as c, TA as t, Assists WHERE Assists.course_id = $1 AND c.course_id = $1 AND Assists.ta_id = t.id;`;
  client.query(q, [req.params.course_id], (err,result)=>{
    if (err){
      console.log(err);
    }
    else{
      res.send(result);
      return;
    }
  });
});

// list possible tasks for a TA for a specific course
// TESTED
app.get('/instructor/:id/TA/:course_id/tasks/display', (req,res)=>{
  q = `SELECT task_desc FROM Auth_TA, Teaches WHERE 
  Teaches.instructor_id = $1 AND Teaches.course_id = $2 AND Auth_TA.instructor_id = $1;`;
  client.query(q, [req.params.id, req.params.course_id], (err,result)=>{
    if (err){
      console.log(err);
    }
    else{
      res.send(result);
      return;
    }
  });
});

// list all exams
// TESTED
app.get('/instructor/:id/exams/display', (req,res)=>{
  q = `SELECT DISTINCT exam_name FROM Teaches, Course_Exam, Exam WHERE
  Teaches.instructor_id = $1 AND Course_Exam.course_id = Teaches.course_id AND Course_Exam.exam_id = Exam.exam_id;`;
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
// TESTED - Return does return for me
app.post('/instructor/:id/authorize/TA', (req,res)=>{
  q = `INSERT INTO Auth_TA VALUES($1, $2, $3, $4);`;
  client.query(q, [req.params.id, req.body.ta_id, req.body.task_desc, "FALSE"], (err,result)=>{
    if (err){
      console.log(err);
    }
    else{
      console.log("TA Authorized.");
      return;
    }
  });
});


// select a course and submit course grade for each student registered in the course
// the section_id is made up of the coursename and an in -- eg OOP-01
// select a course then select a section then select a student
//TESTED
app.get('/instructor/:id/select/course/:course_id', (req,res)=>{
  q = `SELECT section_id FROM Section WHERE course_id = $1;`;
  client.query(q, [req.params.course_id], (err,result)=>{
    if (err){
      console.log(err);
    }
    else{
      res.send(result);
      return;
    }
  });
});

//TESTED
app.get('/instructor/:id/select/course/:course_id/section/:section_id', (req,res)=>{
  q = `SELECT student_id FROM Courses_Taken, Section WHERE Courses_Taken.course_id = $1 AND Section.course_id = $1 AND section_id = $2;`;
  client.query(q, [req.params.course_id,req.params.section_id], (err,result)=>{
    if (err){
      console.log(err);
    }
    else{
      res.send(result);
      return;
    }
  });
});

//TESTED
app.post('/instructor/:id/setGrade', (req,res)=>{
  q = `INSERT INTO Student_Sec VALUES($1,$2,$3,$4);`;
  client.query(q, [req.body.student_id,req.body.section_id,req.body.course_id, req.body.grade], (err,result)=>{
    if (err){
      console.log(err);
    }
    else{
      res.send("Grade Submitted.");
      return;
    }
  });
});

// Calculate GPA
//TESTED
app.get('/instructor/:id/gpa/:student_id/display', (req,res)=>{
  q = `SELECT gpa FROM Student Where Student.id = $1;`;
  client.query(q, [req.params.student_id], (err,result)=>{
    if (err){
      console.log(err);
    }
    else{
      res.send(result);
      return;
    }
  });
});

//TESTED
app.post('/instructor/:id/setgpa', (req,res)=>{
  let gpa;
  if (req.body.grade === 'A'){
    gpa = Math.round((req.body.gpa + 4) / 2);
  }
  else if (req.body.grade === 'B'){
    gpa = Math.round((req.body.gpa + 3) / 2);
  }
  else if (req.body.grade === 'F'){
    gpa = req.body.gpa;
  }
  q = `UPDATE Student Set gpa = $2  WHERE Student.id = $1`;
  client.query(q, [req.body.student_id, gpa], (err,result)=>{
    if (err){
      console.log(err);
    }
    else{
      res.send("GPA Updated.");
      return;
    }
  });
});


//list all assignments
// TESTED
app.get('/instructor/:id/assignments', (req,res)=>{
  q = `SELECT
  DISTINCT a.assignment_name
FROM Instructor,
  Teaches,
  Course_Assignment,
  Assignment as a
WHERE
  Instructor.id = $1
  AND Teaches.instructor_id = Instructor.id
  AND Teaches.course_id = Course_Assignment.course_id`
  client.query(q,[req.params.id], (err, result)=>{
     if (err){
       console.log(err);
     }
     else{
       res.send(result);
       return;
     }
   });
 });

// create an exam
// TESTED
app.post('/instructor/:id/create/exam', (req,res)=>{
  q = `INSERT INTO Exam
  VALUES($1, $2, $3, $4);`
  client.query(q,[req.body.exam_id, req.body.exam_name, req.body.start_time, req.body.end_time], (err, result)=>{
     if (err){
       console.log(err);
     }
     else{
         q2 = `INSERT INTO Course_Exam values($1, $2);`

         client.query(q2,[req.body.course_id, req.body.exam_id], (err, result)=> {
             if (err){
                 console.log(err);
             }
             else {
                 q3 = `INSERT INTO Take_Exam (student_id, exam_id)
                    SELECT Courses_Taken.student_id, Exam.exam_id
                    FROM Courses_Taken, Exam
                    WHERE Courses_Taken.course_id = $2
                    AND Exam.exam_id = $1`
                 client.query(q3, [req.body.exam_id, req.body.course_id], (err, result) => {
                     if (err){
                         console.log(err);
                     }
                     else {
                         return res.send("Exam Created").status(201);
                     }
                 })
             }
         })
    }

   });
 });
 

// create an assignment
// TESTED
app.post('/instructor/:id/create/assignment', (req,res)=>{
  q = `INSERT INTO Assignment
  VALUES($1, $2, $3);`
  client.query(q,[req.body.assignment_id, req.body.assignment_name, req.body.assignment_due_date], (err, result)=>{
     if (err){
       console.log(err);
     }
     else{
         q2 = `INSERT INTO Course_Assignment values($1, $2);`
         client.query(q2,[req.body.course_id, req.body.assignment_id], (err, result)=> {
             if (err){
                 console.log(err);
             }
             else {
                 q3 = `INSERT INTO Take_Assignment (student_id, assignment_id)
                    SELECT Courses_Taken.student_id, Assignment.assignment_id
                    FROM Courses_Taken, Assignment 
                    WHERE Courses_Taken.course_id = $2
                    AND Assignment.Assignment_id = $1`
                 client.query(q3, [req.body.assignment_id, req.body.course_id], (err, result) => {
                     if (err){
                         console.log(err);
                     }
                     else {
                         return res.send("Assignment Created").status(201);
                     }
                 })
             }
         })
     }
   });
 });

 // list research groups
// TESTED
app.get('/instructor/:id/research_group/display', (req,res)=>{
  q = `SELECT DISTINCT research_topic FROM Instructor, Research_Group
  WHERE Instructor.id = $1 AND Research_Group.instructor_id = Instructor.id;`;
  client.query(q, [req.params.id], (err,result)=>{
    if (err){
      console.log(err);
    }
    else{
      res.send(result);
      return;
    }
  });
});



 // create a research group
 // TESTED
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
 //TESTED
 app.get('/instructor/:id/select/exam/:course_id', (req,res)=>{
  q = `SELECT
  exam_id
  FROM Course_Exam
  WHERE
  course_id = $1;`
  client.query(q, [req.params.course_id], (err, result)=>{
     if (err){
       console.log(err);
     }
     else{
       res.send(result);
       return;
     }
   });
 });

 //select a student
 //TESTED
 app.get('/instructor/:id/select/student/:exam_id', (req,res)=>{
  q = `SELECT
  student_id
FROM Take_Exam
WHERE
  exam_id = $1;`
  client.query(q, [req.params.exam_id], (err, result)=>{
     if (err){
       console.log(err);
     }
     else{
       res.send(result);
       return;
     }
   });
 });

 //update grade
 //TESTED
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
       return;
     }
   });
 });

  //select a course and submit assignment grade for each student registered in the course
 //sequentially call multiple APIs
 //select a course
 // TESTED
 app.get('/instructor/:id/select/assignment/course_id', (req,res)=>{
  q = `SELECT
  assignment_id
FROM Course_Assignment
WHERE
  course_id = $1;`
  client.query(q, [req.params.course_id], (err, result)=>{
     if (err){
       console.log(err);
     }
     else{
       res.send(result);
       return;
     }
   });
 });

 //select an student
 // TESTED
 app.get('/instructor/:id/select/student/assignment/:assignment_id', (req,res)=>{
  q = `SELECT
  student_id
  FROM Take_Assignment
  WHERE
    assignment_id = $1;`
  client.query(q, [req.params.assignment_id], (err, result)=>{
     if (err){
       console.log(err);
     }
     else{
       res.send(result);
       return;
     }
   });
 });

 //update grade
 //TESTED
 app.post('/instructor/:id/assignment/change_grade', (req,res)=>{
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
       return;
     }
   });
 });
// ---------------------------------- TA Routes ---------------------------------------------- //

//list all courses that a TA is responsible for
// TESTED
app.get('/ta/:id/courses', (req,res)=>{
  q = `SELECT c.name as course_name, Instructor.id, Instructor.name as instructor_name, Instructor.surname FROM Course as c, Assists, Auth_TA, Instructor
  WHERE Assists.ta_id = $1 AND c.course_id =  Assists.course_id AND Auth_TA.ta_id = $1 AND Instructor.id = Auth_TA.instructor_id;`
  client.query(q, [req.params.id], (err, result)=>{
     if (err){
       console.log(err);
     }
     else{
       res.send(result);
       return;
     }
   });
 });

 //select course and list all authorized tasks (not just for a course)
 // TESTED
 app.get('/ta/:id/course/tasks', (req,res)=>{
  q = `SELECT DISTINCT task_desc FROM Auth_TA WHERE
  AUTH_TA.ta_id = $1`
  client.query(q, [req.params.id], (err, result)=>{
     if (err){
       console.log(err);
     }
     else{
       res.send(result);
       return;
     }
   });
 });

 //complete the selected task such as submitting hw grades/attendance for each student registered to the course
 // task_desc uniquely identifies a course assignment such as OS-HW-01 or Algs-HW-01
 // since (instructor_id, ta_id) is unique for auth_ta
 // TESTED
 app.post('/ta/:id/course/task/complete', (req,res)=>{
  q = `UPDATE Auth_TA SET is_done = TRUE WHERE ta_id = $1 AND instructor_id = $2;`
  client.query(q, [req.params.id, req.body.instructor_id], (err, result)=>{
     if (err){
       console.log(err);
     }
     else{
       res.send("Success");
       return;
     }
   });
 });

////////////////////////////////////////////////// Advanced Features //////////////////////////////////////////
// find instructors that have a salary within a certain range
// TESTED
app.get('/general/instructor/salaries/:minSal/:maxSal', (req, res)=>{
q = `Select name, surname, salary FROM Instructor as i Where i.salary between $1 and $2;`;
  client.query(q, [req.params.minSal, req.params.maxSal], (err, result)=>{
     if (err){
       console.log(err);
     }
     else{
       res.send(result);
       return;
     }
   });
});


// allow students to view courses with a certain keyword
// TESTED
app.get('/student/:id/search/course/:keyword', (req, res)=>{
q = ` Select name From Course Where name Like $1;`;
  client.query(q, [`%${req.params.keyword}%`], (err, result)=>{
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
// TESTED
app.get('/rankings/view/drop', (req, res)=>{
  q = `DROP VIEW view_salary;`;
    client.query(q, (err, result)=>{
       if (err){
         console.log(err);
       }
       else{
         res.send(result);
         return;
       }
     });
  });

app.get('/rankings/view/create', (req, res)=>{
q = `CREATE VIEW view_salary AS (SELECT name, surname, salary, date_joined FROM Instructor
  ORDER BY Salary DESC LIMIT 5);`;
  client.query(q, (err, result)=>{
     if (err){
       console.log(err);
     }
     else{
       res.send(result);
       return;
     }
   });
});

app.get('/rankings/view/',(req,res)=>{
  q = `Select * FROM view_salary;`;
  client.query(q, (err, result)=>{
   if (err){
     console.log(err);
   }
   else{
     res.send(result);
     return;
   }
 });
})
// First Report
// TESTED
app.get('/report/one', (req, res)=>{
q = `Select name, surname, email, date_joined, sum(research_grant)
FROM Instructor JOIN Research_Group ON Instructor.id = Research_Group.instructor_id
GROUP BY  name, surname, email, date_joined;`;
  client.query(q, (err, result)=>{
     if (err){
       console.log(err);
     }
     else{
       res.send(result);
       return;
     }
   });
});

// Second Report
// TESTED
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

// Trigger
// TESTED
app.post('/trigger/create/function', (req,res)=>{
  q = `CREATE FUNCTION log_gpa_update() RETURNS trigger AS 
      $$ BEGIN IF New.grade == '' THEN SET New.grade = 'NULL'; END IF; END; $$ Language plpgsql;`
  client.query(q, (err, result)=>{
     if (err){
       console.log(err);
     }
     else{
       res.send("Success");
       return;
     }
   });
 });
 
// TESTED
 app.post('/trigger/create/trig', (req,res)=>{
  q = `CREATE TRIGGER gpa_update BEFORE UPDATE ON Student_Sec FOR EACH ROW
      EXECUTE PROCEDURE log_gpa_update();`
  client.query(q, (err, result)=>{
     if (err){
       console.log(err);
     }
     else{
       res.send("Success");
       return;
     }
   });
 });

 // Delete the contents of a specific table
 // For personal use -- DO NOT USE IN ACTUAL APP ANYWHERE
 app.post('/delete/:table_name', (req,res)=>{
  client.query("DELETE FROM $1;", [req.params.table_name], (err, result)=>{
    if (err){
      console.log(err);
    }
    else{
      res.send("Specified table removed.");
      return;
    }
  });
 })
