import React from 'react';
import PropTypes from 'prop-types';

import TasksFilter from './TasksFilter';

const Footer = ({ onChangeFilter, onClearCompleted, data, filter = 'All' }) => {
  return (
    <footer className="footer">
      <span className="todo-count">{`${data.filter((task) => !task.completed).length} items left`}</span>
      <TasksFilter filter={filter} onChangeFilter={onChangeFilter} />
      <button type="button" className="clear-completed" onClick={onClearCompleted}>
        Clear completed
      </button>
    </footer>
  );
};

Footer.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  filter: PropTypes.oneOf(['All', 'Active', 'Completed']),
  onChangeFilter: PropTypes.func.isRequired,
  onClearCompleted: PropTypes.func.isRequired,
};

export default Footer;
