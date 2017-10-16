import React from 'react';
import PropTypes from 'prop-types';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import HelpGridLine from './HelpGridLine';

const helps = [
    {
        title: '問題を解こう！',
        description: '説明文説明文説明文説明文説明文 description description description description description description description',

    },
    {
        title: '会場でヒントを探そう！',
        description: '説明文説明文説明文説明文説明文 description description description description description description description',

    },
    {
        title: '全問正解すると？',
        description: '説明文説明文説明文説明文説明文 description description description description description description description',

    },
];

const MysteryHelpDialog = (props) => {
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

MysteryHelpDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    onRequestClose: PropTypes.func.isRequired,
};

export default MysteryHelpDialog;
