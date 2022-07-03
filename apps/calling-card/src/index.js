const {
    socialMedia,
    avatarUrl,
    avatarAlt,
    message,
    sizes
} = require('./data.js');

const loadGravatar = require('./bin/loadGravatar');
const applyStyles = require('./bin/applyStyles');

const container = document.createElement('div');
container.className = 'co-container';

const primaryAnchor = document.createElement('button');
const buttonText = document.createElement('span');
buttonText.innerHTML = 'Open Calling Card';
applyStyles(buttonText, {
  border: '0',
  clip: 'rect(1px, 1px, 1px, 1px)',
  clipPath: 'inset(50 %)',
  height: '1px',
  margin: '-1px',
  overflow: 'hidden',
  padding: '0',
  position: 'absolute',
  width: '1px',
  wordWrap: 'normal!important',
})

const img = document.createElement('img');
img.src = loadGravatar(avatarUrl);
img.className = 'co-gravatar';
img.setAttribute('alt', avatarAlt);

primaryAnchor.appendChild(img);

const p = document.createElement('p');
applyStyles(p, {
    opacity: '0',
    textAlign: 'center',
});
p.innerHTML = message;


const ul = document.createElement('ul');
applyStyles(ul, {
    opacity: '0',
    display: 'flex',
    listStyle: 'none',
    padding: '0',
    flexFlow: 'row wrap',
});


socialMedia.forEach((sm) => {
    // Menu Item
    const li = document.createElement('li');
    applyStyles(li, {
        flex: '1 0 50%',
    });

    // Menu Anchor Tag
    var a = document.createElement('a');
    a.rel = 'nofollow noreferrer noopener';
    a.target = '_blank';
    a.href = sm.url;
    a.innerHTML = sm.name;

    // Append and conquer
    li.appendChild(a);
    ul.appendChild(li);

});

// Let's put it all in our container in order
primaryAnchor.appendChild(buttonText);
container.appendChild(primaryAnchor);
container.appendChild(p);
container.appendChild(ul);

// Finally, toss that sucker in the body
document.querySelector('body').appendChild(container);

/* Animation Section */
var step;
var startingPos = 20;
var maxPos = 100;
var pos = startingPos; // We're not starting from zero.

// Animation Execution
const animate = (msFrameRate, reverse, cb) => {
    // Let's do that step.
    step = setInterval(function () {
        // First, adjust the anticipated position
        pos = (reverse) ? pos - 1 : pos + 1;
        // Check to see if we're at either end
        if ((pos === maxPos) || (pos === startingPos)) {
            // If so, stop what we're doing!
            clearInterval(step);
        } else {
            // Otherwise, continue the animation with the new position
            cb(pos, reverse);
        }
    }, msFrameRate);
}

// Animation definition
const cardAnimation = (pos, reverse) => {

    const desiredHeight = sizes.container.height;
    const desiredWidth = sizes.container.width;
    const heightVal = pos / desiredHeight;

    // Main Container
    applyStyles(
        container,
        {
            height: desiredHeight * (pos / maxPos) + 'px',
            width: desiredWidth * ( pos / maxPos ) + 'px',
            bottom: (pos / 50) + 20 + 'px',
            right: (pos / 50) + 20 + 'px',
            borderRadius: (52 - (pos * 0.5)) + '%',
            overflow: 'visible',
            padding: (pos * 0.1) + 'px',
        }
    );

    // Don't make it too large when expanding
    var imageScale = ((20 + pos * 0.5) < 70) ? (20 + pos * 0.5) : 70;
    // Don't make it too small when shrinking
    if (reverse)
        imageScale = (imageScale > sizes.iconBaseSize) ? imageScale : sizes.iconBaseSize;

    // Avatar
    applyStyles(
        img,
        {
            border: '4px solid #fff',
            boxShadow: '1px 1px 2px 1px #9f9f9f',
            marginTop: (pos * -0.4) + 'px',
            position: 'relative',
            left: 'calc( 50% - ' + (imageScale * 0.6) + 'px)',
            height: imageScale + 'px',
            width: imageScale + 'px'
        }
    );

    // This fades in the text and links
    if (pos > (maxPos - 5)) {
        setTimeout(function () {
            p.style.opacity = 1;
            ul.style.opacity = 1
        }, 5);
    }

    // This fades out the text and links
    if (pos < (maxPos - 1)) {
        p.style.opacity = 0;
        ul.style.opacity = 0;
    }

    // This removes the `style` attribute
    // which resets the array of elements
    // to their default setting
    if (reverse && pos === (startingPos + 1)) {
        [
            container,
            img
        ].forEach(function (el) {
            el.removeAttribute('style');
        });
        [
            p,
            ul
        ].forEach((el) => {
            el.style.display = 'none';
        });
    }

    if(!reverse) {
        p.style.display = 'block';
        ul.style.display = 'flex';
    }
}

const eventHandler = (e) => {
    clearInterval(step);
    animate(1, pos === maxPos, cardAnimation);
}

// Desktop Listeners
container.addEventListener('mouseenter', eventHandler);
container.addEventListener('mouseleave', eventHandler);

// Mobile Listener
[
    'touchstart',
    'click'
].forEach((eventName) => {
    primaryAnchor.addEventListener(eventName, (e) => {
        e.preventDefault();
        eventHandler();
    });
});
