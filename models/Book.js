import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const BookSchema = new Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
  },
  { timestamps: true }
);

const Book = model('Book', BookSchema);
export default Book;
