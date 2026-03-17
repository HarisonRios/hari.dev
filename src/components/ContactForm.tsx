'use client';

import { useState, useEffect } from 'react';
import { Mail, User, MessageSquare } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { useLanguage } from '@/context/LanguageContext';

export const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { language } = useLanguage();

  const copy = {
    en: {
      title: 'Contact Us',
      subtitle: 'Have a question or want to work together? Get in touch!',
      name: 'Name',
      namePlaceholder: 'Your name',
      email: 'Email',
      emailPlaceholder: 'your@email.com',
      message: 'Message',
      messagePlaceholder: 'Your message here...',
      sending: 'Sending...',
      send: 'Send Message',
      error: 'Failed to send message. Please try again.',
      success: 'Thank you! Your message has been sent.',
      otherWays: 'Other ways to reach me',
      linkedin: 'LinkedIn',
    },
    pt: {
      title: 'Contato',
      subtitle: 'Tem uma pergunta ou quer trabalhar comigo? Me chama!',
      name: 'Nome',
      namePlaceholder: 'Seu nome',
      email: 'Email',
      emailPlaceholder: 'seu@email.com',
      message: 'Mensagem',
      messagePlaceholder: 'Escreva sua mensagem...',
      sending: 'Enviando...',
      send: 'Enviar mensagem',
      error: 'Falha ao enviar mensagem. Tente novamente.',
      success: 'Obrigado! Sua mensagem foi enviada.',
      otherWays: 'Outras formas de contato',
      linkedin: 'LinkedIn',
    },
  } as const;

  const t = copy[language];

  useEffect(() => {
    emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || '');
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '',
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '',
        {
          to_email: 'hharison562@gmail.com',
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        }
      );

      setFormData({ name: '', email: '', message: '' });
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
    } catch (err) {
      console.error('Error sending email:', err);
      setError('send_error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{t.title}</h1>
        <p className="text-gray-400 text-lg">{t.subtitle}</p>
      </div>

      <div className="bg-slate-800/30 border border-slate-700/30 rounded-lg p-8 shadow-xl backdrop-blur-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
              <div className="flex items-center gap-2">
                <User size={16} />
                {t.name}
              </div>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder={t.namePlaceholder}
              className="w-full px-4 py-2 bg-slate-900/50 border border-slate-700/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/20 transition-colors"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
              <div className="flex items-center gap-2">
                <Mail size={16} />
                {t.email}
              </div>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder={t.emailPlaceholder}
              className="w-full px-4 py-2 bg-slate-900/50 border border-slate-700/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/20 transition-colors"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
              <div className="flex items-center gap-2">
                <MessageSquare size={16} />
                {t.message}
              </div>
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              placeholder={t.messagePlaceholder}
              rows={5}
              className="w-full px-4 py-2 bg-slate-900/50 border border-slate-700/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/20 transition-colors resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full px-6 py-3 bg-purple-500 text-white font-semibold rounded-lg hover:bg-purple-600 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? t.sending : t.send}
          </button>

          {error && (
            <div className="p-4 bg-red-900/20 border border-red-700/50 rounded-lg">
              <p className="text-red-400 text-sm text-center">{t.error}</p>
            </div>
          )}

          {submitted && (
            <div className="p-4 bg-green-900/20 border border-green-700/50 rounded-lg">
              <p className="text-green-400 text-sm text-center">{t.success}</p>
            </div>
          )}
        </form>

        <div className="mt-12 pt-8 border-t border-slate-700/30">
          <h2 className="text-lg font-semibold text-white mb-6">{t.otherWays}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <a
              href="mailto:hharison562@gmail.com"
              className="p-4 bg-slate-900/30 border border-slate-700/30 rounded-lg hover:border-purple-500/50 transition-colors text-center"
            >
              <Mail className="w-6 h-6 text-purple-400 mx-auto mb-2" />
              <p className="text-sm text-gray-300">{t.email}</p>
              <p className="text-xs text-gray-500 mt-1 break-all">hharison562@gmail.com</p>
            </a>

            <a
              href="https://linkedin.com/in/harisonrios"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 bg-slate-900/30 border border-slate-700/30 rounded-lg hover:border-purple-500/50 transition-colors text-center"
            >
              <svg className="w-6 h-6 text-purple-400 mx-auto mb-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.475-2.236-1.986-2.236-1.081 0-1.722.731-2.004 1.439-.103.25-.129.599-.129.949v5.417h-3.554s.05-8.746 0-9.637h3.554v1.364c.429-.662 1.196-1.608 2.905-1.608 2.124 0 3.714 1.383 3.714 4.357v5.524zM5.337 9.433c-1.144 0-1.915-.758-1.915-1.704 0-.951.77-1.707 1.879-1.707 1.11 0 1.914.756 1.938 1.704 0 .946-.828 1.707-1.902 1.707zm1.581 10.019H3.656V9.816h3.262v9.636zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
              </svg>
              <p className="text-sm text-gray-300">{t.linkedin}</p>
              <p className="text-xs text-gray-500 mt-1">harisonrios</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
