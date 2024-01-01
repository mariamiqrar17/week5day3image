const Todo = require("../models/Todo");
const { validationResult } = require('express-validator');
const { uploadToCloudinary } = require("../upload/image")

// const Upload = require("../upload/image");

const createTodo = async (req, res) => {
  const input = validationResult(req);
  if (!input.isEmpty()) {
    return res.status(422).json({ input: input.array() });
  }

  const { title, brand, price, description, file } = req.body;
  const upload = await uploadToCloudinary(req.file.buffer);
  const url_link = upload.secure_url
  // console.log("uploading",url_link)

  const user = new Todo({
    title,
    brand,
    price,
    description,
    file_url: url_link
  });

  try {
    const data = await user.save();
    res.send({
      message: "Todo created successfully!!",
      user: data,
    });
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating user",
    });
  }
};

const getAllTodo = async (req, res) => {
  try {
    const states = await Todo.find();
    res.send({
      Todo: states,
      message: "Todo Fetch Successfully",
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteTodo = async (req, res) => {
  try {
    const deletedResource = await Todo.findByIdAndDelete(req.params.id);
    if (!deletedResource) {
      return res.status(404).json({ error: "Resource not found" });
    }

    res.status(200).send({ message: "Todo deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateTodo = async (req, res) => {
  try {
    const input = validationResult(req);
    if (!input.isEmpty()) {
      return res.status(422).json({ input: input.array() });
    }

    const stateId = req.params.id;
    const { title, description, brand, price } = req.body;
    const state = await Todo.findById(stateId);
    if (!state) {
      return res.status(404).send({ error: "Todo not found" });
    }

    state.title = title;
    state.description = description;
    state.price = price;
    state.brand = brand;

    await state.save();

    res.status(200).send({
      state,
      message: "Todo updated successfully",
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// const uploadFile = async(req, res)=>{

//   try {
//       const upload = await Upload.uploadFile(req.file.path);

//       var store = new Store({
//           file_url:upload.secure_url
//       });
//       var record = await store.save();
//       res.send({ succes:true, msg:'File Uploaded Successfully!', data:record });

//   } catch (error) {
//       res.send({ succes:false, msg:error.message });
//   }

// }

module.exports = { createTodo, getAllTodo, deleteTodo, updateTodo };
