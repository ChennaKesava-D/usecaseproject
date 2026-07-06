const express = require('express');
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// --- In-memory "database" ---
// Data lives only in this array. It resets whenever the server restarts.
let expenses = [];
let nextId = 1;

// GET all expenses
app.get('/api/expenses', (req, res) => {
  res.json(expenses);
});

// POST a new expense
app.post('/api/expenses', (req, res) => {
  const { amount, category, description } = req.body;
  if (amount === undefined || isNaN(amount)) {
    return res.status(400).json({ error: 'A valid numeric amount is required.' });
  }
  const expense = {
    id: nextId++,
    amount: parseFloat(amount),
    category: category || 'uncategorized',
    description: description || '',
    date: new Date().toISOString().split('T')[0],
  };
  expenses.push(expense);
  res.status(201).json(expense);
});

// DELETE an expense by id
app.delete('/api/expenses/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const before = expenses.length;
  expenses = expenses.filter((e) => e.id !== id);
  if (expenses.length === before) {
    return res.status(404).json({ error: `No expense found with ID ${id}.` });
  }
  res.json({ deleted: id });
});

// GET summary
app.get('/api/summary', (req, res) => {
  const total = expenses.reduce((sum, e) => sum + e.amount, 0);
  const byCategory = {};
  expenses.forEach((e) => {
    byCategory[e.category] = (byCategory[e.category] || 0) + e.amount;
  });
  res.json({ total, byCategory });
});

app.get('/health', (req, res) => res.send('OK'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Expense tracker (no DB, in-memory) running on port ${PORT}`);
});
