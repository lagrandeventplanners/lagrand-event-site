"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { CheckCircle } from "lucide-react";
import { COMPANY_WHATSAPP } from "@/lib/constants";

interface FormData {
  name: string;
  phone: string;
  eventType: string;
  message?: string;
}

const eventTypes = [
  "Corporate Event",
  "Wedding",
  "Product Launch",
  "Birthday / Social",
  "MICE / Offsite",
  "Décor & Entertainment",
  "Other",
];

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setSubmitError(false);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("send failed");
    } catch {
      // Email failed — fall through to WhatsApp anyway so enquiry is never lost
      setSubmitError(true);
    }

    const waText = `Hello! I'd like to enquire about your event management services.%0A%0AName: ${data.name}%0APhone: ${data.phone}%0AEvent Type: ${data.eventType}${data.message ? `%0ADetails: ${data.message}` : ""}`;
    window.open(`https://wa.me/${COMPANY_WHATSAPP}?text=${waText}`, "_blank");

    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div
        className="flex flex-col items-center justify-center text-center py-16 gap-5"
        style={{ minHeight: "300px" }}
      >
        <div
          className="w-16 h-16 flex items-center justify-center rounded-2xl"
          style={{ background: "rgba(201,169,110,0.12)", border: "1px solid rgba(201,169,110,0.3)" }}
        >
          <CheckCircle size={32} className="text-[#C9A96E]" />
        </div>
        <div>
          <h3
            className="text-[#F5F0E8] font-light text-xl mb-2"
            style={{ fontFamily: "var(--font-display)" }}
          >
            We&apos;ll be in touch soon.
          </h3>
          <p className="text-[#8A8A9A] text-sm font-light">
            {submitError
              ? "WhatsApp opened — our team will reply within 2 hours."
              : "Your enquiry has been emailed to our team. WhatsApp is also open for a quick reply."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>

      {/* Name */}
      <div>
        <label className="form-label">
          Your Name <span className="text-[#C9A96E]">*</span>
        </label>
        <input
          type="text"
          className="form-input"
          placeholder="Full name"
          {...register("name", { required: "Name is required" })}
        />
        {errors.name && (
          <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>
        )}
      </div>

      {/* Phone */}
      <div>
        <label className="form-label">
          Phone Number <span className="text-[#C9A96E]">*</span>
        </label>
        <input
          type="tel"
          className="form-input"
          placeholder="+91 98765 43210"
          {...register("phone", {
            required: "Phone number is required",
            pattern: { value: /^[6-9]\d{9}$/, message: "Enter a valid 10-digit mobile number" },
          })}
        />
        {errors.phone && (
          <p className="text-red-400 text-xs mt-1">{errors.phone.message}</p>
        )}
      </div>

      {/* Event Type */}
      <div>
        <label className="form-label">
          Event Type <span className="text-[#C9A96E]">*</span>
        </label>
        <select
          className="form-input"
          {...register("eventType", { required: "Please select an event type" })}
          defaultValue=""
        >
          <option value="" disabled>Select event type</option>
          {eventTypes.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
        {errors.eventType && (
          <p className="text-red-400 text-xs mt-1">{errors.eventType.message}</p>
        )}
      </div>

      {/* Message */}
      <div>
        <label className="form-label">Anything else? <span style={{ color: "rgba(138,138,154,0.7)" }}>(optional)</span></label>
        <textarea
          className="form-input resize-none"
          rows={3}
          placeholder="Date, guest count, venue, vision — anything helps."
          {...register("message")}
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full text-sm tracking-widest uppercase px-8 py-4 transition-all duration-300 disabled:opacity-60"
        style={{
          background: isSubmitting ? "rgba(201,169,110,0.5)" : "#C9A96E",
          color: "#050510",
          fontWeight: 600,
          letterSpacing: "0.12em",
          borderRadius: "100px",
        }}
      >
        {isSubmitting ? "Sending Enquiry…" : "Send Enquiry →"}
      </button>

      <p className="text-center text-[#8A8A9A] text-xs font-light">
        Prefer to message directly?{" "}
        <a
          href={`https://wa.me/${COMPANY_WHATSAPP}?text=${encodeURIComponent("Hello! I'd like to enquire about event management services.")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#C9A96E] hover:text-[#E8D5B0] transition-colors"
        >
          WhatsApp us →
        </a>
      </p>
    </form>
  );
}
