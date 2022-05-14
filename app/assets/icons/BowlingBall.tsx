import { SVGProps } from 'react';
import { styles } from '~/constants/styles';

const BowlingBallIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 512 512"
    style={{
      height: props.height
    }}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM144 208c-17.7 0-32-14.25-32-32s14.3-32 32-32s32 14.25 32 32S161.7 208 144 208zM240 80c17.66 0 31.95 14.25 31.95 32s-14.29 32-31.95 32s-32.05-14.25-32.05-32S222.4 80 240 80zM240 240c-17.7 0-32-14.25-32-32s14.3-32 32-32s32 14.25 32 32S257.7 240 240 240z"
      fill={props.fill ?? styles.colors.black}
    />
  </svg>
);

export default BowlingBallIcon;