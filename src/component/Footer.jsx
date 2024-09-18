import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faPhoneAlt, faEnvelope, faClock } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className="bg-white text-gray-700">
      <section className="bg-white border-t border-b border-[#3bb77e] py-12">
        <div className="w-[85%] mx-auto px-4 2xl:px-0">
          <div className="flex flex-wrap justify-around gap-8">

            {/* About Section */}
            <div className="flex-1 min-w-[250px] md:min-w-[300px] p-6">
              <Link to="/" className="mb-4 block">
                <h1 className="text-green-600 font-extrabold text-2xl">ShoppyGlobe</h1>
              </Link>
              <p className="font-semibold text-[17px] text-[#253d4e] mb-6">Awesome grocery store website template</p>
              <ul className="space-y-4 text-sm text-[#253d4e]">
                <li className="flex items-start gap-x-3">
                  <FontAwesomeIcon icon={faMapMarkerAlt} className="w-6 text-primary rounded-full bg-green-100 p-1" />
                  <div><strong className="mr-2">Address: </strong>Ghazipur, Uttar Pradesh 233227, India</div>
                </li>
                <li className="flex items-start gap-x-3">
                  <FontAwesomeIcon icon={faPhoneAlt} className="w-6 text-primary rounded-full bg-green-100 p-1" />
                  <div><strong>Call Us: </strong>(+91) - 017XXXXXXX</div>
                </li>
                <li className="flex items-start gap-x-3">
                  <FontAwesomeIcon icon={faEnvelope} className="w-6 text-primary rounded-full bg-green-100 p-1" />
                  <div><strong>Email: </strong>sale@ShoppyGlobe.com</div>
                </li>
                <li className="flex items-start gap-x-3">
                  <FontAwesomeIcon icon={faClock} className="w-6 text-primary rounded-full bg-green-100 p-1" />
                  <div><strong>Hours: </strong>10:00 - 18:00, Mon - Sat</div>
                </li>
              </ul>
            </div>

            {/* Company Section */}
            <div className="flex-1 min-w-[250px] md:min-w-[300px] p-6">
              <h3 className="text-[#253d4e] text-[24px] font-bold mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-[#253d4e]">
                <li><Link className="hover:text-primary font-medium transition-transform transform hover:scale-105" to="/about-us">About us</Link></li>
                <li><Link className="hover:text-primary font-medium transition-transform transform hover:scale-105" to="/delivery-information">Delivery Information</Link></li>
                <li><Link className="hover:text-primary font-medium transition-transform transform hover:scale-105" to="/privacy-policy">Privacy Policy</Link></li>
                <li><Link className="hover:text-primary font-medium transition-transform transform hover:scale-105" to="/terms-and-conditions">Terms & Conditions</Link></li>
                <li><Link className="hover:text-primary font-medium transition-transform transform hover:scale-105" to="/contact-us">Contact Us</Link></li>
                <li><Link className="hover:text-primary font-medium transition-transform transform hover:scale-105" to="/support-center">Support Center</Link></li>
                <li><Link className="hover:text-primary font-medium transition-transform transform hover:scale-105" to="/careers">Careers</Link></li>
              </ul>
            </div>

            {/* Account Section */}
            <div className="flex-1 min-w-[250px] md:min-w-[300px] p-6">
              <h3 className="text-[#253d4e] text-[24px] font-bold mb-4">Account</h3>
              <ul className="space-y-2 text-sm text-[#253d4e]">
                <li><Link className="hover:text-primary font-medium transition-transform transform hover:scale-105" to="/signin">Sign In</Link></li>
                <li><Link className="hover:text-primary font-medium transition-transform transform hover:scale-105" to="/view-cart">View Cart</Link></li>
                <li><Link className="hover:text-primary font-medium transition-transform transform hover:scale-105" to="/my-wishlist">My Wishlist</Link></li>
                <li><Link className="hover:text-primary font-medium transition-transform transform hover:scale-105" to="/track-my-order">Track My Order</Link></li>
                <li><Link className="hover:text-primary font-medium transition-transform transform hover:scale-105" to="/help-ticket">Help Ticket</Link></li>
                <li><Link className="hover:text-primary font-medium transition-transform transform hover:scale-105" to="/shipping-details">Shipping Details</Link></li>
                <li><Link className="hover:text-primary font-medium transition-transform transform hover:scale-105" to="/compare-products">Compare Products</Link></li>
              </ul>
            </div>

            {/* Corporate Section */}
            <div className="flex-1 min-w-[250px] md:min-w-[300px] p-6">
              <h3 className="text-[#253d4e] text-[24px] font-bold mb-4">Corporate</h3>
              <ul className="space-y-2 text-sm text-[#253d4e]">
                <li><Link className="hover:text-primary font-medium transition-transform transform hover:scale-105" to="/become-a-vendor">Become a Vendor</Link></li>
                <li><Link className="hover:text-primary font-medium transition-transform transform hover:scale-105" to="/affiliate-program">Affiliate Program</Link></li>
                <li><Link className="hover:text-primary font-medium transition-transform transform hover:scale-105" to="/farm-business">Farm Business</Link></li>
                <li><Link className="hover:text-primary font-medium transition-transform transform hover:scale-105" to="/farm-careers">Farm Careers</Link></li>
                <li><Link className="hover:text-primary font-medium transition-transform transform hover:scale-105" to="/our-suppliers">Our Suppliers</Link></li>
                <li><Link className="hover:text-primary font-medium transition-transform transform hover:scale-105" to="/company-details">Company Details</Link></li>
              </ul>
            </div>

            {/* Install App Section */}
            <div className="flex-1 max-w-[258px] 2xl:max-w-[286px] p-6">
              <h3 className="text-[24px] text-[#253d4e] font-bold mb-4">Install App</h3>
              <p className="text-sm font-medium text-gray-600 text-center mb-6">From App Store or Google Play</p>
              <div className="flex gap-4 justify-center mb-6">
                <Link className="transition-transform transform hover:scale-105" to="/play-store">
                  <img src="/src/assets/google-play.jpg" alt="Google Play Store" className="w-24 h-8" />
                </Link>
                <Link className="transition-transform transform hover:scale-105" to="/app-for-ios">
                  <img src="/src/assets/app-store.jpg" alt="App Store" className="w-24 h-8" />
                </Link>
              </div>
              <p className="text-sm font-medium text-gray-600 text-center mb-4">Secured Payment Gateway</p>
              <img className="w-3/4 mx-auto transition-transform transform hover:scale-105" src="/src/assets/payment-method.png" alt="Payment Methods" />
            </div>

          </div>
        </div>
      </section>

      <section className="bg-white py-8 text-gray-800">
        <div className="max-w-8xl mx-auto px-4 2xl:px-0 flex flex-col items-center justify-center">
          <div className="flex gap-x-6 mb-4">
            <Link
              to="https://facebook.com"
              className="bg-green-600 p-4 rounded-full text-white hover:bg-green-700 transition-colors duration-300 flex items-center justify-center"
            >
              <FontAwesomeIcon icon={faFacebook} className="w-6 h-6" />
            </Link>
            <Link
              to="https://twitter.com"
              className="bg-green-600 p-4 rounded-full text-white hover:bg-green-700 transition-colors duration-300 flex items-center justify-center"
            >
              <FontAwesomeIcon icon={faTwitter} className="w-6 h-6" />
            </Link>
            <Link
              to="https://instagram.com"
              className="bg-green-600 p-4 rounded-full text-white hover:bg-green-700 transition-colors duration-300 flex items-center justify-center"
            >
              <FontAwesomeIcon icon={faInstagram} className="w-6 h-6" />
            </Link>
          </div>
          <p className="text-sm text-gray-600">&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
