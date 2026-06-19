import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

const dateTimeFormatter = new Intl.DateTimeFormat('en', {
  dateStyle: 'medium',
  timeStyle: 'short',
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDateTime(date: Date | number | string) {
  return dateTimeFormatter.format(new Date(date));
}
