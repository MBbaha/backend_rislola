const express = require("express");
const { connect } = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const userRoute = require("./routes/user.route");
const usersKvitansiyaRoute = require("./routes/userKvitansiya.route");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const app = express();

// ✅ CORS OPTIONS — faqat frontenddan kirishga ruxsat
const corsOptions = {
  origin: "https://risola-frontend2.onrender.com",
  methods: ["POST", "GET", "PUT", "DELETE"],
  credentials: true,
};
app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // OPTIONS preflight uchun

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
      description: "API documentation for Risola project",
    },
    servers: [
      {
        url: "https://backend-risola.onrender.com/api", // bu yerga /api qo‘shish kerak!
        description: "Production server",
      },
    ],
  },
  apis: ["./routes/*.js"], // route fayllar ichida yozilgan Swagger commentlar o‘qiladi
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// ✅ Test route
app.get("/", (req, res) => {
  res.send("✅ Risola backend ishlayapti!");
});

// ✅ Asosiy marshrutlar
app.use("/api/users", userRoute);
app.use("/api/kvitansiya", usersKvitansiyaRoute);

// ✅ Serverni ishga tushirish
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
