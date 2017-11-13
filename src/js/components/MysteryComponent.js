import React from 'react';
import PropTypes from 'prop-types';

import TextField from 'material-ui/TextField';
import CircularProgress from 'material-ui/CircularProgress';

/**
 * This char text field's able to have char value only.
 * In changing, inputted character removes without the head of the character.
 *
 * @param props
 * @returns {XML}
 * @constructor
 */
const CharField = (props) => {
    const {value, onChange} = props;

    return (
        <TextField
            value={value}
            style={{
                width: 20,
                margin: 10,
            }}
            inputStyle={{
                textAlign: 'center'
            }}
            onChange={(event, newValue) => {
                onChange(newValue.trim().slice(0, 1))
            }}
        />
    )
};

CharField.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
};


/**
 * This mystery answer text has some {@link CharField}s.
 * The fields' length is same as {@params props.answer}'s length.
 * {@params props.input} is set blank text, length is {@params props.answer}'s length,
 * if {@params props.input} is undefined.
 *
 *
 * @param props
 * @returns {XML}
 * @constructor
 */
const AnswerField = (props) => {
    const {input, answer, onChange} = props;
    const answerChars = answer.split('');
    const inputChars = input ? input.split('') : answerChars.map(() => ' ');

    return (
        <div style={{display: 'inline-block'}}>
            {answerChars.map((char, index) => (
                <CharField
                    value={inputChars[index]}
                    key={char + index}
                    onChange={(newChar) => {
                        !newChar || newChar === '' ?
                            inputChars[index] = ' ' :
                            inputChars[index] = newChar;
                        onChange(inputChars.join(''));
                    }}
                />
            ))}
        </div>
    )

};

AnswerField.propTypes = {
    input: PropTypes.string,
    answer: PropTypes.string,
    onChange: PropTypes.func,
};

/**
 *
 * @param props
 * @returns {XML}
 * @constructor
 */
const SentenceSection = (props) => {
    const {text} = props;
    return (
        <div>{text}</div>
    )
};

SentenceSection.propTypes = {
    text: PropTypes.string,
};


/**
 *
 * @returns {XML}
 * @constructor
 */
const MysteryComponent = (props) => {
    const {questions, userAnswers, onChangeAnswer} = props;

    const renderingContent =
        questions.isEmpty() ?
            // TODO create loading component.
            <CircularProgress/> :
            <div>
                {questions.map((q, key) => {
                    const input = userAnswers.get(key, '');
                    const {sentence, answer} = q;
                    return (
                        <div key={answer}>

                            <SentenceSection text={sentence}/><br/>

                            <AnswerField
                                input={input}
                                answer={answer}
                                onChange={(newValue) => {
                                    onChangeAnswer(key, newValue);
                                }}/>
                        </div>
                    )
                })}
            </div>;

    return (
        <div style={{textAlign: 'center'}}>
            {renderingContent}
        </div>);
};

MysteryComponent.propTypes = {
    questions: PropTypes.object,
    userAnswers: PropTypes.object,
    onChangeAnswer: PropTypes.func,
};

export default MysteryComponent;
