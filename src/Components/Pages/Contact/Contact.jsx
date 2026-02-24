import { useState, useCallback } from "react";
import style from "./Contact.module.css";

const INITIAL_FORM = { name: "", email: "", subject: "", message: "" };

export default function Contact() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((res) => setTimeout(res, 1000));
    setIsSuccess(true);
    setIsSubmitting(false);
    setForm(INITIAL_FORM);
  };

  return (
    <div className={style.contactWrapper}>
      <section
        className={style.formSection}
        aria-labelledby="contact-form-heading"
      >
        <h1 id="contact-form-heading" className={style.sectionTitle}>
          Contact us!
        </h1>
        <p className={style.sectionSubtitle}>
          We are happy to answer to any questions you might have.
        </p>

        {isSuccess ? (
          <div className={style.successMessage} role="alert">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 16 16"
              aria-hidden="true"
            >
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
            </svg>
            <div>
              <p className={style.successTitle}>Question sent!</p>
              <p>We got your mail, we will get in touch soon.</p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className={style.form} noValidate>
            <div className={style.row}>
              <div className={style.fieldGroup}>
                <label htmlFor="name">Full Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="John Doe"
                  autoComplete="name"
                />
              </div>

              <div className={style.fieldGroup}>
                <label htmlFor="email">Email Address</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="john@example.com"
                  autoComplete="email"
                />
              </div>
            </div>

            <div className={style.fieldGroup}>
              <label htmlFor="subject">Subject</label>
              <input
                id="subject"
                name="subject"
                type="text"
                value={form.subject}
                onChange={handleChange}
                required
                placeholder="How can we help?"
              />
            </div>

            <div className={style.fieldGroup}>
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                rows={6}
                value={form.message}
                onChange={handleChange}
                required
                placeholder="Tell us more…"
              />
            </div>

            <button
              type="submit"
              className={style.submitBtn}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending…" : "Send Message"}
            </button>
          </form>
        )}
      </section>

      <aside className={style.infoColumn} aria-label="Contact information">
        <div className={style.infoCard}>
          <h2 className={style.sectionTitle}>Contact Details</h2>

          <ul className={style.infoList}>
            <li className={style.infoItem}>
              <span className={style.iconWrapper} aria-hidden="true">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.6 17.6 0 0 0 4.168 6.608 17.6 17.6 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.68.68 0 0 0-.58-.122l-2.19.547a1.75 1.75 0 0 1-1.657-.459L5.482 8.062a1.75 1.75 0 0 1-.46-1.657l.548-2.19a.68.68 0 0 0-.122-.58z" />
                </svg>
              </span>
              <div>
                <span className={style.infoLabel}>Phone:</span>
                <a href="tel:+40749270170" className={style.infoValue}>
                  +40 749 270 170
                </a>
              </div>
            </li>

            <li className={style.infoItem}>
              <span className={style.iconWrapper} aria-hidden="true">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z" />
                </svg>
              </span>
              <div>
                <span className={style.infoLabel}>Email:</span>
                <a href="mailto:hello@shopper.app" className={style.infoValue}>
                  rares.stefea@cognizant.com
                </a>
              </div>
            </li>

            <li className={style.infoItem}>
              <span className={style.iconWrapper} aria-hidden="true">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6" />
                </svg>
              </span>
              <div>
                <span className={style.infoLabel}>Address:</span>
                <span className={style.infoValue}>
                  UBC 0, Piața Consiliul Europei 2D, 9th floor, 300254 Timișoara
                </span>
              </div>
            </li>

            <li className={style.infoItem}>
              <span className={style.iconWrapper} aria-hidden="true">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z" />
                  <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0" />
                </svg>
              </span>
              <div>
                <span className={style.infoLabel}>Program:</span>
                <span className={style.infoValue}>09:00 - 18:00</span>
              </div>
            </li>
          </ul>
        </div>

      </aside>

      <div className={style.mapSection}>
      <h2 className={style.sectionTitle}>Find us here!</h2>
      <div className={style.mapWrapper}>
        <iframe
          title="Our location on Google Maps"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2783.3063401666777!2d21.2300059!3d45.765050599999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x474567ff8f9576cb%3A0xc9c3fcbb17252ce1!2sCognizant!5e0!3m2!1sro!2sro!4v1771959844779!5m2!1sro!2sro"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>
      </div>
    </div>
  );
}
