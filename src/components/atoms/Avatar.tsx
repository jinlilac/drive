import Img from '@/components/atoms/Img';
import styled, { CSSProperties } from 'styled-components';

type AvatarSize = 's' | 'm';

type AvatarProps = {
  size?: AvatarSize;
  src?: string | undefined;
  alt?: string;
  style?: CSSProperties;
};

const AvatarWrap = styled.div<AvatarProps>`
  width: ${({ size }) => (size === 's' ? '42px' : '168px')};
  height: ${({ size }) => (size === 's' ? '42px' : '168px')};
  outline: 1px solid ${(props) => props.theme.Colors.gray_40};
  background-color: ${(props) => props.theme.Colors.gray_20};
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const Avatar = ({ size = 'm', src, alt, style, ...others }: AvatarProps) => {
  return (
    <AvatarWrap size={size} style={style}>
      <Img
        full
        fit="cover"
        src={src}
        alt={alt}
        onError={({ currentTarget }) => (currentTarget.style.display = 'none')}
        onLoad={({ currentTarget }) => (currentTarget.style.display = 'block')}
      />
    </AvatarWrap>
  );
};

export default Avatar;
