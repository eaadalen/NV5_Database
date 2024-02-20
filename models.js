const mongoose = require('mongoose');

let movieSchema = mongoose.Schema({
    Title: {type: String, required: true},
    Description: {type: String, required: true},
    Genre: {
      Name: String,
      Description: String
    },
    Director: {
      Name: String,
      Bio: String
    },
    ImagePath: String,
    Featured: Boolean
  });
  
let userSchema = mongoose.Schema({
  Username: {type: String, required: true},
  Password: {type: String, required: true},
  Email: {type: String, required: true},
  Birthday: Date,
  FavoriteMovies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }]
});

let projectSchema = mongoose.Schema({
  Title: {type: String, required: true},
  ProjectNumber: {type: String, required: true},
  Description: {type: String, required: true},
});

let Movie = mongoose.model('Movie', movieSchema);
let User = mongoose.model('User', userSchema);
let Project = mongoose.model('Project', projectSchema);

module.exports.Movie = Movie;
module.exports.User = User;
module.exports.Project = Project;