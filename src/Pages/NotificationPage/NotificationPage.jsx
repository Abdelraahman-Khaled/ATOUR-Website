import './NotificationPage.css';
import { useLanguage } from '../../Components/Languages/LanguageContext';
import notificationTranslations from '../../translations/notificationTranslations';
import ContainerMedia from 'Components/ContainerMedia/ContainerMedia';
import { useState, useEffect } from 'react';
import { useHome } from '../../context/HomeContext';
import { getNotifications, markNotificationAsRead } from '../../api/notificationApi';
const NotificationSkeleton = () => (
  <div className="notification-item skeleton-item" style={{ pointerEvents: 'none' }}>
    <div className="notification-content">
      <div className="skeleton-line skeleton-title" />
      <div className="skeleton-line skeleton-msg-long" />
      <div className="skeleton-line skeleton-msg-short" />
    </div>
    <div className="skeleton-line skeleton-time" />
  </div>
);

const NotificationPage = () => {
  const { currentLanguage } = useLanguage();
  const { setNotificationCount } = useHome();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedNotifications, setExpandedNotifications] = useState({});

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const data = await getNotifications(currentLanguage);
        setNotifications(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [currentLanguage]);

  const toggleExpand = (id) => {
    setExpandedNotifications(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const markAsRead = async (id) => {
    try {
      await markNotificationAsRead(id);
      setNotifications(prevNotifications =>
        prevNotifications.map(notif =>
          notif.id === id ? { ...notif, is_read: 1 } : notif
        )
      );
      setNotificationCount(prevCount => Math.max(0, prevCount - 1));
    } catch (err) {
      console.error("Error marking notification as read:", err);
    }
  };

  const handleNotificationInteraction = (notification) => {
    if (notification.is_read === 0) {
      markAsRead(notification.id);
    }
  };

  const CHARACTER_LIMIT = 100; // Define character limit for truncation

  if (loading) {
    return (
      <ContainerMedia>
        <div className="notification-page-container">
          <div className="notification-page">
            <div className="notifications-list">
              {Array.from({ length: 5 }).map((_, i) => (
                <NotificationSkeleton key={i} />
              ))}
            </div>
          </div>
        </div>
      </ContainerMedia>
    );
  }

  if (error) {
    return <ContainerMedia><p>Error loading notifications: {error.message}</p></ContainerMedia>;
  }

  return (
    <ContainerMedia>
      <div className="notification-page-container">
        <div className="notification-page">
          <h1 className='mb-4'>{notificationTranslations[currentLanguage].notificationPage}</h1>
          <div className="notifications-list">
            {notifications.length > 0 ? (
              notifications.map(notification => {
                const fullMessage = notificationTranslations[currentLanguage][notification.messageKey] || notification.message;
                const isExpanded = expandedNotifications[notification.id];
                const isLong = fullMessage && fullMessage.length > CHARACTER_LIMIT;
                const displayMessage = isLong && !isExpanded
                  ? `${fullMessage.substring(0, CHARACTER_LIMIT)}...`
                  : fullMessage;

                return (
                  <div
                    key={notification.id}
                    className={`notification-item ${notification.is_read === 0 ? 'unread' : ''}`}
                    onClick={() => handleNotificationInteraction(notification)}
                  >
                    <div className="notification-content">
                      <h2 className="notification-title">{notification.title}</h2>
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
                    <span className="notification-time">{new Date(notification.created_at).toLocaleString()}</span>
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