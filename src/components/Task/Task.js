import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Task.css';

class Task extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: props.id,
      title: props.title,
      status: props.status,
      text: props.text,
    };

    this.handleSave = this.handleSave.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  get showSubmit() {
    return this.state.id === -1 ||
      this.state.title !== this.props.title ||
      this.state.text !== this.props.text ||
      this.state.status !== this.props.status;
  }

  componentWillReceiveProps(newProps) {
    if (newProps !== this.props) {
      this.setState({
        id: newProps.id,
        title: newProps.title,
        status: newProps.status,
        text: newProps.text,
      });
    }
  }

  handleSave(event) {
    event.preventDefault();
    if (this.state.title) {
      this.props.onSave(Object.assign({}, this.state));
    }
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value, });
  }

  render() {
    const { title, status, text } = this.state;
    const { onDelete, id } = this.props;

    return (
      <form className="task" onSubmit={this.handleSave}>
        <div className="task-header">
          <input type="title" name="title" placeholder="Enter title..." value={title} onChange={this.handleChange}/>
          <select value={status} name="status" onChange={this.handleChange}>
            <option value="complete">Complete</option>
            <option value="incomplete">Incomplete</option>
          </select>
          <span className="close" onClick={() => onDelete({ id })}>x</span>
        </div>
        <textarea name="text" rows="4" placeholder="Enter text..." value={text} onChange={this.handleChange}/>
        {this.showSubmit && <input type="submit" value="Save" className="button primary"/>}
      </form>
    );
  }
}

Task.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  text: PropTypes.string,
  onDelete: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired
};

export default Task;