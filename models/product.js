const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
    },
    discription: {
      type: String,
      trim: true,
      required: true,
      maxlength: 2000,
    },
    price: {
      type: Number,
      trim: true,
      required: true,
      maxlength: 32,
    },
    category: {
      type: ObjectId,
      ref: "Category",
      required: true,
    },
    stock: {
      type: Number,
    },
    photo: {
      data: Buffer,
      contentType: String,
    },
    //add all the informaiom
  },
  { timeStamp: true }
);

module.exports = mongoose.model("Product", productSchema);
