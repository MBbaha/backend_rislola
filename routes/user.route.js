const { Router } = require("express");
const users = Router();

const {
  postRegister,
  getUsers,
  updateUser,
  deleteUser,
} = require("../controllers/users.controller"); // ✅ TO‘G‘RILANGAN

const {
  userRegisterValidationSchema,
  userUpdateValidationSchema,
} = require("../validation/userValidation"); // ✅ VALIDATION NOMLARI

// ✅ VALIDATION MIDDLEWARE
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

// ROUTES

users.post("/register", validateSchema(userRegisterValidationSchema), postRegister);
users.get("/getUsers", getUsers);
users.put("/updateUsersById/:id", validateSchema(userUpdateValidationSchema), updateUser);
users.delete("/delete/:id", deleteUser);

module.exports = users ;
