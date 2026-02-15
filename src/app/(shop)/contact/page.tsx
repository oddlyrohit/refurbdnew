"use client";

import { useState } from "react";
import { Mail, MessageSquare, Clock, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    orderNumber: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // In production, this would send to an API endpoint / email service
    setSubmitted(true);
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-neutral-900">Contact Us</h1>
        <p className="mt-3 text-neutral-500">
          Have a question or need help? We&apos;re here for you.
        </p>
      </div>

      <div className="grid sm:grid-cols-3 gap-6 mb-12">
        {[
          {
            icon: Mail,
            title: "Email",
            desc: "support@refurbd.com.au",
            sub: "We reply within 24 hours",
          },
          {
            icon: MessageSquare,
            title: "Live Chat",
            desc: "Chat with our team",
            sub: "Mon-Fri, 9am-5pm AEST",
          },
          {
            icon: Clock,
            title: "Business Hours",
            desc: "Monday - Friday",
            sub: "9:00 AM - 5:00 PM AEST",
          },
        ].map((item) => (
          <div key={item.title} className="rounded-xl border border-neutral-200 bg-white p-6 text-center">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-primary-50 text-primary-500">
              <item.icon className="h-6 w-6" />
            </div>
            <h3 className="font-semibold text-neutral-900">{item.title}</h3>
            <p className="mt-1 text-sm text-neutral-900">{item.desc}</p>
            <p className="text-xs text-neutral-500">{item.sub}</p>
          </div>
        ))}
      </div>

      {submitted ? (
        <div className="rounded-xl border border-success-200 bg-success-50 p-12 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-success-100">
            <Send className="h-8 w-8 text-success-500" />
          </div>
          <h2 className="text-xl font-bold text-neutral-900">Message Sent!</h2>
          <p className="mt-2 text-neutral-500">
            Thanks for reaching out. We&apos;ll get back to you within 24 hours.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="rounded-xl border border-neutral-200 bg-white p-8">
          <h2 className="text-xl font-bold text-neutral-900 mb-6">Send us a message</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <Input
              label="Your Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
            <Input
              label="Email Address"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
            <Input
              label="Order Number (optional)"
              value={form.orderNumber}
              onChange={(e) => setForm({ ...form, orderNumber: e.target.value })}
              placeholder="RFB-XXXXXXXX"
            />
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1.5">Subject</label>
              <select
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                required
                className="w-full rounded-lg border border-neutral-300 px-3 py-2.5 text-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
              >
                <option value="">Select a topic...</option>
                <option value="order">Order Enquiry</option>
                <option value="product">Product Question</option>
                <option value="warranty">Warranty Claim</option>
                <option value="return">Return Request</option>
                <option value="shipping">Shipping Question</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-neutral-700 mb-1.5">Message</label>
            <textarea
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              rows={5}
              required
              className="w-full rounded-lg border border-neutral-300 px-3 py-2.5 text-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
              placeholder="How can we help you?"
            />
          </div>
          <div className="mt-6">
            <Button type="submit" size="lg">
              <Send className="h-4 w-4" />
              Send Message
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
