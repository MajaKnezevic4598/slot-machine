import {
  RESET_GAME,
  BET_INCREMENT,
  BET_DECREMENT,
  REDUCE_CREDIT,
  SCORE,
} from "./gameTypes";

const initialState = {
  bet: 1,
  credit: 20,
  amount: 100,
};

const gameReducer = (state = initialState, action) => {
  switch (action.type) {
    case BET_INCREMENT: {
      return {
        ...state,
        bet: state.bet === 5 ? state.bet : state.bet + 1,
      };
    }
    case BET_DECREMENT: {
      return {
        ...state,
        bet: state.bet === 1 ? state.bet : state.bet - 1,
      };
    }
    case REDUCE_CREDIT: {
      return {
        ...state,
        amount: state.amount - state.bet * state.credit,
      };
    }
    case SCORE: {
      return {
        ...state,
        amount: state.amount + action.payload,
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
