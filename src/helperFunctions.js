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

function winningArray(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] === arr[i + 1] && arr[i] === arr[i + 2]) {
      return arr;
    }
    if (arr[i] === arr[i + 1] && i === 0) {
      arr[i + 2] = arr[i];
      return arr;
    }
    if (arr[i] === arr[i + 1] && i !== 0) {
      arr[i - 1] = arr[i];
      return arr;
    }
  }

  let winning = arr[0];
  arr[1] = winning;
  arr[2] = winning;
  return arr;
}

// export const winningCombination = (arr1, arr2, arr3, arr4, arr5) => {
//   let matrix = [[...arr1], [...arr2], [...arr3], [...arr4], [...arr5]];
//   for (let i = 0; i < matrix.length - 2; i++) {
//     for (let j = 0; j < arr1.length; j++) {
//       if (matrix[i][j] === matrix[i + 1][j]) {
//         let winingIndex = matrix[i][j];
//         let arrayToChangePosition = matrix[i + 2];
//         let indexToSwithPositon = arrayToChangePosition.indexOf(winingIndex);
//         arrayToChangePosition[indexToSwithPositon] = arrayToChangePosition[j];
//         arrayToChangePosition[j] = winingIndex;
//         matrix[i + 2] = arrayToChangePosition;
//       }
//     }
//   }
//   return matrix;
// };

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
export const winningCombination = (arr1, arr2, arr3, arr4, arr5) => {
  let matrix = [
    [...initShuffleArray(arr1)],
    [...initShuffleArray(arr2)],
    [...initShuffleArray(arr3)],
    [...initShuffleArray(arr4)],
    [...initShuffleArray(arr5)],
  ];

  let horizontal1 = matrix.map((item) => item[0]);
  let horizontal2 = matrix.map((item) => item[1]);
  let horizontal3 = matrix.map((item) => item[2]);
  let horizontal4 = matrix.map((item) => item[3]);
  let horizontal5 = matrix.map((item) => item[4]);
  let horizontal6 = matrix.map((item) => item[5]);
  let horizontal7 = matrix.map((item) => item[6]);
  let horizontal8 = matrix.map((item) => item[7]);
  let horizontal9 = matrix.map((item) => item[8]);
  //da bismo imali pobednicku kombinaciju svaki treci treba da bude pobednicki
  //a ostala dva mozemo da napravimo da budu gubitnicki
  //tako cemo pri svakom vrtenju da imamo samo jednu dobitnu kombinaciju

  horizontal1 = winningArray(horizontal1);
  horizontal4 = winningArray(horizontal4);
  horizontal7 = winningArray(horizontal7);
  //sada moramo samo da vratimo u pocetni polozaj

  let matrix1 = [
    [...horizontal1],
    [...horizontal2],
    [...horizontal3],
    [...horizontal4],
    [...horizontal5],
    [...horizontal6],
    [...horizontal7],
    [...horizontal8],
    [...horizontal9],
  ];

  let vertical1 = matrix1.map((item) => item[0]);
  let vertical2 = matrix1.map((item) => item[1]);
  let vertical3 = matrix1.map((item) => item[2]);
  let vertical4 = matrix1.map((item) => item[3]);
  let vertical5 = matrix1.map((item) => item[4]);

  let completedMatrix = [
    [...vertical1],
    [...vertical2],
    [...vertical3],
    [...vertical4],
    [...vertical5],
  ];

  return completedMatrix;
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
  return [...symbols, ...symbols];
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
