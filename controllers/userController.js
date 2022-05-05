const res = require('express/lib/response');
const { User } = require('../models')

module.exports = {
    getUsers(req, res) {
        User.find({})
        .then ((allUsers) => res.json(allUsers))
        .catch ((err) => 
        res.status(500).json(err));

    },

    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
            .populate('thoughts')
            .then((user) => !user
                ? res.status(404).json({ message: 'No user with this Id' })
                : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },

    createUser(req, res) {
        User.create(req.body)
        .then((user) => res.json(user))
        .catch((err) => res.status(500).json(err));
    },

    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true })
            .then((user) => 
            !user
            ? res.status(404).json({ message: 'No user with this'})
            :res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },

    deleteUser(req, res) {
        User.findByIdAndDelete({
            _id: req.params.userId
        })
        .then((user)=>
        !user? res.status(404).json({ message: 'No user with this Id'})
        :res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },

    makeFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId},
            { $addToSet: { friends: req.params.friendId }},
            { runValidators: true, new: true }
        )
        .then((user) => 
        !user
        ? res 
        .status(404)
        .json({ message: 'No user with this Id'})
        :res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },
    //delete friend
    deleteFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId},
            { $pull: { friends: req.params.friendId }},
            { runValidators: true, new: true }
        )
        .then((friend) => 
        !friend
        ? res 
        .status(404)
        .json({ message: 'No user with this Id'})
        :res.json(friend)
        )
        .catch((err) => res.status(500).json(err));
    }
}