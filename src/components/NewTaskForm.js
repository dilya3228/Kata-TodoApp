import { Component } from 'react';
import PropTypes from 'prop-types';

export default class NewTaskForm extends Component {
  static propTypes = {
    onAddTask: PropTypes.func.isRequired,
  };

  state = {
    newTask: {
      description: '',
      min: '',
      sec: '',
    },
  };

  onInput = (event) => {
    this.setState((state) => ({
      newTask: {
        ...state.newTask,
        description: event.target.value,
      },
    }));
  };

  onInputMin = (event) => {
    this.setState((state) => ({
      newTask: {
        ...state.newTask,
        min: +event.target.value,
      },
    }));
  };

  onInputSec = (event) => {
    this.setState((state) => ({
      newTask: {
        ...state.newTask,
        sec: +event.target.value,
      },
    }));
  };

  onEnter = (event) => {
    event.preventDefault();
    this.props.onAddTask(this.state.newTask);
    this.setState({
      newTask: {
        description: '',
        min: '',
        sec: '',
      },
    });
  };

  render() {
    return (
      <form className="new-todo-form" onSubmit={this.onEnter}>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          onChange={this.onInput}
          value={this.state.newTask.description}
        />
        <input
          onChange={this.onInputMin}
          value={this.state.newTask.min}
          min={0}
          placeholder="Min"
          type="number"
          className="new-todo new-todo-form__timer"
        />
        <input
          onChange={this.onInputSec}
          value={this.state.newTask.sec}
          min={0}
          type="number"
          placeholder="Sec"
          className="new-todo new-todo-form__timer"
        />
        <input type="submit" hidden />
      </form>
    );
  }
}
