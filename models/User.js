const { Schema, model } = require('mongoose');
// const thoughtSchema = require('./Thoughts');

const userSchema = new Schema (
    {
        username: {
            type: String,
             unique: true, 
             required: true, 
             trim: true 
            },
            email: {
                type: String,
                required: true,
                unique: true,
                match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
            },
            thoughts: [
                {
                    type: Schema.Types.ObjectId,
                    ref: 'thought',
                },
            ],
            friends: [
                {
                    type: Schema.Types.ObjectId,
                    ref: 'User',
                },
            ],
    },
    {
     toJSON: {
        virtuals: true,
        getters: true,
    }, 
    }
);

// Create a virtual property `friendCount` that gets the number of friends
userSchema
  .virtual('friendCount')
  // Getter
  .get(function () {
    return this.friends.length;
  });

// Initialize our User model
const User = model('User', userSchema);

module.exports = User;
