const mongoose = require('mongoose');
const Celebrity = require('../models/Celebrity');

mongoose.connect('mongodb://localhost/lab-mongoose-movies', {
  useNewUrlParser: true
});

const celebrities = [
    {
        name: 'Rachel Ray',
        occupation: 'Chef',
        catchPhrase: 'Delish'
    },
    {
        name: 'Matthew McConaughey',
        occupation: 'actor',
        catchPhrase: 'Alright alright alright'
    },
    {
        name: 'Steve Carell',
        occupation: 'actor',
        catchPhrase: "That's what she said"
    }
]

Celebrity.insertMany(celebrities)
.then (data => {
    console.log(`Success! ${data.length} added to the collection `);
    mongoose.connection.close();
})
.catch(err => {
    console.log(err)
})