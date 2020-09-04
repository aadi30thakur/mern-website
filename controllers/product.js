const Product = require("../models/product");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");
const product = require("../models/product");
const { json } = require("body-parser");

exports.getProductById = (req, res, next, id) => {
  Product.findById(id)
    .populate("category")
    .exec((err, product) => {
      if (err) {
        return res.status(400).json({
          error: "product not found",
        });
      }
      req.product = product;
      next();
    });
};

exports.createProduct = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, feilds, file) => {
    if (err) {
      return res.status(400).json({
        err: `problem with image   ${err}`,
      });
    }
    //destructure the feild
    const { name, discription, price, category, stock } = feilds;

    //check all the statements

    if (!name || !discription || !price || !category || !stock) {
      return res.status(400).json({
        error: "please include all the feilds",
      });
    }
    //TODO restrictions on feild
    let product = new Product(feilds);

    //hndle file here
    if (file.photo) {
      if (file.photo.size > 3000000) {
        return res.status(400).json({
          error: "file size too big",
        });
      }
      product.photo.data = fs.readFileSync(file.photo.path);
      product.photo.contentType = file.photo.type;
    }
    //save to databas=se
    product.save((err, product) => {
      if (err) {
        res.status(400).json({
          error: "saving to db failed",
        });
      }
      res.json(product);
    });
  });
};

exports.getProduct = (req, res) => {
  req.product.photo = undefined;
  return res.json(req.product);
};
// TODO: check here
exports.photo = (req, res, next) => {
  if (req.product.photo.data) {
    res.set("Content-Type", req.product.photo.contentType);
    return res.send(req.product.photo.data);
  }
  next();
};

// exports.photo = (req, res, next) => {
//   if (req.product.photo.data) {
//     res.set("Content-Type", req.product.photo.contentType);
//     return res.send(req.product.photo.data);
//   }
//   next();
// };

exports.deleteProduct = (req, res) => {
  let product = req.product;
  product.remove((err, deletedproduct) => {
    if (err) {
      return res.status(400).json({
        err: "Failed to delete the product from the data base",
      });
    }
    res.json({
      message: "deletion was a success",
      deletedproduct,
    });
  });
};

exports.updateProduct = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      console.log(`error: ${err} `);
      return res.status(400).json({
        error: `problem with image ${err}`,
      });
    }

    //updation code
    let product = req.product;
    product = _.extend(product, fields);

    //handle file here
    if (files.photo) {
      if (files.photo.size > 3000000) {
        return res.status(400).json({
          error: "File size too big!",
        });
      }
      product.photo.data = fs.readFileSync(files.photo.path);
      product.photo.contentType = files.photo.type;
    }
    //save to the DB
    product.save((err, product) => {
      if (err) {
        res.status(400).json({
          error: "Updation of product failed",
        });
      }
      res.json(product);
    });
  });
};
//product listing
exports.getAllProducts = (req, res) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : 8;
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
  product
    .find()
    .select("-photo")
    .populate("category")
    .sort([[sortBy, "asc"]])
    .limit(limit)
    .exec((err, products) => {
      if (err) {
        return res.status(400).json({
          error: "NO product found",
        });
      }
      res.json(products);
    });
};

exports.getAllUniqueCategories = (req, res) => {
  Product.distinct("category", {}, (err, category) => {
    if (err) {
      return res.status(400).json({
        error: "no category found",
      });
    }
    res.json(category);
  });
};

exports.updateStock = (req, res, next) => {
  let myOperatios = req.body.order.products.map((prod) => {
    return {
      updateOne: {
        filter: {
          _id: prod._id,
          update: { $inc: { stock: -prod.count, sold: +prod.count } },
        },
      },
    };
  });
  product.bulkWrite(myOperatios, {}, (err, products) => {
    if (err) {
      return res.status(400).json({
        error: "bulk operations failed",
      });
    }
    next();
  });
};
