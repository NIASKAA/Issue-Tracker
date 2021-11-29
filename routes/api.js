let mongodb = require('mongodb')
let mongoose = require('mongoose')
require('dotenv').config();

module.exports = function (app) {

  mongoose.connect(process.env.MONGOKEY || 'mongodb://localhost/premiumBandai', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
})

  let issueSchema = new mongoose.Schema({
    issue_title: {type: String, require: true},
    issue_text: {type: String, required: true},
    created_by: {type: String, required: true},
    assigned_to: {type: String},
    status_text: {type: String},
    open: {type: Boolean, required: true},
    created_on: {type: Date, required: true},
    updated_on: {type: Date, required: true},
    project: {type: String}
  })

  let Issue = mongoose.model('Issue', issueSchema)

  app.route('/api/issues/:project')
  
    .get(function (req, res){
      let project = req.params.project;
      
    })
    
    .post(function (req, res){
      let project = req.params.project;
      
    })
    
    .put(function (req, res){
      let project = req.params.project;
      
    })
    
    .delete(function (req, res){
      let project = req.params.project;
      
    });
    
};
