const Product = require("../models/product");

const getAllProductsStatic = async (req, res) => {
  res.status(200).json({ msg: "testing products route" });
};
const getAllProducts = async (req, res) => {
  const { featured, company, name, sort, fields, numFilters } = req.query;
  const queryObject = {};
  if (featured) {
    queryObject.featured = featured === "true" ? true : false;
  }
  if (company) {
    queryObject.company = company;
  }
  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
  }
  if (numFilters) {
    const operatorMap = {
      ">": "$gt",
      ">=": "$gte",
      "=": "$eq",
      "<": "$lt",
      "<=": "$lte",
    };
    const regEx = /\b(<|>|>=|=|<|<=)\b/g;
    let filters = numFilters.replace(
      regEx,
      (match) => `-${operatorMap[match]}-`,
    );
    const options = ["price", "rating"];
    filters = filters.split(",").forEach((item) => {
      const [field, operator, value] = item.split("-");
      if (options.includes(field)) {
        queryObject[field] = { [operator]: Number(value) };
      }
    });
  }
  let result = Product.find(queryObject);
  if (sort) {
    const sortList = sort.split(",").join(" ");
    result = result.sort(sortList);
  }
  if (fields) {
    const fieldsList = sort.split(",").join(" ");
    result = result.select(fieldsList);
  }
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  result = result.skip(skip).limit(limit);
  const products = await result;
  res.status(200).json({ products, nbHits: products.length });
};
const getProduct = async (req, res) => {
  res.status(200).json({});
};
const createProduct = async (req, res) => {
  res.status(200).json({});
};
const updateProduct = async (req, res) => {
  res.status(200).json({});
};
const deleteProduct = async (req, res) => {
  res.status(200).json({});
};

module.exports = {
  getAllProducts,
  getAllProductsStatic,
};
