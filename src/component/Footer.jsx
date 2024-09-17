import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-[#3bb77e]">
      <section className="py-12">
        <div className="max-w-8xl mx-auto px-4 2xl:px-0">
          <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-[320px_auto_auto_auto_auto_auto] gap-4">
            <div className="p-2 animate__animated animate__fadeIn animate__delay-0s opacity-100">
              <Link to="/">
                <h1 className="text-green-600 font-extrabold text-2xl">ShoppyGlobe</h1>
              </Link>
              <p className="font-semibold text-[17px] text-[#253d4e]">
                Awesome grocery store website template
              </p>
              <ul className="mt-8">
                <li className="flex gap-x-2 items-start py-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                    className="w-10 text-primary"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                    ></path>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                    ></path>
                  </svg>
                  <div>
                    <strong className="mr-2">Address: </strong>
                    5171W Campbell Ave Kent, Utah 53127 United States
                  </div>
                </li>
                <li className="flex gap-x-2 items-start py-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-5 text-primary"
                  >
                    <path d="M3 18v-6a9 9 0 0 1 18 0v6"></path>
                    <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path>
                  </svg>
                  <div>
                    <strong>Call Us: </strong>(+880) - 017XXXXXXX
                  </div>
                </li>
                <li className="flex gap-x-2 items-start py-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                    className="w-5 text-primary"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                    ></path>
                  </svg>
                  <div>
                    <strong>Mail Us: </strong>contact@example.com
                  </div>
                </li>
              </ul>
            </div>
            <div className="text-center py-4">
              <h3 className="text-lg font-semibold text-[#253d4e] mb-4">
                Quick Links
              </h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-primary hover:underline">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#" className="text-primary hover:underline">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-primary hover:underline">
                    Services
                  </a>
                </li>
                <li>
                  <a href="#" className="text-primary hover:underline">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div className="text-center py-4">
              <h3 className="text-lg font-semibold text-[#253d4e] mb-4">
                Follow Us
              </h3>
              <ul className="flex gap-4 justify-center">
                <li>
                  <a href="#" className="text-primary hover:text-[#1DA1F2]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M7.018 12.405a4.9 4.9 0 011.303-.68A4.88 4.88 0 0112 11a4.88 4.88 0 012.679.748 4.9 4.9 0 011.303.68M12 14.5v-1.08a2.627 2.627 0 01-.78-.217A2.623 2.623 0 019.5 11v-.705A2.623 2.623 0 0112 8.5v-1a2.5 2.5 0 00-2.5-2.5v-1h-1v1a1.5 1.5 0 00-1.5 1.5v1a2.5 2.5 0 00-2.5 2.5v.705a2.623 2.623 0 011.82 2.48v.78M12 15v2.5a1.5 1.5 0 01-1.5 1.5v-2.5a2.623 2.623 0 01-.82-2.48v-.78M6 21h12v-2H6v2z"
                      ></path>
                    </svg>
                  </a>
                </li>
                <li>
                  <a href="#" className="text-primary hover:text-[#1877F2]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M18.996 9.5A8.497 8.497 0 004 16.5V19h6v-4.5H6v-2h4.5V7.5a3 3 0 013-3h3v2h-2a1 1 0 00-1 1v3h3.5l-.5 2.5H13V19h6v-2.5a8.497 8.497 0 00-1.004-7z"
                      ></path>
                    </svg>
                  </a>
                </li>
                <li>
                  <a href="#" className="text-primary hover:text-[#25D366]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M7.07 4.93a6.965 6.965 0 00-2.051 4.59c0 1.52.51 2.92 1.383 4.057a.56.56 0 00.087.092c.15.139.31.276.492.394l.104.073c.054.037.107.076.163.116a8.952 8.952 0 002.02 1.23c.434.157.89.24 1.36.24 1.79 0 3.45-.776 4.59-2.078a1.99 1.99 0 00.144-.09c.346-.244.634-.546.877-.872a6.994 6.994 0 001.385-4.591 7 7 0 00-1.907-4.773 7.003 7.003 0 00-4.773-1.907z"
                      ></path>
                    </svg>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
