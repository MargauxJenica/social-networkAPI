const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

// Schema to create Post model
const thoughtSchema = new Schema(
  {
    thoughtText: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 280,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        // getter to format timestamp
        get: formatTimestamp,
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
      transform: function (doc, ret) {
        ret.thoughtId = ret._id;
        delete ret._id;
        delete ret.__v;
      },
      getters: true,
    },
    id: false,
  }
);

// Create a virtual property `thoughtSchema` that gets the amount of thoughts associated with an thought
thoughtSchema
  .virtual('reactionCount')
  // Getter
  .get(function () {
    return this.reactions.length;
  });

function formatTimestamp(createdAt) {
  return createdAt.toDateString(); // Format date
}
// Initialize our Thought model
const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
