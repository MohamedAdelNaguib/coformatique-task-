const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MessageSchema = new Schema({
  content: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  senderEmail: {
    type: String,
    required: true
  },
  recieverEmail :{
      type:String,
      required: true
  }
})

module.exports = mongoose.model('Message', MessageSchema, 'message')