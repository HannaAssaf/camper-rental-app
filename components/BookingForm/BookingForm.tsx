"use client";

import { useState } from "react";
import css from "./BookingForm.module.css";
import DatePickerField from "../DatePicker/DatePickerField";

export default function BookingForm() {
  const [date, setDate] = useState<Date | null>(null);

  return (
    <div className={css.card}>
      <h3 className={css.title}>Book your campervan now</h3>
      <p className={css.subtitle}>
        Stay connected! We are always ready to help you.
      </p>

      <form className={css.form}>
        <input
          type="text"
          name="name"
          required
          placeholder="Name*"
          className={css.input}
        />
        <input
          type="email"
          name="email"
          required
          placeholder="Email*"
          className={css.input}
        />

        <DatePickerField
          name="date"
          required
          value={date}
          onChange={setDate}
          labelClosed="Booking date*"
          labelOpened="Select a date between today"
        />

        <textarea
          name="comment"
          rows={3}
          placeholder="Comment"
          className={css.textarea}
        />

        <button type="submit" className={css.button}>
          Send
        </button>
      </form>
    </div>
  );
}
