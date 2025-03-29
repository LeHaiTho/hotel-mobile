export const formatDate = (
  dateString: string,
  weekDay: boolean = false,
): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('vi-VN', {
    month: 'short',
    day: '2-digit',
    weekday: weekDay ? 'short' : undefined,
  });
};

export const API_URL = 'http://192.168.1.5:5000';
