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
					const user = await dbHandler.findOneDocumentByProperty("user",{username});
					if(!user){
						return done(null, false, {message: 'No user with that username'});
					}
					try {
						const passwordUser = user['password'];
						const isValidPassword = passwordUser ? await bcrypt.compare(password,passwordUser) : false;
						return isValidPassword ? done(null,user) : done(null,false,{message:'User or password incorrect'});
					} catch (e){
						return done(e);
        }
        } catch (err){
					return done(err);
        }
        
    };
    passport.use(new LocalStrategy({},authenticateUser));
    passport.serializeUser((user,done) => {done(null,user['_id']) });
    passport.deserializeUser((id,done) => { 
        return done(null,getUserById(id));
    });
};

module.exports = initialize;