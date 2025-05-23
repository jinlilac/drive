import { parseISO } from 'date-fns';
import { format, toZonedTime } from 'date-fns-tz';

export default function getCustomRelativeTime(dateString: string): string {
  const now = new Date();
  const kstDate = toZonedTime(new Date(dateString), 'Asia/Seoul');
  const diffInSeconds = Math.floor((now.getTime() - kstDate.getTime()) / 1000);

  if (diffInSeconds < 60) return `${diffInSeconds}초 전`;
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes}분 전`;
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours}시간 전`;
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays <= 30) return `${diffInDays}일 전`;
  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths <= 12) return `${diffInMonths}달 전`;
  const diffInYears = Math.floor(diffInMonths / 12);

  return `${diffInYears}년 전`;
}

// 테스트 예시
// console.log(getCustomRelativeTime('2025-04-11T07:42:07.000Z'));
export function useFormatDate(dateString?: string): string {
  if (!dateString) return '';
  try {
    // UTC로 변환
    const utcDate = toZonedTime(dateString, 'UTC');
    return format(utcDate, 'yyyy.MM.dd');
  } catch {
    return '';
  }
}
