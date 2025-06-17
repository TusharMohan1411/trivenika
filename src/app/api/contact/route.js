import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request) {
    try {
        const body = await request.json()

        // Validate required fields
        if (!body.name || !body.email || !body.phone || !body.description) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            )
        }

        // Professional HTML email template with inline styles for Gmail compatibility
        const emailHtml = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <title>New Contact Form Submission - CA Vakeel</title>
        </head>
        <body style="margin:0; padding:0; font-family: Arial, sans-serif; background-color: #f5f7fa;">
            <table width="100%" cellpadding="0" cellspacing="0" bgcolor="#f5f7fa">
                <tr>
                    <td align="center" style="padding: 40px 0;">
                        <!-- Main Content Card -->
                        <table width="100%" max-width="600" cellpadding="0" cellspacing="0" bgcolor="#ffffff" style="border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.05); overflow: hidden;">
                            <!-- Header -->
                            <tr>
                                <td bgcolor="#1B3588" style="padding: 30px; text-align: center;">
                                    <h1 style="margin:0; color: #ffffff; font-size: 24px;">CA Vakeel</h1>
                                    <p style="color: #dbeafe; margin: 8px 0 0; font-size: 16px;">Contact Form Submission</p>
                                </td>
                            </tr>
                            
                            <!-- Body Content -->
                            <tr>
                                <td style="padding: 40px 30px;">
                                    <h2 style="margin-top: 0; color: #1e293b;">New Message from ${body.name}</h2>
                                    
                                    <!-- Contact Details -->
                                    <table cellpadding="10" style="width:100%; border-collapse: collapse;">
                                        <tr>
                                            <td width="25%" style="color: #64748b; font-weight: bold; border-bottom: 1px solid #e2e8f0;">Email:</td>
                                            <td style="border-bottom: 1px solid #e2e8f0;"><a href="mailto:${body.email}" style="color: #2563eb; text-decoration: none;">${body.email}</a></td>
                                        </tr>
                                        <tr>
                                            <td style="color: #64748b; font-weight: bold; border-bottom: 1px solid #e2e8f0;">Contact:</td>
                                            <td style="border-bottom: 1px solid #e2e8f0;">${body.phone}</td>
                                        </tr>
                                        <tr>
                                            <td style="color: #64748b; font-weight: bold; vertical-align: top; padding-top: 12px;">Message:</td>
                                            <td style="padding-top: 12px;">${body.description}</td>
                                        </tr>
                                    </table>
                                    
                                    <!-- Footer -->
                                    <table width="100%" style="margin-top: 40px;">
                                        <tr>
                                            <td style="padding-top: 20px; border-top: 1px solid #e2e8f0; text-align: center; color: #64748b; font-size: 14px;">
                                                <p>This message was sent from the CA Vakeel contact form</p>
                                                <p>© ${new Date().getFullYear()} CA Vakeel. All rights reserved</p>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </body>
        </html>
        `

        const { data, error } = await resend.emails.send({
            from: 'CA Vakeel Contact <cavakeel@resend.dev>',  // Update with your domain
            to: 'maverick.aiproject@gmail.com',
            subject: `New Contact Submission from ${body.name}`,
            html: emailHtml,
        })

        if (error) {
            return NextResponse.json({ error }, { status: 500 })
        }

        return NextResponse.json(data)
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 })
    }
}