import React from 'react';
import PropTypes from 'prop-types';

const InfoBanner = ({ message, isVisible, onDismiss }) => {
  if (!isVisible) {
    return null;
  }

  return (
    <div className="w-full flex justify-center">
      <div className="w-full bg-white rounded-lg">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-[#007DB8]">
            <svg className="w-6 h-6 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
            </svg>
            <span>{message}</span>
          </div>
          <button
            onClick={onDismiss}
            className="text-[#007DB8] hover:text-[#006da3] focus:outline-none"
            aria-label="Close banner"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

InfoBanner.propTypes = {
  message: PropTypes.string.isRequired,
  isVisible: PropTypes.bool.isRequired,
  onDismiss: PropTypes.func.isRequired
};

export default InfoBanner;