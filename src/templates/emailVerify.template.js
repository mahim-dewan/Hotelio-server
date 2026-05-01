// src/templates/emailVerify.template.js

const emailVerifyOtpTemplate = (otp) => `
 <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f7; margin: 0; padding: 20px;">
    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.05); border: 1px solid #e2e8f0;">
      
      <div style="background-color: #4F46E5; padding: 30px; text-align: center; color: #ffffff;">
        <h1 style="margin: 0; font-size: 24px; font-weight: 600;">Verify Your Email</h1>
      </div>

      <div style="padding: 40px; text-align: center; color: #333333;">
        <p style="font-size: 20px; line-height: 1.6; color: #4b5563;">
          Thank you for signing up on <strong>Hotelio</strong>! Use the following One-Time Password (OTP) to complete your registration. This code is valid for <strong>5 minutes</strong>.
        </p>
        
        <div style="font-size: 32px; font-weight: bold; letter-spacing: 8px; color: #4F46E5; margin: 30px 0; padding: 15px; border: 2px dashed #e2e8f0; border-radius: 8px; display: inline-block; background-color: #f9fafb;">
          ${otp}
        </div>

        <p style="font-size: 14px; color: #ef4444; font-weight: 500;">
          This code is valid for 5 minutes only.
        </p>
        
        <p style="font-size: 14px; color: #9ca3af; margin-top: 20px;">
          If you didn't request this, you can safely ignore this email.
        </p>
      </div>

      <div style="background-color: #f9fafb; padding: 20px; text-align: center; font-size: 12px; color: #6b7280; border-top: 1px solid #e2e8f0;">
        <p style="margin: 0 0 5px 0;">&copy; ${new Date().getFullYear()} Hotelio | Cox's Bazar, Bangladesh</p>
      </div>
      
    </div>
  </div>
`;

module.exports = emailVerifyOtpTemplate;
