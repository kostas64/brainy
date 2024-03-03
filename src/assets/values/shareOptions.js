import {Platform} from 'react-native';

import dict from '../values/dict.json';

const title = dict.shareTitleContent;
const message = dict.sharePreviewContent;
const urls = dict.shareDescContent;

export const shareOptions = Platform.select({
  ios: {
    failOnCancel: false,
    activityItemSources: [
      {
        placeholderItem: {
          type: 'text',
          content: `${title}\n ${urls}`,
        },
        item: {
          default: {
            type: 'text',
            content: `${title}\n ${urls}`,
          },
          message: {
            type: 'text',
            content: `${title}\n ${urls}`,
          },
        },
        linkMetadata: {
          title: message,
        },
        subject: {
          default: message,
        },
      },
    ],
  },
  default: {
    failOnCancel: false,
    message: `${title}\n${urls}`,
  },
});
