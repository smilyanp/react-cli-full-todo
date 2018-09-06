import React from 'react';
import { observable, action, computed } from 'mobx';

class TodoStore {
    @observable newTodoId = 3;
    @observable addTodoInput = React.createRef();
    @observable beforeEditCache = '';
    @observable filter = 'all';
    @observable todos = [
      {
        'id': 1,
        'title': 'Finish MobX screencast',
        'completed': false,
        'editing': false
      },
      {
        'id': 2,
        'title': 'Second MobX todo',
        'completed': false,
        'editing': false
      }
    ];

    @action addTodo = e => {
        if (e.key === 'Enter') {
            let todoName = this.addTodoInput.current;

            if (todoName.value.trim().length === 0) {
                return
            }

            this.todos.push({
                'id': this.newTodoId,
                'title': todoName.value,
                'completed': false,
                'editing': false
            });

            this.newTodoId ++;
            todoName.value = '';
        }
    }

    @action deleteTodo = id => {
        const index = this.todos.findIndex(item => item.id === id);
        this.todos.splice(index, 1);
    }

    @action checkTodo = (todo, event) => {
        const index = this.todos.findIndex(item => item.id === todo.id);
        todo.completed = !todo.completed;
        this.todos.splice(index, 1, todo);
    }

    @action editTodo = (todo, event) => {
        const index = this.todos.findIndex(item => item.id === todo.id);
        todo.editing = true;
        this.beforeEditCache = todo.title;
        this.todos.splice(index, 1, todo);
    }

    @action doneEdit = (todo, event) => {
        const index = this.todos.findIndex(item => item.id === todo.id);
        todo.editing = false;
        if (event.target.value.trim().length !== 0) {
            todo.title = event.target.value;
        } else {
            todo.title = this.beforeEditCache;
        }
        this.todos.splice(index, 1, todo);
    }

    @action cancelEdit = (todo, event) => {
        const index = this.todos.findIndex(item => item.id === todo.id);
        todo.title = this.beforeEditCache;
        todo.editing = false;
        this.todos.splice(index, 1, todo);
        this.beforeEditCache = '';
    }

    @action checkAllTodos = (event) => {
        this.todos.forEach(todo => todo.completed = event.target.checked);
    }

    @action clearCompleted = () => {
        this.todos = this.todos.filter(todo => !todo.completed);
    }

    @action updateFilter = filter => {
        this.filter = filter;
    }

    @computed get todosFiltered() {
        if (this.filter === 'all') {
          return this.todos;
        } else if (this.filter === 'active') {
          return this.todos.filter(todo => !todo.completed);
        } else if (this.filter === 'completed') {
          return this.todos.filter(todo => todo.completed);
        }
    }

    @computed get remainingTodosCount() {
        return this.todos.filter(todo => !todo.completed).length;
    }

    @computed get anyRemaining() {
        return this.remainingTodosCount !== 0;
    }

    @computed get completedTodosCount() {
        return this.todos.filter(todo => todo.completed).length;
    }
}

const store = new TodoStore();
export default store;