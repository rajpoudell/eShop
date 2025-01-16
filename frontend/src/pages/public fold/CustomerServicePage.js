
import React from 'react';

const CustomerServicePage = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-semibold text-center text-gray-900 mb-8">
        Customer Service
      </h1>

      {/* Help Center Section */}
      <section id="help-center" className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Help Center</h2>
        <p className="text-gray-700">
          Our Help Center provides answers to the most common questions. You can find help with account management, payment issues, product questions, and more. Visit our Help Center for detailed guides and FAQs.
        </p>
      </section>

      {/* Track Order Section */}
      <section id="track-order" className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Track Order</h2>
        <p className="text-gray-700">
          If you've made a purchase and want to track your order, you can do so by entering your order number and email address. We'll provide the most up-to-date information about your order's status.
        </p>
      </section>

      {/* Returns & Exchanges Section */}
      <section id="returns-exchanges" className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Returns & Exchanges</h2>
        <p className="text-gray-700">
          We want you to be completely satisfied with your purchase. If you're not, we offer a simple return or exchange process. Learn more about how to return or exchange products here.
        </p>
      </section>

      {/* Shipping Information Section */}
      <section id="shipping-info" className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Shipping Information</h2>
        <p className="text-gray-700">
          We offer a variety of shipping options to ensure your products arrive safely and quickly. Shipping times may vary based on your location, and we will keep you informed throughout the process.
        </p>
      </section>
    </div>
  );
};

export default CustomerServicePage;
