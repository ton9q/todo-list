import React, { Component } from 'react';
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';

import './App.css';

import Header from './components/header/Header';
import TodoItem from './components/todoItem/TodoItem';
import TodoInput from './components/todoInput/TodoInput';

const SortableItem = SortableElement(({todo, remove, save}) => 
  <li>
    <TodoItem todo={todo} key={todo.id} id={todo.id} removeTodo={remove} saveTodo={save} />
  </li>
);

const SortableList = SortableContainer(({todos, remove, save}) => {
  return (
    <ul>
      {todos.map((todo, index) => (
        <SortableItem key={`item-${index}`} index={index} todo={todo} remove={remove} save={save} />
      ))}
    </ul>
  );
});

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: [
        {id: 0, text: "Make dinner tonight!"},
        {id: 1, text: "Fold thelaundry"},
        {id: 2, text: "Learn to take a React app!"}
      ],
      nextId: 3
    };

    this.addTodo = this.addTodo.bind(this);
    this.removeTodo = this.removeTodo.bind(this);
    this.saveTodo = this.saveTodo.bind(this);
    this.onSortEnd = this.onSortEnd.bind(this);
  }

  addTodo(todoText) {
    let todos = this.state.todos.slice();

    todos.push({id: this.state.nextId, text: todoText});
    let newNextId = this.state.nextId + 1;

    this.setState({
      todos: todos,
      nextId: newNextId
    });
  }

  removeTodo(id) {
    this.setState({
      todos: this.state.todos.filter((todo) => todo.id !== id)
    });
  }

  saveTodo(id, newText) {
    let newTodos = this.state.todos.map((todo) => {
      if (todo.id === id) {
        todo.text = newText;
      }
      return todo;
    });

    this.setState({
      todos: newTodos
    })
  }

  onSortEnd = ({oldIndex, newIndex}) => {
    this.setState({
      todos: arrayMove(this.state.todos, oldIndex, newIndex),
    });
  };

  render() {
    return (
      <div className="App">
        <Header />
        <TodoInput addTodo={this.addTodo} />
        <SortableList todos={this.state.todos} onSortEnd={this.onSortEnd} remove={this.removeTodo} save={this.saveTodo} />
      </div>
    );
  }
}

export default App;