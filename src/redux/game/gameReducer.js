import {
  RESET_GAME,
  BET_INCREMENT,
  BET_DECREMENT,
  REDUCE_CREDIT,
  SCORE,
} from "./gameTypes";

const initialState = {
  bet: 1,
  winningResult: 0,
  credit: 20,
  message: "",
};

const gameReducer = (state = initialState, action) => {
  switch (action.type) {
    case BET_INCREMENT: {
      return {
        ...state,
        bet: 1,
      };
    }
    case BET_DECREMENT: {
      return {
        ...state,
        bet: 3,
      };
    }
    case REDUCE_CREDIT: {
      return {
        ...state,
        credit: state.credit - state.bet,
        message: "",
      };
    }
    case SCORE: {
      return {
        ...state,
        winningResult: state.bet * action.payload,
        message: action.payload === 0 ? "Try again!" : "You won!",
      };
    }
    case RESET_GAME: {
      return initialState;
    }

    default:
      return state;
  }
};

export default gameReducer;
