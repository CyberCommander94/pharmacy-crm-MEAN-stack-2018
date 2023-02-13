var mongoose = require('mongoose')

var userSchema = new mongoose.Schema({
	name: String,
	post: String,
	password: String,
	login: String
});

mongoose.model('Users', userSchema, 'users');




// db.users.save({
// name: "Карпович О.Г.",
// post: "Адміністратор",
// password: "admin",
// login: "admin"
// })