import React from 'react';
import PropTypes from 'prop-types';

import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import CircularProgress from 'material-ui/CircularProgress';

class BoothList extends React.Component {
    render() {
        const {booths, subheader, onClick} = this.props;

        const renderingContent =
            booths.isEmpty() ?
                // TODO create loading component.
                <CircularProgress/> :
                <List>
                    {subheader && <Subheader>{subheader}</Subheader>}
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

BoothList.propType = {
    booths: PropTypes.object,
    subheader: PropTypes.string,
    onClick: PropTypes.func,
};

export default BoothList;
