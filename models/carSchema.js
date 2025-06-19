const { Schema, model } = require("mongoose");

const carSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  color: {
    type: String,
    required: true,
  },
  horsePower: {
    type: Number,
    required: true,
  },
  carType: {
    type: String,
    required: true,
  },
  charging: {
    type: String,
  },
  weight: {
    type: Number,
    required: true,
  },
  gasoline: {
    type: String,
    required: true,
  },
  yearMachine: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    validate: {
      validator: function (v) {
        return /^(https?:\/\/)?([\w.-]+)\.([a-z]{2,6})(\/[\w.-]*)*\/?$/.test(v);
      },
      message: "Noto'g'ri URL format",
    },
  },
}, { timestamps: true });

const Car = model("Car", carSchema);

module.exports = { Car };
