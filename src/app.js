// Imports
const express = require('express');
const fs = require('fs');
var passport = require('passport');
var request = require('request');
const {Client} = require('pg')
// store passwords in hash
const bcrypt = require('bcrypt')
// generate unique universal ids
const uuidv4 = require('uuid/v4');
const LocalStrategy = require('passport-local').Strategy;

// create express app
const app = express();

// connect to local port (app needs to be transitioned from local to heroku)
const port = 3000;
app.listen(port, () => console.log('listening on port ' + port));

// home router
app.get('/', function(req, res){
    res.send("Apollo Stars");
});

// connect to heroku database
const connectionString = fs.readFileSync('postgres_setup/credentials.txt').toString();
const client = new Client({
  connectionString: connectionString,
  ssl: true,
});
client.connect();

// ---------------------------------- Authentication Routes ---------------------------------- //
// Sign-Up
app.get('/signup', function(req,res){
  res.render('signup', {title: "Signup", userData: req.user, messages: {danger: req.flash('danger'), warning: req.flash('warning'), success: req.flash('success')}});
});

/**
 * Update front end to take in phone number
 */
app.post('/signup', function(req, res){ 
  try{
    var password = await bcrypt.hash(req.body.password, 5);

    // generate random id
    var rand = uuidv4();
    var q;
    if (req.body.student == true){
      var id = '1' + rand;
      q = "INSERT INTO Person VALUES($1, $2, $3, $4, $5); INSERT INTO Phone VALUES($1, $6); INSERT INTO Student VALUES($1, Null, Null, CURRENT_TIMESTAMP);";
      await JSON.stringify(client.query("Select id From Person Where email = $1",[req.body.email], (err, result)=>{
        if (result.rows[0]){
          res.redirect('/signup');
        }
        else{
          client.query(q,[id, req.body.email, password, req.body.fname, req.body.surname, req.body.phone_no], (err, result)=>{
            if (err){
              console.log(err);
            }
            else{
              res.redirect('/login');
            }
          });
        }
      }));
    }
    else if (req.body.instructor == true){
      var id = '2' + rand;
      q = "INSERT INTO Person VALUES($1, $2, $3, $4, $5); INSERT INTO Phone VALUES($1, $6); INSERT INTO Instructor VALUES($1, $7, CURRENT_TIMESTAMP);";
      await JSON.stringify(client.query("Select id From Person Where email = $1",[req.body.email], (err, result)=>{
        if (result.rows[0]){
          res.redirect('/signup');
        }
        else{
          client.query(q,[id, req.body.email, password, req.body.fname, req.body.surname, req.body.phone_no, 1000 + Math.random() * 9000], (err, result)=>{
            if (err){
              console.log(err);
            }
            else{
              res.redirect('/login');
            }
          });
        }
      }));
    }
    else if (req.body.ta == true){
      var id = '3' + rand;
      q = "INSERT INTO Person VALUES($1, $2, $3, $4, $5); INSERT INTO Phone VALUES($1, $6); INSERT INTO Student VALUES($1, Null, Null, CURRENT_TIMESTAMP);";
      await JSON.stringify(client.query("Select id From Person Where email = $1",[req.body.email], (err, result)=>{
        if (result.rows[0]){
          res.redirect('/signup');
        }
        else{
          client.query(q,[id, req.body.email, password, req.body.fname, req.body.surname, req.body.phone_no], (err, result)=>{
            if (err){
              console.log(err);
            }
            else{
              res.redirect('/login');
            }
          });
        }
      }));
    }
  }
  catch(e){
    throw(e);
  }
});

// Login
app.get('/login', (req,res,next)=>{
  if (res.isAuthenticated()){
    res.redirect('/account');
  }
  else{
    res.render('login', {title: "Log in", userData: req.user, messages: {danger: req.flash('danger'), warning: req.flash('warning'), success: req.flash('success')}});  }
});

app.post

app.get('/account', (req,res,next)=>{
  if (res.isAuthenticated()){
    res.render('account', {title: "Account", userData: req.user, messages: {danger: req.flash('danger'), warning: req.flash('warning'), success: req.flash('success')}});  }
  else{
    res.redirect('/login');
  }
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
			await client.query('BEGIN')
			var currentAccountsData = await JSON.stringify(client.query('SELECT firstName, email, password FROM Person WHERE "id"=$1', [id], function(err, result) {
				
				if(err) {
					return done(err)
				}	
				if(result.rows[0] == null){
					req.flash('danger', "Oops. Incorrect login details.");
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
							req.flash('danger', "Oops. Incorrect login details.");
							return done(null, false);
						}
					});
				}
			}))
		}
		catch(e){throw (e);}
  };
}));

passport.serializeUser(function(user, done) {
	done(null, user);
});

passport.deserializeUser(function(user, done) {
	done(null, user);
});		
  
// ---------------------------------- User Routes -------------------------------------------- //
// list all courses that a student can register for
app.get('/student/:id/regCourses', (req,res)=>{
  student_id = req.params.id;
  q = `SELECT
  DISTINCT course_name
  FROM Course,
    Prereq
  WHERE
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
  );`

  client.query(q,[id, req.body.email, password, req.body.fname, req.body.surname, req.body.phone_no], (err, result)=>{
    if (err){
      console.log(err);
    }
    else{
      res.redirect('/student/:id');
    }
  });
});

// select and register a course for a student
  // the student picks an available section from a course they can take.
app.post('/student/:id/register', (req,res)=>{
 q = `INSERT INTO Courses_Registered
 VALUES($1, $2, $3);`
 client.query(q,[req.params.id, req.body.course_id, req.body.section_id], (err, result)=>{
    if (err){
      console.log(err);
    }
    else{
      res.redirect('/student/:id');
    }
  });
});

// ---------------------------------- Instructor Routes -------------------------------------- //

// AHD Starts Here --------------------------------------------------------------------------- // 

// ---------------------------------- TA Routes ---------------------------------------------- //

// Database Sample Query
// client.query("QUERY GOES HERE!", (err, res) => {
//   if (err) throw err;
//   client.end();
// });