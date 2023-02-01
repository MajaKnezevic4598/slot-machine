export const losingCombination = (arr1, arr2, arr3, arr4, arr5) => {
  let matrix = [[...arr1], [...arr2], [...arr3], [...arr4], [...arr5]];
  let min = Math.min(...arr1);
  let max = Math.max(...arr1);

  for (let i = 0; i < matrix.length - 2; i++) {
    for (let j = 0; j < arr1.length; j++) {
      if (
        matrix[i][j] === matrix[i + 1][j] &&
        matrix[i][j] === matrix[i + 2][j]
      ) {
        let random = Math.floor(Math.random() * (max - min) + min);
        if (random === matrix[i][j]) {
          random = random + 1;
        }

        let losingIndex = matrix[i][j];

        let arrayToChangePosition = matrix[i];

        const lastIndex = arrayToChangePosition.lastIndexOf(random);

        arrayToChangePosition[j] = random;
        arrayToChangePosition[lastIndex] = losingIndex;

        matrix[i] = arrayToChangePosition;
      }
    }
  }
  return matrix;
};

export const winningCombination = (arr1, arr2, arr3, arr4, arr5) => {
  let matrix = [[...arr1], [...arr2], [...arr3], [...arr4], [...arr5]];
  for (let i = 0; i < matrix.length - 2; i++) {
    for (let j = 0; j < arr1.length; j++) {
      if (matrix[i][j] === matrix[i + 1][j]) {
        let winingIndex = matrix[i][j];
        let arrayToChangePosition = matrix[i + 2];
        let indexToSwithPositon = arrayToChangePosition.indexOf(winingIndex);
        arrayToChangePosition[indexToSwithPositon] = arrayToChangePosition[j];
        arrayToChangePosition[j] = winingIndex;
        matrix[i + 2] = arrayToChangePosition;
      }
    }
  }
  return matrix;
};

export const settingSymbols = (reelIndexArray, slotSymbols) => {
  let indexes = [...reelIndexArray];

  let symbols = [];
  for (let i = 0; i < indexes.length; i++) {
    slotSymbols.forEach((item) => {
      if (item.id === indexes[i]) {
        symbols.push({ ...item });
      }
    });
  }
  return symbols;
};

//function that calculate how much do we need to move the div to be centered,
//after stoping the animation

export const deltaAfterStopingAnimation = (
  positionFromBottom,
  symbolHeight
) => {
  let delta;
  if (positionFromBottom % symbolHeight === 0) return 0;
  if (positionFromBottom < symbolHeight) return positionFromBottom;
  else {
    while (positionFromBottom - symbolHeight >= symbolHeight / 4) {
      delta = positionFromBottom - symbolHeight;
      positionFromBottom = positionFromBottom - symbolHeight;
    }
    return delta;
  }
};
