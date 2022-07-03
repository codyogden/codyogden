module.exports = (el, styles) => {
    Object.keys(styles).forEach((property) => {
        el.style[property] = styles[property];
    });
};
