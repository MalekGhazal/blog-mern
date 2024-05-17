import mongoose from 'mongoose';
import chalk from 'chalk';

const connectDB = async () => {
  const db_string = process.env.DB_URI;

  try {
    await mongoose.connect(db_string);
    console.log(chalk.green('MongoDB connected successfully'));
  } catch (error) {
    console.log(chalk.red('MongoDB connection error: ', error));
    process.exit(1);
  }
};

export default connectDB;
