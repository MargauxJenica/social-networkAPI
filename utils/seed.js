const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { userData, thoughtData } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected to the database');
  
   // Delete the collections if they exist  
   let userCheck = await connection.db.listCollections({ name: 'users' }).toArray();
   if (userCheck.length) {
     await connection.dropCollection('users');
   }
 
   let thoughtCheck = await connection.db.listCollections({ name: 'thought' }).toArray();
   if (thoughtCheck.length) {
     await connection.dropCollection('thought');
   }
 
   const user = [];
 
   for(let x=0; x<userData.length; x++){
     const username = userData[x].username;
     const email = userData[x].email;
 
     user.push({
       username,
       email,
     });
   }
   
   const thoughts = [];
 
   for(let x=0; x<thoughtData.length; x++){
     const thoughtText = thoughtData[x].thoughtText;
     const username = thoughtData[x].username;
 
     thoughts.push({
       thoughtText,
       username,
     });
}

  try {

    await User.collection.insertMany(users);
    console.log('Users count:', users.length);

    await Thought.collection.insertMany(thoughts);
    console.log('Thoughts count:', thoughts.length);

    console.table(users);
    console.table(thoughts);
    console.info('Seeding complete! 🌱');
    
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    process.exit(0);
  }
});
