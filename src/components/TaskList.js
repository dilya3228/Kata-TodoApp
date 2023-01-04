/* eslint-disable indent */
import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Task from './Task';

const TaskList = ({
  onChangeDescription,
  data,
  onCompleted,
  onDeleted,
  onEditDescription,
  filter = 'All',
  onCountTimer,
}) => {
  const [taskDescription, setTaskDescription] = useState('');

  const onInput = (event) => {
    setTaskDescription(event.target.value);
  };

  const onEnter = (event, id) => {
    event.preventDefault();
    onChangeDescription(id, taskDescription);
  };

  const onFilter = (task, choisenFilter) => {
    switch (choisenFilter) {
      case 'All':
        return false;
      case 'Active':
        return task.completed;
      case 'Completed':
        return !task.completed;
      default:
        return true;
    }
  };
  const tasks = data.map((el) => (
    <li
      key={el.id}
      id={el.id}
      className={`${el.editing ? 'editing' : ''} ${el.completed ? 'completed' : ''}`}
      hidden={onFilter(el, filter)}
    >
      <Task
        el={el}
        onTaskCompleted={() => onCompleted(el.id)}
        onDeleted={() => onDeleted(el.id)}
        onEditDescription={() => onEditDescription(el.id)}
        onCountTimer={() => onCountTimer(el.id)}
      />
      <form onSubmit={(event) => onEnter(event, el.id)} onBlur={(event) => onEnter(event, el.id)}>
        <input type="text" className="edit" defaultValue={el.description} onChange={onInput} onFocus={onInput} />
      </form>
    </li>
  ));
  return <ul className="todo-list">{tasks}</ul>;
};

TaskList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  filter: PropTypes.oneOf(['All', 'Active', 'Completed']),
  onDeleted: PropTypes.func.isRequired,
  onCompleted: PropTypes.func.isRequired,
  onEditDescription: PropTypes.func.isRequired,
  onChangeDescription: PropTypes.func.isRequired,
};

export default TaskList;
