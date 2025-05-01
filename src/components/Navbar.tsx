
import React from 'react';
import { Button } from "@/components/ui/button";
import Logo from './Logo';
import { Menu } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <nav className="py-4 border-b border-gray-100">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center">
          <Logo />
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="space-x-6">
              <a href="#features" className="text-gray-600 hover:text-primary-600 transition-colors">Features</a>
              <a href="#how-it-works" className="text-gray-600 hover:text-primary-600 transition-colors">How It Works</a>
              <a href="#pricing" className="text-gray-600 hover:text-primary-600 transition-colors">Pricing</a>
              <a href="#faq" className="text-gray-600 hover:text-primary-600 transition-colors">FAQ</a>
            </div>
            <div className="space-x-4">
              <Button variant="outline">Log In</Button>
              <Button className="bg-gradient-primary hover:opacity-90 transition-opacity">Get Early Access</Button>
            </div>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)} 
            className="md:hidden text-gray-600 focus:outline-none"
          >
            <Menu size={24} />
          </button>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pt-4 pb-2 space-y-3 animate-fade-in">
            <a href="#features" className="block py-2 text-gray-600 hover:text-primary-600">Features</a>
            <a href="#how-it-works" className="block py-2 text-gray-600 hover:text-primary-600">How It Works</a>
            <a href="#pricing" className="block py-2 text-gray-600 hover:text-primary-600">Pricing</a>
            <a href="#faq" className="block py-2 text-gray-600 hover:text-primary-600">FAQ</a>
            <div className="pt-3 space-y-3">
              <Button variant="outline" className="w-full">Log In</Button>
              <Button className="w-full bg-gradient-primary hover:opacity-90 transition-opacity">
                Get Early Access
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
