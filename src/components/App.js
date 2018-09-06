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

class App extends Component {

  state = {
    newTodoId: 3,
    beforeEditCache: '',
    filter: 'all',
    todos: [
      {
        'id': 1,
        'title': 'Finish react screencast',
        'completed': false,
        'editing': false
      },
      {
        'id': 2,
        'title': 'Second todo',
        'completed': false,
        'editing': false
      }
    ]
  };

  addTodoInput = React.createRef();

  addTodo = e => {
    if (e.key === 'Enter') {
      const todoInput = this.addTodoInput.current;
      const todoName = todoInput.value

      if (todoName.trim().length !== 0) {
        this.setState((prevState, props) => {
          let todos = prevState.todos,
              newTodoId = prevState.newTodoId + 1;

          todos.push({
            'id': newTodoId,
            'title': todoName,
            'completed': false,
            'editing': false
          });

          return { todos, newTodoId };
        });

        todoInput.value = '';
      }
    }
  }

  deleteTodo = (index) => {
    this.setState((prevState, props) => {
      let todos = prevState.todos;
      todos.splice(index, 1);
      return todos;
    });
  }

  checkTodo = (todo, index, event) => {
    this.setState((prevState, props) => {
      let todos = prevState.todos;
      todo.completed = !todo.completed;
      todos.splice(index, 1, todo);
      return todos;
    });
  }

  editTodo = (todo, index, event) => {
    this.setState((prevState, props) => {
      let todos = prevState.todos;
      todo.editing = true;
      todos.splice(index, 1, todo);
      return { todos, beforeEditCache: todo.title };
    });
  }

  doneEdit = (todo, index, event) => {
    event.persist();
    this.setState((prevState, props) => {
      let todos = prevState.todos;
      todo.editing = false;

      if (event.target.value.trim().length !== 0) {
        todo.title = event.target.value;
      } else {
        todo.title = prevState.beforeEditCache;
      }
      todos.splice(index, 1, todo);
      return todos;
    });
  }

  cancelEdit = (todo, index, event) => {
    this.setState((prevState, props) => {
      let todos = prevState.todos;
      todo.title = prevState.beforeEditCache;
      todo.editing = false;
      todos.splice(index, 1, todo);
      return { todos, beforeEditCache: '' };
    });
  }

  remainingTodosCount = () => {
    return this.state.todos.filter(todo => !todo.completed).length;
  }

  anyRemaining = () => {
    return this.remainingTodosCount() !== 0;
  }

  completedTodosCount = () => {
    return this.state.todos.filter(todo => todo.completed).length; 
  }

  clearCompleted = () => {
    this.setState((prevState, props) => {
      return {
        todos: prevState.todos.filter(todo => !todo.completed)
      }
    });
  }

  updateFilter = filter => {
    this.setState({ filter });
  }

  todosFiltered = () => {
    if (this.state.filter === 'all') {
      return this.state.todos;
    } else if (this.state.filter === 'active') {
      return this.state.todos.filter(todo => !todo.completed);
    } else if (this.state.filter === 'completed') {
      return this.state.todos.filter(todo => todo.completed);
    }
  }

  checkAllTodos = (event) => {
    event.persist();
    this.setState((prevState, props) => {
      let todos = prevState.todos;
      todos.forEach(todo => todo.completed = event.target.checked);
      return { todos }
    });
  }

  render() {
    return (
      <div className="container app">
        <div className="row">
          <div className="col-sm-12">

            <div className="row">
              <div className="col-sm-12">
                <AddTodo 
                  addTodoInput={this.addTodoInput} 
                  addTodo={this.addTodo} />
              </div>
            </div>

            <hr />
            <div className="row">

              <div className="col-sm-2">
                <CheckAll 
                  handleCheckAllTodos={this.checkAllTodos} 
                  getAnyRemaining={this.anyRemaining()} />
              </div>

              <div className="col-sm-6">
                <Filters 
                  filter={this.state.filter} 
                  updateFilter={this.updateFilter} />
              </div>

              <div className="col-sm-4 text-right">
                <ReactCSSTransitionGroup 
                  transitionName="fade" 
                  transitionEnterTimeout={300}
                  transitionLeaveTimeout={300}
                  >
                    {this.completedTodosCount() > 0 &&
                      <ClearCompleted clearCompleted={this.clearCompleted} />
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
                  {this.todosFiltered().map((todo, index) => 
                    <TodoItem 
                      todo={todo} 
                      index={index} 
                      key={todo.id} 
                      checkTodo={this.checkTodo}
                      editTodo={this.editTodo}
                      doneEdit={this.doneEdit}
                      cancelEdit={this.cancelEdit}
                      deleteTodo={this.deleteTodo}
                    />
                  )}
              </ReactCSSTransitionGroup>
            </ul>

            <hr />
            <div className="row">
              <div className="col-sm-12 text-left">
                <Remaining 
                  remainingCount={this.remainingTodosCount()} />
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }
}

export default App;
