/* eslint-disable indent */
import { Component } from 'react';
import PropTypes from 'prop-types';

import Task from './Task';

export default class TaskList extends Component {
  static defaultProps = {
    filter: 'All',
  };

  static propTypes = {
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    filter: PropTypes.oneOf(['All', 'Active', 'Completed']),
    onDeleted: PropTypes.func.isRequired,
    onCompleted: PropTypes.func.isRequired,
    onEditDescription: PropTypes.func.isRequired,
    onChangeDescription: PropTypes.func.isRequired,
  };

  state = {
    onTaskDescription: '',
  };

  onInput = (event) => {
    this.setState({
      onTaskDescription: event.target.value,
    });
  };

  onEnter = (event, id) => {
    event.preventDefault();
    this.props.onChangeDescription(id, this.state.onTaskDescription);
  };
  render() {
    const tasks = this.props.data
      .filter((task) => {
        switch (this.props.filter) {
          case 'All':
            return true;
          case 'Active':
            return !task.completed;
          case 'Completed':
            return task.completed;
          default:
            return false;
        }
      })
      .map((el) => (
        <li key={el.id} id={el.id} className={`${el.editing ? 'editing' : ''} ${el.completed ? 'completed' : ''}`}>
          <Task
            el={el}
            onTaskCompleted={() => this.props.onCompleted(el.id)}
            onDeleted={() => this.props.onDeleted(el.id)}
            onEditDescription={() => this.props.onEditDescription(el.id)}
          />
          <form onSubmit={(event) => this.onEnter(event, el.id)} onBlur={(event) => this.onEnter(event, el.id)}>
            <input
              type="text"
              className="edit"
              defaultValue={el.description}
              onChange={this.onInput}
              onFocus={this.onInput}
            />
          </form>
        </li>
      ));
    return <ul className="todo-list">{tasks}</ul>;
  }
}
// /* eslint-disable indent */
// import React, { useState } from 'react';

// import Task from './Task';

// const TaskList = ({ onChangeDescription, data, onCompleted, onDeleted, onEditDescription }) => {
//   const [taskDescription, setTaskDescription] = useState('');

//   const onInput = (event) => {
//     setTaskDescription(event.target.value);
//   };

//   const onEnter = (event, id) => {
//     event.preventDefault();
//     onChangeDescription(id, taskDescription);
//   };
//   const tasks = () => {
//     data
//       // .filter((task) => {
//       //   switch (filter) {
//       //     case 'All':
//       //       return true;
//       //     case 'Active':
//       //       return !task.completed;
//       //     case 'Completed':
//       //       return task.completed;
//       //     default:
//       //       return false;
//       //   }
//       // })
//       .map((el) => (
//         <li key={el.id} id={el.id} className={`${el.editing ? 'editing' : ''} ${el.completed ? 'completed' : ''}`}>
//           <Task
//             el={el}
//             onTaskCompleted={onCompleted(el.id)}
//             onDeleted={onDeleted(el.id)}
//             onEditDescription={onEditDescription(el.id)}
//           />
//           <form onSubmit={(event) => onEnter(event, el.id)} onBlur={(event) => onEnter(event, el.id)}>
//             <input type="text" className="edit" defaultValue={el.description} onChange={onInput} onFocus={onInput} />
//           </form>
//         </li>
//       ));
//   };
//   return <ul className="todo-list">{tasks}</ul>;
// };
// export default TaskList;
