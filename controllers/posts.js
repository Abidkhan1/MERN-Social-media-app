import PostMessage from "../models/postMessage.js";

export const getPosts = async (req, res) => {
  try {
    const postMessages = await PostMessage.find();
    console.log(postMessages);

    res.status(200).json(postMessages);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}; //getPosts

export const createPost = async (req, res) => {
  const post = req.body;

  const newPost = new PostMessage(post);

  try {
    await newPost.save();

    res.status(200).json(newPost);
  } catch (error) {
    res.status(419).json({ message: error.message });
  }
}; //createPost

export const updatePost = async (req, res) => {
  const { id: _id } = req.params;
  const post = req.body;

  if (!mongoose.Types.ObjectId.IsValid(_id))
    return res.status(404).send("No data with this ID");

  const updatedPost = PostMessage.findByIdAndUpdate(_id, post, { new: true });
  res.json(updatedPost);
}; //updatePost
