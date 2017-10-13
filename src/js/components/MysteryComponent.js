import React from 'react';

import TextField from 'material-ui/TextField';
import CircularProgress from 'material-ui/CircularProgress';

const CharField = (props) => {
    const {onChange} = props;

    return (
        <TextField
            style={{
                width: 20,
                margin: 10,
            }}
            inputStyle={{
                textAlign: 'center'
            }}
            onChange={onChange}
        />
    )
};

class AnswerField extends React.Component {
    state = {
        inputChars: []
    };

    handleUpdateField(index, newValue) {
        const {inputChars} = this.state;
        inputChars[index] = newValue;

        this.setState({inputChars});
        this.props.onChange(inputChars.join(''));
    }

    componentDidMount() {
        const {answer} = this.props;
        const initialInputChars = answer.split('').map(char => ' ');
        this.setState({inputChars: initialInputChars});
    }

    render() {
        const {answer} = this.props;
        const answerChars = answer.split('');

        return (
            <div style={{display: 'inline-block'}}>
                {answerChars.map((char, index) => (
                    <CharField
                        key={char}
                        onChange={(event, newValue) => {
                            this.handleUpdateField(index, newValue);
                        }}
                    />
                ))}
            </div>
        )
    }
}

class MysteryComponent extends React.Component {
    state = {
        inputAnswers: {}
    };

    onChangeAnswerField(key, newValue) {
        const {inputAnswers} = this.state;
        this.setState({
            inputAnswers: Object.assign(inputAnswers, {[key]: newValue})
        });
    }

    render() {
        const {questions} = this.props;

        const renderingContent =
            questions.isEmpty() ?
                // TODO create loading component.
                <CircularProgress/> :
                <div>
                    {questions.map(q => {
                        const {sentence, answer} = q;
                        return (
                            <div key={answer}>

                                {sentence}<br/>

                                <AnswerField
                                    answer={answer}
                                    onChange={(newValue) => {
                                        this.onChangeAnswerField(key, newValue);
                                    }}/>
                            </div>
                        )
                    })}
                </div>;

        return (
            <div style={{textAlign: 'center'}}>
                {renderingContent}
            </div>);
    }
}

export default MysteryComponent;
