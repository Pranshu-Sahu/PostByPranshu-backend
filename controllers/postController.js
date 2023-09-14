const Post = require('../models/postModel')
const mongoose = require('mongoose')



// get all Posts
const getPosts = async (req, res) => {
  const userId=req.user._id
  const Posts = await Post.find({userId}).sort({createdAt: -1})
  console.log("all posts ",Posts)
  res.status(200).json(Posts)
}

// get a single Post
const getPost = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such Post'})
  }

  const doc = await Post.findById(id)

  if (!doc) {
    return res.status(404).json({error: 'No such Post'})
  }

  res.status(200).json(doc)
}

// create a new Post
const createPost = async (req, res) => {
  const {title, content,author} = req.body
  const userId=req.user._id;
  console.log(userId)

  // add to the database
  try {
    const newPost = await Post.create({title, content,author,userId})
    res.status(200).json(newPost)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// delete a Post
const deletePost = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'No such Post'})
  }

  const deletedPost = await Post.findOneAndDelete({_id: id})

  if(!deletedPost) {
    return res.status(400).json({error: 'No such Post'})
  }

  res.status(200).json(deletedPost)
}

// update a Post
const updatePost = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'No such Post'})
  }

  const updatedPost = await Post.findOneAndUpdate({_id: id}, {
    ...req.body
  },{
    new:true
  })

  if (!updatedPost) {
    return res.status(400).json({error: 'No such Post'})
  }

  res.status(200).json(updatedPost)
}

module.exports = {
  getPosts,
  getPost,
  createPost,
  deletePost,
  updatePost
}