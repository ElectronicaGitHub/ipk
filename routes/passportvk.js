var passport = require('passport');
var VkontakteStrategy = require('passport-vkontakte').Strategy;

var VKONTAKTE_APP_ID = "4282029";
var VKONTAKTE_APP_SECRET = "Xsik73asNloyNBzNQHbG";

passport.serializeUser(function(user, done) { done(null, user ); } );
passport.deserializeUser(function(obj, done) { done(null, obj ); } );

passport.use(new VkontakteStrategy({
    clientID     : VKONTAKTE_APP_ID,
    clientSecret : VKONTAKTE_APP_SECRET,
    callbackURL  : "http://ipkino.ru/auth/vkontakte/callback"
	},
  	function(accessToken, refreshToken, profile, done) {
    	process.nextTick(function () {
    		return done(null, profile);
    	});
  	}
));