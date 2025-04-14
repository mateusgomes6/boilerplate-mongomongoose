require('dotenv').config();
const mongoose = require('mongoose');
const { Schema } = require('mongoose');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => { 
    console.log('Connected to MongoDB') 
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err)
  });

const personSchema = new mongoose.Schema({
   name: {
     type: String,
     required: true
   },
   age: Number,
   favoriteFoods: [String]
});

let Person = mongoose.model('Person', personSchema);

const createAndSavePerson = (done) => {
  const person = new Person({
    name: 'Mateus',
    age: 18,
    favoriteFood: ['Açaí', 'Churrasco', 'Sushi', 'Pizza']
  })
  person.save((err, data) => {
    if (err) return console.error('Error: ', err)
    else console.log('Saved sucessfully: ', data)
    done(null, data);
  })
};

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, data) => {
    if (err) return console.error('Error: ', err)
    else console.log('Saved sucessfully: ', data)
    done(null, data);
  })
};

const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, (err, data) => {
    if (err) return console.error('Error: ', err)
    else console.log('Saved sucessfully: ', data)
    done(null, data);
  })
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}, (err, data) => {
    if (err) return console.error('Error: ', err)
    else console.log('Saved sucessfully: ', data)
    done(null, data);
  })
};

const findPersonById = (personId, done) => {
  Person.findById({_id: personId}, (err, data) => {
    if (err) return console.error('Error: ', err)
    else console.log('Saved sucessfully: ', data)
    done(null, data)
    });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger"
  Person.findById(personId, (err, data) => {
     if (err) return console.error('Error: ', err)
     else data.favoriteFoods.push(foodToAdd)
     data.save((err, data) => {
       if (err) return console.error('Error: ', err)
       else console.log('Saved sucessfully: ', data)
       done(null, data)
     })
  })
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {new: true}, (err, data) => {
    if (err) return console.error('Error: ', err)
    else console.log('Saved sucessfully: ', data)
    done(null, data)
  })
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove({_id: personId}, (err, data) => {
    if (err) return console.error('Error: ', err)
    else console.log('Saved sucessfully: ', data)
    done(null, data)
  })
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name: nameToRemove}, (err, data) => {
    if (err) return console.error('Error: ', err)
    else console.log('Saved sucessfully: ', data)
    done(null, data)
  })
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({favoriteFoods: {$all: [foodToSearch]}})
  .sort({name: 1})
  .limit(2)
  .select('-age')
  .exec((err, data) => {
    if (err) return console.error('Error: ', err)
    else console.log('Saved sucessfully: ', data)
    done(null, data)
  })
};

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
