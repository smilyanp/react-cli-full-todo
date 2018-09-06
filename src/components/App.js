import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import '../assets/App.css';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import Remaining from './Todos/Remaining';
import CheckAll from './Todos/CheckAll';
import ClearCompleted from './Todos/ClearCompleted';
import Filters from './Todos/Filters';
import AddTodo from './Todos/Add';
import TodoItem from './Todos/Todo';

import { inject, observer } from 'mobx-react';

@inject('TodoStore')
@observer

class App extends Component {
  render() {
    const TodoStore = this.props.TodoStore;
    return (
      <div className="container app">
        <div className="row">
          <div className="col-sm-12">

            <div className="row">
              <div className="col-sm-12">
                <AddTodo />
              </div>
            </div>

            <hr />
            <div className="row">

              <div className="col-sm-2">
                <CheckAll />
              </div>

              <div className="col-sm-6">
                <Filters />
              </div>

              <div className="col-sm-4 text-right">
                <ReactCSSTransitionGroup 
                  transitionName="fade" 
                  transitionEnterTimeout={300}
                  transitionLeaveTimeout={300}
                  >
                    {TodoStore.completedTodosCount > 0 &&
                      <ClearCompleted />
                    }
                </ReactCSSTransitionGroup>
              </div>

            </div>

            <hr />
            <ul className="list-group">
              <ReactCSSTransitionGroup 
                  transitionName="fade" 
                  transitionEnterTimeout={300}
                  transitionLeaveTimeout={300}
                  >
                  {TodoStore.todosFiltered.map(todo =>
                    <TodoItem 
                      todo={todo} 
                      key={todo.id} 
                    />
                  )}
              </ReactCSSTransitionGroup>
            </ul>

            <hr />
            <div className="row">
              <div className="col-sm-12 text-left">
                <Remaining />
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }
}

export default App;
