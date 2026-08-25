import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { SectionHeader } from "../../components/SectionHeader/SectionHeader";
import { locations } from "../../data/locations";
import styles from "./Contact.module.css";
import GoogleMap from "../../components/GoogleMap/GoogleMap";

interface FormState {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

const initial: FormState = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

export function Contact() {
  const [form, setForm] = useState<FormState>(initial);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [submitted, setSubmitted] = useState(false);

  function validate(): boolean {
    const e: Partial<FormState> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Enter a valid email";
    if (!form.subject.trim()) e.subject = "Subject is required";
    if (!form.message.trim() || form.message.trim().length < 10)
      e.message = "Message must be at least 10 characters";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit(ev: FormEvent) {
    ev.preventDefault();
    if (!validate()) return;
    setSubmitted(true);
    setForm(initial);
  }

  function update(field: keyof FormState, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }));
  }

  return (
    <div className="page">
      <section className={styles.hero}>
        <div className="container">
          <SectionHeader
            label="Get in touch"
            title="Contact"
            description="Questions, reservations, or feedback — we would love to hear from you."
          />
        </div>
      </section>

      <section className={styles.content}>
        <div className={`container ${styles.grid}`}>
          <div className={styles.locations}>
            {locations.map((loc, i) => (
              <motion.article
                key={loc.id}
                className={styles.locCard}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <h3>{loc.name}</h3>
                <ul className={styles.details}>
                  <li>
                    <MapPin size={16} />
                    <span>{loc.address}</span>
                  </li>
                  <li>
                    <Phone size={16} />
                    <a href={`tel:${loc.phone}`}>{loc.phone}</a>
                  </li>
                  <li>
                    <Clock size={16} />
                    <span>
                      {loc.openingHours.map((h) => (
                        <span key={h} className={styles.hours}>
                          {h}
                        </span>
                      ))}
                    </span>
                  </li>
                </ul>
                <div className={styles.locActions}>
                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(loc.address)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-secondary btn-sm"
                  >
                    Directions
                  </a>
                  <a
                    href={`tel:${loc.phone}`}
                    className="btn btn-primary btn-sm"
                  >
                    Call
                  </a>
                </div>
              </motion.article>
            ))}

            <div className={styles.general}>
              <h3>General</h3>
              <p>
                <Mail size={16} />{" "}
                <a href="mailto:hello@pastizza.example">hello@pastizza.example</a>
              </p>
            </div>
          </div>

          <div className={styles.formWrap}>
            {submitted ? (
              <motion.div
                className={styles.success}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <h3>Message sent</h3>
                <p>
                  Thank you. This is a demo form — no email was actually sent.
                  We appreciate you testing the flow.
                </p>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setSubmitted(false)}
                >
                  Send another
                </button>
              </motion.div>
            ) : (
              <form className={styles.form} onSubmit={handleSubmit} noValidate>
                <h3>Send a message</h3>
                <div className={styles.field}>
                  <label htmlFor="name">Name</label>
                  <input
                    id="name"
                    value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                    aria-invalid={!!errors.name}
                  />
                  {errors.name && (
                    <span className={styles.error}>{errors.name}</span>
                  )}
                </div>
                <div className={styles.row}>
                  <div className={styles.field}>
                    <label htmlFor="email">Email</label>
                    <input
                      id="email"
                      type="email"
                      value={form.email}
                      onChange={(e) => update("email", e.target.value)}
                      aria-invalid={!!errors.email}
                    />
                    {errors.email && (
                      <span className={styles.error}>{errors.email}</span>
                    )}
                  </div>
                  <div className={styles.field}>
                    <label htmlFor="phone">Phone (optional)</label>
                    <input
                      id="phone"
                      type="tel"
                      value={form.phone}
                      onChange={(e) => update("phone", e.target.value)}
                    />
                  </div>
                </div>
                <div className={styles.field}>
                  <label htmlFor="subject">Subject</label>
                  <input
                    id="subject"
                    value={form.subject}
                    onChange={(e) => update("subject", e.target.value)}
                    aria-invalid={!!errors.subject}
                  />
                  {errors.subject && (
                    <span className={styles.error}>{errors.subject}</span>
                  )}
                </div>
                <div className={styles.field}>
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    rows={5}
                    value={form.message}
                    onChange={(e) => update("message", e.target.value)}
                    aria-invalid={!!errors.message}
                  />
                  {errors.message && (
                    <span className={styles.error}>{errors.message}</span>
                  )}
                </div>
                <button type="submit" className="btn btn-primary">
                  Send message
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <section className={styles.map}>
        <div className="container">
          <div
            className={styles.mapPlaceholder}
            role="img"
            aria-label="Map placeholder"
          >
            <GoogleMap address="PASTIZZA, Islamabad, Pakistan" />
          </div>
        </div>
      </section>
    </div>
  );
}
