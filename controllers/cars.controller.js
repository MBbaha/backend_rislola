const { Car } = require('../models/carSchema');
const mongoose = require('mongoose');

const postRegister = async (req, res) => {
    try {
        const { title, model, description, color, horsePower, carType, charging, weight, gasoline, yearMachine, price } = req.body;
        const existingCar = await Car.findOne({ model });

        if (existingCar) {
            return res.status(400).json({
                success: false,
                message: "Bu nom bilan ro'yxatdan o'tgan avtomobil mavjud"
            });
        }

        const newCar = new Car({ title, model, description, color, horsePower, carType, charging, weight, gasoline, yearMachine, price });

        await newCar.save();
        return res.status(201).json({
            success: true,
            message: "Avtomobil muvaffaqiyatli qo'shildi"
        });
    } catch (error) {
        console.error("Xato:", error.message || error);
        return res.status(500).json({
            success: false,
            message: "Ro'yxatdan o'tishda xato yuz berdi"
        });
    }
};

const getCar = async (req, res) => {
    try {
        const cars = await Car.find({});
        res.json({
            success: true,
            message: "Barcha avtomobillar ro'yxati olingan",
            data: cars
        });
    } catch (error) {
        console.error("Xato avtomobillarni olishda:", error.message || error);
        res.status(500).json({
            success: false,
            message: "Avtomobillarni olishda xato yuz berdi"
        });
    }
};

const getCarById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: `Noto'g'ri ID formati: ${id}`,
            });
        }

        const car = await Car.findById(id);

        if (!car) {
            return res.status(404).json({
                success: false,
                message: `ID ${id} bo'yicha avtomobil topilmadi`,
            });
        }

        res.json({
            success: true,
            message: `ID ${id} bo'yicha avtomobil topildi`,
            data: car,
        });
    } catch (error) {
        console.error("Xato avtomobilni olishda:", error.message || error);
        res.status(500).json({
            success: false,
            message: "ID bo'yicha avtomobilni olishda xato yuz berdi",
        });
    }
};

const updateCar = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: `Noto'g'ri ID formati: ${id}`,
            });
        }

        const updatedData = req.body;
        const car = await Car.findByIdAndUpdate(id, updatedData, {
            new: true,
            runValidators: true,
        });

        if (!car) {
            return res.status(404).json({
                success: false,
                message: `ID ${id} bo'yicha avtomobil topilmadi`,
            });
        }

        res.json({
            success: true,
            message: "Avtomobil muvaffaqiyatli yangilandi",
            data: car,
        });
    } catch (error) {
        console.error("Xato avtomobilni yangilashda:", error.message || error);
        res.status(500).json({
            success: false,
            message: "Avtomobilni yangilashda xato yuz berdi",
        });
    }
};

const deleteCar = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: `Noto'g'ri ID formati: ${id}`,
            });
        }

        const car = await Car.findByIdAndDelete(id);

        if (!car) {
            return res.status(404).json({
                success: false,
                message: `ID ${id} bo'yicha avtomobil topilmadi`,
            });
        }

        res.json({
            success: true,
            message: "Avtomobil muvaffaqiyatli o'chirildi",
        });
    } catch (error) {
        console.error("Xato avtomobilni o'chirishda:", error.message || error);
        res.status(500).json({
            success: false,
            message: "Avtomobilni o'chirishda xato yuz berdi",
        });
    }
};

module.exports = {
    postRegister,
    getCar,
    getCarById,
    updateCar,
    deleteCar
};
