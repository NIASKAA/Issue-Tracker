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
      if(!req.body.issue_title || !req.body.issue_text || !req.body.created_by){
        res.json('Required fields missing from request')
      }
      let newIssue = new Issue({
        issue_title: req.body.issue_text,
        issue_text: req.body.issue_text,
        created_by: req.body.created_by,
        assigned_to: req.body.assigned_to || "",
        status_text: req.body.status_text || "",
        open: true,
        created_on: new Date().toUTCString(),
        updated_on: new Date().toUTCString(),
        project: project
      })
      
      newIssue.save((error, savedIssue) => {
        if(!error && savedIssue) {
          console.log('Save issued is' + savedIssue)
          res.json(savedIssue)
        }
      })
    })
    
    .put(function (req, res){
      let project = req.params.project;
      let updatedObject = {};
      Object.keys(req.body).forEach((key) => {
        if(req.body[key] != "") {
          updatedObject[key] = req.body[key]
        }
      })
      if(Object.keys(req.body).length < 2) {
        return res.json('No updated field sent')
      }
      
      updatedObject['updated_on'] = new Date().toUTCString()
      Issue.findByIdAndUpdate(
        req.body._id,
        updatedObject,
        {new: true},
        (error, updatedIssue) => {
          if(!error && updatedIssue) {
            return res.json('Successfully Updated')
          } else if (!updatedIssue) {
            return res.json('Could not updated' + req.body._id)
          }
        }
      )
    })
    
    .delete(function (req, res){
      let project = req.params.project;
      
    });
    
};
