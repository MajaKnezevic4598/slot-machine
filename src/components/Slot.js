import "./Slot.scss";
import IMAGES from "../assets";
import Symbol from "./Symbol";
import { v4 as uuidv4 } from "uuid";
import {
  losingCombination,
  settingSymbols,
  winningCombination,
  deltaAfterStopingAnimation,
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
  return [...arr, ...arr];
}

function Slot() {
  const NUMBER_OF_SYMBOLS = 18;
  //number of symbols 9*2
  const initialState = {
    numberOfSymbols: NUMBER_OF_SYMBOLS,
    reelsBottomPostion: 0,
    symbolHeight: 0,
    delta: 0,
  };

  const [gameState, setGameState] = useState(initialState);
  const [start, setStart] = useState(false);
  const [count, setCount] = useState(0);
  const [topConteinerPostition, setTopConteinerPosition] = useState();
  const [bottomConteinerPosition, setBottomConteinerPostion] = useState();
  const [deltaFromTop, setDeltaFromTop] = useState();
  const [move, setMove] = useState(0);

  const conteinerRef = useRef(null);
  const reelOneRef = useRef(null);
  const reelOneRefs = useRef([]);

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
        reelsBottomPostion: 0,
      };
    });
  };

  let ID;
  const moveReels = () => {
    setGameState((state) => {
      return {
        ...state,
        reelsBottomPostion: state.reelsBottomPostion + state.delta,
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
    setTimeout(setPositions, 1000);
  }, []);

  useEffect(() => {
    let timer;
    if (start) {
      moveReels();
      timer = setTimeout(() => {
        setStart(false);
      }, 4000);
    }
    return () => {
      cancelAnimationFrame(ID);
      clearTimeout(timer);
    };
  }, [start]);

  useEffect(() => {
    if (count % 4 !== 0) {
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
      let arr1 = initShuffleArray(arrayOfIndex);
      let arr2 = initShuffleArray(arrayOfIndex);
      let arr3 = initShuffleArray(arrayOfIndex);
      let arr4 = initShuffleArray(arrayOfIndex);
      let arr5 = initShuffleArray(arrayOfIndex);
      let win = winningCombination(arr1, arr2, arr3, arr4, arr5);

      arr1 = win[0];
      arr2 = win[1];
      arr3 = win[2];
      arr4 = win[3];
      arr5 = win[4];
      setReel1(settingSymbols(arr1, slotSymbols));
      setReel2(settingSymbols(arr2, slotSymbols));
      setReel3(settingSymbols(arr3, slotSymbols));
      setReel4(settingSymbols(arr4, slotSymbols));
      setReel5(settingSymbols(arr5, slotSymbols));
    }
  }, [count]);

  const handleClick = () => {
    setStart(!start);
  };

  useEffect(() => {
    console.log(gameState.reelsBottomPostion);
    const restartPoint = (NUMBER_OF_SYMBOLS / 2 - 1) * gameState.symbolHeight;

    if (gameState.reelsBottomPostion >= restartPoint) {
      resetPos();
    }
  }, [gameState.reelsBottomPostion]);

  return (
    <div className="slot-conteiner">
      <div>{count}</div>
      <section className="slot-conteiner__interface" ref={conteinerRef}>
        <div className="column first">
          <div
            className="reel one"
            ref={reelOneRef}
            style={{
              bottom: `-${gameState.reelsBottomPostion}px`,
            }}
          >
            {reel1.map((item, index) => {
              return (
                <div
                  key={uuidv4()}
                  ref={(element) => (reelOneRefs.current[index] = element)}
                >
                  <img src={item.src} alt="" id={item.value} />
                </div>
              );
            })}
          </div>
        </div>
        <div className="column second">
          <div
            className="reel two"
            style={{
              bottom: `-${gameState.reelsBottomPostion}px`,
            }}
          >
            {reel2.map((item) => (
              <Symbol key={uuidv4()} item={item} />
            ))}
          </div>
        </div>
        <div className="column third">
          <div
            className="reel three"
            style={{
              bottom: `-${gameState.reelsBottomPostion}px`,
            }}
          >
            {reel3.map((item) => (
              <Symbol key={uuidv4()} item={item} />
            ))}
          </div>
        </div>
        <div className="column forth">
          <div
            className="reel four"
            style={{
              bottom: `-${gameState.reelsBottomPostion}px`,
            }}
          >
            {reel4.map((item) => (
              <Symbol key={uuidv4()} item={item} />
            ))}
          </div>
        </div>
        <div className="column fifth">
          <div
            className="reel five"
            style={{
              bottom: `-${gameState.reelsBottomPostion}px`,
            }}
          >
            {reel5.map((item) => (
              <Symbol key={uuidv4()} item={item} />
            ))}
          </div>
        </div>
      </section>
      <section>
        <button onClick={handleClick}>Start</button>
      </section>
      <section></section>
    </div>
  );
}

export default Slot;
