const mongoose = require('mongoose')
const Schema = mongoose.Schema

const messageSchema = new Schema({
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
  },
  seen : {
    type: Boolean,
    default: false
  },
  reply: {
    type: String
  }

})

module.exports = mongoose.model('Message', messageSchema, 'message')