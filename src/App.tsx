import { useEffect, useState } from "react";
import "./App.css";
import Symbols from "./components/Symbols";
import Section from "./Section";

let winner = false;

const App = () => {
  const [startGame, setStartGame] = useState<boolean>(false);

  const [whichAnim, setWhichAnim] = useState<{ [key: string]: string }>({
    0: "",
    1: "",
    2: "",
    3: "",
    4: "",
    5: "",
    6: "",
    7: "",
    8: "",
  });

  const winningCombos: Array<number[]> = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const [totalMoves, setTotalMoves] = useState<number>(0);

  const notFull = () => {
    return totalMoves < 8;
  };

  const [userSymb, setUserSymb] = useState<any>();
  const [compSymb, setCompSymb] = useState<any>();

  const [showSection, setShowSection] = useState(true);

  const selectSymbol = (symbol: any) => {
    setUserSymb(symbol);
    setCompSymb(symbol == "X" ? "O" : "X");

    setShowSection(false);

    setStartGame(true);

    // here m setting btn values dynamically while assigning dom element a new value  🔥🔥🔥
    // const btn = (document.getElementsByClassName("btn")[0].textContent =
    //   "Play!");
  };

  const restartGame = () => {
    const newWhichAnim = { ...whichAnim };
    for (const key in whichAnim) {
      if (Object.prototype.hasOwnProperty.call(whichAnim, key)) {
        newWhichAnim[key] = "";
      }
    }
    setWhichAnim(newWhichAnim);

    document.getElementsByTagName("h1")[1].textContent = "";

    setStartGame(true);
    setTotalMoves(0);
  };
  // COmputer BRAIN-----------------------------------------------------------------------------------

  const findWinMov = (compAnim: any) => {
    let compWinMov: string = "";

    for (const key in whichAnim) {
      if (Object.prototype.hasOwnProperty.call(whichAnim, key)) {
        if (whichAnim[key] == "") {
          const newWhichAnim = { ...whichAnim };
          newWhichAnim[key] = compAnim;

          checkWinner(newWhichAnim, compAnim, false);

          if (winner) {
            compWinMov = key;
            break;
          }
        }
      }
    }

    return compWinMov;
  };

  const blockUsrWinMov = (usrAnim: any) => {
    let usrWinMov: string = "";

    for (const key in whichAnim) {
      if (Object.prototype.hasOwnProperty.call(whichAnim, key)) {
        if (whichAnim[key] == "") {
          const newWhichAnim = { ...whichAnim };
          newWhichAnim[key] = usrAnim;

          checkWinner(newWhichAnim, usrAnim, false);

          if (winner) {
            usrWinMov = key;
            break;
          }
        }
      }
    }

    return usrWinMov;
  };

  const takeCenterPos = () => {
    if (whichAnim[4] == "") {
      return "4";
    } else {
      return "";
    }
  };
  const takeRndmCornerPos = () => {
    function getRandomSortOrder(): number {
      return Math.random() - 0.5;
    }

    const corners: number[] = [0, 2, 6, 8];
    const shuffledCorners: number[] = [...corners].sort(getRandomSortOrder);

    let cornerMov: string = "";

    for (let key = 0; key < shuffledCorners.length; key++) {
      const pos = shuffledCorners[key];

      if (whichAnim[pos] == "") {
        cornerMov = pos.toString();
        break;
      }
    }
    return cornerMov;
  };
  const fillEmptyPos = () => {
    let pos: string = "";
    for (const key in whichAnim) {
      if (Object.prototype.hasOwnProperty.call(whichAnim, key)) {
        if (whichAnim[key] == "") {
          pos = key;
          break;
        }
      }
    }

    return pos;
  };

  // COmputer BRAIN-----------------------------------------------------------------------------------

  const makeCompMove = (compAnim: any, usrAnim: any) => {
    const decision1: any = findWinMov(compAnim);
    const decision2: any = blockUsrWinMov(usrAnim);
    const decision3: any = takeCenterPos();
    const decision4: any = takeRndmCornerPos();
    const decision5: any = fillEmptyPos();

    const position: string =
      decision1 == ""
        ? decision2 == ""
          ? decision3 == ""
            ? decision4 == ""
              ? decision5 == ""
                ? console.log("bhool bhulayia")
                : decision5
              : decision4
            : decision3
          : decision2
        : decision1;

    wrapperFunction(position, compAnim);

    // setTimeout(() => {
    // }, 950);
  };

  // Computer move run by this useEffect hook----------------------------------------------------------------
  useEffect(() => {
    if (totalMoves % 2 !== 0 && !winner) {
      makeCompMove(compSymb, userSymb);
    }

    if (!notFull()) {
      document.getElementsByTagName("h1")[1].textContent = "Its a TIE😞";
      document.getElementsByClassName("btn")[0].textContent = "Restart";
      setStartGame(false);
    }

    checkWinner(whichAnim, compSymb, true);
    checkWinner(whichAnim, userSymb, true);
  }, [whichAnim]);

  const wrapperFunction = (position: string, anim: any) => {
    setWhichAnim((prevWhichAnim) => {
      if (prevWhichAnim[position] === "") {
        const newWhichAnim = { ...prevWhichAnim };
        newWhichAnim[position] = anim;

        // Check for the winner based on the most recent move
        checkWinner(newWhichAnim, anim, false);

        // Update state for the next rendering
        setTotalMoves(totalMoves + 1);

        return newWhichAnim;
      }

      return prevWhichAnim;
    });
  };

  const checkWinner = (
    currentWhichAnim: { [key: string]: string },
    symbol: any,
    declareWinner: boolean
  ) => {
    // Check for a winner based on the most recent move
    for (let combo of winningCombos) {
      if (
        [
          currentWhichAnim[combo[0]],
          currentWhichAnim[combo[1]],
          currentWhichAnim[combo[2]],
        ].every((pos) => pos === symbol)
      ) {
        winner = true;

        if (declareWinner) {
          document.getElementsByTagName("h1")[1].textContent = `${
            symbol == compSymb ? "Computer" : "😱You"
          } won!!`;
          document.getElementsByTagName("button")[0].textContent = "Restart";
          setStartGame(false);
        }

        break;
      } else {
        winner = false;
      }
    }
  };

  return (
    <>
      <header className="logo">
        <h1>TIC-TAC-TOE!</h1>
        <h1></h1>

        {showSection && (
          <Section myFuncProp={selectSymbol} myComponentProp={Symbols} />
        )}
      </header>
      <div className="main-game">
        <div className="game-board">
          {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((id) => (
            <div
              key={id}
              className="box"
              id={id.toString()}
              onClick={(e) => {
                startGame
                  ? wrapperFunction(e.currentTarget.id, userSymb)
                  : document
                      .getElementsByTagName("h1")[1]
                      .textContent?.includes("TIE")
                  ? (document.getElementsByTagName("h1")[1].textContent =
                      "pls restart 🤭 ")
                  : document
                      .getElementsByTagName("h1")[1]
                      .textContent?.includes("won!!")
                  ? alert("Restart bro")
                  : alert("Select symbol");
              }}
            >
              <Symbols thisAnim={whichAnim[id]} />
            </div>
          ))}
          {totalMoves > 0 && (
            <button
              className="btn"
              onClick={() => {
                restartGame();
              }}
            >
              Restart
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default App;
