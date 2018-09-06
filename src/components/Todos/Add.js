import React from 'react';

import { inject, observer } from 'mobx-react';

const Add = inject('TodoStore')(observer(props => {
  const TodoStore = props.TodoStore;
  return (
    <input 
      type="text" 
      placeholder="What should we do next?" 
      className="form-control input-lg" 
      ref={TodoStore.addTodoInput}
      onKeyUp={TodoStore.addTodo} />
  )
}))

export default Add;