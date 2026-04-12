export function parseDateToString(date: Date) {
  const fullYear = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${fullYear}년 ${month}월 ${day}일`;
}

export function parseDateToDatabaseString(date: Date) {
  const fullYear = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours().toString().padStart(2, '0');
  const minute = date.getMinutes().toString().padStart(2, '0');
  const second = date.getSeconds().toString().padStart(2, '0');
  const millisecond = date.getMilliseconds().toString().padStart(3, '0');

  return `${fullYear}-${month}-${day}T${hour}:${minute}:${second}.${millisecond}Z`;
}
