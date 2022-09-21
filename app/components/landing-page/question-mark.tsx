import { faQuestion } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ParallaxLayer } from "@react-spring/parallax";
import styled from "styled-components";

const QuestionMarkIcon = styled(FontAwesomeIcon)`
  right: ${(props: QuestionMark) => (props.right ? props.right : "initial")};
  left: ${(props: QuestionMark) => (props.left ? props.left : "initial")};
  margin-top: ${(props: QuestionMark) =>
    props["margin-top"] ? props["margin-top"] : "initial"};
  transform: rotate(
    ${(props: QuestionMark) => (props.rotation && props.rotation)}
  );
  font-size: 2.5rem;
  position: absolute;
`;

interface QuestionMark {
  left?: string;
  right?: string;
  "margin-top": string;
  rotation: string;
  start: number;
}

const QuestionMark: React.FC<QuestionMark> = (questionMark: QuestionMark) => {
  console.log(questionMark)
  return (
    <ParallaxLayer sticky={{ start: questionMark.start, end: 9 }}>
      <QuestionMarkIcon icon={faQuestion} {...questionMark}></QuestionMarkIcon>
    </ParallaxLayer>
  );
};

export default QuestionMark;
