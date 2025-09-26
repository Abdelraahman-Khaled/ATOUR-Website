import React from 'react';
import './NotificationPage.css';
import { useLanguage } from '../../Components/Languages/LanguageContext';
import notificationTranslations from '../../translations/notificationTranslations';

const NotificationPage = () => {
  const { currentLanguage } = useLanguage();

  const notifications = [
    { id: 1, messageKey: 'yourBookingConfirmed', time: '2 hours ago' },
    { id: 2, messageKey: 'newOfferAvailable', time: '1 day ago' },
    { id: 3, messageKey: 'yourReviewPublished', time: '3 days ago' },
  ];

  return (
    <div className="notification-page">
      <h1>{notificationTranslations[currentLanguage].notificationPage}</h1>
      <div className="notifications-list">
        {notifications.length > 0 ? (
          notifications.map(notification => (
            <div key={notification.id} className="notification-item">
              <p className="notification-message">{notificationTranslations[currentLanguage][notification.messageKey]}</p>
              <span className="notification-time">{notification.time}</span>
            </div>
          ))
        ) : (
          <p>{notificationTranslations[currentLanguage].noNewNotifications}</p>
        )}
      </div>
    </div>
  );
};

export default NotificationPage;