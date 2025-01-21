import React from 'react';
import PropTypes from 'prop-types';
import {
  defineMessages,
  useIntl,
} from 'react-intl';
import Url from './url';
import SystemMessage from 'components/chat/messages/system/message';
import { ID } from 'utils/constants';

const intlMessages = defineMessages({
  videoName: {
    id: 'player.chat.message.video.name',
    description: 'Label for the video message name',
  },
  audioName: {
    id: 'player.chat.message.audio.name',
    description: 'Label for the audio message name',
  },
});

const propTypes = {
  active: PropTypes.bool,
  url: PropTypes.url,
  timestamp: PropTypes.number,
  isAudio: PropTypes.bool,
  isLocal: PropTypes.bool,
};

const defaultProps = {
  active: false,
  url: '',
  timestamp: 0,
  isAudio: false,
  isLocal: false,
};

// leave just the fileName for local files
const formatUrl = (url) => {
  const urlParams = new URLSearchParams(url);
  return Array.from(urlParams.values())[0];
}

const Video = ({
  active,
  url,
  timestamp,
  isAudio,
  isLocal,
}) => {
  const intl = useIntl();

  return (
    <SystemMessage
      active={active}
      icon={isAudio ? 'audios' : ID.VIDEOS}
      name={isAudio ? intl.formatMessage(intlMessages.audioName) : intl.formatMessage(intlMessages.videoName)}
      timestamp={timestamp}
    >
      <Url
        active={active}
        url={isLocal ? formatUrl(url) : url}
      />
    </SystemMessage>
  );
};

Video.propTypes = propTypes;
Video.defaultProps = defaultProps;

// Checks the message active state
const areEqual = (prevProps, nextProps) => {
  if (prevProps.active !== nextProps.active) return false;

  return true;
};

export default React.memo(Video, areEqual);
