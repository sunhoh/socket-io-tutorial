const mongoose = require('mongoose');

const { Schema } = mongoose
const roomSchema = new Schema({
  title:{
    type: String,
    require: true,
  },
  max:{
    type: Number,
    require: true,
    default: 10,
    min:2,
  },
  owner: {
    type: String,
    require:true
  },
  password: String,
  createAt:{
    type: Date,
    default: Date.now,
  }
})

module.exports = mongoose.model('Room',roomSchema)