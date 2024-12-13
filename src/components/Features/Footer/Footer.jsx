import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Truck, 
  CreditCard, 
  Clock, 
  Shield, 
  Phone, 
  Mail, 
  MapPin,
  Facebook as FacebookIcon,
  Instagram as InstagramIcon,
  Youtube as YoutubeIcon
} from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Features Bar */}
      <div className="border-b border-gray-800">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="flex items-center justify-center gap-4">
              <Truck size={24} className="text-blue-400" />
              <div>
                <h4 className="font-semibold">Free Shipping</h4>
                <p className="text-sm text-gray-400">On orders over $5,000</p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-4">
              <CreditCard size={24} className="text-blue-400" />
              <div>
                <h4 className="font-semibold">Easy Payments</h4>
                <p className="text-sm text-gray-400">Up to 36 payments</p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-4">
              <Clock size={24} className="text-blue-400" />
              <div>
                <h4 className="font-semibold">Fast Service</h4>
                <p className="text-sm text-gray-400">Installation within 24h</p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-4">
              <Shield size={24} className="text-blue-400" />
              <div>
                <h4 className="font-semibold">Extended Warranty</h4>
                <p className="text-sm text-gray-400">5 years warranty</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-lg font-bold mb-4">TV Shop</h3>
            <p className="text-gray-400 mb-4">
              The leading store in Israel for TVs and electronics. We are committed to fair prices and excellent service.
            </p>
            <div className="flex gap-4">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-400 transition-colors"
              >
                <FacebookIcon size={20} />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-400 transition-colors"
              >
                <InstagramIcon size={20} />
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-400 transition-colors"
              >
                <YoutubeIcon size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-400 hover:text-blue-400">About</Link></li>
              <li><Link to="/blog" className="text-gray-400 hover:text-blue-400">Blog</Link></li>
              <li><Link to="/careers" className="text-gray-400 hover:text-blue-400">Careers</Link></li>
              <li><Link to="/ContactUs" className="text-gray-400 hover:text-blue-400">Contact</Link></li>
              <li><Link to="/terms" className="text-gray-400 hover:text-blue-400">Terms</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-bold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li><Link to="/products/oled" className="text-gray-400 hover:text-blue-400">OLED TVs</Link></li>
              <li><Link to="/products/qled" className="text-gray-400 hover:text-blue-400">QLED TVs</Link></li>
              <li><Link to="/products/led" className="text-gray-400 hover:text-blue-400">LED TVs</Link></li>
              <li><Link to="/sound-systems" className="text-gray-400 hover:text-blue-400">Sound Systems</Link></li>
              <li><Link to="/accessories" className="text-gray-400 hover:text-blue-400">Accessories</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <Phone size={20} className="text-blue-400" />
                <span className="text-gray-400">1-800-555-555</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={20} className="text-blue-400" />
                <span className="text-gray-400">info@tvshop.com</span>
              </li>
              <li className="flex items-center gap-3">
                <MapPin size={20} className="text-blue-400" />
                <span className="text-gray-400">123 Main Street, Tel Aviv</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">© 2024 TV Shop. All rights reserved.</p>
            <div className="flex items-center gap-4 mt-4 md:mt-0">
              <img src="/api/placeholder/40/25" alt="Visa" className="h-6" />
              <img src="/api/placeholder/40/25" alt="Mastercard" className="h-6" />
              <img src="/api/placeholder/40/25" alt="PayPal" className="h-6" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;