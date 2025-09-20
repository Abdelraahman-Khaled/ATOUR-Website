import { timeAgoTranslations } from "./timeAgoTranslations";

export function formatTimeAgo(dateString, lang = "en") {
  const translations = timeAgoTranslations[lang] || timeAgoTranslations["en"];
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (seconds < 60) return translations.seconds;
  const minutes = Math.floor(seconds / 60);
  if (minutes === 1) return translations.minute;
  if (minutes < 60) return translations.minutes(minutes);

  const hours = Math.floor(minutes / 60);
  if (hours === 1) return translations.hour;
  if (hours < 24) return translations.hours(hours);

  const days = Math.floor(hours / 24);
  if (days === 1) return translations.day;
  return translations.days(days);
}
