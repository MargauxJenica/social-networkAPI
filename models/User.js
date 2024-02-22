const { Schema, model } = require('mongoose');

const userSchema = new Schema (
    {
        userName: {
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
                    ref: 'Thought',
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
    },
    id: false,
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
const User = model('user', userSchema);

module.exports = User;
