import moment from 'moment';

export const shuffleArray = array => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export const getRandom = (min, max) => {
  // Get the current time in milliseconds and use
  // it as the seed for a pseudo-random number generator
  let seed = Math.random() * new Date().getTime();
  let random = (seed * 9301 + 49297) % 233280;
  let randomNumber = min + (random / 233280) * (max - min);

  return randomNumber;
};

export const calcTimestamp = timestamp => {
  const ms = new Date().getTime() - new Date(timestamp);
  const duration = moment.duration(ms);

  const years = Math.floor(duration.asYears());
  duration.subtract(years, 'years');

  const months = Math.floor(duration.asMonths());
  duration.subtract(months, 'months');

  const weeks = Math.floor(duration.asWeeks());
  duration.subtract(weeks, 'weeks');

  const days = Math.floor(duration.asDays());
  duration.subtract(days, 'days');

  const hours = Math.floor(duration.asHours());
  duration.subtract(hours, 'hours');

  if (years === 0 && months === 0 && weeks === 0 && hours >= 0) {
    return `${hours === 0 ? '1 h' : `${hours} h`}`;
  }

  if (years === 0 && months === 0 && weeks > 0) {
    return `${weeks} w`;
  }

  if (years === 0 && months > 0) {
    return `${months} m`;
  }

  if (years > 0) {
    return `${years} y`;
  }
};

export const normalizeMS = ms => {
  const value = Math.floor(ms % 1000);
  const normalized =
    `${value}`.length === 1
      ? `${value}00`
      : `${value}`.length === 2
      ? `${value}0`
      : `${value}`;

  return normalized;
};
