CREATE TABLE Person (
  id INT PRIMARY KEY,
  password INT,
  name VARCHAR (20),
  surname VARCHAR (20),
  email VARCHAR (20)
);
CREATE TABLE Phone (
  id INT REFERENCES Person (id) ON DELETE CASCADE,
  phone_number INT,
  PRIMARY KEY(id, phone_number)
);
CREATE TABLE Student (gpa INT, tuition_fee INT, date_enrolled DATE) INHERITS (Person);
CREATE TABLE TA (ta_since date) INHERITS (Student);
CREATE TABLE Instructor (salary INT, date_joined DATE) INHERITS (Person);
CREATE TABLE Course (
  course_id INT PRIMARY KEY,
  name VARCHAR(100),
  credits INT
);
CREATE TABLE Task_List (
  course_id INT REFERENCES Course(course_id) ON DELETE CASCADE,
  task_desc VARCHAR (100),
  PRIMARY KEY (course_id, task_desc)
);
CREATE TABLE Prereq (
  course_id INT REFERENCES Course(course_id) ON DELETE CASCADE,
  prereq_id INT REFERENCES Course(course_id) ON DELETE CASCADE,
  PRIMARY KEY (course_id, prereq_id)
);
CREATE TABLE Courses_Taken (
  student_id INT REFERENCES Person(id) ON DELETE CASCADE,
  course_id INT REFERENCES Course(course_id) ON DELETE CASCADE,
  PRIMARY KEY (course_id, student_id)
);
CREATE TABLE Courses_Registered (
  student_id INT REFERENCES Person(id) ON DELETE CASCADE,
  course_id INT REFERENCES Course(course_id) ON DELETE CASCADE,
  sec_id INT,
  PRIMARY KEY (course_id, student_id, sec_id)
);
CREATE TABLE Take_Exam (
  student_id INT REFERENCES Person(id) ON DELETE CASCADE,
  exam_id INT,
  grade INT,
  PRIMARY KEY (student_id, exam_id)
);
CREATE TABLE Take_Assignment (
  student_id INT REFERENCES Person(id) ON DELETE CASCADE,
  assignment_id INT,
  grade INT,
  PRIMARY KEY (student_id, assignment_id)
);
CREATE TABLE Course_Exam (
  course_id INT REFERENCES Course(course_id) ON DELETE CASCADE,
  exam_id INT,
  PRIMARY KEY (course_id, exam_id)
);
CREATE TABLE Course_Assignment (
  course_id INT REFERENCES Course(course_id) ON DELETE CASCADE,
  assignment_id INT,
  PRIMARY KEY (course_id, assignment_id)
);
CREATE TABLE Section (
  section_id VARCHAR (6),
  course_id INT REFERENCES Course(course_id) ON DELETE CASCADE,
  building_no INT,
  room_no INT,
  PRIMARY KEY (section_id, course_id)
);
CREATE TABLE Teaches (
  instructor_id INT REFERENCES Person(id) ON DELETE CASCADE,
  section_id VARCHAR (6),
  course_id INT,
  PRIMARY KEY (instructor_id, section_id),
  FOREIGN KEY (section_id, course_id) REFERENCES Section(section_id, course_id) ON DELETE CASCADE
);
CREATE TABLE Sec_Course (
  section_id VARCHAR(6),
  course_id INT,
  PRIMARY KEY (section_id, course_id),
  FOREIGN KEY (section_id, course_id) REFERENCES Section(section_id, course_id) ON DELETE CASCADE
);
CREATE TABLE Student_Sec (
  student_id INT REFERENCES Person(id) ON DELETE CASCADE,
  section_id VARCHAR (6),
  course_id INT,
  grade INT,
  PRIMARY KEY (section_id, student_id),
  FOREIGN KEY (section_id, course_id) REFERENCES Section(section_id, course_id) ON DELETE CASCADE
);
CREATE TABLE Assists (
  course_id INT REFERENCES Course(course_id) ON DELETE CASCADE,
  ta_id INT REFERENCES Person(id) ON DELETE CASCADE,
  PRIMARY KEY (course_id, ta_id)
);
CREATE TABLE Research_Group (
  group_id INT,
  instructor_id INT REFERENCES Person(id) ON DELETE CASCADE,
  research_grant INT,
  research_topic VARCHAR (280),
  PRIMARY KEY (group_id)
);
CREATE TABLE Study_Group (
  group_id INT PRIMARY KEY,
  mod_id INT REFERENCES Person(id) ON DELETE CASCADE,
  group_name VARCHAR (100),
  purpose VARCHAR (100)
);
CREATE TABLE Career (
  career_id INT PRIMARY KEY,
  career_desc VARCHAR (100),
  career_type VARCHAR (100),
  salary INT
);
CREATE TABLE Classroom (
  building_no INT,
  room_no INT,
  capacity INT,
  PRIMARY KEY (building_no, room_no)
);
CREATE TABLE Department (
  department_name VARCHAR (10) PRIMARY KEY,
  building_no INT,
  budget INT
);
CREATE TABLE Assignment (
  assignment_id INT PRIMARY KEY,
  assignment_name VARCHAR(10),
  due_date DATE
);
CREATE TABLE Exam (
  exam_id INT PRIMARY KEY,
  start_time TIMESTAMP,
  end_time TIMESTAMP
);
CREATE TABLE Joins_Research (
  group_id INT REFERENCES research_group (group_id),
  student_id INT REFERENCES Person(id) ON DELETE CASCADE,
  PRIMARY KEY (group_id, student_id)
);
CREATE TABLE Participates (
  group_id INT REFERENCES study_group (group_id),
  student_id INT REFERENCES Person(id) ON DELETE CASCADE,
  PRIMARY KEY (group_id, student_id)
);
CREATE TABLE Auth_TA (
  instructor_id INT REFERENCES Person(id) ON DELETE CASCADE,
  ta_id INT REFERENCES Person(id) ON DELETE CASCADE,
  task VARCHAR(100),
  course_id INT REFERENCES Course(course_id) ON DELETE CASCADE,
  is_done BOOLEAN,
  PRIMARY KEY (instructor_id, ta_id)
);