const pool = require("./pool");

async function getAllMessages() {
  const { rows } = await pool.query("SELECT * FROM messages");
  return rows;
}

async function insertMessage({ message, user, added }) {
  await pool.query(
    "INSERT INTO messages (message, username, created_at) VALUES ($1,$2,$3)",
    [message, user, added],
  );
}

async function searchUsername(id) {
  const { rows } = await pool.query(
    "SELECT * FROM messages WHERE id = ($1)",
    [id],
  );
  return rows;
}

async function deleteAll() {
  await pool.query("DELETE FROM messages");
}
module.exports = {
  getAllMessages,
  insertMessage,
  searchUsername,
  deleteAll,
};
