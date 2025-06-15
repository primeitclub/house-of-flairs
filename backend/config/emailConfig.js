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

// Verify connection configuration
transporter.verify(function(error, success) {
  if (error) {
    console.log('Email configuration error:', error);
  } else {
    console.log('Email server is ready to send messages');
  }
});

const sendEvidenceEmail = async (item, evidence) => {
  try {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error('Email credentials not configured');
      return false;
    }

    const mailOptions = {
      from: `"Lost & Found Team" <${process.env.EMAIL_USER}>`,
      to: item.contactEmail,
      subject: 'New Evidence Submitted for Your Item',
      html: `
        <h2>New Evidence Submitted</h2>
        <p>Hello ${item.contactName},</p>
        <p>Someone has submitted evidence for your ${item.type === 'lost' ? 'lost' : 'found'} item:</p>
        <h3>Item Details:</h3>
        <ul>
          <li><strong>Item Name:</strong> ${item.itemName}</li>
          <li><strong>Category:</strong> ${item.category}</li>
          <li><strong>Location:</strong> ${item.location}</li>
        </ul>
        <h3>Evidence Submitted:</h3>
        <p>${evidence.description}</p>
        ${evidence.files.length > 0 ? `
          <h4>Attached Files:</h4>
          <ul>
            ${evidence.files.map(file => `<li>${file}</li>`).join('')}
          </ul>
        ` : ''}
        <p>Please review this evidence and contact the person if you believe this is your item.</p>
        <p>Best regards,<br>Lost & Found Team</p>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
};

module.exports = {
  sendEvidenceEmail
}; 