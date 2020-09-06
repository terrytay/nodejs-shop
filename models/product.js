const { getDb } = require('../util/database');
const mongodb = require('mongodb');

module.exports = class Product {
  constructor(title, price, description, imageUrl, userId) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
    this.userId = userId;
  }

  save(id) {
    const db = getDb();
    if (id) {
      return Product.findByIdAndUpdate(id, { $set: this });
    } else {
      return db
        .collection('products')
        .insertOne(this)
        .catch((err) => console.log(err));
    }
  }

  static fetchAll() {
    const db = getDb();
    return db
      .collection('products')
      .find()
      .toArray()
      .then((products) => {
        return products;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static findById(id) {
    const db = getDb();
    return db
      .collection('products')
      .find({ _id: new mongodb.ObjectID(id) })
      .next()
      .then((product) => {
        return product;
      })
      .catch((err) => {
        console.log(err);
      });
  }
  static findByIdAndUpdate = (id, update) => {
    const db = getDb();
    return db
      .collection('products')
      .updateOne({ _id: new mongodb.ObjectID(id) }, update)
      .catch((err) => console.log(err));
  };

  static deleteById(id) {
    const db = getDb();
    return db
      .collection('products')
      .deleteOne({ _id: new mongodb.ObjectID(id) })
      .catch((err) => console.log(err));
  }
};
