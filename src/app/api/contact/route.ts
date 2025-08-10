import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { sendContactFormEmails } from '../../../utils/email'

export async function POST(request: Request) {
  try {
    const { name, email, subject, message } = await request.json()
    
    // Validate required fields
    if (!name?.trim() || !email?.trim() || !subject?.trim() || !message?.trim()) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }
    
    // Server-side environment variables
    const supabaseUrl = process.env.SUPABASE_URL
    const supabaseAnonKey = process.env.SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseAnonKey) {
      return NextResponse.json(
        { error: 'Supabase configuration not found' },
        { status: 500 }
      )
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey)
    
    // Insert into contact_submissions table
    const { data, error } = await supabase
      .from('contact_submissions')
      .insert([{
        name: name.trim(),
        email: email.trim(),
        subject: subject.trim(),
        message: message.trim()
      }])
      .select()
    
    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to submit contact form' },
        { status: 500 }
      )
    }

    // Send emails using nodemailer
    try {
      await sendContactFormEmails({
        name: name.trim(),
        email: email.trim(),
        subject: subject.trim(),
        message: message.trim()
      })
    } catch (emailError) {
      console.error('Email sending failed:', emailError)
      // Don't fail the entire request if emails fail
      // The form submission was successful, just log the email error
    }
    
    return NextResponse.json({ 
      success: true, 
      message: 'Contact form submitted successfully',
      data: data[0]
    })
    
  } catch (error) {
    console.error('Contact API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
