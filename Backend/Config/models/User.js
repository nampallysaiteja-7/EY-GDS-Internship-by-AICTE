const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Create a Mongoose schema for the User
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, // Ensure unique email
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6, // Minimum length of password
    },
    role: {
      type: String,
      enum: ['user', 'admin'], // Define user roles
      default: 'user',
    },
    avatar: {
      type: String, // URL to user avatar image (optional)
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt
  }
);

// Hash password before saving a user document
userSchema.pre('save', async function (next) {
  const user = this;

  // Only hash the password if it has been modified or is new
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 10);
  }

  next();
});

// Method to check if entered password matches the hashed password
userSchema.methods.isPasswordMatch = async function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

// Method to generate a JWT token for user authentication
userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id, role: this.role }, process.env.JWT_SECRET, {
    expiresIn: '1h', // Token expires in 1 hour
  });
  return token;
};

// Create a Mongoose model for the User
const User = mongoose.model('User', userSchema);

module.exports = User;
