const { Schema, model } = require('mongoose');

// Schema to create Post model
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true
    },
    email:
      {
        type: String,
        required: true,
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
      },
    thoughts: [{
      type: Schema.Types.ObjectId,
      ref: 'Thought',
    },
  ],
    friends:[
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      }
  ]
  },
);

// Create a virtual property `tagCount` that gets the amount of comments per user
userSchema
  .virtual('friendCount')
  // Getter
  .get(function () {
    return this.friends.length;
  });

// Initialize our Post model
const User = model('User', userSchema);

module.exports = User;
