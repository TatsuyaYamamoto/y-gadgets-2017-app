import React from 'react';

import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import ArrowBackIcon from 'material-ui/svg-icons/navigation/arrow-back';

class SettingContainer extends React.Component {
    handleClickBack = () =>{
        this.props.history.goBack();
    };

    render() {
        return (
            <div>
                <AppBar
                    iconElementLeft={<IconButton><ArrowBackIcon/></IconButton>}
                    onLeftIconButtonTouchTap={this.handleClickBack}
                    title="Setting"/>
            </div>
        )
    }
}

export default SettingContainer;
