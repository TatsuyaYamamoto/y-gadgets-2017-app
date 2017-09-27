import React from 'react';
import PropTypes from 'prop-types';

import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import SearchIcon from 'material-ui/svg-icons/action/search';

const SearchAppBar = (props) => {
    const {value, onChange} = props;

    const styles = {
        paper: {
            // spacing.desktopKeylineIncrement
            // this value is same as height of appBar.
            height: 64,
            width: '100%'
        }
    };

    return (
        <Paper
            style={styles.paper}
            zDepth={1}>
            <SearchIcon/>

            <TextField
                hintText="Search booth"
                value={value}
                onChange={onChange}/>
        </Paper>
    )
};

SearchAppBar.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
};

export default SearchAppBar;
