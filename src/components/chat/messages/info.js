import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'components/utils/icon';
import { FormattedTime } from 'react-intl';
import cx from 'classnames';
import { getTimestampAsMilliseconds } from 'utils/data';
import './index.scss';

const propTypes = {
  active: PropTypes.bool,
  name: PropTypes.string,
  timestamp: PropTypes.number,
};

const defaultProps = {
  active: false,
  name: '',
  timestamp: 0,
};

const Info = ({
  active,
  name,
  timestamp,
  edited,
}) => {
  const milliseconds = getTimestampAsMilliseconds(timestamp);

  return (
    <div className="info">
      <div className={cx('name', { inactive: !active })}>
        {name}
      </div>
      <div className={cx('time', { inactive: !active })}>
        <FormattedTime
          hourCycle="h23"
          hour="numeric"
          minute="numeric"
          second="numeric"
          timeZone="UTC"
          value={milliseconds}
        />
      </div>
      { edited
        && (
        <span className='edited-tag'>
          <Icon name='pen'/>
          <span className='edited-label'>(Edited)</span>
        </span>
      )}
    </div>
  );
};

Info.propTypes = propTypes;
Info.defaultProps = defaultProps;

export default Info;
