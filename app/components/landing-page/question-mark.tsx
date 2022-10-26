import { faQuestion } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ParallaxLayer } from "@react-spring/parallax";
import styled from "styled-components";

const QuestionMarkIcon = styled(FontAwesomeIcon)`
  right: ${(props: QuestionMarkInterface) => (props.right ? props.right : "initial")};
  left: ${(props: QuestionMarkInterface) => (props.left ? props.left : "initial")};
  margin-top: ${(props: QuestionMarkInterface) =>
    props["margin-top"] ? props["margin-top"] : "initial"};
  transform: rotate(
    ${(props: QuestionMarkInterface) => (props.rot && props.rot)}
  );
  font-size: 2.5rem;
  position: absolute;
`;

interface QuestionMarkInterface {
  left?: string;
  right?: string;
  "margin-top": string;
  rot: string;
  start: number;
}

const QuestionMark: React.FC<QuestionMarkInterface> = (questionMark: QuestionMarkInterface) => {
  return (
    <ParallaxLayer sticky={{ start: questionMark.start, end: 9 }}>
      <QuestionMarkIcon icon={faQuestion} {...questionMark}></QuestionMarkIcon>
    </ParallaxLayer>
  );
};

export default QuestionMark;
