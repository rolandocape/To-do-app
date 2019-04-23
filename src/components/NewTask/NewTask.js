import React, { Component } from 'react';
import {connect} from 'react-redux';
import './NewTask.css';
import { createNewTask } from '../../actions/tasks';

class NewTask extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            text: '',
            status: ''
        }
    }

    handleInputChange(event) {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    }

    render() {
        const { id, status, onDelete } = this.props;
        return (
            <form className="new-task" onSubmit={this.createNewTask({...this.state})}>
                <input type="title" value={this.state.title} name="title" onChange={this.handleInputChange}/>
                <input type="text" value={this.state.text} name="text" onChange={this.handleInputChange}/>
                <select value={status} onChange={(value) => this.setState({status: value})}>
                    <option value="complete">Complete</option>
                    <option value="incomplete">Incomplete</option>
                </select>
                <span onClick={() => onDelete(id)}>x</span>
                <input type="submit" value="Submit" />
            </form>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    createNewTask: task => dispatch(createNewTask(task)),
});

export default connect(null, mapDispatchToProps)(NewTask);