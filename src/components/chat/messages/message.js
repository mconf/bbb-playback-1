import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Info from './info';
import Margin from './margin';
import player from 'utils/player';
import './index.scss';
import ChatMessageReactions from './reactions';

const propTypes = {
  active: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  circle: PropTypes.bool,
  emphasized: PropTypes.bool,
  icon: PropTypes.string,
  initials: PropTypes.string,
  name: PropTypes.string,
  timestamp: PropTypes.number,
};

const defaultProps = {
  active: false,
  children: null,
  circle: false,
  emphasized: false,
  icon: '',
  initials: '',
  name: '',
  timestamp: 0,
};

const Message = ({
  active,
  children,
  circle,
  emphasized,
  icon,
  initials,
  edited,
  name,
  reactions,
  timestamp,
}) => {
  const handleOnClick = () => {
    player.primary.currentTime(timestamp);
  };

  return (
    <div className="message">
      <div
        className="main-content-wrapper"
      >
        <Margin
          active={active}
          circle={circle}
          icon={icon}
          initials={initials}
          name={name}
          onClick={() => handleOnClick()}
        />
        <div className="data">
          <Info
            edited={edited}
            active={active}
            name={name}
            timestamp={timestamp}
          />
          <div className={cx('text', { inactive: !active, emphasized })}>
            {children}
          </div>
        </div>
      </div>
      <ChatMessageReactions
        reactions={reactions}
        active={active}
      />
    </div>
  );
};

Message.propTypes = propTypes;
Message.defaultProps = defaultProps;

export default Message;
