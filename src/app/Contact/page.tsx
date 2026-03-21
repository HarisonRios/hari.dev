import type { Metadata } from 'next';
import Background from '@/components/Background';
import NavigationMenuDemo from '@/components/NavigationMenuDemo';
import { LanguageToggle } from '@/components/LanguageToggle';
import { Footer } from '@/components/Footer';
import { ContactForm } from '@/components/ContactForm';
import { PageTransition } from '@/components/PageTransition';

export const metadata: Metadata = {
  title: 'Contact — Harison Rios',
  description: 'Get in touch with Harison Rios — FullStack Developer from São Paulo. Send a message or connect via LinkedIn.',
  openGraph: {
    title: 'Contact — Harison Rios',
    description: 'Get in touch with Harison Rios — FullStack Developer from São Paulo.',
  },
};

export default function Contact() {
  return (
    <main className="min-h-screen relative font-poppins">
      <Background />
      <LanguageToggle />
      
      <div className="fixed top-6 md:top-10 lg:top-16 left-1/2 transform -translate-x-1/2 z-50">
        <div className="bg-slate-900/90 px-6 md:px-8 py-2 md:py-3 rounded-md shadow-lg ring-1 ring-white/10">
          <NavigationMenuDemo />
        </div>
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4 md:p-6">
        <div className="w-full max-w-2xl mt-20 md:mt-28">
          <PageTransition>
            <ContactForm />
          </PageTransition>
        </div>
      </div>

      <div className="relative z-10 w-full mt-12">
        <Footer />
      </div>
    </main>
  );
}
