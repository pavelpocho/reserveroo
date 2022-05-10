import styled from "styled-components"
import { styles } from "~/constants/styles";
import { ImageShape } from "~/types/types";

const ImagePlaceholder = styled.div<{ shape: ImageShape }>`
  border-radius: ${props => props.shape == 'circle' ? '100%' : '8px'};
  aspect-ratio: 1;
  height: 8rem;
  background-color: ${styles.colors.gray[30]};
`;

interface PlaceImageProps {
  shape: ImageShape
}

export const PlaceImage: React.FC<PlaceImageProps> = ({ shape }) => {
  return <ImagePlaceholder shape={shape}></ImagePlaceholder>
}