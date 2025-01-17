const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
  })
  .catch((error) => {
    console.error('Error connecting to the database', error);
  });

// let newRecipe = {
//   title: 'Scrambled Eggs',
//   level: 'Easy Peasy',
//   ingredients: 'eggs',
//   cuisine: 'general',
//   dishType: 'breakfast',
//   image: ' ',
//   duration: 15,
//   creator: 'Gordon Ramsay',
// };

// Recipe.create(newRecipe);

Recipe.insertMany(data)
  .then((createdRecipes) => console.log(Recipe.name))
  .catch((err) => console.log(err));

Recipe.findOneAndUpdate(
  { title: 'Rigatoni alla Genovese' },
  { duration: 100 }
).then((Recipe) => console.log('success!'));

Recipe.deleteOne({ title: 'Carrot Cake' }).then((Recipe) =>
  console.log('another success!')
);

mongoose.connection
  .close()
  .catch((err) =>
    console.log(
      `an error while closing database connection has occurred: ${err}`
    )
  );
