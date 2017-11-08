import React from 'react';
import PropTypes from 'prop-types';

import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';

const SearchBoothList = (props) => {
    const {
        booths,
        subheader,
        onClick,
        onSelectCategory,
    } = props;

    const selectCategory = (
        <div>
            <List>
                <Subheader>Category</Subheader>
                <ListItem
                    primaryText='Booth'
                    onClick={() => onSelectCategory('booth')}/>
                <ListItem
                    primaryText='Workshop'
                    onClick={() => onSelectCategory('workshop')}/>
                <ListItem
                    primaryText='Stage'
                    onClick={() => onSelectCategory('stage')}/>
            </List>
            <div>
                Please select a category or type keyword you're interesting in!
            </div>
        </div>);

    const boothList = (
        <List>
            {selectCategory}
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
        </List>
    );

    const renderingContent = booths.isEmpty() ? selectCategory : boothList;

    return (renderingContent);

};

SearchBoothList.propType = {
    booths: PropTypes.object,
    subheader: PropTypes.string,
    onClick: PropTypes.func,
    onSelectCategory: PropTypes.func,
};

export default SearchBoothList;
