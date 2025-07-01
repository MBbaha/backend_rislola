const express = require("express");
const { connect } = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const userRoute = require("./routes/user.route");
const usersKvitansiyaRoute = require("./routes/userKvitansiya.route");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const app = express();

// ✅ CORS OPTIONS — frontendlardan ruxsat berilgan originlar
const allowedOrigins = [
  "http://localhost:3000",
  "https://risola-frontend2.onrender.com"
];

const corsOptions = {
  origin: function (origin, callback) {
    console.log("Kelgan origin:", origin); // 🔍 log uchun
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("CORS xatolik: ruxsat etilmagan domen"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // ✅ OPTIONS bor
  credentials: true,
};

// ❗ CORS HAR DOIM JSON middlewaredan oldin yozilishi kerak
app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // OPTIONS so‘rovlar uchun

app.use(express.json()); // JSON parser keyin turadi



// ✅ MongoDB ulanish
async function connectToDB() {
  try {
    await connect(process.env.MONGODB_URL);
    console.log("✅ MongoDB ulanish muvaffaqiyatli");
  } catch (err) {
    console.error("❌ MongoDB ulanishda xatolik:", err.message);
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
        url: "https://risola-backend.onrender.com/api",
        description: "Production server (Render)",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// ✅ Test route
app.get("/", (req, res) => {
  res.send("✅ Risola backend ishlayapti!");
});

// ✅ Marshrutlar
app.use("/api/", userRoute);
app.use("/api/userKvitansiya", usersKvitansiyaRoute);

// ✅ Serverni ishga tushirish
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server port ${PORT} da ishga tushdi`);
});
