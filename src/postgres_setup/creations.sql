CREATE TABLE person (
  id INT PRIMARY KEY,
  password INT,
  name VARCHAR (20),
  surname VARCHAR (20),
  email VARCHAR (20)
);
CREATE TABLE phone (
  id INT REFERENCES person (id) ON DELETE CASCADE,
  phone_number INT,
  PRIMARY KEY(id, phone_number)
);
CREATE TABLE student (gpa INT, tuition_fee INT, date_enrolled DATE) INHERITS (person);
CREATE TABLE TA (ta_since date) INHERITS (student);
CREATE TABLE instructor (salary INT, date_joined DATE) INHERITS (person);
CREATE TABLE courses (
  course_id INT PRIMARY KEY,
  name VARCHAR(100),
  credits INT
);
CREATE TABLE task_list (
  course_id INT REFERENCES courses(course_id) ON DELETE CASCADE,
  task_desc VARCHAR (100),
  PRIMARY KEY (course_id, task_desc)
);
CREATE TABLE prereq (
  course_id INT REFERENCES courses(course_id) ON DELETE CASCADE,
  prereq_id INT REFERENCES courses(course_id) ON DELETE CASCADE,
  PRIMARY KEY (course_id, prereq_id)
);
CREATE TABLE courses_taken (
  student_id INT REFERENCES person(id) ON DELETE CASCADE,
  course_id INT REFERENCES courses(course_id) ON DELETE CASCADE,
  PRIMARY KEY (course_id, student_id)
);
CREATE TABLE courses_reg (
  student_id INT REFERENCES person(id) ON DELETE CASCADE,
  course_id INT REFERENCES courses(course_id) ON DELETE CASCADE,
  sec_id INT,
  PRIMARY KEY (course_id, student_id, sec_id)
);
CREATE TABLE take_exam (
  student_id INT REFERENCES person(id) ON DELETE CASCADE,
  exam_id INT,
  grade INT,
  PRIMARY KEY (student_id, exam_id)
);
CREATE TABLE take_assignment (
  student_id INT REFERENCES person(id) ON DELETE CASCADE,
  assignment_id INT,
  grade INT,
  PRIMARY KEY (student_id, assignment_id)
);
CREATE TABLE course_exam (
  course_id INT REFERENCES courses(course_id) ON DELETE CASCADE,
  exam_id INT,
  PRIMARY KEY (course_id, exam_id)
);
CREATE TABLE course_assignment (
  course_id INT REFERENCES courses(course_id) ON DELETE CASCADE,
  assignment_id INT,
  PRIMARY KEY (course_id, assignment_id)
);
CREATE TABLE section (
  section_id VARCHAR (6),
  course_id INT REFERENCES courses(course_id) ON DELETE CASCADE,
  building_no INT,
  room_no INT,
  PRIMARY KEY (section_id, course_id)
);
CREATE TABLE teaches (
  instructor_id INT REFERENCES person(id) ON DELETE CASCADE,
  section_id VARCHAR (6),
  course_id INT,
  PRIMARY KEY (instructor_id, section_id),
  FOREIGN KEY (section_id, course_id) REFERENCES section(section_id, course_id) ON DELETE CASCADE
);
CREATE TABLE sec_course (
  section_id VARCHAR(6),
  course_id INT,
  PRIMARY KEY (section_id, course_id),
  FOREIGN KEY (section_id, course_id) REFERENCES section(section_id, course_id) ON DELETE CASCADE
);
CREATE TABLE student_sec (
  student_id INT REFERENCES person(id) ON DELETE CASCADE,
  section_id VARCHAR (6),
  course_id INT,
  grade INT,
  PRIMARY KEY (section_id, student_id),
  FOREIGN KEY (section_id, course_id) REFERENCES section(section_id, course_id) ON DELETE CASCADE
);
CREATE TABLE assists (
  course_id INT REFERENCES courses(course_id) ON DELETE CASCADE,
  ta_id INT REFERENCES person(id) ON DELETE CASCADE,
  PRIMARY KEY (course_id, ta_id)
);
CREATE TABLE research_group (
  group_id INT,
  instructor_id INT REFERENCES person(id) ON DELETE CASCADE,
  research_grant INT,
  research_topic VARCHAR (280),
  PRIMARY KEY (group_id)
);
CREATE TABLE study_group (
  group_id INT PRIMARY KEY,
  mod_id INT REFERENCES person(id) ON DELETE CASCADE,
  group_name VARCHAR (100),
  purpose VARCHAR (100)
);
CREATE TABLE career (
  career_id INT PRIMARY KEY,
  career_desc VARCHAR (100),
  career_type VARCHAR (100),
  salary INT
);
CREATE TABLE classroom (
  building_no INT,
  room_no INT,
  capacity INT,
  PRIMARY KEY (building_no, room_no)
);
CREATE TABLE department (
  department_name VARCHAR (10) PRIMARY KEY,
  building_no INT,
  budget INT
);
CREATE TABLE assignemnt (
  assignment_id INT PRIMARY KEY,
  assignment_name VARCHAR(10),
  due_date DATE
);
CREATE TABLE exam (
  exam_id INT PRIMARY KEY,
  start_time TIMESTAMP,
  end_time TIMESTAMP
);
CREATE TABLE joins_research (
  group_id INT REFERENCES research_group (group_id),
  student_id INT REFERENCES person(id) ON DELETE CASCADE,
  PRIMARY KEY (group_id, student_id)
);
CREATE TABLE participates (
  group_id INT REFERENCES study_group (group_id),
  student_id INT REFERENCES person(id) ON DELETE CASCADE,
  PRIMARY KEY (group_id, student_id)
);
CREATE TABLE auth_ta (
  instructor_id INT REFERENCES person(id) ON DELETE CASCADE,
  ta_id INT REFERENCES person(id) ON DELETE CASCADE,
  task VARCHAR(100),
  course_id INT REFERENCES courses(course_id) ON DELETE CASCADE,
  is_done BOOLEAN,
  PRIMARY KEY (instructor_id, ta_id)
);