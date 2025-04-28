/**
 * 파일 크기를 사람이 읽기 쉬운 단위(예: KB, MB, GB 등)로 변환합니다.
 * @param bytes 변환할 바이트 크기
 * @param maxFractionDigits 소수점 자릿수 (기본값: 1)
 * @param locale 표시할 언어 (기본값: 'en-US')
 * @returns 예: "1.5 MB", "512 Bytes"
 */
export function formatFileSize(bytes: number, maxFractionDigits = 1, locale = 'en-US'): string {
  if (bytes === 0) return '0 Bytes';
  if (!Number.isFinite(bytes) || bytes < 0) return '-';

  const units = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const base = 1024;
  const exponent = Math.floor(Math.log(bytes) / Math.log(base));
  const value = bytes / Math.pow(base, exponent);

  // Bytes 단위는 소수점 없이 표기
  const fractionDigits = exponent === 0 ? 0 : maxFractionDigits;

  return `${value.toLocaleString(locale, {
    maximumFractionDigits: fractionDigits,
    minimumFractionDigits: fractionDigits,
  })} ${units[exponent]}`;
}
