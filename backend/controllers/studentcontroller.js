const Student = require('../models/Student');
const nodemailer = require('nodemailer');
const cron = require('node-cron');
const { format } = require('date-fns'); // Import date-fns for date formatting

// Configure the email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail', 
  auth: {
    user: 'lokeudayvijaya@gmail.com', 
    pass: 'xood htnl wgqf enro', 
  }
});

//at the sending email at the start

const sendStartConfirmationEmail = (email, name) => {
  const mailOptions = {
    from: 'lokeudayvijaya@gmail.com',
    to: email,
    subject: 'Internship Letter Verified',
    text: `Dear ${name},\n\nYour internship letter has been verified successfully. You can proceed with your internship.\n\nBest regards,\nYour Company Name`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending start confirmation email:', error);
    } else {
      console.log('Start confirmation email sent:', info.response);
    }
  });
};


// Function to send an email sheduled email sending function
const sendEmail = (email, name, companyName) => {
  const mailOptions = {
    from: 'llookkeesshh00@gmail.com',
    to: email,
    subject: 'Internship Completion Notification',
    text: `Dear ${name},\n\nCongratulations on completing your internship with ${companyName} upload your completion letter.\n\nPlease ensure to submit your internship completion letter.\n\nBest regards,\nYour Company Name`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
};

// Function to schedule email
const scheduleEmail = (email, name, companyName, endDate) => {
  const internshipEndDate = new Date(endDate);
  const currentDate = new Date();
  const timeUntilEndDate = internshipEndDate - currentDate;

  console.log(currentDate, internshipEndDate, timeUntilEndDate);

  if (timeUntilEndDate > 0) {
    // Run a cron job every day at midnight to check for upcoming deadlines
    cron.schedule('0 0 * * *', () => {
      const now = new Date();
      if (now >= internshipEndDate) {
        sendEmail(email, name, companyName);
      }
    }, {
      timezone: "UTC" // Optionally specify a timezone
    });

    console.log(`Email scheduling started for ${email} on ${endDate}`);
  }
};

const handleUpload = async (req, res) => {
  try {
    console.log(req.file);
    const { rollno, name, email, companyName, projectTitle, yearSem, startDate, endDate, noOfDays } = req.body;

    // Create a new student document
    const student = new Student({
      rollno,
      name,
      email,
      companyName,
      projectTitle,
      yearSem,
      startDate,
      endDate,
      noOfDays,
      offerLetter: req.file ? req.file.path : '' // Save the file path
    });

    await student.save();
    // Schedule email
    // Send email confirming internship letter verification
    sendStartConfirmationEmail(email, name);

    scheduleEmail(email, name, companyName, endDate);

    res.status(200).json({ message: 'Form submitted successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error submitting the form', details: error });
  }
};

module.exports = { handleUpload };
