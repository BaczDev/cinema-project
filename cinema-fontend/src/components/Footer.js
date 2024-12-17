import React from 'react';

const Footer = () => {
    return (
      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          {/* Logo */}
          <div className="text-xl font-bold mb-4 md:mb-0">
            Bacz Cinema
          </div>
  
          {/* Contact Information */}
          <div className="text-sm text-center md:text-left">
            <p>Thông tin liên hệ:</p>
            <p>Email: bacnguyen3476@gmail.com</p>
            <p>SĐT: 0335497645</p>
          </div>
        </div>
        
        {/* Footer Bottom */}
        <div className="text-center text-xs mt-4">
          <p>&copy; 2024 Bacz Company. All rights reserved.</p>
        </div>
      </footer>
    );
  };
  

export default Footer;
