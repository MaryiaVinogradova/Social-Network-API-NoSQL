const { User, Thought } = require('../models');

module.exports = {
    //get all thoughts return
    getAllThoughts(req, res) {
      Thought.find({})
          .then((allThoughts) => res.json(allThoughts))
          .catch((err) =>
              res.status(500).json(err)
          );
   },

    //see one thought
    getSingleThought(req, res) {
      Thought.findOne({ _id: req.params.thoughtId })
        .select('reactions')
        .then((thought) =>
          !thought
            ? res.status(404).json({ message: 'No thought with that ID' })
            : res.json(thought)
        )
        .catch((err) => {
            res.status(500).json(err)
        });
    },

    // create a new thought
    createThought(req, res) {
      Thought.create(req.body)
        .then((thought) => {
          return User.findOneAndUpdate(
            { _id: req.body.userId },
            { $addToSet: { thoughts: thought._id } },
            { runValidation: true, new: true }
          )}
          )

        .then((thought) =>
          !thought
            ? res
                .status(404)
                .json({ message: 'Thought was not created' })
            : res.json('Thought was created')
        )
        .catch((err) => 
          res.status(500).json(err));
    },

    //delete thought 
    deleteThought(req, res) {
            return Thought.findOneAndDelete(
              { _id: req.params.thoughtId },
            )
          .then((thought) =>
            !thought
              ? res
                  .status(404)
                  .json({ message: 'Thought is not existed' })
              : Thought.findOneAndUpdate(
                  { thoughts: req.params.thoughtId},
                  { $pull: { thoughts: req.params.thoughtId}},
                  { new: true}
              ),
              res.json({ messsage: "Your thought is deleted"})
          )
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
    },

    //update thought
    updateThought(req, res) {
            return Thought.findOneAndUpdate(
              { _id: req.params.thoughtId },
              { $addToSet: req.body },
              { validate: true, new: true}
            )
          .then((thought) =>
            !thought
              ? res
                  .status(404)
                  .json({ message: 'Not found' })
              : res.json(thought)
          )
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
      },

      //reactions: get, delete 

      createReaction(req, res) {
        Thought.findOneAndUpdate(
              { _id: req.params.thoughtId },
              { $addToSet: { reactions: req.body } },
              { runValidators: true, new: true }
            )
  
          .then((thought) =>
            !thought
              ? res
                  .status(404)
                  .json({ message: 'No thought at this point' })
              : res.json(thought)
          )
          .catch((err) => 
            res.status(500).json(err));
      },

      deleteReaction(req, res) {
        return Thought.findOneAndDelete(
          { _id: req.params.thoughtId },
        )
      .then((thought) =>
        !thought
          ? res
              .status(404)
              .json({ message: 'Reaction is not existed' })
          : Thought.findOneAndUpdate(
              { thoughts: req.params.thoughtId},
              { $pull: { reactions: req.body.reactionId}},
              { new: true}
          ),
          res.json({ messsage: "Your reaction is deleted"})
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
},
};