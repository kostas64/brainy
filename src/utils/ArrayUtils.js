export const convertArrayToObject = array => {
  let result = {};

  for (let item of array) {
    let game = item.game;
    let data = item.data;

    result[game] = data;
  }

  return result;
};

export const padArray = (array, length) => {
  while (array.length < length) {
    array.push('');
  }

  return array;
};
