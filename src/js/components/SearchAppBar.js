import React from 'react';
import PropTypes from 'prop-types';

import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import SearchSvgIcon from 'material-ui/svg-icons/action/search';
import CloseSvgIcon from 'material-ui/svg-icons/navigation/close';

const SearchIcon = (props) => (<IconButton style={props.style} onClick={props.onClick}><SearchSvgIcon/></IconButton>);
const ClearIcon = (props) => (<IconButton style={props.style} onClick={props.onClick}><CloseSvgIcon/></IconButton>);

const SearchAppBar = (props) => {
    const {style, value, onChange} = props;

    const styles = {
        root: Object.assign({
            display: 'flex',
            // spacing.desktopKeylineIncrement
            // this value is same as height of appBar.
            height: 64,
            width: '100%'
        }, style),
        leftIcon: {
            width: 64,
            height: 64,
        },
        rightIcon: {
            width: 64,
            height: 64,
            marginRight: 0,
            marginLeft: 'auto',
        },
        text: {
            margin: 8,
            width: '70%',
            marginLeft: 'auto',
        },
    };

    return (
        <Paper
            style={styles.root}
            zDepth={1}>
            <SearchIcon style={styles.leftIcon}/>

            <TextField
                style={styles.text}
                hintText="Search booth"
                value={value}
                onChange={onChange}/>

            <ClearIcon style={styles.rightIcon}/>
        </Paper>
    )
};

SearchAppBar.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
};

export default SearchAppBar;
