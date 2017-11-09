import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';

import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import IconLocationOn from 'material-ui/svg-icons/communication/location-on';

const recentsIcon = <IconLocationOn/>;
const favoritesIcon = <IconLocationOn/>;
const nearbyIcon = <IconLocationOn/>;

class Navigation extends React.Component {
    render() {
        const {
            style,
            activeIndex,
        } = this.props;

        return (
            <Paper
                style={style}
                zDepth={1}>
                <BottomNavigation selectedIndex={activeIndex}>
                    <BottomNavigationItem
                        label="Search"
                        icon={recentsIcon}
                        onClick={() => this.props.push('/booths')}
                    />
                    <BottomNavigationItem
                        label="Mystery"
                        icon={favoritesIcon}
                        onClick={() => this.props.push('/')}
                    />
                    <BottomNavigationItem
                        label="Twitter"
                        icon={nearbyIcon}
                        onClick={() => this.props.push('/timeline')}
                    />
                </BottomNavigation>
            </Paper>
        )
    }
}

Navigation.propTypes = {
    style: PropTypes.object,
    activeIndex: PropTypes.number,
    push: PropTypes.func,
};


function mapStateToProps(state) {
    return {}
}

function mapDispatchToProps(dispatch) {
    return {
        push: (path) => {
            dispatch(push(path));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);

