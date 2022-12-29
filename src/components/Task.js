// import { Component } from 'react';
// import { formatDistanceToNow } from 'date-fns';
// import PropTypes from 'prop-types';

// export default class Task extends Component {
//   static propTypes = {
//     el: PropTypes.object.isRequired,
//     onDeleted: PropTypes.func.isRequired,
//     onTaskCompleted: PropTypes.func.isRequired,
//     onEditDescription: PropTypes.func.isRequired,
//   };

//   state = {
//     time: formatDistanceToNow(this.props.el.createdAt, {
//       includeSeconds: true,
//     }),
//   };

//   componentDidMount() {
//     this.timer = setInterval(() => this.tick(), 1000);
//   }

//   componentWillUnmount() {
//     clearInterval(this.timer);
//   }

//   tick() {
//     this.setState({
//       time: formatDistanceToNow(this.props.el.createdAt, {
//         includeSeconds: true,
//       }),
//     });
//   }

//   countTimer() {
//     if (this.props.el.timer > 0) this.props.el.timer -= 1;
//   }

//   startTimer() {
//     this.timer = setInterval(() => this.countTimer(), 1000);
//   }

//   stopTimer() {
//     clearInterval(this.timer);
//   }

//   render() {
//     const min = Math.floor(this.props.el.timer / 60);
//     const sec = this.props.el.timer % 60;
//     if (this.props.el.completed) {
//       this.stopTimer();
//     }
//     return (
//       <div className="view">
//         <input
//           className="toggle"
//           type="checkbox"
//           onChange={this.props.onTaskCompleted}
//           checked={this.props.el.completed}
//         />
//         <div className="label">
//           <span className="description">{this.props.el.description}</span>
//           <span className="timer">
//             <button type="button" className="icon icon-play" onClick={() => this.startTimer()} aria-label="Play" />
//             <button type="button" className="icon icon-pause" onClick={() => this.stopTimer()} aria-label="Pause" />
//             {`${min}:${sec}`}
//           </span>
//           <span className="created">{`created ${this.state.time} ago`}</span>
//         </div>
//         <button type="button" className="icon icon-edit" onClick={this.props.onEditDescription} />
//         <button type="button" className="icon icon-destroy" onClick={this.props.onDeleted} />
//       </div>
//     );
//   }
// }

import React, { useState, useEffect } from 'react';
import { formatDistanceToNow } from 'date-fns';

const Task = ({ onTaskCompleted, onEditDescription, onDeleted, timer, el }) => {
  const [created, setCreated] = useState();

  useEffect(() => {
    timer = setInterval(() => tick(), 1000);
    return () => {
      clearInterval(timer);
    };
  });

  const tick = () => {
    setCreated(
      formatDistanceToNow(el.createdAt, {
        includeSeconds: true,
      })
    );
  };

  const countTimer = () => {
    if (timer > 0) timer -= 1;
  };

  const startTimer = () => {
    timer = setInterval(() => countTimer(), 1000);
  };

  const stopTimer = () => {
    clearInterval(timer);
  };
  const min = Math.floor(el.timer / 60);
  console.log(min);
  const sec = el.timer % 60;
  if (el.completed) {
    stopTimer();
  }
  return (
    <div className="view">
      <input className="toggle" type="checkbox" onChange={onTaskCompleted} checked={el.completed} />
      <div className="label">
        <span className="description">{el.description}</span>
        <span className="timer">
          <button type="button" className="icon icon-play" onClick={() => startTimer} aria-label="Play" />
          <button type="button" className="icon icon-pause" onClick={() => stopTimer} aria-label="Pause" />
          {`${min}:${sec}`}
        </span>
        <span className="created">{`created ${created} ago`}</span>
      </div>
      <button type="button" className="icon icon-edit" onClick={onEditDescription} />
      <button type="button" className="icon icon-destroy" onClick={onDeleted} />
    </div>
  );
};
export default Task;
