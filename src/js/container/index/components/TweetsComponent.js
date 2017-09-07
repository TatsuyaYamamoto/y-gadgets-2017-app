import React from 'react';

class TweetsComponent extends React.Component {
    render() {
        return (
            <div style={{textAlign: "center"}}>
                <a className="twitter-timeline"
                   href="https://twitter.com/hashtag/%E5%AF%8C%E5%A3%AB%E3%82%BC%E3%83%AD%E3%83%83%E3%82%AF%E3%82%B9"
                   data-widget-id="905832602216538112">#富士ゼロックス のツイート</a>
            </div>
        )
    }
}

export default TweetsComponent;
