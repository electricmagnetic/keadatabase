import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

/**
  Uses moment to help provide some common formats for displaying dates and times.
 */
const FormatDateTime = ({ format, calendar, children }) => {
  const momentParse = 'YYYY-MM-DD HH:mm:ss';

  const momentCalendarStrings = {
    lastDay: '[Yesterday at] LT',
    sameDay: '[Today at] LT',
    nextDay: '[Tomorrow at] LT',
    lastWeek: '[Last] dddd [at] LT',
    nextWeek: 'dddd [at] LT',
    sameElse: '[On] D MMM YYYY[,] LT',
  };

  if (calendar) {
    return (
      <Moment calendar={momentCalendarStrings} parse={momentParse}>
        {children}
      </Moment>
    );
  } else {
    var momentFormat = '';

    switch (format) {
      case 'shortDate':
        momentFormat = 'DD/MM/YY';
        break;
      case 'mediumDate':
        momentFormat = 'ddd DD MMM';
        break;
      case 'longDate':
        momentFormat = 'dddd DD MMMM YYYY';
        break;
      case 'longDateTime':
        momentFormat = 'dddd D MMMM YYYY[,] LT';
        break;
      default:
        momentFormat = 'ddd DD MMMM';
    }

    return (
      <Moment format={momentFormat} parse={momentParse}>
        {children}
      </Moment>
    );
  }
};

FormatDateTime.propTypes = {
  children: PropTypes.any.isRequired,
  format: PropTypes.string.isRequired,
  calendar: PropTypes.bool.isRequired,
};

FormatDateTime.defaultProps = {
  format: 'long',
  calendar: false,
};

export default FormatDateTime;
