module.exports = (avatarUrl) => {
    const gravatarImage = new Image;
    gravatarImage.src = avatarUrl;
    return avatarUrl;
};
