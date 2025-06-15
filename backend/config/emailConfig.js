const nodemailer = require('nodemailer');

// Create reusable transporter object using SMTP transport
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  tls: {
    rejectUnauthorized: false
  }
});

const verifyConnection = async () => {
  try {
    await transporter.verify();
    console.log('Email configuration is valid.');
  } catch (error) {
    console.error('Email configuration error:', error);
  }
};

verifyConnection();

const sendEvidenceEmail = async (item, evidence) => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.error('Email credentials not configured');
    return false;
  }

  const mailOptions = {
    from: `"Lost and Found" <${process.env.EMAIL_USER}>`,
    to: item.contactEmail,
    subject: `New Evidence for ${item.itemName}`,
    text: `New evidence has been submitted for your ${item.type} item: ${item.itemName}. Description: ${evidence.description}`,
    html: `<p>New evidence has been submitted for your ${item.type} item: ${item.itemName}.</p><p>Description: ${evidence.description}</p>`
  };

  try {
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
};

module.exports = {
  sendEvidenceEmail
}; 