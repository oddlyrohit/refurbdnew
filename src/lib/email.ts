import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface OrderEmailData {
  to: string;
  orderNumber: string;
  items: { title: string; quantity: number; price: number }[];
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  shippingAddress: {
    firstName: string;
    lastName: string;
    line1: string;
    city: string;
    state: string;
    postcode: string;
    country: string;
  };
}

export async function sendOrderConfirmation(data: OrderEmailData) {
  const itemsHtml = data.items
    .map(
      (item) =>
        `<tr>
          <td style="padding:8px 0;border-bottom:1px solid #eee">${item.title}</td>
          <td style="padding:8px 0;border-bottom:1px solid #eee;text-align:center">${item.quantity}</td>
          <td style="padding:8px 0;border-bottom:1px solid #eee;text-align:right">$${item.price.toFixed(2)}</td>
        </tr>`
    )
    .join("");

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;color:#333">
      <div style="background:#0D7377;padding:24px;text-align:center">
        <h1 style="color:white;margin:0;font-size:24px">Refurbd</h1>
      </div>

      <div style="padding:24px">
        <h2 style="color:#0D7377">Thank you for your order!</h2>
        <p>Hi ${data.shippingAddress.firstName},</p>
        <p>Your order <strong>${data.orderNumber}</strong> has been confirmed. We'll notify you when it ships.</p>

        <h3 style="margin-top:24px">Order Summary</h3>
        <table style="width:100%;border-collapse:collapse">
          <thead>
            <tr style="border-bottom:2px solid #0D7377">
              <th style="text-align:left;padding:8px 0">Item</th>
              <th style="text-align:center;padding:8px 0">Qty</th>
              <th style="text-align:right;padding:8px 0">Price</th>
            </tr>
          </thead>
          <tbody>
            ${itemsHtml}
          </tbody>
        </table>

        <div style="margin-top:16px;text-align:right">
          <p style="margin:4px 0">Subtotal: <strong>$${data.subtotal.toFixed(2)}</strong></p>
          <p style="margin:4px 0">Shipping: <strong>${data.shipping === 0 ? "Free" : "$" + data.shipping.toFixed(2)}</strong></p>
          ${data.discount > 0 ? `<p style="margin:4px 0;color:#10B981">Discount: <strong>-$${data.discount.toFixed(2)}</strong></p>` : ""}
          <p style="margin:8px 0;font-size:18px;color:#0D7377">Total: <strong>$${data.total.toFixed(2)}</strong></p>
          <p style="margin:4px 0;font-size:12px;color:#999">GST included: $${(data.total / 11).toFixed(2)}</p>
        </div>

        <h3 style="margin-top:24px">Shipping To</h3>
        <p style="margin:4px 0">${data.shippingAddress.firstName} ${data.shippingAddress.lastName}</p>
        <p style="margin:4px 0">${data.shippingAddress.line1}</p>
        <p style="margin:4px 0">${data.shippingAddress.city}, ${data.shippingAddress.state} ${data.shippingAddress.postcode}</p>
        <p style="margin:4px 0">${data.shippingAddress.country}</p>

        <div style="margin-top:32px;padding:16px;background:#f8f8f8;border-radius:8px;text-align:center">
          <p style="margin:0;font-size:14px">Estimated delivery: <strong>5-7 business days</strong></p>
        </div>

        <p style="margin-top:24px;font-size:14px">
          Questions? Reply to this email or visit <a href="https://refurbd.vercel.app/contact" style="color:#0D7377">our contact page</a>.
        </p>
      </div>

      <div style="background:#f8f8f8;padding:16px;text-align:center;font-size:12px;color:#999">
        <p style="margin:0">Refurbd — Premium Refurbished Tech</p>
        <p style="margin:4px 0">12-Month Warranty | 30-Day Returns | Secure Payments</p>
      </div>
    </div>
  `;

  try {
    await resend.emails.send({
      from: "Refurbd <orders@refurbd.com.au>",
      to: data.to,
      subject: `Order Confirmed — ${data.orderNumber}`,
      html,
    });
  } catch (error) {
    console.error("Failed to send order confirmation email:", error);
  }
}
