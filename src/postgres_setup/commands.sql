------------- sign up
-- salary for the teacher is set at a pre-determined value
INSERT INTO Person
VALUES(id, email, password, first_name, surname);
INSERT INTO Phone
VALUES(id, phone_no);
-- if id is for student
INSERT INTO Student
VALUES(id, Null, Null, CURRENT_TIMESTAMP);
-- if id is for instructor
INSERT INTO Instructor
VALUES(id, Salary, CURRENT_TIMESTAMP);
-- login
SELECT
  id
FROM Person
WHERE
  id = Person.id
  AND password = Person.password;
--------------------- STUDENT SQL QUERIES ---------------------------------------------------------------
  -- list all courses that a student can register for
SELECT
  DISTINCT course_name
FROM Course,
  Prereq, Courses_Taken
WHERE Courses_Taken.student_id = _student_id AND
  (
    Course.id = Prereq.course_id
    AND Prereq.prereq_id IN (
      SELECT
        course_id
      FROM Courses_Taken
    )
    AND Course.id NOT IN (
      SELECT
        course_id
      FROM Courses_Taken
    )
  )
  OR Course.id NOT IN (
    SELECT
      course_id
    FROM Prereq
  )
  AND Course.id NOT IN (
    SELECT
      course_id
    FROM Courses_Taken
  );
-- select and register a course for a student
  -- the student picks an available section from a course they can take.
INSERT INTO Courses_Registered
VALUES(student_id, course_id, section_id);
-- list all registered courses of a student
SELECT
  course_name
FROM Course,
  Courses_Registered
WHERE
  Course.id = Courses_Registered.course_id;
-- select a course and display grades for that course
Select
  grade
From Take_Exam,
  Course_Exam
WHERE Take_Exam.student_id = _student_id AND
  Take_Exam.exam_id IN (
    SELECT
      exam_id
    FROM Course_Exam
  )
  AND Course_Exam.course_id = _course_id;

Select
  grade
From Take_Assignment,
  Course_Assignment
WHERE Take_Assignment.student_id = _student_id AND
  Take_Assignment.assignment_id IN (
    SELECT
      assignment_id
    FROM Course_Assignment
  )
  AND Course_Assignment.course_id = _course_id;

-- display and update student details such as email and password
SELECT
  *
FROM Person,
  Student
WHERE
  Person.id = Student.id;
UPDATE Person
SET
  email = _email,
  password = _password
WHERE
  id = _id;

-- list all exams
SELECT
  DISTINCT exam_name
FROM Student,
  Take_Exam,
  Exam
WHERE
  Student.id = _student_id
  AND Take_Exam.student_id = Student.id
  AND Take_Exam.exam_id = Exam.id;

-- list all assignments
SELECT
  DISTINCT assignment_name
FROM Student,
  Take_Assignment,
  Assignment
WHERE
  Student.id = _student_id
  AND Take_Assignment.student_id = Student.id
  AND Take_Assignment.assignment_id = Assignment.id;

-- join a research group
  -- if application has been approved
INSERT INTO Joins_Research
Values(_group_id, _student_id);
-- create study group
INSERT INTO Study_Group
Values(_group_id, _student_id, _group_name, _purpose);
-- join study group
  -- if application has been approved
INSERT INTO Joins_Research
Values(_group_id, _student_id);
-- list study groups
SELECT
  DISTINCT group_name
FROM Student,
  Participates,
  Study_Group
WHERE
  Student.id = _student_id
  AND Participates.student_id = Student.id
  AND Participates.group_id = Study_Group.id;
-- view available career posts
Select
  *
From Careers -- assess an instructor
INSERT INTO Reviews
VALUES(_instructor_id, _student_id, _points, _comments);
--------------------- Instructor SQL QUERIES ------------------------------------------------------------
  -- list all the courses of the instructor
SELECT
  DISTINCT course_name
FROM Course,
  Section,
  Teaches
WHERE
  Teaches.instructor_id = _instructor_id
  AND Teaches.section_id = Section.section_id
  AND Course.course_id = Section.course_id;
-- select a course and submit course grade for each student registered in the course
  -- the section_id is made up of the coursename and an in -- eg OOP-01
  -- select a course then select a section then select a student
SELECT
  section_id
FROM Sec_Course
WHERE
  course_id = _course_id;
SELECT
  student_id
FROM Student_Sec
WHERE
  section_id = _section_id;
UPDATE Student_Sec
SET
  grade = _grade
WHERE
  section_id = _section_id
  AND student_id = _student_id;
-- list TA's of a course
SELECT
  DISTINCT name
FROM Course,
  TA,
  Assists
WHERE
  Assists.course_id = _course_id
  AND Assists.ta_id = TA.ta_id;
-- authorize TA's for doing specific tasks such as submitting hw grades, attendance etc.
INSERT INTO Auth_TA
VALUES(_instructor_id, _ta_id, _task_desc, _course_id, FALSE);
-- list possible tasks for a TA for a specific course
SELECT
  task_desc
FROM Task_List,
  Teaches
WHERE
  Teaches.instructor_id = _instructor_id
  AND Teaches.course_id = _course_id
  AND Task_List.course_id = _course_id;
  
  -- list all exams
SELECT
  DISTINCT exam_name
FROM Instructor,
  Schedules_Exam,
  Exam
WHERE
  Instructor.id = _instructor_id
  AND Schedules_Exam.instructor_id = Instructor.id
  AND Schedules_Exam.exam_id = Exam.id;

-- list all assignments
SELECT
  DISTINCT assignment_name
FROM Instructor,
  Schedules_Assignment,
  Assignment
WHERE
  Instructor.id = _instructor_id
  AND Schedules_Assignment.instructor_id = Instructor.id
  AND Schedules_Assignment.assignment_id = Assignment.id;

-- create an exam
INSERT INTO Exam
VALUES(_exam_id, _exam_name, _start_time, _end_time);
-- create an assignment
INSERT INTO Assignment
VALUES(
    _assignment_id,
    _assignment_name,
    _assignment_due_date
  );
-- create a research group
  -- grant is pre-determined
INSERT INTO Research_Group
VALUES(_group_id, _research_topic, _grant);
-- select a course and submit exam and assignment grade for each student registered in the course
  -- select a course then select an exam then select students. enter the grade and submit
SELECT
  exam_id
FROM Course_Exam
WHERE
  course_id = _course_id;
SELECT
  student_id
FROM Take_Exam
WHERE
  exam_id = _exam_id;
UPDATE Take_Exam
SET
  grade = _grade
WHERE
  exam_id = _exam_id
  AND student_id = _student_id;
-- for assignment
SELECT
  assignment_id
FROM Course_Assignment
WHERE
  course_id = _course_id;
SELECT
  student_id
FROM Take_Assignment
WHERE
  assignment_id = _assignment_id;
UPDATE Take_Assignment
SET
  grade = _grade
WHERE
  assignment_id = _assignment_id
  AND student_id = _student_id;
--------------------- TA SQL QUERIES --------------------------------------------------------------------
  -- list all courses that a TA is responsible for
SELECT
  DISTINCT course_name
FROM Course,
  TA,
  Assists
WHERE
  Assists.ta_id = _ta_id
  AND Assists.course_id = Course.course_id;
-- select a course and list all authorized tasks for this course
SELECT
  DISTINCT task_desc
FROM Auth_TA, Assists
WHERE
  Assists.ta_id = _ta_id AND
  Assists.course_id = _course_id
  and Assists.ta_id = _ta_id;

-- complete the selected task such as submitting hw grades/attendance for each student registered to the course
UPDATE Auth_TA
SET
  is_done = TRUE
WHERE ta_id = _ta_id AND
  task_desc = _task_desc;

---------------------------------------------- Advanced Features --------------------------------------------------
--  find instructors that have a salary within a certain range
Select first_name, surname
FROM Instructor as i
Where i.salary bet ween _range1 and _range2;

-- allow students to view courses with a certain keyword
Select course_name
From Course
Where course_name Like 'a%';

-- view
CREATE VIEW view_ranking AS
SELECT first_name, surname, gpa
FROM Student
WHERE department_name = _department_name
ORDER BY gpa DESC LIMIT 5;

-- The first report shows the maximum research grant for all instructors.
Select first_name, surname, email, date_joined, sum(research_grant)
FROM Instructor JOIN Research_Group ON Instructor.id = Research_Group.instructor_id
GROUP BY  first_name, surname, email, date_joined; 

-- The second report shows the average grade for all exams
SELECT exam_name, avg(grade)
FROM course_exam
JOIN take_exam ON course_exam.exam_id = take_exam.exam_id
JOIN exam ON exam.exam_id = take_exam.exam_id
GROUP BY exam_name;

-- trigger
CREATE FUNCTION log_gpa_update()
  RETURNS trigger AS
$$
BEGIN
	IF NEW.grade == '' THEN
		 BEGIN ATOMIC
     SET NEW.grade = NULL;
     END; 
	END IF;
	RETURN NEW;
END;
$$

CREATE TRIGGER gpa_update
  BEFORE UPDATE
  ON Student_Sec
  FOR EACH ROW
  EXECUTE PROCEDURE log_gpa_update();