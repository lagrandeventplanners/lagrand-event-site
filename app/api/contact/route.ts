import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const NOTIFY_TO = "hello@lagrandeevents.in";
const FROM = "La Grandè Events <enquiries@lagrandeinc.com>";

export async function POST(req: NextRequest) {
  const { name, phone, eventType, message } = await req.json();

  if (!name || !phone || !eventType) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  try {
    await resend.emails.send({
      from: FROM,
      to: NOTIFY_TO,
      replyTo: undefined,
      subject: `New Enquiry: ${eventType} — ${name}`,
      html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /></head>
<body style="margin:0;padding:0;background:#050510;font-family:'Helvetica Neue',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#050510;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#1a1030 0%,#0a0820 100%);border:1px solid rgba(201,169,110,0.25);border-radius:16px 16px 0 0;padding:32px 40px;text-align:center;">
              <p style="margin:0 0 8px;font-size:11px;letter-spacing:0.2em;color:#C9A96E;text-transform:uppercase;">New Enquiry Received</p>
              <h1 style="margin:0;font-size:26px;font-weight:300;color:#F5F0E8;letter-spacing:-0.02em;">La Grand&egrave; Events</h1>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="background:#0D0A1A;border:1px solid rgba(201,169,110,0.15);border-top:0;padding:36px 40px;">
              <p style="margin:0 0 24px;font-size:14px;color:rgba(245,240,232,0.6);line-height:1.6;">
                A new event enquiry was submitted through the website contact form.
              </p>

              <!-- Details table -->
              <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid rgba(201,169,110,0.2);border-radius:12px;overflow:hidden;">
                ${[
                  ["Name", name],
                  ["Phone", phone],
                  ["Event Type", eventType],
                  ...(message ? [["Message", message]] : []),
                ]
                  .map(
                    ([label, value], i) => `
                <tr style="background:${i % 2 === 0 ? "rgba(201,169,110,0.04)" : "transparent"};">
                  <td style="padding:14px 20px;font-size:11px;letter-spacing:0.12em;color:#C9A96E;text-transform:uppercase;white-space:nowrap;width:130px;border-bottom:1px solid rgba(201,169,110,0.1);">${label}</td>
                  <td style="padding:14px 20px;font-size:14px;color:#F5F0E8;font-weight:400;border-bottom:1px solid rgba(201,169,110,0.1);">${value}</td>
                </tr>`
                  )
                  .join("")}
              </table>

              <!-- CTA -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:28px;">
                <tr>
                  <td align="center">
                    <a href="https://wa.me/919989838909?text=${encodeURIComponent(`Hi! Following up on the enquiry from ${name} (${phone}) for ${eventType}.`)}"
                      style="display:inline-block;background:#C9A96E;color:#050510;font-size:13px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;padding:14px 32px;border-radius:100px;text-decoration:none;">
                      Reply on WhatsApp →
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="background:#070510;border:1px solid rgba(201,169,110,0.1);border-top:0;border-radius:0 0 16px 16px;padding:20px 40px;text-align:center;">
              <p style="margin:0;font-size:11px;color:rgba(245,240,232,0.3);letter-spacing:0.05em;">
                This email was sent by the contact form at lagrandeinc.com
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact/route] Resend error:", err);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
