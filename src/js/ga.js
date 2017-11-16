const ga = require('react-ga');
ga.initialize('UA-109790070-1');


export function sendAppLoodEvent(value) {
    ga.event({
        category: 'App',
        action: 'load',
    });
}

export function sendCompleteEvent(value) {
    ga.event({
        category: 'Question',
        action: 'complete',
    });
}
