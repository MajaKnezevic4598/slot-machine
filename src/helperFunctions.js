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
        const shuffled = matrix[i].map((item) => {
          return item === matrix[i][j] ? random : item;
        });

        matrix[i] = shuffled;
      }
    }
  }
  return matrix;
};

export const losingSymbols = (reelIndexArray, slotSymbols) => {
  let symbols = [...reelIndexArray, ...reelIndexArray];

  let losing = [];
  for (let i = 0; i < symbols.length; i++) {
    slotSymbols.forEach((item) => {
      if (item.id === symbols[i]) {
        losing.push({ ...item });
      }
    });
  }
  return losing;
};
