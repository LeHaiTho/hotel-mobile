export const API_URL = 'http://192.168.101.115:5000';

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

// rating.ts
export const OVERALL_SCORES = Array.from({length: 10}, (_, i) => ({
  id: i + 1,
  score: i + 1,
  name: i < 3 ? 'Không hài lòng' : i < 6 ? 'Bình thường' : 'Rất hài lòng',
  icon:
    i < 3
      ? 'sentiment-very-dissatisfied'
      : i < 6
      ? 'sentiment-satisfied-alt'
      : 'sentiment-very-satisfied',
}));

export const STAFF_SCORES = [
  {
    id: 1,
    name: 'Không hài lòng',
    icon: 'sentiment-very-dissatisfied',
    library: 'MaterialIcons',
    score: 1,
  },
  {
    id: 2,
    name: 'Bình thường',
    icon: 'sentiment-satisfied-alt',
    library: 'MaterialIcons',
    score: 2,
  },
  {
    id: 3,
    name: 'Tốt',
    icon: 'sentiment-satisfied-alt',
    library: 'MaterialIcons',
    score: 3,
  },
  {
    id: 4,
    name: 'Rất tốt',
    icon: 'sentiment-very-satisfied',
    library: 'MaterialIcons',
    score: 4,
  },
];

export const FACILITY_SCORES = [...STAFF_SCORES];
export const MONEY_SCORES = [...STAFF_SCORES];
export const COMFORTABLE_SCORES = [...STAFF_SCORES];
export const LOCATION_SCORES = [...STAFF_SCORES];
export const CLEAN_SCORES = [...STAFF_SCORES];
