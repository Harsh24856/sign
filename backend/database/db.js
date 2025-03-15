const mongoose = require('mongoose');
const Connectbd = async () => {
    try {
        await mongoose.connect('mongodb+srv://harshsehra1:gg8O1NnMeLXeXAld@cluster0.itd6t.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to database');
    }
    catch(e) {
        console.log('Connection error:', e.message);
        throw e;
    }
}
module.exports = Connectbd;