import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connect
mongoose.connect("mongodb://localhost:27017/user_form", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB connected'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// Schema and Model
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number, required: true, min: 5 }
}, {
  timestamps: true
});

const User = mongoose.model('User', userSchema);

// API Route
app.post('/api/form', async (req, res) => {
  const { name, email, age } = req.body;
  try {
    const newUser = new User({ name, email, age });
    await newUser.save();
    res.status(201).json({ message: 'Form submitted successfully', email: newUser.email });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error saving form data' });
  }
});

// Start server
app.listen(5000, () => {
  console.log('🚀 Server running at http://localhost:5000');
});
