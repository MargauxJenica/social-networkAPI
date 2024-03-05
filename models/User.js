const { Schema, model } = require('mongoose');
const thoughtSchema = require('./Thought');

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
        transform: function (doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
          },
        getters: true,
    }, 
    // id: false,
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
