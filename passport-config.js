const LocalStrategy = require('passport-local');
const bcrypt = require('bcrypt');
//

const initialize = (passport, getUserByUsername) => {
    const authenticateUser = (username,password,done) => {
        const user = getUserByUsername(username);
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
    };
    passport.use(new LocalStrategy({}),authenticateUser);
    passport.serializeUser((user,done) => { });
    passport.deserializeUser((id,done) => { });
};

module.exports = initialize