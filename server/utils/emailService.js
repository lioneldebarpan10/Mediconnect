import nodemailer from 'nodemailer';

const createTransporter = () => {
    return nodemailer.createTransport({
        service: 'gmail', // Standard Gmail service, user needs to set up App Password
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });
};

const emailTemplate = (title, content) => `
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body { font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f7f6; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
            .header { background-color: #2563eb; color: #ffffff; padding: 25px; text-align: center; }
            .header h1 { margin: 0; font-size: 26px; font-weight: 700; letter-spacing: 0.5px; }
            .content { padding: 35px; color: #334155; line-height: 1.6; font-size: 16px; }
            .content h2 { color: #1e293b; font-size: 22px; margin-top: 0; }
            .details-box { background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px; margin: 25px 0; }
            .footer { background-color: #f1f5f9; color: #64748b; text-align: center; padding: 20px; font-size: 14px; }
            .button { display: inline-block; padding: 12px 24px; background-color: #2563eb; color: #ffffff; text-decoration: none; border-radius: 6px; margin-top: 25px; font-weight: 600; font-size: 16px; transition: background-color 0.2s;}
            .button:hover { background-color: #1d4ed8; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>MediConnect</h1>
            </div>
            <div class="content">
                ${content}
            </div>
            <div class="footer">
                <p>&copy; ${new Date().getFullYear()} MediConnect. All rights reserved.</p>
                <p style="margin-top: 5px; font-size: 12px;">This is an automated message, please do not reply.</p>
            </div>
        </div>
    </body>
    </html>
`;

export const sendAppointmentEmail = async (userEmail, appointmentDetails) => {
    try {
        const transporter = createTransporter();
        const { docData, slotDate, slotTime, amount } = appointmentDetails;
        
        const content = `
            <h2>Appointment Confirmed!</h2>
            <p>Dear Patient,</p>
            <p>Great news! Your appointment has been successfully booked and your payment has been processed securely.</p>
            
            <div class="details-box">
                <h3 style="margin-top: 0; color: #0f172a; border-bottom: 1px solid #cbd5e1; padding-bottom: 12px; font-size: 18px;">Appointment Details</h3>
                <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
                    <tr>
                        <td style="padding: 10px 0; color: #64748b; width: 40%; font-weight: 500;">Doctor</td>
                        <td style="padding: 10px 0; color: #0f172a; font-weight: 600;">Dr. ${docData.name} <span style="color: #64748b; font-weight: 400; font-size: 14px;">(${docData.speciality})</span></td>
                    </tr>
                    <tr>
                        <td style="padding: 10px 0; color: #64748b; border-top: 1px solid #f1f5f9; font-weight: 500;">Date</td>
                        <td style="padding: 10px 0; color: #0f172a; border-top: 1px solid #f1f5f9;">${slotDate}</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px 0; color: #64748b; border-top: 1px solid #f1f5f9; font-weight: 500;">Time</td>
                        <td style="padding: 10px 0; color: #0f172a; border-top: 1px solid #f1f5f9;">${slotTime}</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px 0; color: #64748b; border-top: 1px solid #f1f5f9; font-weight: 500;">Amount Paid</td>
                        <td style="padding: 10px 0; color: #2563eb; border-top: 1px solid #f1f5f9; font-weight: 700;">Rs. ${amount}</td>
                    </tr>
                </table>
            </div>
            
            <p>Please arrive 10 minutes prior to your scheduled time. If you have any questions or need to reschedule, please contact our support team.</p>
            <p>Thank you for choosing MediConnect for your healthcare needs!</p>
        `;

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: userEmail,
            subject: 'Appointment Booking Confirmation - MediConnect',
            html: emailTemplate('Appointment Confirmation', content)
        };

        await transporter.sendMail(mailOptions);
        console.log('Confirmation email sent successfully to', userEmail);
    } catch (error) {
        console.error('Error sending confirmation email:', error);
    }
};

export const sendWelcomeEmail = async (userEmail, userName) => {
    try {
        const transporter = createTransporter();
        
        const content = `
            <h2>Welcome to MediConnect!</h2>
            <p>Dear ${userName},</p>
            <p>We are absolutely thrilled to welcome you to <strong>MediConnect</strong>. Your account has been successfully created.</p>
            
            <div class="details-box">
                <p style="margin: 0; font-weight: 600; color: #0f172a; font-size: 16px;">With MediConnect, you can easily:</p>
                <ul style="margin-top: 12px; margin-bottom: 0; padding-left: 20px;">
                    <li style="padding: 4px 0;">Search and book appointments with top doctors.</li>
                    <li style="padding: 4px 0;">Manage your medical history and prescriptions.</li>
                    <li style="padding: 4px 0;">Pay securely and manage your health efficiently.</li>
                </ul>
            </div>
            
            <p>We are committed to providing you with the best healthcare experience. If you need any assistance getting started, feel free to reach out to our support team.</p>
            
            <div style="text-align: center;">
                <!-- Change this href to your actual frontend production URL when deploying -->
                <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}" class="button" style="color: #ffffff;">Explore MediConnect</a>
            </div>
        `;

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: userEmail,
            subject: 'Welcome to MediConnect! Your Journey to Better Health Starts Here',
            html: emailTemplate('Welcome to MediConnect', content)
        };

        await transporter.sendMail(mailOptions);
        console.log('Welcome email sent successfully to', userEmail);
    } catch (error) {
        console.error('Error sending welcome email:', error);
    }
};
