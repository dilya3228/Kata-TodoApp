import { Component } from 'react';

import TasksFilter from './TasksFilter';

export default class Footer extends Component {
  render() {
    return (
      <footer className="footer">
        <span className="todo-count">items left</span>
        <TasksFilter />
        <button type="button" className="clear-completed">
          Clear completed
        </button>
      </footer>
    );
  }
}
