import { Component } from 'react';
import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';

export default class Task extends Component {
  static propTypes = {
    el: PropTypes.object.isRequired,
    onDeleted: PropTypes.func.isRequired,
    taskCompleted: PropTypes.func.isRequired,
    onToggleEdit: PropTypes.func.isRequired,
  };

  state = {
    time: formatDistanceToNow(this.props.el.created, {
      includeSeconds: true,
    }),
  };

  componentDidMount() {
    this.timer = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  tick() {
    this.setState({
      time: formatDistanceToNow(this.props.el.created, {
        includeSeconds: true,
      }),
    });
  }

  render() {
    let editInput;
    if (this.props.el.editing) {
      editInput = (
        <input
          type="text"
          className="edit"
          defaultValue={this.props.el.description}
          onKeyDown={this.props.updateTask}
        />
      );
    }
    return (
      <>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            onChange={this.props.taskCompleted}
            checked={this.props.el.completed}
          />
          <div className="label">
            <span className="description">{this.props.el.description}</span>
            <span className="created">{`created ${this.state.time} ago`}</span>
          </div>
          <button type="button" className="icon icon-edit" onClick={this.props.onToggleEdit}>
            {}
          </button>
          <button type="button" className="icon icon-destroy" onClick={this.props.onDeleted}>
            {}
          </button>
        </div>
        {editInput}
      </>
    );
  }
}
