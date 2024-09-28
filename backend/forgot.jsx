backend
//forgot password
export const forgotPassword = async (req, res) => {
    const { email } = req.body;
  
    try {
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(400).json({ message: "User not found with this email" });
      }
  
      // Generate a password reset token
      const resetToken = crypto.randomBytes(32).toString('hex');
      user.resetToken = resetToken;
      user.tokenExpiration = Date.now() + 3600000; 
      await user.save(); 
  
      // Set up email transport
      const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: process.env.EMAIL,  
          pass: process.env.EMAIL_PASSWORD 
        },
        secure: true,
      });
  
      // Send reset email
      const mailOptions = {
        from: process.env.EMAIL,
        to: user.email,
        subject: 'Password Reset',
        text: `You requested a password reset. Click the link below to reset your password: \n
        http://localhost:5173/reset-password/${resetToken}`
      };
  
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
          return res.status(500).json({ message: 'Error sending email' });
        }
  
        res.status(200).json({ message: 'Password reset email sent successfully!' });
      });
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Something went wrong' });
    }
  };
  
  //reset password
 
export const resetPassword = async (req, res) => {
  const { token } = req.params; 
  const { password } = req.body;

  try {
    // Find the user with the reset token and check if the token has expired
    const user = await User.findOne({
      resetToken: token,
      tokenExpiration: { $gt: Date.now() } // Token expiration check
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired reset token." });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update the user's password and clear the reset token fields
    user.password = hashedPassword;
    user.resetToken = undefined;
    user.tokenExpiration = undefined;

    await user.save();
    res.status(200).json({ message: "Password successfully updated." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong. Please try again." });
  }
};