import React from "react";

type funcProp = (arg: any) => void;
type ComponentProp = React.FC<{thisAnim: any}>;

interface SectionProps {
  myFuncProp: funcProp;
  myComponentProp: ComponentProp; // all props to pass it.
}

const SelectSymbol: React.FC<SectionProps> = ({ myFuncProp, myComponentProp }) => {
  return (
    <section>
      <h2>Select</h2>
      <button
        className="selectBtn"
        onClick={() => {
          myFuncProp('X');
        }}
      >
        {myComponentProp({thisAnim: 'X'})}
      </button>
      <button
        className="selectBtn"
        onClick={() => {
          myFuncProp('O');
        }}
      >
        {myComponentProp({thisAnim: 'O'})}
      </button>
    </section>
  );
};

export default SelectSymbol;
