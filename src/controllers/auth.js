const { db } = require("../database/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

module.exports = {
    //Register user
    async register (req,res){
        const { name, email, password, passwordConfirm } = req.body;

            if(password !== passwordConfirm){
                return res.render('register',{
                    message: "Passwords do not match"
            });
            }
            
            let hashedPassword = await bcrypt.hash(password,8);

            db.query("INSERT INTO users SET ?", {name: name, email: email, password: hashedPassword},(error,results)=>{
                //Check if sql query return any errors
                if(error)
                    //if return, then this switch figure it out the error
                    switch(error.code){
                        case 'ER_DUP_ENTRY':
                            return res.render('register',{
                                message: "Email already exist"
                            });
                        case 'ER_DATA_TOO_LONG':
                            return res.render('register',{
                                message: `To long`
                            });
                        default:
                            return res.render('register',{
                                message: "ERROR: " + error
                            });
                    } 
                //If any errors, put this message on screen
                    return res.render('register',{
                    message: "Registered"
                });
            });
    },
    //Validate Login
    login(req,res){
        try {
            const {email,password} = req.body;

            //See if the fields for email and pass have anything
            if(!email || !password)
                return res.status(400).render('login',{
                    message: "Please, enter an email and a password"
                });
            db.query("SELECT * FROM users WHERE email = ?", [email], async (error,results)=>{

                if(!results || !( await bcrypt.compare(password,results[0].password) )){
                    return res.status(401).render('login',{
                        message: "Email or Password is incorrect"
                    });
                }
                    
                const id = results[0].id;
                //Create a unique token for the user
                const token = jwt.sign({ id: id },process.env.JWT_SECRET,{
                    expiresIn: process.env.JWT_EXPIRES_IN
                });

                const cookieOptions = {
                    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXP *24*60*60*1000),
                    httpOnly:true
                }
                //Put cookie on
                res.cookie('session',token,cookieOptions);
                //redirect to root
                res.status(200).redirect("/");
            });

        } catch (error) {
            console.log(error)
        }
    }

}