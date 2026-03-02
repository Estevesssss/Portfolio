"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

type FormStatus = "idle" | "sending" | "success" | "error";

export default function ContactSection() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMessage(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formState.name,
          email: formState.email,
          message: formState.message,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok) {
        setStatus("success");
        setFormState({ name: "", email: "", message: "" });
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
        setErrorMessage(data?.error || t("contact.error"));
        setTimeout(() => {
          setStatus("idle");
          setErrorMessage(null);
        }, 5000);
      }
    } catch {
      setStatus("error");
      setErrorMessage(t("contact.error"));
      setTimeout(() => {
        setStatus("idle");
        setErrorMessage(null);
      }, 5000);
    }
  };

  const inputClasses =
    "w-full rounded-xl border border-border bg-surface/50 px-4 py-3 text-sm text-foreground placeholder-muted/50 backdrop-blur-sm transition-all duration-300 outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 focus:shadow-[0_0_20px_rgba(168,85,247,0.08)]";

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: i * 0.1 },
    }),
  };

  const buttonLabel = () => {
    switch (status) {
      case "sending":
        return t("contact.sending");
      case "success":
        return t("contact.success");
      case "error":
        return t("contact.error");
      default:
        return t("contact.send");
    }
  };

  return (
    <section
      id="contact"
      ref={ref}
      className="relative mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-6 py-24"
    >
      <motion.h2
        className="mb-4 text-center text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        {t("contact.heading")}
        <span className="text-accent">.</span>
      </motion.h2>

      <motion.p
        className="mb-12 max-w-lg text-center text-base text-muted"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.15 }}
      >
        {t("contact.description")}
      </motion.p>

      <motion.form
        onSubmit={handleSubmit}
        className="flex w-full max-w-lg flex-col gap-5"
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <motion.div custom={0} variants={fadeUp}>
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-foreground">
            {t("contact.nameLabel")}
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder={t("contact.namePlaceholder")}
            value={formState.name}
            onChange={handleChange}
            disabled={status === "sending"}
            className={inputClasses}
          />
        </motion.div>

        <motion.div custom={1} variants={fadeUp}>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-foreground">
            {t("contact.emailLabel")}
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder={t("contact.emailPlaceholder")}
            value={formState.email}
            onChange={handleChange}
            disabled={status === "sending"}
            className={inputClasses}
          />
        </motion.div>

        <motion.div custom={2} variants={fadeUp}>
          <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-foreground">
            {t("contact.messageLabel")}
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            required
            placeholder={t("contact.messagePlaceholder")}
            value={formState.message}
            onChange={handleChange}
            disabled={status === "sending"}
            className={`${inputClasses} resize-none`}
          />
        </motion.div>

        <motion.div custom={3} variants={fadeUp}>
          <motion.button
            type="submit"
            disabled={status === "sending"}
            className={`group relative w-full rounded-xl px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300 ${
              status === "success"
                ? "bg-emerald-500"
                : status === "error"
                  ? "bg-red-500"
                  : "bg-accent hover:shadow-[0_0_30px_rgba(168,85,247,0.35)]"
            } disabled:opacity-60`}
            whileHover={status === "idle" ? { scale: 1.02 } : {}}
            whileTap={status === "idle" ? { scale: 0.98 } : {}}
          >
            <span className="relative z-10">{buttonLabel()}</span>
            {status === "idle" && (
              <div className="absolute inset-0 rounded-xl bg-accent-glow opacity-0 transition-opacity duration-300 group-hover:opacity-20" />
            )}
          </motion.button>
        </motion.div>
        {errorMessage && (
          <p className="text-center text-sm text-red-500">{errorMessage}</p>
        )}
      </motion.form>
    </section>
  );
}
