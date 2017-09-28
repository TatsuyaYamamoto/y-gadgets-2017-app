import React from 'react';
import PropTypes from 'prop-types';

import {List, ListItem} from 'material-ui/List';

class BoothList extends React.Component {
    render() {
        const {booths} = this.props;

        return (
            <List>
                {Object.keys(booths).map((key) => {
                    return (
                        <ListItem
                            key={key}
                            primaryText={booths[key].name}
                            secondaryText={booths[key].id}
                        />
                    )
                })}
            </List>
        )
    }
}

export default BoothList;
