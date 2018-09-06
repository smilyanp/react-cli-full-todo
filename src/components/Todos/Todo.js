import React from 'react';
import PropTypes from 'prop-types';
import * as classNames from 'classnames';

import { inject, observer } from 'mobx-react';

const TodoItem = inject('TodoStore')(observer(props => {
  const TodoStore = props.TodoStore;

  return (
    <li className="list-group-item">
      <div className="row">
        <div className="col-sm-1">
          <input 
            type="checkbox" 
            checked={props.todo.completed} 
            onChange={(event) => TodoStore.checkTodo(props.todo, event)} />
        </div>
        <div className={classNames({"col-sm-6": true, "hidden": !props.todo.editing})}>
          <input 
            type="text" 
            className="form-control" 
            defaultValue={props.todo.title} 
            autoFocus 
            onBlur={(event) => TodoStore.doneEdit(props.todo, event)}
            onKeyUp={(event) => {
              if (event.key === 'Enter') {
                TodoStore.doneEdit(props.todo, event)
              } else if (event.key === 'Escape') {
                TodoStore.cancelEdit(props.todo, event)
              }
            }} />
        </div>
        <div 
          onDoubleClick={(event) => TodoStore.editTodo(props.todo, event)} 
          className={classNames({"col-sm-6 text-left": true, "completed": props.todo.completed, "hidden": props.todo.editing})}>
          {props.todo.title}
        </div>
        <div className="col-sm-5 text-right">
          <button 
            className="btn btn-danger" 
            onClick={(event) => TodoStore.deleteTodo(props.todo.id)}>
                Delete
            </button>
        </div>
      </div>
    </li>
  )
}));

TodoItem.propTypes = {
    todo: PropTypes.object.isRequired,
}

export default TodoItem;
