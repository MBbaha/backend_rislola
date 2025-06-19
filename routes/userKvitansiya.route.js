  const { Router } = require("express");
  const userKvitansiya = Router();

  const {
    postRegister,
    getUsers,
    updateUser,
    deleteUser,
  } = require("../controllers/userKvitansiya.controller"); // ✅ TO‘G‘RILANGAN

  const {
    userKvitansiyaRegisterValidationSchema,
    userKvitansiyaUpdateValidationSchema,
  } = require("../validation/userKvitansiyaValidation"); // ✅ VALIDATION NOMLARI

  // ✅ VALIDATION MIDDLEWARE
  const validateSchemas = (schema) => (req, res, next) => {
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

  userKvitansiya.post("/register", validateSchemas(userKvitansiyaRegisterValidationSchema), postRegister);
  userKvitansiya.get("/getUsers", getUsers);
  userKvitansiya.put("/updateUsersById/:id", validateSchemas(userKvitansiyaUpdateValidationSchema), updateUser);
  userKvitansiya.delete("/delete/:id", deleteUser);

  module.exports = userKvitansiya ;
