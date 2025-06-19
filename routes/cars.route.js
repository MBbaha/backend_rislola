const { Router } = require('express');
const car = Router();

const { postRegister, getCar, getCarById, updateCar, deleteCar } = require('../controllers/cars.controller');

car.post('/register', postRegister);
car.get('/getCar', getCar);
car.get('/getCarById/:id', getCarById);
car.put('/update/:id', updateCar);
car.delete('/delete/:id', deleteCar);

module.exports = { car };
