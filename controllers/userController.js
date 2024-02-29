// CRUD HANDLING
// const { User } = require('../models');
const { User, Thought } = require('../models');

module.exports = {
  // Get all users
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Get a single user
  async getSingleUser(req, res) {
    try {
      console.log('User ID:', req.params.userId);
      
      const user = await User.findOne({ _id: req.params.userId })
        .select('-__v')
        .populate('thoughts')
        .populate('friends');
  
      console.log('User Result:', user);
  
      if (!user) {
        return res.status(404).json({ message: 'No user found with that ID' });
      }
  
      res.json(user);
    } catch (error) {
      console.error(error);
  
      if (error.name === 'CastError') {
        return res.status(400).json({ message: 'Invalid user ID format' });
      }
  
      if (error.name === 'ValidationError') {
        return res.status(422).json({ message: 'Validation error', error });
      }
  
      res.status(500).json({ message: 'Internal Server Error', error });
    }
  },
  // create a new user
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
  // Delete a user and associated apps
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndDelete({ _id: req.params.userId });

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      await Thought.deleteMany({ _id: { $in: user.thoughts } });
      res.json({ message: 'User and associated apps deleted!' });
    } catch (err) {
      console.error(err);

      // Handle specific error cases
      if (err.name === 'CastError') {
        return res.status(400).json({ message: 'Invalid user ID format' });
      }

      res.status(500).json({ message: 'Internal Server Error' });
    }
  },
  // update user
  async updateUser(req, res) {
    console.log(req.params);
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!user) {
        res.status(404).json({ message: 'No user with this id!' });
      }

      res.json(user);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },
// Add an friend to a user
async addFriend(req, res) {
    console.log('You are adding an friend');
    console.log(req.body);

    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.body._id } },
        { runValidators: true, new: true }
      );

      if (!user) {
        return res
          .status(404)
          .json({ message: 'No user found with that ID :(' });
      }

      res.json(user);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },
  // Remove friend from a user
  async deleteFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId  } },
        { runValidators: true, new: true }
      );

      if (!user) {
        return res
          .status(404)
          .json({ message: 'No user found with that ID :(' });
      }

      res.json({message: 'Removed from your Friends'});
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },
};
