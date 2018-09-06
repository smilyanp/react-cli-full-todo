import React from 'react';
import PropTypes from 'prop-types';

const ClearCompleted = (props) => {
  return (
    <button 
        className="btn btn-danger" 
        onClick={props.clearCompleted}>
            Clear completed
    </button>
  )
}
ClearCompleted.propTypes = {
    clearCompleted: PropTypes.func.isRequired
}

export default ClearCompleted;