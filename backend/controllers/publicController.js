import asyncHandler from "express-async-handler";
import { sendEmail } from "../email/sendMail.js";

export const contactFormSubmission = asyncHandler(async (req, res) => {
  const { name, phone, email, subject, message } = req.body;

  let messageContent = `
  <p>Name: ${name}</p>
  <p>Phone: ${phone}</p>
  <p>Email: ${email}</p>
 
  <p>Message: </p>
  <p>${message}
  </p>
  `;

  await sendEmail({
    subject,
    toRecipients: ["sales@gatewayx.tech"],
    messageContent,
  });

  res.status(200).json("Message sent!");
});
