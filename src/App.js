import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './App.css';
import * as classNames from 'classnames';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';


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
    
    console.log(todo);

    this.setState((prevState, props) => {
      let todos = prevState.todos;
      todo.title = prevState.beforeEditCache;
      todo.editing = false;

      console.log(todo, index);

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
      console.log(todos);
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
                <input 
                  type="text" 
                  placeholder="What should we do next?" 
                  className="form-control input-lg" 
                  ref={this.addTodoInput}
                  onKeyUp={this.addTodo} />
              </div>
            </div>

            <hr />
            <div className="row">
              <div className="col-sm-6">
                <div className="btn-group">
                  <button className={classNames({"btn btn-default": true, "active": this.state.filter === 'all'})} onClick={() => this.updateFilter('all')}>All</button>
                  <button className={classNames({"btn btn-default": true, "active": this.state.filter === 'active'})} onClick={() => this.updateFilter('active')}>Active</button>
                  <button className={classNames({"btn btn-default": true, "active": this.state.filter === 'completed'})} onClick={() => this.updateFilter('completed')}>Completed</button>
                </div>
              </div>
              <div className="col-sm-6 text-right">
                <ReactCSSTransitionGroup 
                  transitionName="fade" 
                  transitionEnterTimeout={300}
                  transitionLeaveTimeout={300}
                  >
                    {this.completedTodosCount() > 0 &&
                      <button 
                        className="btn btn-danger" 
                        onClick={this.clearCompleted}>
                          Clear completed
                      </button>
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
                    <li className="list-group-item" key={todo.id}>
                      <div className="row">
                        <div className="col-sm-1">
                          <input type="checkbox" checked={todo.completed} onChange={(event) => this.checkTodo(todo, index, event)} />
                        </div>
                        {/*<div className={"col-sm-6 text-left " + (todo.completed ? 'completed' : '')}>{todo.title}</div>*/}
                        <div className={classNames({"col-sm-6": true, "hidden": !todo.editing})}>
                          <input 
                            type="text" 
                            className="form-control" 
                            defaultValue={todo.title} 
                            autoFocus 
                            onBlur={(event) => this.doneEdit(todo, index, event)}
                            onKeyUp={(event) => {
                              if (event.key === 'Enter') {
                                this.doneEdit(todo, index, event)
                              } else if (event.key === 'Escape') {
                                this.cancelEdit(todo, index, event)
                              }
                            }} />
                        </div>
                        <div 
                          onDoubleClick={(event) => this.editTodo(todo, index, event)} 
                          className={classNames({"col-sm-6 text-left": true, "completed": todo.completed, "hidden": todo.editing})}>
                          {todo.title}
                        </div>
                        <div className="col-sm-5 text-right">
                          <button className="btn btn-danger" onClick={(event) => this.deleteTodo(index)}>Delete</button>
                        </div>
                      </div>
                    </li>
                  )}
              </ReactCSSTransitionGroup>
            </ul>

            <hr />
            <div className="row">
              <div className="col-sm-8">
                <label><input type="checkbox" onChange={this.checkAllTodos} checked={!this.anyRemaining()} /> Check all</label>
              </div>
              <div className="col-sm-4 text-right">
                {this.remainingTodosCount()} items left
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }
}

export default App;
