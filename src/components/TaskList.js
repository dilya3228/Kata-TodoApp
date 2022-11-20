import { Component } from 'react';
import PropTypes from 'prop-types';

import Task from './Task';

export default class TaskList extends Component {
  static defaultProps = {
    filter: 'All',
  };

  static propTypes = {
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    filter: PropTypes.oneOf(['All', 'Active', 'Completed']),
    onDeleted: PropTypes.func.isRequired,
    onCompleted: PropTypes.func.isRequired,
    onToggleEdit: PropTypes.func.isRequired,
  };

  render() {
    const tasks = this.props.data
      .filter((task) => {
        switch (this.props.filter) {
          case 'All':
            return true;
          case 'Active':
            return !task.completed;
          case 'Completed':
            return task.completed;
          default:
            return false;
        }
      })
      .map((el) => (
        <li key={el.id} id={el.id} className={`${el.editing ? 'editing' : ''} ${el.completed ? 'completed' : ''}`}>
          <Task
            el={el}
            taskCompleted={() => this.props.onCompleted(el.id)}
            onDeleted={() => this.props.onDeleted(el.id)}
            updateTask={this.props.updateTask}
            onToggleEdit={() => this.props.onToggleEdit(el.id)}
          />
          {/* <input type="text" className="edit" value={el.description} /> */}
        </li>
      ));
    return <ul className="todo-list">{tasks}</ul>;
  }
}
