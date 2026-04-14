import { Resend } from "resend";

function getResend() {
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error("RESEND_API_KEY is not configured");
  return new Resend(key);
}

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  eventDate?: string;
  budget?: string;
  message: string;
}

export async function sendContactEmail(data: ContactFormData) {
  const contactEmail =
    process.env.CONTACT_EMAIL || "info@adiphotography.pk";

  const { error } = await getResend().emails.send({
    from: "Adi Photography Website <onboarding@resend.dev>",
    to: contactEmail,
    subject: `New Inquiry: ${data.service} — ${data.name}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #EC3337; border-bottom: 2px solid #EC3337; padding-bottom: 10px;">
          New Client Inquiry
        </h1>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #333;">Name:</td>
            <td style="padding: 8px 0;">${data.name}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #333;">Email:</td>
            <td style="padding: 8px 0;"><a href="mailto:${data.email}">${data.email}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #333;">Phone:</td>
            <td style="padding: 8px 0;"><a href="tel:${data.phone}">${data.phone}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #333;">Service:</td>
            <td style="padding: 8px 0;">${data.service}</td>
          </tr>
          ${
            data.eventDate
              ? `<tr>
            <td style="padding: 8px 0; font-weight: bold; color: #333;">Event Date:</td>
            <td style="padding: 8px 0;">${data.eventDate}</td>
          </tr>`
              : ""
          }
          ${
            data.budget
              ? `<tr>
            <td style="padding: 8px 0; font-weight: bold; color: #333;">Budget:</td>
            <td style="padding: 8px 0;">${data.budget}</td>
          </tr>`
              : ""
          }
        </table>
        <div style="margin-top: 20px; padding: 15px; background: #f5f5f5; border-radius: 4px;">
          <p style="font-weight: bold; color: #333; margin: 0 0 8px;">Message:</p>
          <p style="margin: 0; line-height: 1.6;">${data.message}</p>
        </div>
        <p style="margin-top: 20px; font-size: 12px; color: #999;">
          Sent from adiphotography.pk contact form
        </p>
      </div>
    `,
  });

  if (error) {
    throw new Error(`Failed to send email: ${error.message}`);
  }

  return { success: true };
}
