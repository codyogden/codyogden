const styles = require('./scss/index.scss');

module.exports = {
    avatarUrl: 'https://gravatar.com/avatar/01c6c8ab969035251fd741f80a743b61?s=200',
    avatarAlt: 'Cody Ogden',
    message: 'Hi! I\'m Cody Ogden.<br/>I make things for the web.',
    socialMedia: [
        {
            name: 'codyogden.com',
            url: 'https://codyogden.com'
        },
        {
            name: '@killedbygoogle',
            url: 'https://twitter.com/killedbygoogle'
        },
        {
            name: 'GitHub',
            url: 'https://github.com/codyogden'
        },
        {
            name: 'Blog',
            url: 'https://codyogden.com/blog'
        }
    ],
    styles,
    sizes: {
        container: {
            width: 200,
            height: 220,
        },
        iconBaseSize: 50
    }
};
