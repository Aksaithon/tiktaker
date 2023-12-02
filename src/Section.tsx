import React from "react";

type funcProp = (arg: any) => void;
type ComponentProp = React.FC<{thisAnim: any}>;

interface SectionProps {
  myFuncProp: funcProp;
  myComponentProp: ComponentProp; // all props to pass it.
}

const Section: React.FC<SectionProps> = ({ myFuncProp, myComponentProp }) => {
  return (
    <section>
      <h2>Select</h2>
      <button
        className="boxBtn"
        onClick={(e) => {
          myFuncProp(e.currentTarget.textContent);
        }}
      >
        {myComponentProp({thisAnim: 'X'})}X
      </button>
      <button
        className="boxBtn"
        onClick={(e) => {
          myFuncProp(e.currentTarget.textContent);
        }}
      >
        {myComponentProp({thisAnim: 'O'})}O
      </button>
    </section>
  );
};

export default Section;
