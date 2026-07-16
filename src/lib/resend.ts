import { Resend } from 'resend';

const resendApiKey = process.env.RESEND_API_KEY;

export const resend = resendApiKey ? new Resend(resendApiKey) : null;

export async function sendTransactionalEmail(to: string, subject: string, htmlContent: string) {
  if (!resend) {
    console.warn("Resend API Key missing. Execution bypassed. Output simulation logged.");
    return { id: "mock-id-success", error: null };
  }
  
  try {
    return await resend.emails.send({
      from: process.env.NOTIFICATION_EMAIL_FROM || 'noreply@development.fluid.io',
      to,
      subject,
      html: htmlContent,
    });
  } catch (error) {
    console.error("Critical failure during email system transport lifecycle:", error);
    return { id: null, error };
  }
}
