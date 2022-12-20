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
    this.countdownTimer = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
    clearInterval(this.countdownTimer);
  }

  tick() {
    this.setState({
      time: formatDistanceToNow(this.props.el.createdAt, {
        includeSeconds: true,
      }),
    });
  }

  countdown() {
    if (this.props.el.timer > 0) this.props.el.timer -= 1;
  }

  startTimer() {
    this.timer = setInterval(() => this.countdown(), 1000);
  }

  stopTimer() {
    clearInterval(this.timer);
  }

  render() {
    const min = Math.floor(this.props.el.timer / 60);
    const sec = this.props.el.timer % 60;
    if (this.props.el.completed) {
      this.stopTimer();
    }
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
          <span className="timer">
            <button type="button" className="icon icon-play" onClick={() => this.startTimer()} aria-label="Play" />
            <button type="button" className="icon icon-pause" onClick={() => this.stopTimer()} aria-label="Pause" />
            {`${min}:${sec}`}
          </span>
          <span className="created">{`created ${this.state.time} ago`}</span>
        </div>
        <button type="button" className="icon icon-edit" onClick={this.props.onEditDescription} />
        <button type="button" className="icon icon-destroy" onClick={this.props.onDeleted} />
      </div>
    );
  }
}
