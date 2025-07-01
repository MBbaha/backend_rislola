const express = require("express");
const { connect } = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const userRoute = require("./routes/user.route");
const usersKvitansiyaRoute = require("./routes/userKvitansiya.route");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const app = express();

// ✅ Ruxsat etilgan frontend domenlar
const allowedOrigins = [
  "https://risola-frontend2.onrender.com"
];

// ✅ CORS opsiyasi
const corsOptions = {
  origin: function (origin, callback) {
    console.log("Kelgan origin:", origin); // loglash
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("CORS xatolik: ruxsat etilmagan domen"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
};

// ✅ CORS middleware birinchi bo‘lishi kerak
app.use(cors(corsOptions));

// ✅ JSON parser
app.use(express.json());

// ✅ Preflight OPTIONS so‘rovga javob (muqim ishlashi uchun)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://risola-frontend2.onrender.com");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");

  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  next();
});

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

// ✅ API route-lar
app.use("/api/users", userRoute);
app.use("/api/userKvitansiya", usersKvitansiyaRoute);

// ✅ Port va server ishga tushurish
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server port ${PORT} da ishga tushdi`);
});
