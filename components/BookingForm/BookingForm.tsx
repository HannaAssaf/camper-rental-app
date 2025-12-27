"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import css from "./BookingForm.module.css";
import DatePickerField from "../DatePicker/DatePickerField";
import { useFormStore } from "@/store/useFormStore";

type Errors = {
  name?: string;
  email?: string;
  date?: string;
  comment?: string;
};

type Field = keyof Errors;

const NAME_RE = /^[A-Za-zÀ-ÖØ-öø-ÿА-Яа-яІіЇїЄєҐґ'’ -]+$/;

function isValidEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

function toStartOfDay(x: Date) {
  const d = new Date(x);
  d.setHours(0, 0, 0, 0);
  return d;
}

export default function BookingForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { draft, setField, clear } = useFormStore();
  const [date, setDate] = useState<Date | null>(null);

  function setFieldError(field: Field, message?: string) {
    setErrors((prev) => ({ ...prev, [field]: message }));
  }

  function validateField(
    field: Field,
    value: string,
    selectedDate: Date | null
  ) {
    const v = value.trim();

    if (field === "name") {
      if (!v) return "Name is required";
      if (v.length < 2) return "Name must be at least 2 characters";
      if (!NAME_RE.test(v))
        return "Use letters only (spaces, hyphens and apostrophes are allowed)";
      return undefined;
    }

    if (field === "email") {
      if (!v) return "Email is required";
      if (!isValidEmail(v)) return "Please enter a valid email address";
      return undefined;
    }

    if (field === "comment") {
      if (v.length > 500) return "Comment must be 500 characters or less";
      return undefined;
    }

    if (field === "date") {
      if (!selectedDate) return "Booking date is required";
      const today = toStartOfDay(new Date());
      const d = toStartOfDay(selectedDate);

      if (d < today) return "Date cannot be in the past";
      return undefined;
    }
    return undefined;
  }

  function validateAll(selectedDate: Date | null): Errors {
    const e: Errors = {};

    const nameMsg = validateField("name", draft.name, selectedDate);
    if (nameMsg) e.name = nameMsg;

    const emailMsg = validateField("email", draft.email, selectedDate);
    if (emailMsg) e.email = emailMsg;

    const dateMsg = validateField("date", "", selectedDate);
    if (dateMsg) e.date = dateMsg;

    const commentMsg = validateField("comment", draft.comment, selectedDate);
    if (commentMsg) e.comment = commentMsg;

    return e;
  }

  function handleBlur(field: Field) {
    return (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value = e.currentTarget.value;
      const msg = validateField(field, value, date);
      setFieldError(field, msg);
    };
  }

  function handleChange(field: Field) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value = e.currentTarget.value;
      setField(field as "name" | "email" | "comment", value);
      const msg = validateField(field, value, date);
      if (!msg) setFieldError(field, undefined);
    };
  }

  function handleDateChange(d: Date | null) {
    setDate(d);
    setFieldError("date", validateField("date", "", d));
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const nextErrors = validateAll(date);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      toast.error("Please fix the highlighted fields.");
      return;
    }

    try {
      setIsSubmitting(true);
      clear();
      setDate(null);
      setErrors({});

      toast.success("Your booking request has been sent!", {
        duration: 3000,
        style: {
          borderRadius: "12px",
          background: "var(--color-text)",
          color: "var(--color-white)",
        },
      });
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className={css.card}>
      <h3 className={css.title}>Book your campervan now</h3>
      <p className={css.subtitle}>
        Stay connected! We are always ready to help you.
      </p>
      <form className={css.form} onSubmit={onSubmit} noValidate>
        <div className={css.field}>
          <input
            type="text"
            name="name"
            placeholder="Name*"
            value={draft.name}
            className={`${css.input} ${errors.name ? css.inputError : ""}`}
            aria-invalid={!!errors.name}
            onBlur={handleBlur("name")}
            onChange={handleChange("name")}
          />
          {errors.name && <p className={css.error}>{errors.name}</p>}
        </div>
        <div className={css.field}>
          <input
            type="email"
            name="email"
            placeholder="Email*"
            value={draft.email}
            className={`${css.input} ${errors.email ? css.inputError : ""}`}
            aria-invalid={!!errors.email}
            onBlur={handleBlur("email")}
            onChange={handleChange("email")}
          />
          {errors.email && <p className={css.error}>{errors.email}</p>}
        </div>
        <div className={css.field}>
          <DatePickerField
            name="date"
            required
            value={date}
            onChange={handleDateChange}
            aria-invalid={!!errors.date}
            labelClosed="Booking date*"
            labelOpened="Select a date from today"
          />
          {errors.date && <p className={css.error}>{errors.date}</p>}
        </div>
        <div className={css.field}>
          <textarea
            name="comment"
            rows={3}
            placeholder="Comment"
            value={draft.comment}
            className={`${css.textarea} ${
              errors.comment ? css.inputError : ""
            }`}
            aria-invalid={!!errors.comment}
            onBlur={handleBlur("comment")}
            onChange={handleChange("comment")}
          />
          {errors.comment && <p className={css.error}>{errors.comment}</p>}
        </div>
        <button type="submit" className={css.button} disabled={isSubmitting}>
          {isSubmitting ? (
            <span className={css.loaderWrap}>
              <span className={css.spinner} />
              Sending...
            </span>
          ) : (
            "Send"
          )}
        </button>
      </form>
    </div>
  );
}
