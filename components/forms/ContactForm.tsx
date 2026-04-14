"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  service: z.string().min(1, "Please select a service"),
  eventDate: z.string().optional(),
  budget: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const services = [
  "Wedding Photography",
  "Corporate Photography",
  "Videography",
  "Drone Videography",
  "Event Photography",
  "Fashion Photography",
  "Other",
];

const budgetRanges = [
  "Under PKR 50,000",
  "PKR 50,000 - 100,000",
  "PKR 100,000 - 200,000",
  "PKR 200,000 - 500,000",
  "PKR 500,000+",
  "Flexible / Not Sure",
];

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "Failed to send message");
      }

      setStatus("success");
      reset();
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    }
  };

  if (status === "success") {
    return (
      <div className="bg-bg-card border border-accent/30 rounded-card p-8 text-center">
        <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-playfair font-semibold text-text-primary mb-2">
          Thank You!
        </h3>
        <p className="text-text-secondary font-dm text-sm">
          We&apos;ve received your inquiry and will be in touch within 24 hours.
        </p>
      </div>
    );
  }

  const inputStyles =
    "w-full bg-bg-secondary border border-border rounded-btn px-4 py-3 text-text-primary font-dm text-sm placeholder:text-text-secondary/60 focus:outline-none focus:border-accent transition-colors";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {status === "error" && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-btn px-4 py-3 text-red-400 text-sm font-dm">
          {errorMessage}
        </div>
      )}

      {/* Name */}
      <div>
        <label htmlFor="name" className="block text-text-primary font-dm text-sm font-medium mb-1.5">
          Full Name *
        </label>
        <input
          id="name"
          type="text"
          placeholder="Your full name"
          className={cn(inputStyles, errors.name && "border-red-500")}
          {...register("name")}
        />
        {errors.name && (
          <p className="text-red-400 text-xs font-dm mt-1">{errors.name.message}</p>
        )}
      </div>

      {/* Email & Phone */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label htmlFor="email" className="block text-text-primary font-dm text-sm font-medium mb-1.5">
            Email Address *
          </label>
          <input
            id="email"
            type="email"
            placeholder="you@example.com"
            className={cn(inputStyles, errors.email && "border-red-500")}
            {...register("email")}
          />
          {errors.email && (
            <p className="text-red-400 text-xs font-dm mt-1">{errors.email.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="phone" className="block text-text-primary font-dm text-sm font-medium mb-1.5">
            Phone Number *
          </label>
          <input
            id="phone"
            type="tel"
            placeholder="+92 XXX XXXXXXX"
            className={cn(inputStyles, errors.phone && "border-red-500")}
            {...register("phone")}
          />
          {errors.phone && (
            <p className="text-red-400 text-xs font-dm mt-1">{errors.phone.message}</p>
          )}
        </div>
      </div>

      {/* Service & Event Date */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label htmlFor="service" className="block text-text-primary font-dm text-sm font-medium mb-1.5">
            Service Required *
          </label>
          <select
            id="service"
            className={cn(inputStyles, errors.service && "border-red-500")}
            {...register("service")}
          >
            <option value="">Select a service</option>
            {services.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          {errors.service && (
            <p className="text-red-400 text-xs font-dm mt-1">{errors.service.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="eventDate" className="block text-text-primary font-dm text-sm font-medium mb-1.5">
            Event Date (optional)
          </label>
          <input
            id="eventDate"
            type="date"
            className={inputStyles}
            {...register("eventDate")}
          />
        </div>
      </div>

      {/* Budget */}
      <div>
        <label htmlFor="budget" className="block text-text-primary font-dm text-sm font-medium mb-1.5">
          Budget Range (optional)
        </label>
        <select id="budget" className={inputStyles} {...register("budget")}>
          <option value="">Select a budget range</option>
          {budgetRanges.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-text-primary font-dm text-sm font-medium mb-1.5">
          Message *
        </label>
        <textarea
          id="message"
          rows={5}
          placeholder="Tell us about your event or project..."
          className={cn(inputStyles, "resize-none", errors.message && "border-red-500")}
          {...register("message")}
        />
        {errors.message && (
          <p className="text-red-400 text-xs font-dm mt-1">{errors.message.message}</p>
        )}
      </div>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        className="w-full"
        disabled={status === "loading"}
      >
        {status === "loading" ? "Sending..." : "Send Inquiry"}
      </Button>
    </form>
  );
}
