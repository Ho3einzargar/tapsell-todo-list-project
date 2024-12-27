var mongoose = require('mongoose');
var ListSchema = new mongoose.Schema({
    title: { type: String,required:true},
    date: { type: Date, default: Date.now },
    isMain: Boolean
  });
  module.exports = mongoose.model('List', ListSchema);
