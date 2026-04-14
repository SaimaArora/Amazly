const db = require("../config/db");

// GET cart items
exports.getCart = (req, res) => {
  const query = `
    SELECT cart.id, products.name, products.price, products.image, cart.quantity
    FROM cart
    JOIN products ON cart.product_id = products.id
  `;

  db.query(query, (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
};

// ADD to cart
exports.addToCart = (req, res) => {
  const { product_id, quantity } = req.body;

  const query = "INSERT INTO cart (product_id, quantity) VALUES (?, ?)";

  db.query(query, [product_id, quantity], (err) => {
    if (err) return res.status(500).send(err);
    res.send("Added to cart");
  });
};

// UPDATE quantity
exports.updateCart = (req, res) => {
  const { quantity } = req.body;

  db.query(
    "UPDATE cart SET quantity=? WHERE id=?",
    [quantity, req.params.id],
    (err) => {
      if (err) return res.status(500).send(err);
      res.send("Updated");
    }
  );
};

// DELETE item
exports.deleteCartItem = (req, res) => {
  db.query("DELETE FROM cart WHERE id=?", [req.params.id], (err) => {
    if (err) return res.status(500).send(err);
    res.send("Deleted");
  });
};