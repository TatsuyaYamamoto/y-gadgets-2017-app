import React from 'react';

class TweetsComponent extends React.Component {
    render() {
        return (
            <div style={{textAlign: "center"}}>
                <a
                    className="twitter-timeline"
                    href="https://twitter.com/hashtag/Fujixerox"
                    data-widget-id="905825742583242753">#Fujixerox のツイート</a>
            </div>
        )
    }
}

export default TweetsComponent;
