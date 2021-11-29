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
