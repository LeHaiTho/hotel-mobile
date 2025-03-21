export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('vi-VN', {
    month: 'short',
    day: '2-digit',
    weekday: 'short',
  });
};
