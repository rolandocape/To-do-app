import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Task from '../Task/Task';
import './Tasks.css';
import { createTask, deleteTask, loadTasks, updateTask } from '../../actions/tasks';

class Tasks extends Component {

  constructor(props) {
    super(props);
    this.state = {
      pendingTask: null
    };

    this.handleDelete = this.handleDelete.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleAddTask = this.handleAddTask.bind(this);

    this.props.loadTasks();
  }

  handleDelete(task) {
    if (task.id === -1) {
      this.setState({ pendingTask: null });
    } else {
      this.props.deleteTask(task);
    }
  }

  handleSave(task) {
    if (task.id === -1) {
      this.props.createTask(task);
      this.setState({ pendingTask: null });
    } else {
      this.props.updateTask(task);
    }
  }

  handleAddTask() {
    if (!this.state.pendingTask) {
      this.setState({
        pendingTask: {
          id: -1,
          title: '',
          text: '',
          status: 'incomplete',
        }
      });
    }
  }

  render() {
    const { tasks } = this.props;
    const { pendingTask } = this.state;
    const allTasks = pendingTask ? [pendingTask].concat(tasks) : tasks;

    return (
      <div className="tasks-container">
        <button className="button primary" onClick={this.handleAddTask}>Add Task</button>
        {allTasks.map((task, key) => (
          <Task
            key={`${key}-task`}
            id={task.id}
            onDelete={this.handleDelete}
            onSave={this.handleSave}
            {...task}
          />
        ))}
      </div>
    );
  }
}

Tasks.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
      text: PropTypes.string,
    })
  ),
};

const mapStateToProps = ({ tasks }) => ({
  tasks: tasks.tasks,
});

const mapDispatchToProps = (dispatch) => ({
  deleteTask: task => dispatch(deleteTask(task)),
  createTask: task => dispatch(createTask(task)),
  updateTask: task => dispatch(updateTask(task)),
  loadTasks: () => dispatch(loadTasks()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Tasks);