import React from 'react';
import PropTypes from 'prop-types';
import * as classNames from 'classnames';

const TodoItem = (props) => {
  return (
    <li className="list-group-item">
      <div className="row">
        <div className="col-sm-1">
          <input 
            type="checkbox" 
            checked={props.todo.completed} 
            onChange={(event) => props.checkTodo(props.todo, props.index, event)} />
        </div>
        <div className={classNames({"col-sm-6": true, "hidden": !props.todo.editing})}>
          <input 
            type="text" 
            className="form-control" 
            defaultValue={props.todo.title} 
            autoFocus 
            onBlur={(event) => props.doneEdit(props.todo, props.index, event)}
            onKeyUp={(event) => {
              if (event.key === 'Enter') {
                props.doneEdit(props.todo, props.index, event)
              } else if (event.key === 'Escape') {
                props.cancelEdit(props.todo, props.index, event)
              }
            }} />
        </div>
        <div 
          onDoubleClick={(event) => props.editTodo(props.todo, props.index, event)} 
          className={classNames({"col-sm-6 text-left": true, "completed": props.todo.completed, "hidden": props.todo.editing})}>
          {props.todo.title}
        </div>
        <div className="col-sm-5 text-right">
          <button 
            className="btn btn-danger" 
            onClick={(event) => props.deleteTodo(props.index)}>
                Delete
            </button>
        </div>
      </div>
    </li>
  )
}

TodoItem.propTypes = {
    todo: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    checkTodo: PropTypes.func.isRequired,
    editTodo: PropTypes.func.isRequired,
    doneEdit: PropTypes.func.isRequired,
    cancelEdit: PropTypes.func.isRequired,
    deleteTodo: PropTypes.func.isRequired
}

export default TodoItem;
