import React from 'react';
import PropTypes from 'prop-types';

import {List, ListItem} from 'material-ui/List';
import CircularProgress from 'material-ui/CircularProgress';

class BoothList extends React.Component {
    render() {
        const {booths, onClick} = this.props;

        const renderingContent =
            booths.isEmpty() ?
                // TODO create loading component.
                <CircularProgress/> :
                <List>
                    {booths.map((booth, key) => {
                        return (
                            <ListItem
                                key={key}
                                primaryText={booth.name}
                                secondaryText={booth.locationName}
                                onClick={() => onClick(key)}/>
                        )
                    })}
                </List>;

        return (renderingContent);
    }
}

export default BoothList;
