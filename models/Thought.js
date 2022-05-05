const { Schema, model, Types } = require('mongoose');
const formatTime = require('./../utils/helper')

// Schema to create Post model
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
    username:
    {
      type: String,
      required: true,
    },
    createdAt:
    {
      type: Date,
      default: Date.now,

      get: formatTime
    },
    
  },{
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

// Create a virtual property `tagCount` that gets the amount of comments per user
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      min_lrnght: 1,
      max_length: 50,
    },
    createdAt:
    {
      type: Date,
      default: Date.now,
      
      get: formatTime
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



thoughtSchema
  .virtual('reactionCount')
  // Getter
  .get(function () {
    return this.reactions.length;
  });

// Initialize our Post model
const Thought = model('Thought', thoughtSchema);

module.exports = Thought;

