const mongoose = require('mongoose');
const Connectbd = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/new');
        console.log('Connected to database');
    }
    catch(e) {
        console.log(e);
        throw e;
    }
}
module.exports = Connectbd;