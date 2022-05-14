if(process.env.NODE_ENV === 'development') {
    const path = require('path');
    require('dotenv').config({ path: path.resolve('..', '..', '.env') });
}
module.exports = {};
