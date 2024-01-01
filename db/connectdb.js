const mongoose = require('mongoose');
require('dotenv').config();

const dbConnect = process.env.db_link;

mongoose.connect(dbConnect).then(() => {

    console.log('Hurrah! MongoDB connection successfully established :)');

}).catch((err) => {

    console.log('Sorry Bro! MongoDB is not connected :(', err.message);

})