import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    price: { type: Number, required: true },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model('Order', orderSchema);
export default Order;

// import { DataTypes } from 'sequelize';
// import { sequelize } from '../db.js';

// const Orders = sequelize.define(
//   'orders',
//   {
//     id: {
//       type: DataTypes.INTEGER,
//       primaryKey: true,
//       autoIncrement: true,
//     },
//     price: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//     },
//     date: {
//       type: DataTypes.DATE,
//       allowNull: false,
//       defaultValue: DataTypes.NOW,
//     },
//     user_id: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//     },
//   },
//   {
//     tableName: 'orders',
//     timestamps: false,
//   }
// );

// export default Orders;
