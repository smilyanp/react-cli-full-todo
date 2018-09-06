import React from 'react';

import { inject, observer } from 'mobx-react';

const Remaining = inject('TodoStore')(observer(props => {
  const TodoStore = props.TodoStore;
  return (
    <div>{TodoStore.remainingTodosCount} Items left</div>
  )
}));

export default Remaining;