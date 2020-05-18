--------------------- STUDENT SQL QUERIES ---------------------------------------------------------------
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
WHERE
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
WHERE
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

