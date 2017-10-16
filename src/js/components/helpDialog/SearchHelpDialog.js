import React from 'react';
import PropTypes from 'prop-types';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import HelpGridLine from './HelpGridLine';

const helps = [
    {
        title: 'ブースを検索しよう！',
        description: '説明文説明文説明文説明文説明文 description description description description description description description',

    },
    {
        title: '気になるブースをpinしよう！',
        description: 'pinしたブースはリストに保存されるぞ！pinは外すこともできる！',

    },
    {
        title: '良かったブースにLikeしよう！',
        description: '説明文説明文説明文説明文説明文 description description description description description description description',

    },
    {
        title: 'ランダムにブースをオススメするよ！',
        description: '説明文説明文説明文説明文説明文 description description description description description description description',

    },
];

const SearchHelpDialog = (props) => {
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

SearchHelpDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    onRequestClose: PropTypes.func.isRequired,
};

export default SearchHelpDialog;
