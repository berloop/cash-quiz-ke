import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-transparent text-white/20 py-4 text-center font-bold bottom-0 left-0 w-full">
      &copy; {new Date().getFullYear()} CashQuiz. | All rights reserved.
    </footer>
  );
};

export default Footer;
