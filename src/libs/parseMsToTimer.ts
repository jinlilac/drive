export default function formatMilliseconds(ms: number) {
  // 밀리초를 초 단위로 변환
  const totalSeconds = Math.floor(ms / 1000);

  // 분과 초 계산
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  // 두 자리 숫자로 포맷팅 (예: 03, 09)
  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(seconds).padStart(2, '0');

  // "MM:SS" 형태로 반환
  return `${formattedMinutes}:${formattedSeconds}`;
}
