// import { Component } from 'react';
// import PropTypes from 'prop-types';

// export default class TasksFilter extends Component {
//   static defaultProps = {
//     filter: 'All',
//     taab: ['All', 'Active', 'Completed'],
//   };

//   static propTypes = {
//     filter: PropTypes.oneOf(['All', 'Active', 'Completed']),
//     taab: PropTypes.array,
//     onChangeFilter: PropTypes.func.isRequired,
//   };

//   render() {
//     const taab = this.props.taab.map((tab) => (
//       <li key={tab}>
//         <label htmlFor={tab} className={this.props.filter === tab ? 'selected' : ''}>
//           <input
//             type="radio"
//             name="filter"
//             id={tab}
//             onClick={() => this.props.onChangeFilter(tab)}
//             checked={this.props.filter === tab}
//           />
//           {tab}
//         </label>
//       </li>
//     ));

//     return <ul className="filters">{taab}</ul>;
//   }
// }

import React from 'react';

const TasksFilter = ({ onChangeFilter, filter }) => {
  const defaultProps = {
    filter: 'All',
    taab: ['All', 'Active', 'Completed'],
  };

  const taab = defaultProps.taab.map((tab) => (
    <li key={tab}>
      <label htmlFor={tab} className={filter === tab ? 'selected' : ''}>
        <input type="radio" name="filter" id={tab} onClick={() => onChangeFilter(tab)} checked={filter === tab} />
        {tab}
      </label>
    </li>
  ));

  return <ul className="filters">{taab}</ul>;
};
export default TasksFilter;
