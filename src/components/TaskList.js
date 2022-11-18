import { Component } from 'react';

import Task from './Task';

export default class TaskList extends Component {
  render() {
    const tasks = this.props.data.map((el) => (
      <li key={el.id} className={`${el.editing ? 'editing' : ''} ${el.completed ? 'completed' : ''}`}>
        <Task
          el={el}
          taskCompleted={() => this.props.onCompleted(el.id)}
          onDeleted={() => this.props.onDeleted(el.id)}
        />
        <input type="text" className="edit" value={el.description} />
      </li>
    ));
    return <ul className="todo-list">{tasks}</ul>;
  }
}
