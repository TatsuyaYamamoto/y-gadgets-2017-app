import React from 'react';
import PropTypes from 'prop-types';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import HelpGridLine from './HelpGridLine';

const helps = [
    {
        title: 'つぶやきを確認！',
        image_url: 'https://firebasestorage.googleapis.com/v0/b/y-gadgets-2017-app.appspot.com/o/help%2FTwitter_2.png?alt=media'
    }
];

const TimelineHelpDialog = (props) => {
    const {open, onRequestClose} = props;
    const actions = [
        <FlatButton
            label="OK"
            onClick={onRequestClose}
        />
    ];

    return (
        <Dialog
            title="Help"
            actions={actions}
            open={open}
            onRequestClose={onRequestClose}
            contentStyle={{
                width: '100%',
                maxWidth: 'none',
            }}>
            <HelpGridLine dataList={helps}/>
        </Dialog>
    )
};

TimelineHelpDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    onRequestClose: PropTypes.func.isRequired,
};

export default TimelineHelpDialog;
