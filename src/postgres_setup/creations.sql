CREATE TABLE Department (
  department_name VARCHAR (10) PRIMARY KEY,
  building_no INT UNIQUE,
  budget INT
);

CREATE TABLE Person (
  id INT PRIMARY KEY,
  password VARCHAR(60),
  name VARCHAR (20),
  surname VARCHAR (60),
  email VARCHAR (60),
  phone_no INT,
  department_name VARCHAR (10) REFERENCES Department(department_name) ON DELETE CASCADE
);

CREATE TABLE Student (gpa FLOAT, tuition_fee INT, date_enrolled DATE, PRIMARY KEY(id)) INHERITS (Person);

CREATE TABLE TA (ta_since date, PRIMARY KEY(id)) INHERITS (Student);

CREATE TABLE Instructor (salary INT, date_joined DATE, PRIMARY KEY(id)) INHERITS (Person);

CREATE UNIQUE INDEX instructor_salary ON Instructor(Salary);

CREATE TABLE Course (
  course_id INT PRIMARY KEY,
  name VARCHAR(100),
  credits INT CHECK (credits >= 0 AND credits <= 4)
);


CREATE TABLE Prereq (
  course_id INT REFERENCES Course(course_id) ON DELETE CASCADE,
  prereq_id INT REFERENCES Course(course_id) ON DELETE CASCADE,
  PRIMARY KEY (course_id, prereq_id)
);

CREATE TABLE Courses_Taken (
  student_id INT REFERENCES Student(id) ON DELETE CASCADE,
  course_id INT REFERENCES Course(course_id) ON DELETE CASCADE,
  PRIMARY KEY (course_id, student_id)
);

CREATE TABLE Courses_Registered (
  student_id INT REFERENCES Student(id) ON DELETE CASCADE,
  course_id INT REFERENCES Course(course_id) ON DELETE CASCADE,
  sec_id VARCHAR(20),
  PRIMARY KEY (course_id, student_id, sec_id)
);

CREATE TABLE Exam (
  exam_id INT PRIMARY KEY,
  exam_name VARCHAR (10),
  start_time TIMESTAMP,
  end_time TIMESTAMP
);

CREATE TABLE Assignment (
  assignment_id INT PRIMARY KEY,
  assignment_name VARCHAR(10),
  due_date DATE
);

CREATE TABLE Take_Exam (
  student_id INT REFERENCES Student(id) ON DELETE CASCADE,
  exam_id INT,
  grade INT,
  PRIMARY KEY (student_id, exam_id)
);

CREATE TABLE Take_Assignment (
  student_id INT REFERENCES Student(id) ON DELETE CASCADE,
  assignment_id INT,
  grade INT,
  PRIMARY KEY (student_id, assignment_id)
);

CREATE TABLE Course_Exam (
  course_id INT REFERENCES Course(course_id) ON DELETE CASCADE,
  exam_id INT REFERENCES Exam(exam_id) ON DELETE CASCADE,
  PRIMARY KEY (course_id, exam_id)
);

CREATE TABLE Course_Assignment (
  course_id INT REFERENCES Course(course_id) ON DELETE CASCADE,
  assignment_id INT REFERENCES Assignment(assignment_id) ON DELETE CASCADE,
  PRIMARY KEY (course_id, assignment_id)
);


CREATE TABLE Section (
  section_id VARCHAR (6),
  course_id INT REFERENCES Course(course_id) ON DELETE CASCADE,
  building_no INT REFERENCES Department(building_no) ON DELETE CASCADE,
  room_no INT,
  PRIMARY KEY (section_id, course_id)
);

CREATE TABLE Teaches (
  instructor_id INT REFERENCES Instructor(id) ON DELETE CASCADE,
  section_id VARCHAR (6),
  course_id INT,
  PRIMARY KEY (instructor_id, section_id),
  FOREIGN KEY (section_id, course_id) REFERENCES Section(section_id, course_id) ON DELETE CASCADE
);

CREATE TABLE Student_Sec (
  student_id INT REFERENCES Student(id) ON DELETE CASCADE,
  section_id VARCHAR (6),
  course_id INT,
  grade VARCHAR(1),
  PRIMARY KEY (section_id, student_id),
  FOREIGN KEY (section_id, course_id) REFERENCES Section(section_id, course_id) ON DELETE CASCADE
);

CREATE TABLE Assists (
  course_id INT REFERENCES Course(course_id) ON DELETE CASCADE,
  ta_id INT REFERENCES TA(id) ON DELETE CASCADE,
  PRIMARY KEY (course_id, ta_id)
);

CREATE TABLE Research_Group (
  group_id INT,
  instructor_id INT REFERENCES Instructor(id) ON DELETE CASCADE,
  research_grant INT,
  research_topic VARCHAR (280),
  PRIMARY KEY (group_id)
);

CREATE TABLE Study_Group (
  group_id INT PRIMARY KEY,
  group_name VARCHAR (100),
  purpose VARCHAR (100)
);

CREATE TABLE Career (
  career_id INT PRIMARY KEY,
  career_desc VARCHAR (100),
  career_type VARCHAR (100),
  salary INT
);






CREATE TABLE Joins_Research (
  group_id INT REFERENCES research_group (group_id),
  student_id INT REFERENCES Student(id) ON DELETE CASCADE,
  PRIMARY KEY (group_id, student_id)
);

CREATE TABLE Participates (
  group_id INT REFERENCES study_group (group_id),
  student_id INT REFERENCES Student(id) ON DELETE CASCADE,
  PRIMARY KEY (group_id, student_id)
);

CREATE TABLE Auth_TA (
  instructor_id INT REFERENCES Instructor(id) ON DELETE CASCADE,
  ta_id INT REFERENCES TA(id) ON DELETE CASCADE,
  task_desc VARCHAR(100),
  is_done BOOLEAN,
  PRIMARY KEY (instructor_id, ta_id)
);

CREATE TABLE Reviews(
  instructor_id INT REFERENCES Instructor(id) ON DELETE CASCADE,
  student_id INT REFERENCES Student(id) ON DELETE CASCADE,
  points INT CHECK(points >=0 AND points <= 5),
  comments VARCHAR(100)
);