import { getCurrentDataIndex } from 'utils/data';
import player from 'utils/player';

const search = (text, thumbnails) => {
  const result = [];

  const value = text.toLowerCase();
  thumbnails.forEach((thumbnail, index) => {
    const { alt } = thumbnail;

    if (alt.toLowerCase().indexOf(value) !== -1) {
      result.push(index);
    }
  });

  return result;
};

const seek = (seconds) => {
  const min = 0;
  const max = player.primary.duration();
  const time = player.primary.currentTime() + seconds;

  if (time < min) {
    player.primary.currentTime(min);
  } else if (time > max) {
    player.primary.currentTime(max);
  } else {
    player.primary.currentTime(time);
  }
};

const skip = (data, change) => {
  const min = 0;
  const max = data.length - 1;
  const time = player.primary.currentTime();

  const current = getCurrentDataIndex(data, time);
  if (current === -1) return null;

  const index = current + change;

  let timestamp;
  if (index < min) {
    timestamp = data[min].timestamp;
  } else if (index > max) {
    timestamp = data[max].timestamp;
  } else {
    timestamp = data[index].timestamp;
  }

  if (typeof timestamp !== 'undefined') {
    player.primary.currentTime(timestamp);
  }
};

export {
  search,
  seek,
  skip,
};
