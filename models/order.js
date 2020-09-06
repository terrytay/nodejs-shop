const monogodb = require('mongodb');
const { getDb } = require('../util/database');

module.exports = class Order {
  constructor(userId, totalPrice) {
    this.userId = userId;
    this.totalPrice = totalPrice;
  }

  save() {
    const db = getDb();
    return db
      .collection('orders')
      .insertOne(this)
      .catch((err) => console.log(err));
  }

  static findById(id) {
    const db = getDb();
    return db
      .collection('orders')
      .find({ _id: new monogodb.ObjectID(id) })
      .next()
      .then((order) => {
        return order;
      })
      .catch((err) => console.log(err));
  }
};
