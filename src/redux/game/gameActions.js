import {
  RESET_GAME,
  BET_INCREMENT,
  BET_DECREMENT,
  REDUCE_CREDIT,
  SCORE,
} from "./gameTypes";

export const resetGame = () => {
  return {
    type: RESET_GAME,
  };
};

export const betIncrement = () => {
  return {
    type: BET_INCREMENT,
  };
};

export const betDecrement = () => {
  return {
    type: BET_DECREMENT,
  };
};

export const reduceCredit = () => {
  return {
    type: REDUCE_CREDIT,
  };
};

export const gameScore = (res) => {
  return {
    type: SCORE,
    payload: res,
  };
};
