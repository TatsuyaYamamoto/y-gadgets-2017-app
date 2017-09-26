import React from 'react';
import TextField from 'material-ui/TextField';

const CharField = () => {
    return (
        <TextField
            style={{
                width: 20,
                margin: 10,
            }}
            inputStyle={{
                textAlign: 'center'
            }}/>
    )
};

const Question = () => {
    return (
        <div style={{textAlign: 'center'}}>
            これは問題です。<br/>
            <div style={{display: 'inline-block'}}>
                <CharField/>
                <CharField/>
                <CharField/>
            </div>
        </div>
    );
};

export default Question;
