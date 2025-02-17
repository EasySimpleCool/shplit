import React from 'react';
import PropTypes from 'prop-types';

const Header = ({ onInfoClick }) => (
  <div className="mb-4 relative">
    <button
      onClick={onInfoClick}
      className="absolute left-0 top-0 text-white hover:text-gray-200 focus:outline-none"
      aria-label="Toggle information"
    >
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
      </svg>
    </button>
    <div className="flex justify-center mb-2">
      <img 
        src="/AppIcon.svg"
        alt="Shplit Logo"
        className="w-20 h-20"
      />
    </div>
    <div className="flex items-center justify-center">
      <h1 className="header">shplit.money</h1>
    </div>
  </div>
);

Header.propTypes = {
  onInfoClick: PropTypes.func.isRequired
};

export default Header;