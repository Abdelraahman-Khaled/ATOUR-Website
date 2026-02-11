import React from 'react';
import { useFooter } from '../../context/FooterContext';
import './WhatsAppButton.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';

const WhatsAppButton = () => {
    const { footerData } = useFooter();

    if (!footerData?.whatsapp) {
        return null;
    }

    return (
        <div className="whatsapp-button-container">
            <a
                href={`https://wa.me/${footerData.whatsapp}`}
                className="whatsapp-btn"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat on WhatsApp"
            >
                <FontAwesomeIcon icon={faWhatsapp} />
            </a>
        </div>
    );
};

export default WhatsAppButton;
