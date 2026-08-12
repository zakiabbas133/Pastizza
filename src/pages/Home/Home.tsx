import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from '@/components/Hero/Hero';
import OverviewStory from '@/components/OverviewStory/OverviewStory';
import Reviews from '@/components/Reviews/Reviews';
import Gallery from '@/components/Gallery/Gallery';
import About from '@/components/About/About';
import Owner from '@/components/Owner/Owner';
import Location from '@/components/Location/Location';
import ContactForm from '@/components/ContactForm/ContactForm';
import Menu from '@/components/Menu/Menu';

export default function Home() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const timer = setTimeout(() => {
        const id = location.hash.replace('#', '');
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [location.hash]);

  return (
    <>
      <Hero />
      <OverviewStory />
      <Menu />
      <Reviews />
      <Gallery />
      <About />
      <Owner />
      <Location />
      <ContactForm />
    </>
  );
}
