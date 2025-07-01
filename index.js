const express = require("express");
const { connect } = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const userRoute = require("./routes/user.route");
const usersKvitansiyaRoute = require("./routes/userKvitansiya.route");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const app = express();

// ✅ CORS OPTIONS — bir nechta frontend domenlariga ruxsat
const allowedOrigins = [
  "http://localhost:3000",
  "https://risola-frontend2.onrender.com"
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("CORS xatolik: ruxsat etilmagan domen"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
};

// ✅ CORS middleware — eng yuqoriga qo‘yish kerak!
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

// ✅ JSON bodyni o‘qish
app.use(express.json());

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
        url: "https://backend-rislola.onrender.com", // 💡 Diqqat: to‘g‘ri domen nomi bo‘lsin!
        description: "Production server",
      },
    ],
  },
  apis: ["./routes/*.js"], // Swagger commentlar shu fayllarda bo‘lishi kerak
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// ✅ Test route
app.get("/", (req, res) => {
  res.send("✅ Risola backend ishlayapti!");
});

// ✅ Asosiy marshrutlar
app.use("/api", userRoute);
app.use("/api", usersKvitansiyaRoute);

// ✅ Serverni ishga tushirish
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server port ${PORT} da ishga tushdi`);
});
