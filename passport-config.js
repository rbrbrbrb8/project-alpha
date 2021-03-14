const LocalStrategy = require('passport-local');
const bcrypt = require('bcrypt');
const dbHandler = require('./handlers/db/dbHandler');
//

const initialize = (passport) => {
    const getUserById = async (id) => {
        try {
            const user = await dbHandler.findDocumentByProperty("user",id);
            return user;
        } catch (error) {
            return error;
        }
    };
    const authenticateUser = async (username,password,done) => {
        try {
            const user = await dbHandler.findDocumentByProperty("user",username);
            if(user === null){
                return done(null, false, {message: 'No user with that username'});
            }
            try {
                if(bcrypt.compareSync(password,user.password)){
                    return done(null,user);
                }
                else{
                    return done(null,false,{message:'User or password incorrect'});
                }
            } catch (e) {
                return done(e);
        }
        } catch (err) {
            return done(err);
        }
        
    };
    passport.use(new LocalStrategy({},authenticateUser));
    passport.serializeUser((user,done) => {done(null,user.id) });
    passport.deserializeUser((id,done) => { 
        return done(null,getUserById(id));
    });
};

module.exports = initialize;