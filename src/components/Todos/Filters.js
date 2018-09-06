import React from 'react';
import PropTypes from 'prop-types';
import * as classNames from 'classnames';

const Filters = (props) => {
  return (
    <div className="btn-group">
      <button className={classNames({"btn btn-default": true, "active": props.filter === 'all'})} onClick={() => props.updateFilter('all')}>All</button>
      <button className={classNames({"btn btn-default": true, "active": props.filter === 'active'})} onClick={() => props.updateFilter('active')}>Active</button>
      <button className={classNames({"btn btn-default": true, "active": props.filter === 'completed'})} onClick={() => props.updateFilter('completed')}>Completed</button>
    </div>
  )
}

Filters.propTypes = {
    filter: PropTypes.string.isRequired,
    updateFilter: PropTypes.func.isRequired
}

export default Filters;