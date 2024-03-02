import dict from '../assets/values/dict.json';

export const capFirstLet = string => {
  return `${string?.charAt(0)?.toUpperCase()}${string?.slice(1)}`;
};

export const getAdaptedScores = (game, scores, passedScores) => {
  if (passedScores) {
    const item = passedScores?.filter(gm => gm.game === game)?.[0]?.data?.[0];
    const ms = item?.milliseconds;
    const points = item?.points;
    const scoreLabel = `${`${
      ms
        ? `${ms / 1000}s (${item?.flips} flips)`
        : `${points} points (${item?.correctness}%)`
    }`}`;
    const score = !!ms || !!points ? scoreLabel : dict?.gamesNoScore;
    return score;
  } else {
    const ms = scores[game]?.[0]?.milliseconds;
    const points = scores[game]?.[0]?.points;
    const scoreLabel = `${`${
      ms
        ? `${ms / 1000}s (${scores[game]?.[0]?.flips} flips)`
        : `${points} points (${scores[game]?.[0]?.correctness}%)`
    }`}`;
    const score = !!ms || !!points ? scoreLabel : dict?.gamesNoScore;
    return score;
  }
};
