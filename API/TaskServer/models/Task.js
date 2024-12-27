var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TaskSchema = new mongoose.Schema({
    title: { type: String,required:true},
    description: String,
    done:Boolean,
    date: { type: Date, default: Date.now },
    list:{
      type: Schema.ObjectId,
      ref: 'List'
    }
  });

module.exports = mongoose.model('Task', TaskSchema);