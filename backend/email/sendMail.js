// backend/email/send.js
import mongoose from "mongoose";
import { resend } from "./resendClient.js";

const APP_URL = process.env.APP_URL || "http://localhost:3000";
const FROM_EMAIL = "SocialWork <onboarding@resend.dev>"; // Verify this in Resend dashboard

// Generic send function — same style as your old sendMail()
export const sendEmail = async ({ to, subject, html }) => {
  try {
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to,
      subject,
      html,
    });

    if (error) {
      console.error("Failed to send email:", error.message || error);
      return false;
    }

    console.log("Email sent successfully to:", to);
    return true;
  } catch (err) {
    console.error("Send error:", err.message);
    return false;
  }
};

// 1. Welcome Email
export const sendWelcomeEmail = async ({ user, hostName }) => {
  const loginUrl = `${hostName}/sign-in`;

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Welcome!</title>
  <style>
    body { font-family: Arial, sans-serif; background: #f6f9fc; padding: 20px; }
    .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1); }
    .header { background: #2563eb; color: white; padding: 30px; text-align: center; }
    .body { padding: 40px 30px; text-align: center; }
    .btn { display: inline-block; background: #2563eb; color: white; padding: 14px 32px; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 20px 0; }
    .footer { background: #f1f5f9; padding: 20px; text-align: center; color: #64748b; font-size: 14px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Welcome to SocialWork, ${user?.name}!</h1>
    </div>
    <div class="body">
      <p>You're now part of a community that creates real change.</p>
      <a href="${loginUrl}" class="btn">Log In to Your Account</a>
      <p>We're so excited to have you with us!</p>
    </div>
    <div class="footer">
      © 2025 SocialWork. All rights reserved.
    </div>
  </div>
</body>
</html>`;

  return await sendEmail({
    to: user?.email,
    subject: "Welcome to SocialWork!",
    html,
  });
};

// 2. Reset Password Email
export const sendResetPasswordEmail = async ({ name, email, token }) => {
  const resetLink = `${APP_URL}/reset-password?token=${token}`;

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Reset Your Password</title>
  <style>
    body { font-family: Arial, sans-serif; background: #f9f9f9; padding: 20px; }
    .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1); }
    .header { background: #dc2626; color: white; padding: 30px; text-align: center; }
    .body { padding: 40px 30px; text-align: center; }
    .btn { background: #dc2626; color: white; padding: 14px 32px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block; margin: 20px 0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Password Reset Request</h1>
    </div>
    <div class="body">
      <p>Hi <strong>${name}</strong>,</p>
      <p>We received a request to reset your password.</p>
      <a href="${resetLink}" class="btn">Reset Password Now</a>
      <p style="color: #666; font-size: 14px;">
        If you didn't request this, please ignore this email.
      </p>
    </div>
  </div>
</body>
</html>`;

  return await sendEmail({ to: email, subject: "Reset Your Password", html });
};

// 3. Forgot Password (OTP)
export const sendForgotPasswordEmail = async ({ name, email, otp }) => {
  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Your Verification Code</title>
  <style>
    body { font-family: Arial, sans-serif; background: #f4f4f4; padding: 20px; }
    .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; padding: 40px; text-align: center; box-shadow: 0 4px 20px rgba(0,0,0,0.1); }
    .code { font-size: 42px; letter-spacing: 12px; background: #f3f4f6; padding: 20px; border-radius: 12px; display: inline-block; margin: 20px 0; font-weight: bold; }
  </style>
</head>
<body>
  <div class="container">
    <h1>Hi ${name},</h1>
    <p>Use this code to reset your password:</p>
    <div class="code">${otp}</div>
    <p style="color: #666;">This code expires in 10 minutes.</p>
  </div>
</body>
</html>`;

  return await sendEmail({
    to: email,
    subject: "Your Password Reset Code",
    html,
  });
};

// 4. Event Registration + QR Code
export const sendEventRegistrationEmail = async ({
  clientName,
  clientEmail,
  eventName,
  startDate,
  endDate,
  eventUrl,
  qrCodeBase64,
}) => {
  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>You're Registered!</title>
  <style>
    body { font-family: Arial, sans-serif; background: #f0fdf4; padding: 20px; }
    .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.1); }
    .header { background: #16a34a; color: white; padding: 40px 20px; text-align: center; }
    .body { padding: 40px 30px; text-align: center; }
    .qr { margin: 30px 0; }
    .btn { background: #16a34a; color: white; padding: 14px 32px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>You're In!</h1>
    </div>
    <div class="body">
      <p>Hi <strong>${clientName}</strong>,</p>
      <h2>${eventName}</h2>
      <p><strong>Date:</strong> ${startDate} – ${endDate}</p>

      <div class="qr">
        <img src="${qrCodeBase64}" alt="QR Code" width="260" height="260" style="border: 2px solid #e5e7eb; border-radius: 12px;" />
        <p style="margin-top: 16px; color: #555;">Show this at the venue</p>
      </div>

      <a href="${eventUrl}" class="btn">View Event Details</a>
      <p style="margin-top: 30px;">We can't wait to see you there!</p>
    </div>
  </div>
</body>
</html>`;

  return await sendEmail({
    to: clientEmail,
    subject: `You're registered: ${eventName}`,
    html,
  });
};
