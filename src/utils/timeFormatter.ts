export default function formatTime(dateTimeString: string) {
  if (!dateTimeString) {
    return '';
  }
  const date = new Date(dateTimeString);
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    timeZone: 'Europe/Moscow',
  };
  return date.toLocaleString('ru-RU', options);
}
