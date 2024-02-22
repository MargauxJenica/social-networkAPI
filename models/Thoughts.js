const { Schema, model } = require('mongoose');
const Reaction = require('./Reaction');

// Schema to create Post model
const thoughtSchema = new Schema(
  {
    description: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 280,
      },
    createdAt: {
      type: Date,
      default: Date.now,
      // getter method to format timestamp on query
      get: function () {
        const options = {
          weekday: 'short',
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          hour12: true,
        };

        return this.createdAt.toLocaleString('en-US', options);
      },
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

// Create a virtual property `getTags` that gets the amount of tags associated with an application
thoughtSchema
  .virtual('reactionCount')
  // Getter
  .get(function () {
    return this.reactions.length;
  });

// Initialize our Application model
const Thought = model('thought', thoughtSchema);

module.exports = Thought;
