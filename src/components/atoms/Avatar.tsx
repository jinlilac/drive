import Img from '@/components/atoms/Img';
import { useAuthStore } from '@/stores/useAuthStore';
import { useEffect, useState } from 'react';
import styled, { CSSProperties } from 'styled-components';

type AvatarProps = {
  size?: number;
  src?: string | undefined;
  previewImg?: string | null;
  alt?: string;
  style?: CSSProperties;
};

const AvatarWrap = styled.div<AvatarProps>`
  width: ${({ size }) => `${size}px`};
  height: ${({ size }) => `${size}px`};
  outline: 1px solid ${(props) => props.theme.Colors.gray_40};
  background-color: ${(props) => props.theme.Colors.gray_20};
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const Avatar = ({ size, src, previewImg, alt, style, ...others }: AvatarProps) => {
  const { user } = useAuthStore();
  const resolvedSrc =
    previewImg ||
    (user?.profileImg?.startsWith('https')
      ? user?.profileImg
      : `${import.meta.env.VITE_PROFILE_IMG_URL}/${user?.profileImg}`);

  const [imgSrc, setImgSrc] = useState(resolvedSrc);

  useEffect(() => {
    setImgSrc(resolvedSrc);
    // eslint-disable-next-line
  }, [previewImg, user?.profileImg]);

  return (
    <AvatarWrap size={size} style={style}>
      <Img
        full
        fit="cover"
        src={imgSrc}
        alt={alt}
        onError={({ currentTarget }) => (currentTarget.style.display = 'none')}
        onLoad={({ currentTarget }) => (currentTarget.style.display = 'block')}
      />
    </AvatarWrap>
  );
};

export default Avatar;
