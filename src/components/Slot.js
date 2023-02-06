import "./Slot.scss";
// import IMAGES from "../assets";
import PlaySound from "./PlaySound";
import spin from "../assets/spin.wav";
import win from "../assets/win.wav";
import seven from "../../public/static/seven.png";

import { v4 as uuidv4 } from "uuid";
import {
  losingCombination,
  settingSymbols,
  winningCombination,
  deltaAfterStopingAnimation,
  calculateScore,
  initShuffleArray,
} from "../helperFunctions";

import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  betIncrement,
  betDecrement,
  resetGame,
  reduceCredit,
  gameScore,
} from "../redux/game/gameActions";

import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";

const slotSymbols = [
  { src: "../../public/static/seven", value: 50, id: 1 },
  { src: "../../public/static/cherry", value: 30, id: 2 },
  { src: "../../public/static/apple", value: 20, id: 3 },
  { src: "../../public/static/lemon", value: 5, id: 4 },
  { src: "../../public/static/orange", value: 10, id: 5 },
  { src: "../../public/static/bigwin", value: 70, id: 6 },
  { src: "../../public/static/plum", value: 15, id: 7 },
  { src: "../../public/static/grapes", value: 25, id: 8 },
  { src: "../public/static/bluestar", value: 35, id: 9 },
];

function Slot() {
  const NUMBER_OF_SYMBOLS = 18;
  //number of symbols 9*2
  const initialState = {
    numberOfSymbols: NUMBER_OF_SYMBOLS,
    reelsBottomPosition: 0,
    symbolHeight: 0,
    delta: 0,
  };

  const [gameState, setGameState] = useState(initialState);
  const [start, setStart] = useState(false);
  const [count, setCount] = useState(0);
  const [topConteinerPostition, setTopConteinerPosition] = useState();
  const [bottomConteinerPosition, setBottomConteinerPostion] = useState();
  const [score, setScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [winningSound, setWinningSound] = useState(false);
  const [disabled, setDisabled] = useState(false);

  //visible vertical part of the array
  const [visibleVertical1, setVisibleVertical1] = useState([]);
  const [visibleVertical2, setVisibleVertical2] = useState([]);
  const [visibleVertical3, setVisibleVertical3] = useState([]);
  const [visibleVertical4, setVisibleVertical4] = useState([]);
  const [visibleVertical5, setVisibleVertical5] = useState([]);

  const conteinerRef = useRef(null);
  const reelOneRef = useRef(null);
  const reelOneRefs = useRef([]);
  const reelTwoRefs = useRef([]);
  const reelThreeRefs = useRef([]);
  const reelFourRefs = useRef([]);
  const reelFiveRefs = useRef([]);

  const [reel1, setReel1] = useState([]);
  const [reel2, setReel2] = useState([]);
  const [reel3, setReel3] = useState([]);
  const [reel4, setReel4] = useState([]);
  const [reel5, setReel5] = useState([]);

  const bet = useSelector((state) => state.bet);
  const amount = useSelector((state) => state.amount);
  const credit = useSelector((state) => state.credit);
  const dispatch = useDispatch();

  useEffect(() => {
    const arrayOfIndex = slotSymbols.map((item) => item.id);
    let arr1 = initShuffleArray(arrayOfIndex);
    let arr2 = initShuffleArray(arrayOfIndex);
    let arr3 = initShuffleArray(arrayOfIndex);
    let arr4 = initShuffleArray(arrayOfIndex);
    let arr5 = initShuffleArray(arrayOfIndex);
    let lose = losingCombination(arr1, arr2, arr3, arr4, arr5);

    arr1 = lose[0];
    arr2 = lose[1];
    arr3 = lose[2];
    arr4 = lose[3];
    arr5 = lose[4];
    setReel1(settingSymbols(arr1, slotSymbols));
    setReel2(settingSymbols(arr2, slotSymbols));
    setReel3(settingSymbols(arr3, slotSymbols));
    setReel4(settingSymbols(arr4, slotSymbols));
    setReel5(settingSymbols(arr5, slotSymbols));
  }, []);

  const resetPos = () => {
    setGameState((state) => {
      return {
        ...state,
        reelsBottomPosition: 0,
      };
    });
  };

  let ID;
  const moveReels = () => {
    setGameState((state) => {
      return {
        ...state,
        reelsBottomPosition: state.reelsBottomPosition + state.delta,
      };
    });
    ID = requestAnimationFrame(moveReels);
  };

  useEffect(() => {
    const setPositions = () => {
      const symbolHeight = reelOneRef.current.children[0].offsetHeight;
      const delta = symbolHeight / 4;
      setGameState((prev) => {
        return { ...prev, symbolHeight, delta };
      });
    };
    let id = setTimeout(() => {
      setPositions();
      setTopConteinerPosition(conteinerRef.current.getBoundingClientRect().top);
      setBottomConteinerPostion(
        conteinerRef.current.getBoundingClientRect().bottom
      );
    }, 500);
    return () => {
      clearTimeout(id);
    };
  }, []);

  useEffect(() => {
    let timer;
    if (start) {
      setCount((prev) => prev + 1);
      if (winningSound === false) {
        setIsPlaying(true);
      }
      moveReels();
      timer = setTimeout(() => {
        cancelAnimationFrame(ID);
        setStart(false);
        setIsPlaying(false);
      }, 6000);
    }

    return () => {
      cancelAnimationFrame(ID);
      clearTimeout(timer);
    };
  }, [start]);

  useEffect(() => {
    let timer;
    if (start === false && count !== 0) {
      timer = setTimeout(() => {
        setDisabled(true);
      }, 1100);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [start]);

  useEffect(() => {
    setScore(0);
    setDisabled(false);
  }, [count]);

  useEffect(() => {
    let id;
    if (start === false && reelOneRefs.length !== 0 && count !== 0) {
      id = setTimeout(position, 500);
    }
    return () => {
      clearTimeout(id);
    };
  }, [start, reelOneRefs]);

  ///*********************************************** */
  let position = () => {
    let first = [];
    let second = [];
    let third = [];
    let fourth = [];
    let fifth = [];

    reelOneRefs.current.forEach((item) => {
      if (
        item.getBoundingClientRect().top >= topConteinerPostition &&
        item.getBoundingClientRect().bottom <= bottomConteinerPosition
      ) {
        first.push(item.id);
      }
      setVisibleVertical1(first);
    });
    reelTwoRefs.current.forEach((item) => {
      if (
        item.getBoundingClientRect().top >= topConteinerPostition &&
        item.getBoundingClientRect().bottom <= bottomConteinerPosition
      ) {
        second.push(item.id);
      }
      setVisibleVertical2(second);
    });
    reelThreeRefs.current.forEach((item) => {
      if (
        item.getBoundingClientRect().top >= topConteinerPostition &&
        item.getBoundingClientRect().bottom <= bottomConteinerPosition
      ) {
        third.push(item.id);
      }
      setVisibleVertical3(third);
    });

    reelFourRefs.current.forEach((item) => {
      if (
        item.getBoundingClientRect().top >= topConteinerPostition &&
        item.getBoundingClientRect().bottom <= bottomConteinerPosition
      ) {
        fourth.push(item.id);
      }
      setVisibleVertical4(fourth);
    });

    reelFiveRefs.current.forEach((item) => {
      if (
        item.getBoundingClientRect().top >= topConteinerPostition &&
        item.getBoundingClientRect().bottom <= bottomConteinerPosition
      ) {
        fifth.push(item.id);
      }
      setVisibleVertical5(fifth);
    });
  };

  //********************************* */

  function rowsOfColums(col1, col2, col3, col4, col5) {
    let matrix = [[...col1], [...col2], [...col3], [...col4], [...col5]];

    let row1 = matrix.map((item) => item[0]);
    let row2 = matrix.map((item) => item[1]);
    let row3 = matrix.map((item) => item[2]);

    let scorefromRow1 = calculateScore(row1);
    let scoreFromRow2 = calculateScore(row2);
    let scoreFromRow3 = calculateScore(row3);
    let total = scorefromRow1 + scoreFromRow2 + scoreFromRow3;
    let finallScore = total * bet;
    setScore(finallScore);
    dispatch(gameScore(finallScore));
  }

  useEffect(() => {
    if (visibleVertical5.length !== 0) {
      rowsOfColums(
        visibleVertical1,
        visibleVertical2,
        visibleVertical3,
        visibleVertical4,
        visibleVertical5
      );
    }
  }, [visibleVertical5]);

  useEffect(() => {
    if (start === false && count !== 0) {
      let delta = deltaAfterStopingAnimation(
        gameState.reelsBottomPosition,
        gameState.symbolHeight
      );

      if (delta === 0) return;
      if (delta === gameState.symbolHeight / 4) {
        setGameState((prev) => {
          return {
            ...prev,
            reelsBottomPosition: prev.reelsBottomPosition - delta,
          };
        });
      } else {
        setGameState((prev) => {
          return {
            ...prev,
            reelsBottomPosition:
              prev.reelsBottomPosition + (prev.symbolHeight - delta),
          };
        });
      }
    }
  }, [start]);

  useEffect(() => {
    if (count % 4 !== 0 || count === 0) {
      const arrayOfIndex = slotSymbols.map((item) => item.id);
      let arr1 = initShuffleArray(arrayOfIndex);
      let arr2 = initShuffleArray(arrayOfIndex);
      let arr3 = initShuffleArray(arrayOfIndex);
      let arr4 = initShuffleArray(arrayOfIndex);
      let arr5 = initShuffleArray(arrayOfIndex);
      let lose = losingCombination(arr1, arr2, arr3, arr4, arr5);

      arr1 = lose[0];
      arr2 = lose[1];
      arr3 = lose[2];
      arr4 = lose[3];
      arr5 = lose[4];
      setReel1(settingSymbols(arr1, slotSymbols));
      setReel2(settingSymbols(arr2, slotSymbols));
      setReel3(settingSymbols(arr3, slotSymbols));
      setReel4(settingSymbols(arr4, slotSymbols));
      setReel5(settingSymbols(arr5, slotSymbols));
    }
    if (count % 4 === 0 && count > 0) {
      const arrayOfIndex = slotSymbols.map((item) => item.id);

      let win = winningCombination(
        arrayOfIndex,
        arrayOfIndex,
        arrayOfIndex,
        arrayOfIndex,
        arrayOfIndex
      );

      let arr1 = win[0];
      let arr2 = win[1];
      let arr3 = win[2];
      let arr4 = win[3];
      let arr5 = win[4];
      setReel1(settingSymbols(arr1, slotSymbols));
      setReel2(settingSymbols(arr2, slotSymbols));
      setReel3(settingSymbols(arr3, slotSymbols));
      setReel4(settingSymbols(arr4, slotSymbols));
      setReel5(settingSymbols(arr5, slotSymbols));
    }
  }, [count]);

  const handleClick = () => {
    setStart(true);
    dispatch(reduceCredit());
  };

  useEffect(() => {
    const restartPoint =
      (NUMBER_OF_SYMBOLS / 2) * gameState.symbolHeight -
      gameState.symbolHeight / 4;

    if (gameState.reelsBottomPosition >= restartPoint) {
      resetPos();
    }
    console.log(gameState.reelsBottomPosition);
  }, [gameState.reelsBottomPosition]);

  useEffect(() => {
    let id;
    if (score !== 0 && isPlaying === false && count !== 0) {
      setWinningSound(true);
      id = setTimeout(() => {
        setWinningSound(false);
      }, 1000);
    }

    return () => {
      clearTimeout(id);
    };
  }, [score]);

  const disableButton = () => {
    if (start) {
      return true;
    }
    if (disabled === false && start === false && count !== 0) {
      return true;
    }

    if (amount - credit * bet < 0) {
      return true;
    }
  };

  const disableButtonReset = () => {
    if (amount === 0 && start === false) {
      return false;
    }
    if (amount < credit && start === false) {
      return false;
    }
    if (start) {
      return true;
    }
    if (amount - credit * bet < 0) {
      return true;
    }
    if (disabled === false && start === false && count !== 0) {
      return true;
    }
  };

  function mess() {
    if (
      amount - credit * bet < 0 &&
      amount >= credit &&
      amount !== 0 &&
      count !== 0 &&
      start === false
    ) {
      return "you need to decrease you bet!";
    }
    if (amount === 0 && start === false && count !== 0 && score === 0) {
      return " you have spent your points. reset and try againt!";
    }
    if (score !== 0 && start === false && count !== 0) {
      return `Your amount have increased for ${score} points`;
    }
    if (amount < credit && start === false) {
      return "you don`t have enough credit.reset and try again!";
    }
    if (amount < credit && start === false) {
      return `you dont have engough credit to play. reset the game`;
    }
  }

  return (
    <div className="slot-conteiner">
      <div className="gameResult">{amount}</div>
      <section className="box" ref={conteinerRef}>
        <div className="slot-conteiner__interface">
          <div className="column first">
            <div
              className="reel one"
              ref={reelOneRef}
              style={{
                bottom: `-${gameState.reelsBottomPosition}px`,
              }}
            >
              {reel1.map((item, index) => {
                return (
                  <div
                    key={uuidv4()}
                    ref={(element) => (reelOneRefs.current[index] = element)}
                    id={item.value}
                  >
                    <img src={item.src} alt="" />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="column second">
            <div
              className="reel two"
              style={{
                bottom: `-${gameState.reelsBottomPosition}px`,
              }}
            >
              {reel2.map((item, index) => {
                return (
                  <div
                    key={uuidv4()}
                    ref={(element) => (reelTwoRefs.current[index] = element)}
                    id={item.value}
                  >
                    <img src={item.src} alt="" />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="column third">
            <div
              className="reel three"
              style={{
                bottom: `-${gameState.reelsBottomPosition}px`,
              }}
            >
              {reel3.map((item, index) => {
                return (
                  <div
                    key={uuidv4()}
                    ref={(element) => (reelThreeRefs.current[index] = element)}
                    id={item.value}
                  >
                    <img src={item.src} alt="" />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="column forth">
            <div
              className="reel four"
              style={{
                bottom: `-${gameState.reelsBottomPosition}px`,
              }}
            >
              {reel4.map((item, index) => {
                return (
                  <div
                    key={uuidv4()}
                    ref={(element) => (reelFourRefs.current[index] = element)}
                    id={item.value}
                  >
                    <img src={item.src} alt="" />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="column fifth">
            <div
              className="reel five"
              style={{
                bottom: `-${gameState.reelsBottomPosition}px`,
              }}
            >
              {reel5.map((item, index) => {
                return (
                  <div
                    key={uuidv4()}
                    ref={(element) => (reelFiveRefs.current[index] = element)}
                    id={item.value}
                  >
                    <img src={item.src} alt="" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="gameControlls">
        <div className="set-bet">
          <button
            className="set-bet__decrement"
            onClick={() => {
              dispatch(betDecrement());
            }}
          >
            <FaMinus />
          </button>
          <div className="set-bet__bet">{bet}</div>
          <button
            className="set-bet__increment"
            onClick={() => {
              dispatch(betIncrement());
            }}
          >
            <FaPlus />
          </button>
        </div>
        <button
          className="btn-start"
          onClick={handleClick}
          disabled={disableButton()}
        >
          Start
        </button>
        <button
          className="btn-reset"
          onClick={() => dispatch(resetGame())}
          disabled={disableButtonReset()}
        >
          Reset
        </button>
      </section>
      <section>
        <p className="message">{mess()}</p>
      </section>
      <PlaySound isPlaying={isPlaying} url={spin} />
      <PlaySound isPlaying={winningSound} url={win} />
    </div>
  );
}

export default Slot;
