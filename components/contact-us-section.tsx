import { useState } from 'react';
import { Mail, Phone, MessageCircle } from 'lucide-react';

export function ContactUsSection() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setError('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus('success');
        setForm({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
        setError('Failed to send. Try again.');
      }
    } catch {
      setStatus('error');
      setError('Failed to send. Try again.');
    }
  };

  return (
    <section id="contact" className="relative py-20 bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="container mx-auto px-4 max-w-5xl">
        <h2 className="text-4xl font-bold text-deep-blue mb-12 text-center drop-shadow-lg">Contact Us</h2>
        <div className="flex flex-col md:flex-row gap-10 items-stretch justify-center">
          {/* Left: Contact Info */}
          <div className="w-full md:w-1/2 flex flex-col gap-6 items-start p-8 rounded-2xl shadow-2xl bg-slate-100 border border-blue-200 backdrop-blur-md justify-center">
            <div className="flex items-center gap-4 mb-2 w-full">
              <div className="bg-sky-300 rounded-full p-3 flex items-center justify-center">
                <Mail className="h-6 w-6 text-white" />
              </div>
              <div className="flex flex-col">
                <a href="mailto:batolisoulstay@gmail.com" target="_blank" rel="noopener noreferrer" className="font-bold text-slate-800 hover:underline block">batolisoulstay@gmail.com</a>
                <span className="text-slate-600 text-sm">Email us your queries</span>
              </div>
            </div>
            <div className="flex items-center gap-4 mb-2 w-full">
              <div className="bg-sky-300 rounded-full p-3 flex items-center justify-center">
                <Phone className="h-6 w-6 text-white" />
              </div>
              <div className="flex flex-col">
                <a href="tel:+917818097741" className="font-bold text-slate-800 hover:underline block">+91 78180 97741</a>
                <span className="text-slate-600 text-sm">Call us for information</span>
              </div>
            </div>
            <div className="flex items-center gap-4 w-full">
              <div className="bg-sky-300 rounded-full p-3 flex items-center justify-center">
                <MessageCircle className="h-6 w-6 text-white" />
              </div>
              <div className="flex flex-col">
                <a href="https://wa.me/917818097741" target="_blank" rel="noopener noreferrer" className="font-bold text-slate-800 hover:underline block">WhatsApp: +91 78180 97741</a>
                <span className="text-slate-600 text-sm">Chat with us on WhatsApp</span>
              </div>
            </div>
          </div>
          {/* Right: Contact Form */}
          <div className="w-full md:w-1/2 bg-slate-100 rounded-2xl shadow-2xl p-8 flex flex-col justify-center border border-blue-100">
            <form className="space-y-4" onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-blue"
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-blue"
              />
              <textarea
                name="message"
                placeholder="Your Message"
                value={form.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-blue"
              />
              <button
                type="submit"
                className="w-full bg-blue-500 text-white font-semibold py-3 rounded-lg hover:bg-blue-400 transition-colors"
                disabled={status === 'loading'}
              >
                {status === 'loading' ? 'Sending...' : 'Send Message'}
              </button>
              {status === 'success' && <p className="text-green-600">Message sent successfully!</p>}
              {status === 'error' && <p className="text-red-600">{error}</p>}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
