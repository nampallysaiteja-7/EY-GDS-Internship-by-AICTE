const bcrypt = require('bcryptjs');

// Hashing a password
const password = 'userpassword123';
bcrypt.hash(password, 10, (err, hashedPassword) => {
  if (err) throw err;
  console.log('Hashed Password:', hashedPassword);
});

// Comparing entered password with stored hash
const enteredPassword = 'userpassword123';  // Password entered by the user
const storedHashedPassword = '$2a$10$7vxdIpl2V7e8A8DTEXfKUOEx6Y.BF7zgsP1jDPxhZlTBOdu23uYFG';  // Example hash

bcrypt.compare(enteredPassword, storedHashedPassword, (err, isMatch) => {
  if (err) throw err;
  if (isMatch) {
    console.log('Password is correct!');
  } else {
    console.log('Incorrect password');
  }
});
