import queryDB from '../db.js';

export const getAllUsers = async (req, res) => {
  const users = await queryDB('SELECT * FROM users');
  res.json(users);
};

export const getUserById = async (req, res) => {
  const { id } = req.params;
  const user = await queryDB('SELECT * FROM users WHERE id = $1', [id]);
  res.json(user[0]);
};

export const createUser = async (req, res) => {
  const { first_name, last_name, age } = req.body;
  const newUser = await queryDB(
    'INSERT INTO users (first_name, last_name, age) VALUES ($1, $2, $3) RETURNING *',
    [first_name, last_name, age]
  );
  res.status(201).json(newUser[0]);
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { first_name, last_name, age } = req.body;

  const updatedUser = await queryDB(
    'UPDATE users SET first_name = $1, last_name = $2, age = $3 WHERE id = $4 RETURNING *',
    [first_name, last_name, age, id]
  );

  res.json(updatedUser[0]);
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;

  const deletedUser = await queryDB(
    'DELETE FROM users WHERE id = $1 RETURNING *',
    [id]
  );
  res.json(deletedUser[0]);
};
