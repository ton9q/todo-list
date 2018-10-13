import React, { Component } from 'react';

import './TodoItem.css';

export default class TodoItem extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      text: this.props.todo.text,
      mode: "view"
    }

    this.removeTodo = this.removeTodo.bind(this);
    this.editTodo = this.editTodo.bind(this);
    this.saveTodo = this.saveTodo.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  removeTodo(id) {
    this.props.removeTodo(id);
  }

  editTodo(id) {
    this.setState({
      mode: "edit"
    });
  }

  saveTodo(id) {
    let newText = this.state.text;
    this.props.saveTodo(id, newText);

    this.setState({
      mode: "view"
    });
  }

  handleChange(e) {
    this.setState({
      text: e.target.value
    });
  }

  render() {
    if (this.state.mode === "view") {
      return (
        <div className="todoWrapper">
          <button className="removeTodo" onClick={(e) => this.removeTodo(this.props.id)}>Remove</button>
          <button className="changeTodo" onClick={(e) => this.editTodo(this.props.id)}>✎ Edit</button>
          {this.props.todo.text}
        </div>
      )
    } else {
      return (
        <div className="todoWrapper">
          <button className="removeTodo" onClick={(e) => this.removeTodo(this.props.id)}>Remove</button>
          <button className="changeTodo" onClick={(e) => this.saveTodo(this.props.id)}>✎ Save</button>
          <input className="inputChangeTodo" type="text" value={this.state.text} onChange={this.handleChange}/>
        </div>
      )
    }
  }
}