const mongoose = require('mongoose');
const cities = require('./cities');
const {places, descriptors} = require('./seedHelpers');
const Campground = require('../models/Campground');
const { populate } = require('../models/Campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	console.log('connection open');
});

const sample = (array) => array[Math.floor(Math.random()*array.length)];
const seedDB = async() => {
    await Campground.deleteMany({});
    for (let i = 0; i<200; i++) {
        const random1000 = Math.floor(Math.random()*1000);
        const price = Math.floor(Math.random()*20) + 10;
        const camp = new Campground({
            author: '61c2fc338d82cfd32075a1f8',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum officiis ab laudantium quo quisquam laborum vel unde adipisci. Error amet harum, recusandae nemo voluptates qui perferendis libero obcaecati dolorum dignissimos?',
            price,
            geometry: {
                type: "Point",
                coordinates: [cities[random1000].longitude, cities[random1000].latitude]
            },
            images: [ 
                { "url" : "https://res.cloudinary.com/dpkzt7acu/image/upload/v1640258751/yelpcamp/aprij9wiyeyvkhey91ag.jpg", "filename" : "yelpcamp/aprij9wiyeyvkhey91ag"}, 
                { "url" : "https://res.cloudinary.com/dpkzt7acu/image/upload/v1640258751/yelpcamp/i7k5qznuq1ao2kowjgl9.jpg", "filename" : "yelpcamp/i7k5qznuq1ao2kowjgl9"}]
        });
        await camp.save();
    }
}
seedDB().then(()=>{
    mongoose.connection.close();
})