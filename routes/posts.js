const express = require('express')
const requireAuth=require("../middlewares/requireAuth")

const {
  getPosts,
  getPost,
  createPost,
  deletePost,
  updatePost
}=require("../controllers/postController")

const router = express.Router()

// require auth middleware
router.use(requireAuth)

// GET all posts
router.get('/', getPosts)

// GET a single post
router.get('/:id', getPost)

// POST a new post
router.post('/', createPost)

// DELETE a post
router.delete('/:id',deletePost)

// update a post
router.patch('/:id',updatePost)




module.exports = router