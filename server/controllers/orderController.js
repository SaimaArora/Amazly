const db = require("../config/db");

// PLACE ORDER
exports.placeOrder = (req, res) => {
  const { items, total } = req.body;
    // reduce stock
items.forEach((item) => {
  db.query(
    "UPDATE products SET stock = stock - ? WHERE id = ?",
    [item.quantity, item.product_id]
  );
});
  db.query(
    "INSERT INTO orders (total_amount) VALUES (?)",
    [total],
    (err, result) => {
      if (err) return res.status(500).json({ message: "Server error" });

      const orderId = result.insertId;

      const orderItems = items.map((item) => [
        orderId,
        item.product_id,
        item.quantity,
        item.price,
      ]);

      db.query(
        "INSERT INTO order_items (order_id, product_id, quantity, price) VALUES ?",
        [orderItems],
        (err) => {
          if (err) return res.status(500).send(err);

          db.query("DELETE FROM cart", () => {});

          res.json({ orderId });
        }
      );
    }
  );
};
exports.getOrderById = (req, res) => {
  const orderId = req.params.id;

  const query = `
    SELECT orders.id, orders.total_amount, products.name, order_items.quantity, order_items.price
    FROM orders
    JOIN order_items ON orders.id = order_items.order_id
    JOIN products ON order_items.product_id = products.id
    WHERE orders.id = ?
  `;

  db.query(query, [orderId], (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
};