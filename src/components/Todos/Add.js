import React from 'react';
import PropTypes from 'prop-types';

const Add = (props) => {
  return (
    <input 
      type="text" 
      placeholder="What should we do next?" 
      className="form-control input-lg" 
      ref={props.addTodoInput}
      onKeyUp={props.addTodo} />
  )
}

Add.propTypes = {
    addTodoInput: PropTypes.object.isRequired,
    addTodo: PropTypes.func.isRequired
}

export default Add;