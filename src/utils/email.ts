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
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
          @import url('https://fonts.googleapis.com/css2?family=Raleway:wght@600;700;800&display=swap');
          
          body { 
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; 
            line-height: 1.6; 
            color: #1e293b; 
            margin: 0;
            padding: 0;
            background: linear-gradient(135deg, #D1DFF2 0%, #ffffff 100%);
          }
          .container { 
            max-width: 600px; 
            margin: 0 auto; 
            padding: 20px; 
          }
          .header { 
            background: linear-gradient(135deg, #253C7D 0%, #1e40af 100%); 
            color: white; 
            padding: 30px 25px; 
            border-radius: 16px 16px 0 0; 
            text-align: center;
            box-shadow: 0 10px 25px rgba(37, 60, 125, 0.2);
          }
          .header h1 {
            font-family: 'Raleway', sans-serif;
            font-weight: 700;
            font-size: 24px;
            margin: 0 0 8px 0;
            color: white;
          }
          .header p {
            font-weight: 400;
            margin: 0;
            opacity: 0.9;
            color: #D1DFF2;
            font-family: 'Inter', sans-serif;
          }
          .content { 
            background: rgba(255, 255, 255, 0.9); 
            backdrop-filter: blur(10px);
            padding: 30px 25px; 
            border-radius: 0 0 16px 16px; 
            border: 1px solid rgba(255, 255, 255, 0.4);
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
          }
          .field { 
            margin-bottom: 20px; 
          }
          .label { 
            font-weight: 600; 
            color: #253C7D; 
            font-size: 14px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 8px;
          }
          .value { 
            background: white; 
            padding: 15px; 
            border-radius: 12px; 
            border-left: 4px solid #253C7D; 
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
            font-size: 15px;
            line-height: 1.5;
          }
          .footer { 
            text-align: center; 
            margin-top: 25px; 
            color: #64748b; 
            font-size: 14px; 
            padding-top: 20px;
            border-top: 1px solid rgba(100, 116, 139, 0.2);
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>New Contact Form Submission</h1>
            <p>Someone has submitted a contact form on your website</p>
          </div>
          <div class="content">
            <div class="field">
              <div class="label">Name</div>
              <div class="value">${formData.name}</div>
            </div>
            <div class="field">
              <div class="label">Email</div>
              <div class="value">${formData.email}</div>
            </div>
            <div class="field">
              <div class="label">Subject</div>
              <div class="value">${formData.subject}</div>
            </div>
            <div class="field">
              <div class="label">Message</div>
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
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
          @import url('https://fonts.googleapis.com/css2?family=Raleway:wght@600;700;800&display=swap');
          
          body { 
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; 
            line-height: 1.6; 
            color: #1e293b; 
            margin: 0;
            padding: 0;
            background: linear-gradient(135deg, #D1DFF2 0%, #ffffff 100%);
          }
          .container { 
            max-width: 600px; 
            margin: 0 auto; 
            padding: 20px; 
          }
          .header { 
            background: linear-gradient(135deg, #253C7D 0%, #1e40af 100%); 
            color: white; 
            padding: 30px 25px; 
            border-radius: 16px 16px 0 0; 
            text-align: center;
            box-shadow: 0 10px 25px rgba(37, 60, 125, 0.2);
          }
          .header h1 {
            font-family: 'Raleway', sans-serif;
            font-weight: 700;
            font-size: 24px;
            margin: 0 0 8px 0;
            color: white;
          }
          .header p {
            font-weight: 400;
            margin: 0;
            opacity: 0.9;
            color: #D1DFF2;
            font-family: 'Inter', sans-serif;
          }
          .content { 
            background: rgba(255, 255, 255, 0.9); 
            backdrop-filter: blur(10px);
            padding: 30px 25px; 
            border-radius: 0 0 16px 16px; 
            border: 1px solid rgba(255, 255, 255, 0.4);
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
          }
          .message { 
            background: white; 
            padding: 20px; 
            border-radius: 12px; 
            margin: 25px 0; 
            border-left: 4px solid #253C7D; 
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
          }
          .footer { 
            text-align: center; 
            margin-top: 25px; 
            color: #64748b; 
            font-size: 14px; 
            padding-top: 20px;
            border-top: 1px solid rgba(100, 116, 139, 0.2);
          }
          .social-links { 
            margin-top: 25px; 
            text-align: center;
          }
          .social-links a { 
            display: inline-block; 
            margin: 0 10px; 
            color: #253C7D; 
            text-decoration: none; 
            font-weight: 500;
            padding: 8px 16px;
            background: rgba(37, 60, 125, 0.1);
            border-radius: 20px;
            transition: all 0.3s ease;
          }
          .social-links a:hover {
            background: #253C7D;
            color: white;
            transform: translateY(-2px);
          }
          .highlight {
            color: #253C7D;
            font-weight: 600;
          }
          .contact-email {
            color: #253C7D;
            font-weight: 500;
            text-decoration: none;
          }
          .contact-email:hover {
            text-decoration: underline;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Thank you for contacting MDB!</h1>
            <p>We've received your message and will get back to you soon</p>
          </div>
          <div class="content">
            <p>Hi <span class="highlight">${formData.name}</span>,</p>
            <p>Thank you for reaching out to us! We've received your message and our team will review it shortly.</p>
            
            <div class="message">
              <strong>Your message:</strong><br>
              "${formData.message}"
            </div>
            
            <p>If you have an urgent inquiry, feel free to reach out to us directly at <a href="mailto:contact@mdb.dev" class="contact-email">contact@mdb.dev</a>.</p>
            
            <div class="social-links">
              <p>Stay connected with us:</p>
              <a href="https://instagram.com/mdbdev" target="_blank">📱 Instagram: @mdbdev</a>
            </div>
            
            <div class="footer">
              <p>Best regards,<br><span class="highlight">The Mobile Developers of Berkeley Team</span></p>
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
      from: `"Mobile Developers of Berkeley" <${process.env.SMTP_USER || 'noreply@mdb.dev'}>`,
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
