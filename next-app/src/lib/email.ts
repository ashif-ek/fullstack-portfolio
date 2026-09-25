import nodemailer from 'nodemailer';
import { ContactInput } from '../app/actions/contact';

export async function sendContactEmail(data: ContactInput) {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD, CONTACT_TO_EMAIL } = process.env;

  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASSWORD || !CONTACT_TO_EMAIL) {
    console.warn("SMTP credentials not fully configured. Skipping email sending.");
    return;
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: parseInt(SMTP_PORT, 10),
    secure: parseInt(SMTP_PORT, 10) === 465,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASSWORD,
    },
  });

  const isHireMe = data.source === 'hire_me';
  const typeLabel = isHireMe ? 'Collaboration Request' : 'Contact Form Inquiry';

  let textContent = `New Portfolio Inquiry\n\n`;
  textContent += `Name: ${data.name}\n`;
  textContent += `Email: ${data.email}\n`;
  if (data.company) textContent += `Company: ${data.company}\n`;
  if (data.role) textContent += `Role: ${data.role}\n`;
  if (data.projectType) textContent += `Project Type: ${data.projectType}\n`;
  if (data.budget) textContent += `Budget: ${data.budget}\n`;
  if (data.timeline) textContent += `Timeline: ${data.timeline}\n`;
  textContent += `Inquiry Type: ${typeLabel}\n\n`;
  textContent += `Message:\n${data.message}\n\n`;
  textContent += `Source: ${isHireMe ? 'Hire Me Form' : 'Main Contact Form'}\n`;
  textContent += `Timestamp: ${new Date().toISOString()}\n`;

  await transporter.sendMail({
    from: `"Portfolio Notifications" <${SMTP_USER}>`,
    replyTo: data.email,
    to: CONTACT_TO_EMAIL,
    subject: `New Portfolio Inquiry from ${data.name} (${typeLabel})`,
    text: textContent,
  });
}
