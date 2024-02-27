// CRUD HANDLING
const { Thought, User } = require('../models');

module.exports = {
    // Get all thoughts
    async getThoughts(req, res) {
      try {
        const thoughts = await Thought.find();
        res.json(thoughts);
      } catch (err) {
        console.error(err);
        if (err.name === 'ValidationError') {
          // Handle validation errors (e.g., missing required fields)
          res.status(400).json({ error: 'Validation Error', message: err.message });
        } else if (err.name === 'CastError' && err.kind === 'ObjectId') {
          // Handle invalid ObjectId format
          res.status(400).json({ error: 'Invalid ObjectId', message: 'Invalid thoughtId format' });
        } else {
          // Handle other unexpected errors
          res.status(500).json({ error: 'Internal Server Error', message: 'Something went wrong.' });
        }
        //res.status(500).json(err);
      }
    },
    // Get a single thought
    async getSingleThought(req, res) {
      try {
        const thought = await Thought.findOne({ _id: req.params.thoughtId })
          .select('-__v');
  
        if (!thought) {
          return res.status(404).json({ message: 'No thought with that id' });
        }
  
        res.json(thought);
      } catch (err) {
        console.error(err);
        res.status(500).json(err);
      }
    },
    // create a new thought
    async createThought(req, res) {
      try {
        const thought = await Thought.create(req.body);
        console.log('Created Thought:', thought);
        const user = await User.findOneAndUpdate(
          { _id: req.body.userId },
          { $addToSet: { thoughts: thought._id } },
          { runValidators: true, new: true }
        );
  
        if (!user) {
          return res.status(404).json({
            message: 'Thought created, but found no user with that id',
          })
        }
  
        res.json({message: 'created thought'});
      } catch (err) {
        console.error(err);
        res.status(500).json(err);
      }
    },
    // Delete a thought and associated apps
    async deleteThought(req, res) {
      try {
        const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });
  
        if (!thought) {
          return res.status(404).json({ message: 'No thought with that id' });
        }

        res.json({ message: 'Thought Deleted!' });
      } catch (err) {
        console.error(err);
        res.status(500).json(err);
      }
    },
    // update thought
    async updateThought(req, res) {
      try {
        const thought = await Thought.findOneAndUpdate(
          { _id: req.params.thoughtId },
          { $set: req.body },
          { runValidators: true, new: true }
        );
  
        if (!thought) {
          res.status(404).json({ message: 'No thought with this id!' });
        }
  
        res.json(thought);
      } catch (err) {
        console.error(err);
        res.status(500).json(err);
      }
    },
  // create reaction
  async createReaction(req, res) {  
      try {
        const thought = await Thought.findOneAndUpdate(
          { _id: req.params.thoughtId },
          { $addToSet: { friends: req.body._id } },
          { runValidators: true, new: true }
      );
      if (!thought) {
          return res.status(404).json({ message: 'No thought with that id' });
      }
        res.status(200).json(thought);
      } catch (err) {
        console.error(err);
        res.status(500).json(err);
      }
    },
    // delete reaction
    async deleteReaction(req, res) {
      try {
        const thought = await Thought.findOneAndUpdate(
          { _id: req.params.thoughtId },
          { $pull: { friends: req.params.reactionId  } },
          { runValidators: true, new: true }
        );
  
        if (!thought) {
          return res
            .status(404).json({ message: 'No reaction found with that id' });
        }
  
        res.json({ message: 'reaction deleted'});
      } catch (err) {
        console.error(err);
        res.status(500).json(err);
      }
    },
  };
  