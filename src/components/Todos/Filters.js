import React from 'react';
import * as classNames from 'classnames';

import { inject, observer } from 'mobx-react';

const Filters = inject('TodoStore')(observer(props => {
  const TodoStore = props.TodoStore;
  return (
    <div className="btn-group">
      <button className={classNames({"btn btn-default": true, "active": TodoStore.filter === 'all'})} onClick={() => TodoStore.updateFilter('all')}>All</button>
      <button className={classNames({"btn btn-default": true, "active": TodoStore.filter === 'active'})} onClick={() => TodoStore.updateFilter('active')}>Active</button>
      <button className={classNames({"btn btn-default": true, "active": TodoStore.filter === 'completed'})} onClick={() => TodoStore.updateFilter('completed')}>Completed</button>
    </div>
  )
}));

export default Filters;