import React from 'react';
import PropTypes from 'prop-types';

const Remaining = (props) => {
  return (
    <div>{props.remainingCount} Items left</div>
  )
}

Remaining.propTypes = {
    remainingCount: PropTypes.number.isRequired
}

export default Remaining;