import React from 'react';
import {connect} from 'react-redux';
import {goBack} from 'react-router-redux';

import AppBar from 'material-ui/AppBar';
import {Card, CardActions, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import ArrowBackIcon from 'material-ui/svg-icons/navigation/arrow-back';
import FavoriteIcon from 'material-ui/svg-icons/action/favorite';
import VisibilityIcon from 'material-ui/svg-icons/action/visibility';
import VisibilityOffIcon from 'material-ui/svg-icons/action/visibility-off';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

import {loadBooths, postBoothLike} from '../modules/firebase';

const LikeButton = (props) => (
    <RaisedButton
        fullWidth
        primary={true}
        buttonStyle={{
            height: 150,
            margin: 20
        }}
        label="Like"/>
);

class BoothDetailContainer extends React.Component {
    handleClickBack = () => {
        this.props.goBack();
    };

    getStyles = () => {
        return {
            card: {},
            content: {
                marginTop: 64 + 20,
                marginLeft: 20,
                marginRight: 20,
            },
        }
    };

    componentDidMount() {
        if (!this.props.booth) {
            const {id} = this.props.match.params;
            const {loadBooths} = this.props;

            loadBooths(id);
        }

    }

    render() {
        const styles = this.getStyles();
        const {booth, postLike} = this.props;
        console.log(booth && booth.likes.size);
        return (
            <div>
                <AppBar
                    iconElementLeft={<IconButton><ArrowBackIcon/></IconButton>}
                    onLeftIconButtonTouchTap={this.handleClickBack}
                    title="Detail"/>

                <Card style={styles.content}>
                    <CardMedia overlay={<CardTitle title="Overlay title" subtitle="Overlay subtitle"/>}>
                        <img src="images/nature-600-337.jpg" alt=""/>
                    </CardMedia>
                    <CardTitle
                        title={booth ? booth.name : 'loading'}
                        subtitle={booth ? booth.locationName : 'loading'}/>
                    <CardText>
                        {booth ? booth.description : 'loading'}
                    </CardText>
                    <CardActions>
                        <FlatButton
                            label={booth ? booth.likes.size : 0}
                            icon={<FavoriteIcon/>}
                        />
                        <FlatButton
                            label={booth ? booth.visibilities.size : 0}
                            icon={<VisibilityIcon/>}
                        />
                    </CardActions>
                </Card>

                <RaisedButton
                    primary
                    label="Like"
                    onClick={postLike}
                    style={{
                        width: '80%',
                        margin: 20,
                    }}
                    buttonStyle={{
                        height: 150,
                    }}/>

            </div>
        )
    }
}

function mapStateToProps(state, ownProps) {
    const boothId = ownProps.match.params.id;
    const booth = state.firebase.getIn(['booths', boothId]);
    return {booth}
}

function mapDispatchToProps(dispatch, ownProps) {
    const boothId = ownProps.match.params.id;

    return {
        goBack: () => {
            dispatch(goBack())
        },
        loadBooths: (id) => {
            dispatch(loadBooths(id));
        },
        postLike: () => {
            dispatch(postBoothLike(boothId));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BoothDetailContainer);
