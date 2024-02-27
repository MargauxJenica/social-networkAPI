// API Endpoints 
const router = require('express').Router();
const {
  getThoughts, // get all thoughts
  getSingleThought, // get a single thought by id
  createThought, // (post) create a thought
  updateThought, // update a thought by id
  deleteThought, // delete a thought by id
  createReaction, // create a reaction stored in single thought's reactions array
  deleteReaction, // delete reaction by reactionId 
} = require('../../controllers/thoughtController');

// /api/thoughts
router.route('/').get(getThoughts).post(createThought);

// /api/thoughts/:thoughtId
// get, put, delete
router
  .route('/:thoughtId')
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

// /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions').put(createReaction);

// /api/thoughts/:thoughtId/reactions/:reactionId
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router;