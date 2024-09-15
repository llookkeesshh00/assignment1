const mongoose = require('mongoose');
const { Schema } = mongoose;

const studentSchema = new Schema({
  rollno: {
    type: String,
    required: true,
    unique: true, // Ensures rollno is unique
    index: true   // Index for better performance on lookups
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true // Optionally ensure unique email addresses
  },
  companyName: {
    type: String,
    required: true
  },
  projectTitle: {
    type: String,
    required: true
  },
  yearSem: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  noOfDays: {
    type: Number,
    required: true
  },
  offerLetter: {
    type: String // Store the file path or URL to the uploaded offer letter
  }
});

const Student = mongoose.model('Studentdetails', studentSchema);

module.exports = Student;
