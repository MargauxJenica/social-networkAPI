const { Schema, Types } = require('mongoose');

const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      // getter to format timestamp
      get: formatTimestamp,
    }
  },
  {
    toJSON: {
      // transform: function (doc, ret) {
      //   ret.reactionId = ret._id;
      //   delete ret._id;
      //   delete ret.__v;
      // },
      getters: true,
    },
    id: false,
  }
);

function formatTimestamp(createdAt) {
  return createdAt.toDateString(); // Format date 
}
module.exports = reactionSchema;
