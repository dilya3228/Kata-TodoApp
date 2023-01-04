import React, { useState } from 'react';

import NewTaskForm from './NewTaskForm';
import TaskList from './TaskList';
import Footer from './Footer';

const App = () => {
  const [data, setData] = useState([
    {
      description: 'Completed task',
      createdAt: new Date(),
      id: 1,
      editing: false,
      completed: true,
      timer: 0,
    },
    {
      description: 'Editing task',
      createdAt: new Date(),
      id: 2,
      editing: true,
      completed: false,
      timer: 0,
    },
    {
      description: 'Active task',
      createdAt: new Date(),
      id: 3,
      editing: false,
      completed: false,
      timer: 0,
    },
  ]);

  const [filter, setFilter] = useState('All');

  const onCompleted = (id) => {
    setData((state) =>
      state.map((task) => {
        if (task.id === id) return { ...task, completed: !task.completed };
        return { ...task };
      })
    );
  };

  const onDeleted = (id) => setData((state) => state.filter((task) => task.id !== id));

  const getId = () => data.reduce((maxId, item) => (maxId < item.id ? item.id : maxId), 0) + 1;

  const onAddTask = (task) =>
    setData((state) => [
      ...state,
      {
        id: getId(),
        editing: false,
        completed: false,
        description: task.description,
        createdAt: new Date(),
        timer: task.min * 60 + task.sec,
      },
    ]);

  const onChangeFilter = (choisenFilter) => setFilter(choisenFilter);

  const onChangeDescription = (id, newDescription) =>
    setData((state) =>
      state.map((task) => ({
        ...task,
        editing: !task.id === id,
        description: task.id === id ? newDescription : task.description,
      }))
    );

  const onEditDescription = (id) =>
    setData((state) =>
      state.map((task) => ({
        ...task,
        editing: task.id === id,
      }))
    );

  const onCountTimer = (id) =>
    setData((state) =>
      state.map((task) => ({
        ...task,
        timer: task.id === id && task.timer > 0 ? task.timer - 1 : task.timer,
      }))
    );

  const onClearCompleted = () => setData((state) => state.filter((task) => !task.completed));

  return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <NewTaskForm onAddTask={onAddTask} />
      </header>
      <div className="main">
        <TaskList
          data={data}
          onCompleted={onCompleted}
          onDeleted={onDeleted}
          onEditDescription={onEditDescription}
          onChangeDescription={onChangeDescription}
          filter={filter}
          onCountTimer={onCountTimer}
        />
        <Footer data={data} onClearCompleted={onClearCompleted} filter={filter} onChangeFilter={onChangeFilter} />
      </div>
    </div>
  );
};
export default App;
