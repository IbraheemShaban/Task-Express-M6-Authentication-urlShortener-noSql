const mongoose = require('mongoose');

const connectDB = async () => {
  const conn = await mongoose.connect(
    'mongodb+srv://ishaban:Qwerty123@cluster0.ww6ulma.mongodb.net/test',
    {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    }
  );

  console.log(`mongo connected: ${conn.connection.host}`);
};

module.exports = connectDB;
