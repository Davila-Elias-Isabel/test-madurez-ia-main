export function getBusinessDaysBetween(start: string, end: string): number {
  const desde = new Date(start);
  const hasta = new Date(end);
  desde.setHours(0, 0, 0, 0);
  hasta.setHours(0, 0, 0, 0);
  if (hasta <= desde) return 0;
  let dias = 0;
  const cursor = new Date(desde);
  while (cursor < hasta) {
    const dow = cursor.getDay();
    if (dow !== 0 && dow !== 6) dias++;
    cursor.setDate(cursor.getDate() + 1);
  }
  return dias;
}

export function getBusinessDaysRemaining(deadline: string): number {
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);
  return getBusinessDaysBetween(hoy.toISOString().slice(0, 10), deadline);
}
