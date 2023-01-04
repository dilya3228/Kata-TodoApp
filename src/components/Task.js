import React, { useState, useEffect } from 'react';
import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';

const Task = ({ onTaskCompleted, onEditDescription, onDeleted, onCountTimer, el }) => {
  const [created, setCreated] = useState(
    formatDistanceToNow(el.createdAt, {
      includeSeconds: true,
    })
  );
  const [countTimer, setcountTimer] = useState(true);

  let timer;

  const tick = () => {
    setCreated(
      formatDistanceToNow(el.createdAt, {
        includeSeconds: true,
      })
    );
  };

  const startTimer = () => {
    setcountTimer(true);
  };

  const stopTimer = () => {
    setcountTimer(false);
  };

  const switchTimer = () => {
    onTaskCompleted();
    if (!el.completed) stopTimer();
    if (el.completed) startTimer();
  };

  const min = Math.floor(el.timer / 60);
  const sec = el.timer % 60;

  useEffect(() => {
    const time = setInterval(() => tick(), 1000);
    return () => {
      clearInterval(time);
    };
  }, []);

  useEffect(() => {
    if (countTimer) {
      timer = setInterval(() => onCountTimer(), 1000);
    }
    if (!countTimer) {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [countTimer]);

  return (
    <div className="view">
      <input className="toggle" type="checkbox" onChange={switchTimer} checked={el.completed} />
      <div className="label">
        <span className="description">{el.description}</span>
        <span className="timer">
          <button type="button" className="icon icon-play" onClick={() => startTimer()} aria-label="Play" />
          <button type="button" className="icon icon-pause" onClick={() => stopTimer()} aria-label="Pause" />
          {`${min}:${sec}`}
        </span>
        <span className="created">{`created ${created} ago`}</span>
      </div>
      <button type="button" className="icon icon-edit" onClick={onEditDescription} />
      <button type="button" className="icon icon-destroy" onClick={onDeleted} />
    </div>
  );
};

Task.propTypes = {
  el: PropTypes.object.isRequired,
  onDeleted: PropTypes.func.isRequired,
  onTaskCompleted: PropTypes.func.isRequired,
  onEditDescription: PropTypes.func.isRequired,
};

export default Task;
