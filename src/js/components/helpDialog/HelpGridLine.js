import React from 'react';
import PropTypes from 'prop-types';

import {GridList, GridTile} from 'material-ui/GridList';

const styles = {
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    },
    gridList: {
        display: 'flex',
        flexWrap: 'nowrap',
        overflowX: 'auto',
    }
};

const HelpGridLine = (props) => {
    const {dataList} = props;

    return (
        <div style={styles.root}>
            <GridList style={styles.gridList} cols={1.2}>
                {dataList.map((data) => (
                    <GridTile
                        key={data.title}
                        title={data.title}
                        titleBackground="linear-gradient(to top, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)">
                        <img src={data.image_url}/>
                    </GridTile>
                ))}
            </GridList>
        </div>
    );
};

HelpGridLine.propTypes = {
    dataList: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string,
            description: PropTypes.string,
        })
    )
};

export default HelpGridLine;
