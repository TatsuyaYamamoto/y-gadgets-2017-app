import React from 'react';
import PropTypes from 'prop-types';

import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import IconLocationOn from 'material-ui/svg-icons/communication/location-on';

const recentsIcon = <IconLocationOn/>;
const favoritesIcon = <IconLocationOn/>;
const nearbyIcon = <IconLocationOn/>;

const Navigation = (props) => {
    const {
        style,
        activeIndex,
        onClick
    } = props;

    return (
        <Paper
            style={style}
            zDepth={1}>
            <BottomNavigation selectedIndex={activeIndex}>
                <BottomNavigationItem
                    label="Search"
                    icon={recentsIcon}
                    onClick={() => onClick(0)}
                />
                <BottomNavigationItem
                    label="Mystery"
                    icon={favoritesIcon}
                    onClick={() => onClick(1)}
                />
                <BottomNavigationItem
                    label="Twitter"
                    icon={nearbyIcon}
                    onClick={() => onClick(2)}
                />
            </BottomNavigation>
        </Paper>
    )
};

Navigation.propTypes = {
    style: PropTypes.object,
    activeIndex: PropTypes.number,
    onClick: PropTypes.func,
};

export default Navigation;
