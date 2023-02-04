import "./Slot.scss";
import IMAGES from "../assets";

import { v4 as uuidv4 } from "uuid";
import {
  losingCombination,
  settingSymbols,
  winningCombination,
  deltaAfterStopingAnimation,
  calculateScore,
} from "../helperFunctions";

import React, { useState, useRef, useEffect } from "react";

const slotSymbols = [
  { src: IMAGES.seven, value: 100, id: 1 },
  { src: IMAGES.cherry, value: 60, id: 2 },
  { src: IMAGES.apple, value: 40, id: 3 },
  { src: IMAGES.lemon, value: 10, id: 4 },
  { src: IMAGES.orange, value: 20, id: 5 },
  { src: IMAGES.bigwin, value: 150, id: 6 },
  { src: IMAGES.plum, value: 30, id: 7 },
  { src: IMAGES.grapes, value: 50, id: 8 },
  { src: IMAGES.bluestar, value: 70, id: 9 },
];

function initShuffleArray(arr) {
  for (let i = 0; i < arr.length - 2; i++) {
    const j = Math.floor(Math.random() * (arr.length - i) + i);
    let current = arr[i];
    let random = arr[j];
    arr[j] = current;
    arr[i] = random;
  }
  return [...arr];
}

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
  //   const [deltaFromTop, setDeltaFromTop] = useState();
  //   const [move, setMove] = useState(0);

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
    }, 1000);
    return () => {
      clearTimeout(id);
    };
  }, []);

  useEffect(() => {
    console.log(topConteinerPostition);
    console.log(bottomConteinerPosition);
  }, [topConteinerPostition, bottomConteinerPosition]);

  useEffect(() => {
    let timer;
    if (start) {
      setCount((prev) => prev + 1);
      moveReels();
      timer = setTimeout(() => {
        cancelAnimationFrame(ID);
        setStart(false);
      }, 4000);
    }

    return () => {
      cancelAnimationFrame(ID);
      clearTimeout(timer);
    };
  }, [start]);

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
    setScore((prev) => prev + total);
  }

  useEffect(() => {
    if (visibleVertical5.length !== 0) {
      console.log(visibleVertical1);
      console.log(visibleVertical2);
      console.log(visibleVertical3);
      console.log(visibleVertical4);
      console.log(visibleVertical5);
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

  return (
    <div className="slot-conteiner">
      <div>{count}</div>
      <div>{score}</div>
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

      <section>
        <button className="btn-start" onClick={handleClick} disabled={start}>
          Start
        </button>
      </section>
      <section></section>
    </div>
  );
}

export default Slot;
