create table person (
  id int primary key,
  password int,
  name varchar (20),
  surname varchar (20),
  email varchar (20)
);
create table phone (
  id int REFERENCES person (id) ON DELETE CASCADE,
  phone_number int,
  PRIMARY KEY(id, phone_number)
);
create table student (gpa int, tuition_fee int, date_enrolled date) inherits (person);
create table TA (ta_since date) inherits (student);
create table instructor (salary int, date_joined date) inherits (person);
Create table courses (
  course_id int primary key,
  name varchar(100),
  credits int
);
CREATE TABLE task_list (
  course_id int REFERENCES courses(course_id) ON DELETE CASCADE,
  task_desc varchar (100),
  PRIMARY KEY (course_id, task_desc)
);
Create table prereq (
  course_id int REFERENCES courses(course_id) ON DELETE CASCADE,
  prereq_id int REFERENCES courses(course_id) ON DELETE CASCADE,
  PRIMARY KEY (course_id, prereq_id)
);
create table courses_taken (
  student_id int REFERENCES person(id) ON DELETE CASCADE,
  course_id int REFERENCES courses(course_id) ON DELETE CASCADE,
  PRIMARY KEY (course_id, student_id)
);
create table courses_reg (
  student_id int REFERENCES person(id) ON DELETE CASCADE,
  course_id int REFERENCES courses(course_id) ON DELETE CASCADE,
  sec_id int,
  PRIMARY KEY (course_id, student_id, sec_id)
);
create table take_exam (
  student_id int REFERENCES person(id) ON DELETE CASCADE,
  exam_id int,
  grade int,
  primary key (student_id, exam_id)
);
create table take_assignment (
  student_id int REFERENCES person(id) ON DELETE CASCADE,
  assignment_id int,
  grade int,
  primary key (student_id, assignment_id)
);
create table course_exam (
  course_id int REFERENCES courses(course_id) ON DELETE CASCADE,
  exam_id int,
  PRIMARY KEY (course_id, exam_id)
);
create table course_assignment (
  course_id int REFERENCES courses(course_id) ON DELETE CASCADE,
  assignment_id int,
  PRIMARY KEY (course_id, assignment_id)
);
create table section (
  section_id varchar (6),
  course_id int REFERENCES courses(course_id) ON DELETE CASCADE,
  building_no int,
  room_no int,
  primary key (section_id, course_id)
);
create table teaches (
  instructor_id int REFERENCES person(id) ON DELETE CASCADE,
  section_id varchar (6),
  course_id int,
  primary key (instructor_id, section_id),
  FOREIGN KEY (section_id, course_id) REFERENCES section(section_id, course_id) ON DELETE CASCADE
);
create table sec_course (
  section_id varchar(6),
  course_id int,
  primary key (section_id, course_id),
  FOREIGN KEY (section_id, course_id) REFERENCES section(section_id, course_id) ON DELETE CASCADE
);
create table student_sec (
  student_id int REFERENCES person(id) ON DELETE CASCADE,
  section_id varchar (6),
  course_id int,
  grade int,
  primary key (section_id, student_id),
  FOREIGN KEY (section_id, course_id) REFERENCES section(section_id, course_id) ON DELETE CASCADE
);
create table assists (
  course_id int REFERENCES courses(course_id) ON DELETE CASCADE,
  ta_id int REFERENCES person(id) ON DELETE CASCADE,
  primary key (course_id, ta_id)
);
create table research_group (
  group_id int,
  instructor_id int REFERENCES person(id) ON DELETE CASCADE,
  research_grant int,
  research_topic varchar (280),
  PRIMARY KEY (group_id)
);
create table study_group (
  group_id int PRIMARY KEY,
  mod_id int REFERENCES person(id) ON DELETE CASCADE,
  group_name varchar (100),
  purpose varchar (100)
);
create table career (
  career_id int PRIMARY KEY,
  career_desc varchar (100),
  career_type varchar (100),
  salary int
);
create table classroom (
  building_no int,
  room_no int,
  capacity int,
  PRIMARY KEY (building_no, room_no)
);
create table department (
  department_name varchar (10) PRIMARY KEY,
  building_no int,
  budget int
);
create table assignemnt (
  assignment_id int PRIMARY KEY,
  assignment_name varchar(10),
  due_date DATE
);
create table exam (
  exam_id int PRIMARY KEY,
  start_time timestamp,
  end_time timestamp
);
create table joins_research (
  group_id int REFERENCES research_group (group_id),
  student_id int REFERENCES person(id) ON DELETE CASCADE,
  primary key (group_id, student_id)
);
create table participates (
  group_id int REFERENCES study_group (group_id),
  student_id int REFERENCES person(id) ON DELETE CASCADE,
  primary key (group_id, student_id)
);
create table auth_ta (
  instructor_id int REFERENCES person(id) ON DELETE CASCADE,
  ta_id int REFERENCES person(id) ON DELETE CASCADE,
  task varchar(100),
  course_id int REFERENCES courses(course_id) ON DELETE CASCADE,
  is_done boolean,
  PRIMARY KEY (instructor_id, ta_id)
);