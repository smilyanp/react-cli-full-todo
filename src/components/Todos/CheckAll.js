import React from 'react';

import { inject, observer } from 'mobx-react';

const CheckAll = inject('TodoStore')(observer(props => {
    const TodoStore = props.TodoStore;
    return (
        <label>
            <input type="checkbox" onChange={TodoStore.checkAllTodos} checked={!TodoStore.anyRemaining} /> Check all
        </label>
    );
}));

export default CheckAll;