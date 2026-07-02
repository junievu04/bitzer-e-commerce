// actions/contact.ts
"use server";

import nodemailer from "nodemailer";

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  address?: string;
  message: string;
}

interface ActionResult {
  success: boolean;
  message: string;
}

export async function submitContact(
  formData: ContactFormData,
): Promise<ActionResult> {
  const { name, email, phone, address, message } = formData;

  if (!name || !email || !phone || !message) {
    return {
      success: false,
      message: "Vui lòng điền đầy đủ thông tin bắt buộc",
    };
  }

  const adminEmail = process.env.ADMIN_EMAIL;
  if (!adminEmail) {
    console.error("ADMIN_EMAIL is not configured");
    return { success: false, message: "Cấu hình email chưa hoàn tất" };
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1d4ed8; border-bottom: 2px solid #1d4ed8; padding-bottom: 10px;">
          Yêu cầu liên hệ mới từ DAI TIN
        </h2>
        
        <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
          <tr>
            <td style="padding: 10px; border: 1px solid #e5e7eb; background: #f9fafb; font-weight: bold; width: 150px;">
              Họ và tên
            </td>
            <td style="padding: 10px; border: 1px solid #e5e7eb;">
              ${name}
            </td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #e5e7eb; background: #f9fafb; font-weight: bold;">
              Email
            </td>
            <td style="padding: 10px; border: 1px solid #e5e7eb;">
              <a href="mailto:${email}">${email}</a>
            </td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #e5e7eb; background: #f9fafb; font-weight: bold;">
              Số điện thoại
            </td>
            <td style="padding: 10px; border: 1px solid #e5e7eb;">
              <a href="tel:${phone}">${phone}</a>
            </td>
          </tr>
          ${
            address
              ? `
          <tr>
            <td style="padding: 10px; border: 1px solid #e5e7eb; background: #f9fafb; font-weight: bold;">
              Địa chỉ
            </td>
            <td style="padding: 10px; border: 1px solid #e5e7eb;">
              ${address}
            </td>
          </tr>
          `
              : ""
          }
        </table>
        
        <div style="margin-top: 20px;">
          <h3 style="color: #374151; margin-bottom: 10px;">Nội dung:</h3>
          <div style="padding: 15px; background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; white-space: pre-wrap;">
${message}
          </div>
        </div>
        
        <p style="margin-top: 30px; color: #6b7280; font-size: 12px;">
          Email này được gửi tự động từ form liên hệ trên website DAI TIN.
        </p>
      </div>
    `;

    await transporter.sendMail({
      from: `"DAI TIN Contact" <${process.env.SMTP_USER}>`,
      to: adminEmail,
      replyTo: email,
      subject: `[DAI TIN] Yêu cầu liên hệ từ ${name}`,
      html: htmlContent,
    });

    return {
      success: true,
      message: "Gửi liên hệ thành công! Chúng tôi sẽ phản hồi sớm nhất.",
    };
  } catch (error) {
    console.error("Error sending email:", error);
    return {
      success: false,
      message: "Có lỗi xảy ra khi gửi email. Vui lòng thử lại sau.",
    };
  }
}
