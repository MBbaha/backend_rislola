const { Schema, model } = require("mongoose");

const UserKvitansiyaSchema = new Schema(
  {
    fullname: { type: String, required: true, trim: true },
    phonenumber: { type: String, required: true, trim: true },
    sana: { type: String, required: true },
    summa: { type: String, required: true },
    tartibraqam: { type: String, },
    qoshimchatolov: { type: String, required: true },
    amountpeople: { type: String, required: true },
    amountroom: { type: String, required: true },
    location: { type: String, required: true },
   

    // username: {
    //   type: String,
    //   sparse: true, // faqat mavjud bo‘lsa, unique bo‘ladi
    // },
    isactive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// ✅ TO‘G‘RI: Schema nomi bilan pre hook qo‘shiladi
// UserKvitansiyaSchema.pre("save", function (next) {
//   if (!this.username) {
//     this.username = `${this.lastname}_${this.firstname}_${this.phonenumber}`.toLowerCase();
//   }
//   next();
// });

const UserKvitansiya = model("UserKvitansiya", UserKvitansiyaSchema);
module.exports = { UserKvitansiya };
