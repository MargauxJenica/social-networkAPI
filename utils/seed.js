const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { userData,thougtData } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');
  // Delete the collections if they exist
  let userCheck = await connection.db.listCollections({ name: 'users' }).toArray();
  if (userCheck.length) {
    await connection.dropCollection('users');
  }
  
  let thoughtCheck = await connection.db.listCollections({ name: 'thought' }).toArray();
  if (thoughtCheck.length) {
    await connection.dropCollection('thought');
  }

  const users = [];
  const applications = getRandomApplications(10);

  for (let i = 0; i < userData.length; i++) {
    const username = userData[i].username;
    const email = userData[i].email;

    users.push({
        username,
        email,
    });
  }

    const thoughts = [];

    for(let i = 0; x < thoughtData.length; i++){
        const thoughtContent = thoughtData[i].thoughtContent;
        const username = thoughtData[i].username;

        thoughts.push({
        thoughtContent,
        username,
        });
    }

  await User.collection.insertMany(users);
  await Thought.collection.insertMany(thoughts);

  console.table(users);
  console.table(thoughts);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});
