import React from 'react';
import PropTypes from 'prop-types';

import {List, ListItem} from 'material-ui/List';

const OpenSourceLicenseList = (props) => {
    const {licenses} = props;

    return (
        <List>
            {licenses.map(l => (
                <ListItem
                    key={l.name}
                    primaryText={l.name}
                    secondaryText={l.version}/>
            ))}
        </List>
    )
};

OpenSourceLicenseList.propTypes = {
    licenses: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
        version: PropTypes.string,
    }))
};

export default OpenSourceLicenseList;
