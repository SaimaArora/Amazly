const db = require("../config/db");

// GET all products + search + filter
exports.getProducts = (req, res) => {
  const { search, category } = req.query;

  let query = "SELECT * FROM products WHERE 1=1";

  if (search) {
    query += ` AND name LIKE '%${search}%'`;
  }

  if (category) {
    query += ` AND category='${category}'`;
  }

  db.query(query, (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
};

// GET single product
exports.getProductById = (req, res) => {
  db.query(
    "SELECT * FROM products WHERE id=?",
    [req.params.id],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.json(result[0]);
    }
  );
};