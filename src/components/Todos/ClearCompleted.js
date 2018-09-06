import React from 'react';

import { inject, observer } from 'mobx-react';

const ClearCompleted = inject('TodoStore')(observer(props => {
    return (
        <button 
            className="btn btn-danger" 
            onClick={props.TodoStore.clearCompleted}>
                Clear completed
        </button>
    )
}));

export default ClearCompleted;