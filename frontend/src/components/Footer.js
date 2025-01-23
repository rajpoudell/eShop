import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="text-gray-600 bg-gray-200 body-font border-t-2 border-slate-400 shadow-md">
      <div className="container px-5 py-24 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
        <div className="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left md:mt-0 mt-10">
          <Link className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
            <span className="font-bold text-xl">eShop</span>
          </Link>
          <p className="mt-2 text-sm text-gray-500">
            Your one-stop shop for everything you need online.
          </p>
        </div>
        <div className="flex-grow flex flex-wrap md:pr-20 -mb-10 md:text-left text-center order-first">
          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">
              PRODUCT CATEGORIES
            </h2>
            <nav className="list-none mb-10">
              <li>
                <Link className="text-gray-600 hover:text-gray-800">
                  Electronics
                </Link>
              </li>
              <li>
                <Link className="text-gray-600 hover:text-gray-800">
                  Clothing
                </Link>
              </li>
              <li>
                <Link className="text-gray-600 hover:text-gray-800">
                  Home Goods
                </Link>
              </li>
              <li>
                <Link className="text-gray-600 hover:text-gray-800">
                  Sports Equipment
                </Link>
              </li>
            </nav>
          </div>
          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <h2 className="title-font font-medium  tracking-widest text-sm mb-3">
              <Link
                to="/customer-service"
                className="text-gray-900 hover:text-gray-800"
              >
                CUSTOMER SERVICE
              </Link>
            </h2>
            <nav className="list-none mb-10">
              <li>
                <Link
                  to="/customer-service#help-center"
                  className="text-gray-600 hover:text-gray-800"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  to="/customer-service#track-order"
                  className="text-gray-600 hover:text-gray-800"
                >
                  Track Order
                </Link>
              </li>
              <li>
                <Link
                  to="/customer-service#returns-exchanges"
                  className="text-gray-600 hover:text-gray-800"
                >
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link
                  to="/customer-service#shipping-info"
                  className="text-gray-600 hover:text-gray-800"
                >
                  Shipping Information
                </Link>
              </li>
            </nav>
          </div>
          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">
              ABOUT US
            </h2>
            <nav className="list-none mb-10">
              <li>
                <Link className="text-gray-600 hover:text-gray-800">
                  Our Story
                </Link>
              </li>
              <li>
                <Link className="text-gray-600 hover:text-gray-800">
                  Careers
                </Link>
              </li>
              <li>
                <Link className="text-gray-600 hover:text-gray-800">Press</Link>
              </li>
              <li>
                <Link className="text-gray-600 hover:text-gray-800">
                  Privacy Policy
                </Link>
              </li>
            </nav>
          </div>
          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">
              CONNECT WITH US
            </h2>
            <nav className="list-none mb-10">
              <li>
                <Link className="text-gray-600 hover:text-gray-800">
                  Facebook
                </Link>
              </li>
              <li>
                <Link className="text-gray-600 hover:text-gray-800">
                  Instagram
                </Link>
              </li>
              <li>
                <Link className="text-gray-600 hover:text-gray-800">
                  Twitter
                </Link>
              </li>
              <li>
                <Link className="text-gray-600 hover:text-gray-800">
                  LinkedIn
                </Link>
              </li>
            </nav>
          </div>
        </div>
      </div>
      <div className="bg-gray-100">
        <div className="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
          <p className="text-gray-500 text-sm text-center sm:text-left">
            © 2025 eShop —
            <Link
              href="https://twitter.com/eshop"
              rel="noopener noreferrer"
              className="text-gray-600 ml-1"
              target="_blank"
            >
              @eshop
            </Link>
          </p>
          <span className="inline-flex sm:ml-auto sm:mt-0 mt-2 justify-center sm:justify-start">
            <Link className="text-gray-500">
              <svg
                fill="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-5 h-5"
                viewBox="0 0 24 24"
              >
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
              </svg>
            </Link>
            <Link className="ml-3 text-gray-500">
              <svg
                fill="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-5 h-5"
                viewBox="0 0 24 24"
              >
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
              </svg>
            </Link>
            <Link className="ml-3 text-gray-500">
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-5 h-5"
                viewBox="0 0 24 24"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
              </svg>
            </Link>
            <Link className="ml-3 text-gray-500">
              <svg
                fill="currentColor"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="0"
                className="w-5 h-5"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="none"
                  d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"
                ></path>
                <circle cx="4" cy="4" r="2" stroke="none"></circle>
              </svg>
            </Link>
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
