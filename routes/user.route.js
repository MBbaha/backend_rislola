const { Router } = require("express");
const users = Router();

const {
  postRegister,
  getUsers,
  updateUser,
  deleteUser,
} = require("../controllers/users.controller");

const {
  userRegisterValidationSchema,
  userUpdateValidationSchema,
} = require("../validation/userValidation");

const validateSchema = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }
  next();
};

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Foydalanuvchilarni boshqarish
 */

/**
 * @swagger
 * /api/register:
 *   post:
 *     summary: Yangi foydalanuvchi qo‘shish
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstname
 *               - lastname
 *               - phonenumber
 *               - sana
 *               - summa
 *               - location
 *               - baho
 *               - isactive
 *             properties:
 *               firstname:
 *                 type: string
 *               lastname:
 *                 type: string
 *               phonenumber:
 *                 type: string
 *               sana:
 *                 type: string
 *                 format: date
 *               summa:
 *                 type: string
 *               location:
 *                 type: string
 *               baho:
 *                 type: string
 *                 enum: [yashil, sariq, qizil]
 *               isactive:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Foydalanuvchi qo‘shildi
 *       400:
 *         description: Validatsiya xatosi
 *       500:
 *         description: Server xatosi
 */

/**
 * @swagger
 * /api/getUsers:
 *   get:
 *     summary: Barcha foydalanuvchilarni olish
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Foydalanuvchilar ro‘yxati
 *       500:
 *         description: Server xatosi
 */

/**
 * @swagger
 * /api/updateUsersById/{id}:
 *   put:
 *     summary: Foydalanuvchini yangilash
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Foydalanuvchi ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstname:
 *                 type: string
 *               lastname:
 *                 type: string
 *               phonenumber:
 *                 type: string
 *               sana:
 *                 type: string
 *                 format: date
 *               summa:
 *                 type: string
 *               location:
 *                 type: string
 *               baho:
 *                 type: string
 *                 enum: [yashil, sariq, qizil]
 *               isactive:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Foydalanuvchi yangilandi
 *       404:
 *         description: Topilmadi
 *       500:
 *         description: Server xatosi
 */

/**
 * @swagger
 * /api/delete/{id}:
 *   delete:
 *     summary: Foydalanuvchini o‘chirish
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Foydalanuvchi ID
 *     responses:
 *       200:
 *         description: O‘chirildi
 *       404:
 *         description: Topilmadi
 *       500:
 *         description: Server xatosi
 */

users.post("/register", validateSchema(userRegisterValidationSchema), postRegister);
users.get("/getUsers", getUsers);
users.put("/updateUsersById/:id", validateSchema(userUpdateValidationSchema), updateUser);
users.delete("/delete/:id", deleteUser);

module.exports = users;
