var mongoose = require('mongoose'),
    bcrypt = require('bcryptjs'),
    Schema = mongoose.Schema;

var schema = new Schema({
  name: {type: String, required: true, index: true, unique: true, trim: true},
  price: {type: Number, required: true, trim: true}, //email을 키 값으로->index:true
  number: {type: Number},
  chk_info:{type:String},
  content:{type:String},
  createdAt: {type: Date, default: Date.now},
  facebook: {id: String, token: String, photo: String}
}, {
  toJSON: { virtuals: true},
  toObject: {virtuals: true}
});

var data = mongoose.model('data', schema);

module.exports = data;
