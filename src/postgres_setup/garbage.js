// Sign-Up
app.post('/signup', async function(req, res){
    try{
      var password = await bcrypt.hash(req.body.password, 5);
      var rand = await uuidv4.uuid();
      if (req.body.student === true){
        var id = '1' + rand;
        id = parseInt(id, 10); 
        q = "INSERT INTO Student VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9);"
        JSON.stringify(client.query("Select id From Person Where email = $1",[req.body.email], async (err, result)=>{
          if (result.rows[0]){
            res.send("email in use");
          }
          else{
              client.query(q,[id, password, req.body.name, req.body.surname, req.body.email, req.body.department_name, req.body.gpa, req.body.tuition_fee, req.body.date], (err, result)=>{
              if (err){
                console.log(err);
              }
              else{
                q = "INSERT INTO Phone VALUES($1, $2);"
                client.query(q,[id, req.body.phone_no], (err, result)=>{
                  if (err){
                    console.log(err);
                  }
                  else{
                    res.redirect('/login');
                  }
                });
              }
            });
          }
        }));
      }
      else if (req.body.instructor === true){
        var id = '2' + rand;
        id = parseInt(id, 10); 
        q = "INSERT INTO Student VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9);"
        JSON.stringify(client.query("Select id From Person Where email = $1",[req.body.email], (err, result)=>{
          if (result.rows[0]){
            res.send("email in use");
          }
          else{
            client.query(q,[id, password, req.body.name, req.body.surname, req.body.email, req.body.department_name, req.body.gpa, req.body.tuition_fee, req.body.date], (err, result)=>{
              if (err){
                console.log(err);
              }
              else{
                q = "INSERT INTO Phone VALUES($1, $2);"
                client.query(q,[id, req.body.phone_no], (err, result)=>{
                  if (err){
                    console.log(err);
                  }
                  else{
                    res.redirect('/login');
                  }
                });
              }
            });
          }
        }));
      }
      else if (req.body.ta === true){
        var id = '3' + rand;
        id = parseInt(id, 10); 
        q = "INSERT INTO Student VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9);"
        JSON.stringify(client.query("Select id From Person Where email = $1",[req.body.email], (err, result)=>{
          if (result.rows[0]){
            res.send("email in use");
          }
          else{
            client.query(q,[id, password, req.body.name, req.body.surname, req.body.email, req.body.department_name, req.body.gpa, req.body.tuition_fee, req.body.date], (err, result)=>{
              if (err){
                console.log(err);
              }
              else{
                q = "INSERT INTO Phone VALUES($1, $2);"
                client.query(q,[id, req.body.phone_no], (err, result)=>{
                  if (err){
                    console.log(err);
                  }
                  else{
                    res.redirect('/login');
                  }
                });
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