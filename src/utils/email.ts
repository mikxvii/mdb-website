import nodemailer from 'nodemailer'

// Email configuration
const emailConfig = {
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASS || ''
  }
}

// Create transporter
const createTransporter = () => {
  return nodemailer.createTransport(emailConfig)
}

// Email templates
export const emailTemplates = {
  // Email sent to the website owner/admin
  adminNotification: (formData: {
    name: string
    email: string
    subject: string
    message: string
  }) => ({
    subject: `New Contact Form Submission: ${formData.subject}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Contact Form Submission</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #1e40af, #3b82f6); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
          .content { background: #f8fafc; padding: 20px; border-radius: 0 0 8px 8px; }
          .field { margin-bottom: 15px; }
          .label { font-weight: bold; color: #1e40af; }
          .value { background: white; padding: 10px; border-radius: 4px; border-left: 4px solid #3b82f6; }
          .footer { text-align: center; margin-top: 20px; color: #64748b; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>📧 New Contact Form Submission</h1>
            <p>Someone has submitted a contact form on your website</p>
          </div>
          <div class="content">
            <div class="field">
              <div class="label">Name:</div>
              <div class="value">${formData.name}</div>
            </div>
            <div class="field">
              <div class="label">Email:</div>
              <div class="value">${formData.email}</div>
            </div>
            <div class="field">
              <div class="label">Subject:</div>
              <div class="value">${formData.subject}</div>
            </div>
            <div class="field">
              <div class="label">Message:</div>
              <div class="value">${formData.message}</div>
            </div>
            <div class="footer">
              <p>This message was sent from your website contact form</p>
              <p>Time: ${new Date().toLocaleString()}</p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `
  }),

  // Confirmation email sent to the person who submitted the form
  userConfirmation: (formData: {
    name: string
    email: string
    subject: string
    message: string
  }) => ({
    subject: `Thank you for contacting MDB - ${formData.subject}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Thank you for contacting MDB</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #1e40af, #3b82f6); color: white; padding: 20px; border-radius: 8px 8px 0 0; text-align: center; }
          .content { background: #f8fafc; padding: 20px; border-radius: 0 0 8px 8px; }
          .message { background: white; padding: 20px; border-radius: 4px; margin: 20px 0; border-left: 4px solid #3b82f6; }
          .footer { text-align: center; margin-top: 20px; color: #64748b; font-size: 14px; }
          .social-links { margin-top: 20px; }
          .social-links a { display: inline-block; margin: 0 10px; color: #1e40af; text-decoration: none; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎯 Thank you for contacting MDB!</h1>
            <p>We've received your message and will get back to you soon</p>
          </div>
          <div class="content">
            <p>Hi ${formData.name},</p>
            <p>Thank you for reaching out to us! We've received your message and our team will review it shortly.</p>
            
            <div class="message">
              <strong>Your message:</strong><br>
              "${formData.message}"
            </div>
            
            <p>We typically respond within 24-48 hours. If you have an urgent inquiry, feel free to reach out to us directly at <a href="mailto:contact@mdb.dev">contact@mdb.dev</a>.</p>
            
            <div class="social-links">
              <p>Stay connected with us:</p>
              <a href="https://instagram.com/mdbdev" target="_blank">📱 Instagram: @mdbdev</a>
            </div>
            
            <div class="footer">
              <p>Best regards,<br>The MDB Team</p>
              <p>Time submitted: ${new Date().toLocaleString()}</p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `
  })
}

// Send email function
export const sendEmail = async (to: string, template: { subject: string; html: string }) => {
  try {
    const transporter = createTransporter()
    
    const mailOptions = {
      from: `"MDB Website" <${process.env.SMTP_USER || 'noreply@mdb.dev'}>`,
      to,
      subject: template.subject,
      html: template.html
    }
    
    const result = await transporter.sendMail(mailOptions)
    console.log('Email sent successfully:', result.messageId)
    return result
  } catch (error) {
    console.error('Failed to send email:', error)
    throw new Error('Failed to send email')
  }
}

// Send contact form emails
export const sendContactFormEmails = async (formData: {
  name: string
  email: string
  subject: string
  message: string
}) => {
  try {
    const adminEmail = process.env.ADMIN_EMAIL || 'contact@mdb.dev'
    
    // Send notification to admin
    await sendEmail(adminEmail, emailTemplates.adminNotification(formData))
    
    // Send confirmation to user
    await sendEmail(formData.email, emailTemplates.userConfirmation(formData))
    
    console.log('Contact form emails sent successfully')
    return true
  } catch (error) {
    console.error('Failed to send contact form emails:', error)
    throw error
  }
}
