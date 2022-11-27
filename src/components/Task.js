import { Component } from 'react';
import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';

export default class Task extends Component {
  static propTypes = {
    el: PropTypes.object.isRequired,
    onDeleted: PropTypes.func.isRequired,
    onTaskCompleted: PropTypes.func.isRequired,
    onEditDescription: PropTypes.func.isRequired,
  };

  state = {
    time: formatDistanceToNow(this.props.el.createdAt, {
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
      time: formatDistanceToNow(this.props.el.createdAt, {
        includeSeconds: true,
      }),
    });
  }

  render() {
    return (
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          onChange={this.props.onTaskCompleted}
          checked={this.props.el.completed}
        />
        <div className="label">
          <span className="description">{this.props.el.description}</span>
          <span className="created">{`created ${this.state.time} ago`}</span>
        </div>
        <button type="button" className="icon icon-edit" onClick={this.props.onEditDescription} />
        <button type="button" className="icon icon-destroy" onClick={this.props.onDeleted} />
      </div>
    );
  }
}
