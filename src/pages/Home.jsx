import Navigation from '../components/Navigation';
import Hero from '../components/Hero';
import Features from '../components/Features';
import CalculatorCTA from '../components/CalculatorCTA';
import HowItWorks from '../components/HowItWorks';
import Pricing from '../components/Pricing';
import Testimonials from '../components/Testimonials';
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import useScrollReveal from '../hooks/useScrollReveal';

const Home = () => {
  useScrollReveal();

  return (
    <>
      <SEO />
      <Navigation />
      <Hero />
      <Features />
      <CalculatorCTA />
      <HowItWorks />
      <Pricing />
      <Testimonials />
      <FAQ />
      <Footer />
    </>
  );
};

export default Home;
