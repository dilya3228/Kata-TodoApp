import { Component } from 'react';

import Task from './Task';

export default class TaskList extends Component {
  render() {
    const tasks = this.props.data.map((el) => (
      <li key={el.id} className={`${el.editing ? 'editing' : ''} ${el.completed ? 'completed' : ''}`}>
        <Task el={el} onCompleted={this.props.onCompleted} completed={this.props.data.completed} />
        <input type="text" className="edit" value={el.description} />
      </li>
    ));
    return <ul className="todo-list">{tasks}</ul>;
  }
}
