import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    //create a hashed token
    const hashedToken = await bcrypt.hash(userId.toString(), 10); // Hashing the userId to make a secure token

    //update user in the database
    if (emailType === "VERIFY") {   //used for email verification
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000, // 1 hour
      });
    } else if (emailType === "RESET") {
         //used for password reset
    await User.findByIdAndUpdate(userId, {
      forgotPasswordToken: hashedToken,
      forgotPasswordExpiry: Date.now() + 3600000, // 1 hour
    })
    
    };

    //create a transporter
    // Looking to send emails in production? Check out our Email API/SMTP product!
    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASSWORD,
      },
    });

    //send mail
    const mailOptions = {
      from: "NextjsAuth@gmail.com",        // sender address           
      to: email, // list of receivers
      subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password", // Subject line
      html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${
        emailType === "VERIFY" ? "verify your email" : "reset your password"
      } or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}</p>`,
    };

    const mailResponse = await transport.sendMail(mailOptions);
    return mailResponse;    
  } 
  
  catch (error: any) {
    throw new Error(error.message);
  }
};
