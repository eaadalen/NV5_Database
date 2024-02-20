const mongoose = require('mongoose');

let projectSchema = mongoose.Schema({
  Title: {type: String, required: true},
  ProjectNumber: {type: String, required: true},
  Description: {type: String, required: true},
});

let Project = mongoose.model('Project', projectSchema);

module.exports.Project = Project;