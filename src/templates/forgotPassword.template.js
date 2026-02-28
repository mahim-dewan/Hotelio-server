const forgotPasswordTemplate = (otp) => `
 <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f7; margin: 0; padding: 20px;">
    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.05); border: 1px solid #e2e8f0;">
      
      <div style="background-color: #4F46E5; padding: 30px; text-align: center; color: #ffffff;">
        <h1 style="margin: 0; font-size: 24px; font-weight: 600;">Password Reset Request</h1>
      </div>

      <div style="padding: 40px; text-align: center; color: #333333;">
        <p style="font-size: 18px; line-height: 1.6; color: #4b5563;">
          We received a request to reset the password for your <strong>Hotelio</strong> account. Use the code below to proceed:
        </p>
        
        <div style="font-size: 36px; font-weight: bold; letter-spacing: 10px; color: #4F46E5; margin: 30px 0; padding: 15px 30px; border: 2px dashed #e2e8f0; border-radius: 8px; display: inline-block; background-color: #f9fafb;">
          ${otp}
        </div>
        
        <p style="font-size: 14px; color: #ef4444; font-weight: 500;">
          This code is valid for 5 minutes only.
        </p>

        <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 30px 0;">
        
        <p style="font-size: 14px; color: #9ca3af;">
          If you did not request a password reset, please ignore this email or contact support if you have concerns about your account security.
        </p>
      </div>

      <div style="background-color: #f9fafb; padding: 20px; text-align: center; font-size: 12px; color: #6b7280; border-top: 1px solid #e2e8f0;">
        <p style="margin: 0 0 5px 0;">&copy; ${new Date().getFullYear()} Hotelio | Cox's Bazar, Bangladesh</p>
        <p style="margin: 0;">Securing your stays and your data.</p>
      </div>
      
    </div>
  </div>
`;

module.exports = forgotPasswordTemplate;