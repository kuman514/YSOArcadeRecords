export function parseDateToString(date: Date) {
  const shiftedDate = new Date(date.getTime() + 9 * 60 * 60 * 1000);
  const fullYear = shiftedDate.getFullYear();
  const month = shiftedDate.getMonth() + 1;
  const day = shiftedDate.getDate();

  return `${fullYear}년 ${month}월 ${day}일 (대한민국 기준)`;
}

export function parseDateToDatabaseString(date: Date, timeZone?: `+${number}`) {
  const fullYear = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours().toString().padStart(2, '0');
  const minute = date.getMinutes().toString().padStart(2, '0');
  const second = date.getSeconds().toString().padStart(2, '0');
  const millisecond = date.getMilliseconds().toString().padStart(3, '0');

  return `${fullYear}-${month}-${day} ${hour}:${minute}:${second}.${millisecond}${timeZone ?? '+0900'}`;
}
