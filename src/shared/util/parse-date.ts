export function parseDateToString(date: Date) {
  const fullYear = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${fullYear}년 ${month}월 ${day}일`;
}
