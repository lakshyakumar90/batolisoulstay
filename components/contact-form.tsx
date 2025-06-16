import { useState } from 'react';

export function ContactForm() {
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
    <div className="bg-white rounded-2xl shadow-2xl overflow-hidden max-w-2xl mx-auto my-20">
      {/* Right: Form only, image removed */}
      <div className="p-8 flex flex-col justify-center">
        <h2 className="text-3xl font-bold mb-4 text-deep-blue">Send us a Query</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-blue"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-blue"
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
            className="w-full bg-sky-blue text-white font-semibold py-3 rounded-lg hover:bg-sky-blue/90 transition-colors"
            disabled={status === 'loading'}
          >
            {status === 'loading' ? 'Sending...' : 'Send Message'}
          </button>
          {status === 'success' && <p className="text-green-600">Message sent successfully!</p>}
          {status === 'error' && <p className="text-red-600">{error}</p>}
        </form>
      </div>
    </div>
  );
}
