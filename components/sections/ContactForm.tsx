"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { CheckCircle } from "lucide-react";
import { COMPANY_WHATSAPP } from "@/lib/constants";

interface FormData {
  name: string;
  phone: string;
  email?: string;
  eventType: string;
  guestCount: string;
  eventDate?: string;
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

const guestCounts = [
  "Under 50",
  "50–100",
  "100–250",
  "250–500",
  "500+",
];

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    await new Promise((r) => setTimeout(r, 800));

    const waText = `Hello! I'd like to enquire about your event management services.%0A%0AName: ${data.name}%0APhone: ${data.phone}%0AEvent Type: ${data.eventType}%0AGuest Count: ${data.guestCount}${data.eventDate ? `%0ADate: ${data.eventDate}` : ""}${data.message ? `%0ADetails: ${data.message}` : ""}`;
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
          className="w-16 h-16 flex items-center justify-center"
          style={{ background: "rgba(201,169,110,0.12)", border: "1px solid rgba(201,169,110,0.3)" }}
        >
          <CheckCircle size={32} className="text-[#C9A96E]" />
        </div>
        <div>
          <h3
            className="text-[#F5F0E8] font-light text-xl mb-2"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Thank You!
          </h3>
          <p className="text-[#8A8A9A] text-sm font-light">
            We&apos;ll be in touch within 2 hours. WhatsApp opened for a quick chat.
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
          Full Name <span className="text-[#C9A96E]">*</span>
        </label>
        <input
          type="text"
          className="form-input"
          placeholder="Your full name"
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
        <div className="flex gap-2">
          <span
            className="flex items-center px-3 text-sm font-light shrink-0"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "#8A8A9A",
            }}
          >
            +91
          </span>
          <input
            type="tel"
            className="form-input flex-1"
            placeholder="98765 43210"
            {...register("phone", {
              required: "Phone number is required",
              pattern: { value: /^[6-9]\d{9}$/, message: "Enter a valid 10-digit mobile number" },
            })}
          />
        </div>
        {errors.phone && (
          <p className="text-red-400 text-xs mt-1">{errors.phone.message}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label className="form-label">Email Address</label>
        <input
          type="email"
          className="form-input"
          placeholder="hello@yourcompany.com (optional)"
          {...register("email", {
            pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Enter a valid email" },
          })}
        />
        {errors.email && (
          <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>
        )}
      </div>

      {/* Event Type + Guest Count row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
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

        <div>
          <label className="form-label">
            Guest Count <span className="text-[#C9A96E]">*</span>
          </label>
          <select
            className="form-input"
            {...register("guestCount", { required: "Please select guest count" })}
            defaultValue=""
          >
            <option value="" disabled>Approximate guests</option>
            {guestCounts.map((g) => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>
          {errors.guestCount && (
            <p className="text-red-400 text-xs mt-1">{errors.guestCount.message}</p>
          )}
        </div>
      </div>

      {/* Event Date */}
      <div>
        <label className="form-label">Preferred Event Date</label>
        <input
          type="date"
          className="form-input"
          style={{ colorScheme: "dark" }}
          {...register("eventDate")}
        />
      </div>

      {/* Message */}
      <div>
        <label className="form-label">Tell Us More</label>
        <textarea
          className="form-input resize-none"
          rows={4}
          placeholder="Describe your vision, venue preferences, special requirements..."
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
          fontWeight: 500,
          letterSpacing: "0.1em",
        }}
      >
        {isSubmitting ? "Sending..." : "Send My Enquiry →"}
      </button>

      <p className="text-center text-[#8A8A9A] text-xs font-light">
        Or message us directly on WhatsApp for a faster response{" "}
        <a
          href={`https://wa.me/${COMPANY_WHATSAPP}?text=${encodeURIComponent("Hello! I'd like to enquire about event management services.")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#C9A96E] hover:text-[#E8D5B0] transition-colors"
        >
          →
        </a>
      </p>
    </form>
  );
}
