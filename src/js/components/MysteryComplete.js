import React from 'react';
import PropTypes from 'prop-types';

const MysteryComplete = (props) => {
    const styles = {
        completeText:{
            fontSize: 100
        }
    };
    return (
        <div>
            <div style={styles.completeText}>正解！</div>
            <div>全問正解おめでとう！富士ゼロックス R&Dスクエアの触覚屋でお菓子を貰おう！<br/>＊触覚屋ブースの情報</div>
        </div>
    )
};

MysteryComplete.propTypes = {};

export default MysteryComplete;
