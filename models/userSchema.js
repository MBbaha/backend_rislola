const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  firstname: { type: String, required: true, trim: true },
  lastname: { type: String, required: true, trim: true },
  phonenumber: { type: String, required: true, trim: true },
  sana: { type: String, required: true },
  summa: { type: String, required: true },
  location:{type:String,required:true},
     baho: {
      type: String,
      enum: ["yashil", "sariq", "qizil"], // bu foydalanuvchi noto‘g‘ri baho yuborishining oldini oladi
      required: false, // optional bo‘lsa true, majburiy bo‘lsa `true`
    },
  username: {
    type: String,
    unique: true,
    sparse: true, // optional bo‘lsa, bu kerak
  },
  isactive: { type: Boolean, default: true },
}, { timestamps: true });

// 🔁 Avtomatik `username` yasash
userSchema.pre("save", function (next) {
  if (!this.username) {
    this.username = `${this.lastname}_${this.firstname}_${this.phonenumber}`.toLowerCase();
  }
  next();
});

const User = model("User", userSchema);
module.exports = { User };
