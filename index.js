const express = require("express");
const { connect } = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const userRoute = require("./routes/user.route");
const usersKvitansiyaRoute = require("./routes/userKvitansiya.route");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const app = express();

// ✅ CORS OPTIONS
const corsOptions = {
  origin: "https://risola-frontend2.onrender.com", // frontend domeni
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
};
app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // OPTIONS so‘rovlari uchun

// ✅ JSON bodyni o‘qish
app.use(express.json());

// ✅ MongoDB ulanish
async function connectToDB() {
  try {
    await connect(process.env.MONGODB_URL);
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  }
}
connectToDB();

// ✅ Swagger sozlamalari
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Risola API",
      version: "1.0.0",
      description: "API documentation using Swagger",
    },
    servers: [{ url: "https://risola-backend.onrender.com" }],
  },
  apis: ["./routes/*.js"],
};
const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// ✅ Test route
app.get("/", (req, res) => {
  res.send("✅ Risola backend ishlayapti!");
});
app.use("/api/users", userRoute);
app.use("/api/userKvitansiya", usersKvitansiyaRoute);



// ✅ Serverni ishga tushirish
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
