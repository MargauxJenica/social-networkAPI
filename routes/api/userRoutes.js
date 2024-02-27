// API Endpoints 
const router = require('express').Router();
const {
  getUsers, // get all users
  getSingleUser, // get single user by id
  createUser, // (post) create a new user
  updateUser, // update user info by id
  deleteUser, // delete user and associated thoughts by id
  addFriend, // (post) add a new friend
  deleteFriend, // delete friend from user's list
} = require('../../controllers/userController');

// /api/users
router.route('/').get(getUsers).post(createUser);

// /api/user/:userId
// get, put, delete
router
.route('/:userId')
.get(getSingleUser)
.put(updateUser)
.delete(deleteUser);

// /api/user/:userId/friends/:friendId
router.route('/:userId/friends/:friendId').post(addFriend).delete(deleteFriend);

module.exports = router;