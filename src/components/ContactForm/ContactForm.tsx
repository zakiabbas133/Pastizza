import { useState, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { submitContactForm, type ContactFormData } from '@/services/contactService';
import ScrollReveal from '@/components/ScrollReveal/ScrollReveal';
import './ContactForm.css';

const categories = ['Food', 'Service', 'Atmosphere', 'Website', 'General Feedback'];

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export default function ContactForm() {
  const [form, setForm] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
    rating: undefined,
    category: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!form.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!form.subject.trim()) newErrors.subject = 'Subject is required';
    if (!form.message.trim()) newErrors.message = 'Message is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('loading');
    const result = await submitContactForm(form);

    if (result.success) {
      setStatus('success');
      setStatusMessage(result.message);
      setForm({ name: '', email: '', subject: '', message: '', rating: undefined, category: '' });
    } else {
      setStatus('error');
      setStatusMessage(result.message);
    }
  };

  const updateField = (field: keyof ContactFormData, value: string | number) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <section id="contact" className="section contact-section">
      <div className="container">
        <div className="contact-grid">
          <ScrollReveal className="contact-section__intro">
            <span className="section-label">Feedback</span>
            <h2 className="section-title">Help us<br />improve</h2>
            <p className="section-subtitle">
              Your thoughts shape our experience. Share feedback, suggestions, or simply tell us about your visit.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <form className="contact-form" onSubmit={handleSubmit} noValidate>
              <div className="contact-form__row">
                <div className={`contact-form__field ${errors.name ? 'contact-form__field--error' : ''}`}>
                  <label htmlFor="contact-name">Name *</label>
                  <input
                    id="contact-name"
                    type="text"
                    value={form.name}
                    onChange={(e) => updateField('name', e.target.value)}
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                  />
                  {errors.name && <span id="name-error" className="contact-form__error">{errors.name}</span>}
                </div>

                <div className={`contact-form__field ${errors.email ? 'contact-form__field--error' : ''}`}>
                  <label htmlFor="contact-email">Email *</label>
                  <input
                    id="contact-email"
                    type="email"
                    value={form.email}
                    onChange={(e) => updateField('email', e.target.value)}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                  />
                  {errors.email && <span id="email-error" className="contact-form__error">{errors.email}</span>}
                </div>
              </div>

              <div className={`contact-form__field ${errors.subject ? 'contact-form__field--error' : ''}`}>
                <label htmlFor="contact-subject">Subject *</label>
                <input
                  id="contact-subject"
                  type="text"
                  value={form.subject}
                  onChange={(e) => updateField('subject', e.target.value)}
                  aria-invalid={!!errors.subject}
                />
                {errors.subject && <span className="contact-form__error">{errors.subject}</span>}
              </div>

              <div className="contact-form__field">
                <label htmlFor="contact-category">Category</label>
                <select
                  id="contact-category"
                  value={form.category}
                  onChange={(e) => updateField('category', e.target.value)}
                >
                  <option value="">Select a category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div className="contact-form__field">
                <label htmlFor="contact-rating">Rating (optional)</label>
                <div className="contact-form__rating" id="contact-rating" role="group" aria-label="Rating">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <button
                      key={n}
                      type="button"
                      className={`contact-form__star ${form.rating && form.rating >= n ? 'contact-form__star--active' : ''}`}
                      onClick={() => updateField('rating', n)}
                      aria-label={`${n} star${n > 1 ? 's' : ''}`}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>

              <div className={`contact-form__field ${errors.message ? 'contact-form__field--error' : ''}`}>
                <label htmlFor="contact-message">Message *</label>
                <textarea
                  id="contact-message"
                  rows={5}
                  value={form.message}
                  onChange={(e) => updateField('message', e.target.value)}
                  aria-invalid={!!errors.message}
                />
                {errors.message && <span className="contact-form__error">{errors.message}</span>}
              </div>

              <button type="submit" className="btn btn-primary contact-form__submit" disabled={status === 'loading'}>
                {status === 'loading' ? (
                  <><Loader2 size={16} className="contact-form__spinner" /> Sending...</>
                ) : (
                  <><Send size={16} /> Send Feedback</>
                )}
              </button>

              <AnimatePresence>
                {(status === 'success' || status === 'error') && (
                  <motion.div
                    className={`contact-form__status contact-form__status--${status}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    role="alert"
                  >
                    {status === 'success' ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
                    {statusMessage}
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
