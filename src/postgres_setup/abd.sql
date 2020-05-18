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
FROM Auth_TA
WHERE
  course_id = _course_id
  and ta_id = _ta_id;
-- complete the selected task such as submitting hw grades/attendance for each student registered to the course
UPDATE Auth_TA
SET
  is_done = TRUE
WHERE
  task_desc = _task_desc
  AND course_id = _course_id;