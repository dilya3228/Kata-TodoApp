import React, { useState } from 'react';
import PropTypes from 'prop-types';

const NewTaskForm = ({ onAddTask }) => {
  const [description, setDescription] = useState('');
  const [min, setMin] = useState('');
  const [sec, setSec] = useState('');

  const onInput = (event) => {
    setDescription(event.target.value);
  };

  const onInputMin = (event) => {
    setMin(+event.target.value);
  };

  const onInputSec = (event) => {
    setSec(+event.target.value);
  };

  const onEnter = (event) => {
    event.preventDefault();
    onAddTask({ description, min, sec });
    setDescription('');
    setMin('');
    setSec('');
  };
  return (
    <form className="new-todo-form" onSubmit={onEnter}>
      <input className="new-todo" placeholder="What needs to be done?" onChange={onInput} value={description} />
      <input
        onChange={onInputMin}
        value={min}
        placeholder="Min"
        type="number"
        className="new-todo new-todo-form__timer"
      />
      <input
        onChange={onInputSec}
        value={sec}
        type="number"
        placeholder="Sec"
        className="new-todo new-todo-form__timer"
      />
      <input type="submit" hidden />
    </form>
  );
};

NewTaskForm.propTypes = {
  onAddTask: PropTypes.func.isRequired,
};

export default NewTaskForm;
