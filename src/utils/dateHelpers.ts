const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

/** Returns today's date as an ISO date string (YYYY-MM-DD). */
export const todayISO = (): string => {
  const d = new Date();
  return toISODate(d);
};

export const toISODate = (d: Date): string => {
  const y = d.getFullYear();
  const m = `${d.getMonth() + 1}`.padStart(2, '0');
  const day = `${d.getDate()}`.padStart(2, '0');
  return `${y}-${m}-${day}`;
};

/** Formats an ISO date string as "8 July 2026". */
export const formatDate = (isoDate: string): string => {
  const [y, m, d] = isoDate.split('-').map(Number);
  if (!y || !m || !d) return isoDate;
  return `${d} ${MONTHS[m - 1]} ${y}`;
};

/** Formats a "HH:mm" time string as "14:30". Falls back gracefully. */
export const formatTime = (time?: string): string => {
  if (!time) return '';
  return time;
};

export const nowTimeString = (): string => {
  const d = new Date();
  const h = `${d.getHours()}`.padStart(2, '0');
  const min = `${d.getMinutes()}`.padStart(2, '0');
  return `${h}:${min}`;
};

export const nowISO = (): string => new Date().toISOString();
