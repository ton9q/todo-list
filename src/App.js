import React, { Component } from 'react';
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';

import './App.css';

import Header from './components/header';
import TodoInput from './components/todoInput';
import TodoItem from './components/todoItem';

import EnchancedCounter from './containers/enchancedCounter';
const SortableItem = SortableElement(({todo, remove}) => 
  <li>
    <TodoItem todo={todo} key={todo.id} id={todo.id} removeTodo={remove} />
  </li>
);

const SortableList = SortableContainer(({todos, remove}) => {
  return (
    <ul>
      {todos.map((todo, index) => (
        <SortableItem key={`item-${index}`} index={index} todo={todo} remove={remove} />
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
  }

  addTodo(todoText) {
    let todos = this.state.todos.slice();

    todos.push({id: this.state.nextId, text: todoText});
    this.setState({
      todos: todos,
      nextId: ++this.state.nextId
    });
  }

  removeTodo(id) {
    this.setState({
      todos: this.state.todos.filter((todo) => todo.id !== id)
    });
  }

  onSortEnd = ({oldIndex, newIndex}) => {
    this.setState({
      todos: arrayMove(this.state.todos, oldIndex, newIndex),
    });
  };

  render() {
    return (
      <div className="App">
        <div className="todo-wrapper">
          <Header />
          <TodoInput todoText="" addTodo={this.addTodo} />
          <SortableList todos={this.state.todos} onSortEnd={this.onSortEnd} remove={this.removeTodo}/>
          <EnchancedCounter />
        </div>
      </div>
    );
  }
}

export default App;