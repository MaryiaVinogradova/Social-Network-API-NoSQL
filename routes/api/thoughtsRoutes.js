const router = require('express').Router();
const {
  getAllThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,

  createReaction,
  deleteReaction
} = require('../../controllers/thoughtsController');

// /api/thougts/
router
  .route('/')
  .get(getAllThoughts)
  .post(createThought);

// /api/thougt/:thoughtId
router
  .route('/:thoughtId')
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

// reactions  
router
  .route('/:thoughtId/reactions')
  .post(createReaction)
  .delete(deleteReaction);


module.exports = router;
