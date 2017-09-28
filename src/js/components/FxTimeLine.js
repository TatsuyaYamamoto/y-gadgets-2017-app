import React from 'react';

class TweetsComponent extends React.Component {
    componentDidMount() {
        // Tweet component script
        // https://twitter.com/settings/widgets
        !function (d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0], p = /^http:/.test(d.location) ? 'http' : 'https';
            if (!d.getElementById(id)) {
                js = d.createElement(s);
                js.id = id;
                js.src = p + "://platform.twitter.com/widgets.js";
                fjs.parentNode.insertBefore(js, fjs);
            }
        }(document, "script", "twitter-wjs")
    }

    componentWillUnmount() {
        !function (d, s, id) {
            const target = d.getElementById(id);
            target.parentNode.removeChild(target);
        }(document, "script", "twitter-wjs")
    }

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
