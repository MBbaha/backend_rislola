const { User } = require("../models/userSchema");

// 1. Register
const postRegister = async (req, res) => {
  try {
    const { firstname, lastname, phonenumber, sana, summa,location,baho, isactive } = req.body;

    const existingUser = await User.findOne({ firstname, lastname, phonenumber });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Bu foydalanuvchi allaqachon ro'yxatdan o'tgan.",
      });
    }

    const newUser = new User({
      firstname,
      lastname,
      phonenumber,
      sana,
      summa,
      location,
      baho,
      isactive,
    });

    await newUser.save();

    res.status(201).json({
      success: true,
      message: "Foydalanuvchi muvaffaqiyatli qo'shildi.",
      data: newUser,
    });
  } catch (error) {
    console.error("❌ Xatolik:", error);
    res.status(500).json({
      success: false,
      message: "Server xatosi: Qo‘shishda muammo yuz berdi.",
    });
  }
};

// 2. Get all users
const getUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      message: "Foydalanuvchilar ro'yxati",
      data: users,
    });
  } catch (error) {
    console.error("❌ Xatolik:", error);
    res.status(500).json({
      success: false,
      message: "Foydalanuvchilarni olishda server xatosi yuz berdi.",
    });
  }
};

// 3. Update user
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedFields = req.body;

    const updatedUser = await User.findByIdAndUpdate(id, updatedFields, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "Foydalanuvchi topilmadi.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Foydalanuvchi yangilandi.",
      data: updatedUser,
    });
  } catch (error) {
    console.error("❌ Xatolik:", error);
    res.status(500).json({
      success: false,
      message: "Foydalanuvchini yangilashda xato yuz berdi.",
    });
  }
};

// 4. Delete user
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({
        success: false,
        message: "Foydalanuvchi topilmadi.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Foydalanuvchi o'chirildi.",
    });
  } catch (error) {
    console.error("❌ Xatolik:", error);
    res.status(500).json({
      success: false,
      message: "O‘chirishda server xatosi yuz berdi.",
    });
  }
};

module.exports = {
  postRegister,
  getUsers,
  updateUser,
  deleteUser,
};
