import dict from '../assets/values/dict.json';

export const capFirstLet = string => {
  return `${string?.charAt(0)?.toUpperCase()}${string?.slice(1)}`;
};

export const getAdaptedScores = (game, scores, passedScores) => {
  if (passedScores) {
    const item = passedScores?.filter(gm => gm.game === game)?.[0]?.data?.[0];
    const ms = item?.milliseconds;
    const points = item?.points;
    const flips = item?.flips;
    const time = msToMMSSmmm(ms);

    const scoreUnit = flips
      ? `${flips} flips`
      : points
      ? `${points} points`
      : '';

    const scoreLabel = `${`${
      ms ? `${time} (${scoreUnit})` : `${points} points (${item?.correctness}%)`
    }`}`;

    const score = !!ms || !!points ? scoreLabel : dict?.gamesNoScore;
    return score;
  } else {
    const ms = scores[game]?.[0]?.milliseconds;
    const points = scores[game]?.[0]?.points;
    const flips = scores[game]?.[0]?.flips;
    const time = msToMMSSmmm(ms);

    const scoreUnit = flips
      ? `${flips} flips`
      : points
      ? `${points} points`
      : '';

    const scoreLabel = `${`${
      ms
        ? `${time} (${scoreUnit})`
        : `${points} points (${scores[game]?.[0]?.correctness}%)`
    }`}`;
    const score = !!ms || !!points ? scoreLabel : dict?.gamesNoScore;
    return score;
  }
};

export const getAdaptedScore = value => {
  const ms = value?.milliseconds;
  const points = value.points;
  const flips = value.flips;
  const time = msToMMSSmmm(ms);

  const scoreUnit = flips ? `${flips} flips` : points ? `${points} points` : '';

  const scoreLabel = `${`${
    ms ? `${time} (${scoreUnit})` : `${points} points (${value?.correctness}%)`
  }`}`;
  const score = !!ms || !!points ? scoreLabel : dict?.gamesNoScore;

  return score;
};

export const msToMMSSmmm = milliseconds => {
  // Calculate minutes
  var minutes = Math.floor(milliseconds / 60000);

  // Calculate remaining milliseconds after subtracting minutes
  var remainingMs = milliseconds % 60000;

  // Calculate seconds
  var seconds = Math.floor(remainingMs / 1000);

  // Calculate remaining milliseconds after subtracting seconds
  var remainingMs = remainingMs % 1000;

  // Format the result as MM:SS:mmm
  var result =
    padZero(minutes) + ':' + padZero(seconds) + '.' + padZero(remainingMs, 3);
  return result;
};

// Helper function to pad zeros for formatting
const padZero = (num, size = 2) => {
  var numString = num.toString();
  while (numString.length < size) {
    numString = '0' + numString;
  }
  return numString;
};
