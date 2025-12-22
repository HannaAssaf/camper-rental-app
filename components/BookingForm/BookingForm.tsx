import css from "./BookingForm.module.css";

export default function BookingForm() {
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

        <input
          type="date"
          name="date"
          required
          placeholder="Booking date*"
          className={css.input}
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
