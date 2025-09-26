import './NotificationPage.css';
import { useLanguage } from '../../Components/Languages/LanguageContext';
import notificationTranslations from '../../translations/notificationTranslations';
import ContainerMedia from 'Components/ContainerMedia/ContainerMedia';
import  { useState } from 'react';

const NotificationPage = () => {
  const { currentLanguage } = useLanguage();
  const [expandedNotifications, setExpandedNotifications] = useState({});

  const toggleExpand = (id) => {
    setExpandedNotifications(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const notifications = [
    { id: 1, messageKey: 'yourBookingConfirmed', time: '2 hours ago' },
    { id: 2, messageKey: 'newOfferAvailable', time: '1 day ago' },
    { id: 3, messageKey: 'yourReviewPublished', time: '3 days ago' },
    { id: 4, messageKey: 'longNotificationExample', time: '5 days ago' }, // Add a long notification example
  ];

  const CHARACTER_LIMIT = 100; // Define character limit for truncation

  return (
    <ContainerMedia>
      <div className="notification-page-container">
        <div className="notification-page">
          <h1 className='mb-4'>{notificationTranslations[currentLanguage].notificationPage}</h1>
          <div className="notifications-list">
            {notifications.length > 0 ? (
              notifications.map(notification => {
                const fullMessage = notificationTranslations[currentLanguage][notification.messageKey];
                const isExpanded = expandedNotifications[notification.id];
                const isLong = fullMessage && fullMessage.length > CHARACTER_LIMIT;
                const displayMessage = isLong && !isExpanded
                  ? `${fullMessage.substring(0, CHARACTER_LIMIT)}...`
                  : fullMessage;

                return (
                  <div key={notification.id} className="notification-item">
                    <div className="notification-content">
                      <p className="notification-message">{displayMessage}</p>
                      {isLong && (
                        <button
                          className="read-more-button"
                          onClick={() => toggleExpand(notification.id)}
                        >
                          {isExpanded ? 'Read Less' : 'Read More'}
                        </button>
                      )}
                    </div>
                    <span className="notification-time">{notification.time}</span>
                  </div>
                );
              })
            ) : (
              <p>{notificationTranslations[currentLanguage].noNewNotifications}</p>
            )}
          </div>
        </div>
      </div>
    </ContainerMedia>
  );
};

export default NotificationPage;