export const getDateObjectFromTimeString = (s: string) => {
  return new Date(1, 1, 1, parseInt(s.split(':')[0]) - 1, parseInt(s.split(':')[1]));
}

export const getDayOfWeek = (date: Date) => {
  return date.getDay() == 0 ? 6 : date.getDay() - 1;
}

export const getStringTimeValue = (date: Date): string => {
  const hPrefix = date.getHours() < 10 ? '0' : '';
  const mPrefix = date.getMinutes() < 10 ? '0' : '';
  return `${hPrefix}${date.getHours()}:${mPrefix}${date.getMinutes()}`;
}

export const getInputDateFromString = (date: Date | null) => (date ?
  `${date.getFullYear()}-${date.getMonth() < 10 ? '0' : ''}${date.getMonth()}-${date.getDate() < 10 ? '0' : ''}${date.getDate()}` : ''
);

export const areDatesEqual = (date1: Date, date2: Date) => (
  date1.getDate() === date2.getDate() && date1.getMonth() === date2.getMonth() && date1.getFullYear() === date2.getFullYear()
)