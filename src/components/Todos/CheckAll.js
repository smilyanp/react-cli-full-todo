import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CheckAll extends Component {
    render() {
        return (
            <label>
                <input type="checkbox" onChange={this.props.handleCheckAllTodos} checked={!this.props.getAnyRemaining} /> Check all
            </label>
        );
    }
}

CheckAll.propTypes = {
    getAnyRemaining: PropTypes.bool.isRequired,
    handleCheckAllTodos: PropTypes.func.isRequired
}

export default CheckAll;