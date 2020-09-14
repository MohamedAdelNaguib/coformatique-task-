const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const mongoose = require('mongoose')
const User = mongoose.model('User')
const tokenKey = require('./keys')

let opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = tokenKey.secretOrKey

module.exports = passport => {
  passport.use(new JwtStrategy(opts, async (jwtPayload, done) => {
    try {
      const currentUser = await User.findById(jwtPayload.id)
    if (currentUser) {
      return done(null, currentUser)
    }
    return done(null,false)
    } catch (error) {
      console.log(error)
    }
    
  }))
}