import styled from "styled-components"
import { styles } from "~/constants/styles";
import { ImageShape } from "~/types/types";

const ImagePlaceholder = styled.div<{ shape: ImageShape }>`
  border-radius: ${props => props.shape == 'circle' ? '100%' : '8px'};
  height: 5rem;
  width: 5rem;
  background-color: ${styles.colors.gray[30]};
`;

interface PlaceImageProps {
  shape: ImageShape
}

export const PlaceImage: React.FC<PlaceImageProps> = ({ shape }) => {
  return <ImagePlaceholder shape={shape}></ImagePlaceholder>
}