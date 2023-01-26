import "./Slot.scss";
import IMAGES from "../assets";
import Symbol from "./Symbol";
import { v4 as uuidv4 } from "uuid";

import React, { useState, useRef, useEffect } from "react";

const slotSymbols = [
  { src: IMAGES.seven, value: 100 },
  { src: IMAGES.cherry, value: 60 },
  { src: IMAGES.apple, value: 40 },
  { src: IMAGES.lemon, value: 10 },
  { src: IMAGES.orange, value: 20 },
  { src: IMAGES.bigwin, value: 150 },
  { src: IMAGES.plum, value: 30 },
  { src: IMAGES.grapes, value: 50 },
  { src: IMAGES.bluestar, value: 70 },
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

  const conteinerRef = useRef(null);
  const reelOneRef = useRef(null);

  const [reel1, setReel1] = useState([]);
  const [reel2, setReel2] = useState([]);
  const [reel3, setReel3] = useState([]);
  const [reel4, setReel4] = useState([]);
  const [reel5, setReel5] = useState([]);

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
    ID = requestAnimationFrame(moveReels);
    const restartPoint = (NUMBER_OF_SYMBOLS / 2 - 1) * gameState.symbolHeight;

    if (gameState.reelsBottomPostion >= restartPoint) {
      resetPos();
    } else {
      setGameState((state) => {
        return {
          ...state,
          reelsBottomPostion: state.reelsBottomPostion + state.delta,
        };
      });
    }
  };

  useEffect(() => {
    if (start) {
      moveReels();
    } else {
      cancelAnimationFrame(ID);
    }

    return () => {
      cancelAnimationFrame(ID);
    };
  }, [start, gameState.reelsBottomPostion]);

  useEffect(() => {
    setReel1(initShuffleArray(slotSymbols));
    setReel2(initShuffleArray(slotSymbols));
    setReel3(initShuffleArray(slotSymbols));
    setReel4(initShuffleArray(slotSymbols));
    setReel5(initShuffleArray(slotSymbols));
  }, []);

  const handleClick = () => {
    setStart(!start);
  };

  useEffect(() => {
    const setPositions = () => {
      const symbolHeight = reelOneRef.current.children[0].offsetHeight;

      const delta = symbolHeight;
      setGameState((prev) => {
        return { ...prev, symbolHeight, delta };
      });
    };
    setTimeout(setPositions, 1000);
  }, []);

  useEffect(() => {
    console.log(gameState);
  }, [gameState]);

  return (
    <div className="slot-conteiner">
      <section className="slot-conteiner__interface" ref={conteinerRef}>
        <div className="column first">
          <div
            className="reel one"
            ref={reelOneRef}
            style={{
              bottom: `-${gameState.reelsBottomPostion}px`,
            }}
          >
            {reel1.map((item) => (
              <Symbol key={uuidv4()} item={item} />
            ))}
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