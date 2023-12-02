import "./Symbols.css";
// X symbol

interface varientNULLProps {
  thisAnim: any;
}

const Symbols: React.FC<varientNULLProps> = (props) => {
  return (
    <>
      {/* thisAnim if true = cross animations if false circle animations */}
      <div
        className={
          props.thisAnim == "O" || props.thisAnim == "X"
            ? props.thisAnim == "O"
              ? "circleAnimPart1 dash"
              : " crossAnimPart1 dash"
            : "dash"
        }
      ></div>
      <div
        className={
          props.thisAnim == "O" || props.thisAnim == "X"
            ? props.thisAnim == "O"
              ? "circleAnimPart2 dash"
              : " crossAnimPart2 dash"
            : "dash"
        }
      ></div>
      
    </>
  );
};

export default Symbols;
