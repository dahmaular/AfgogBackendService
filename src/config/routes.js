const express = require("express");
const cors = require("cors");
// const createAccount = require("../api/routes/vendor");
const vendors = require("../api/routes/vendor");
const businessType = require("../api/routes/businessTypes");
const productCategory = require("../api/routes/productCategories");
const productBrand = require("../api/routes/productBrand");
const product = require("../api/routes/products");
const auth = require("../api/routes/authentication");
const authUser = require("../api/routes/authUser");
const users = require("../api/routes/users");
const carts = require("../api/routes/carts");
const orders = require("../api/routes/orders");
const storeOrders = require("../api/routes/orders");
const uploadImage = require("../api/routes/imageUpload");
const verifyEmail = require("../api/routes/verifyEmail");
const deliveryAddress = require("../api/routes/deliveryAddress");
const paymentCards = require("../api/routes/paymentCards");
const propertyCategory = require("../api/routes/propCategories");
const property = require("../api/routes/properties");
const inspection = require("../api/routes/inspections");
const approveProperty = require("../api/routes/approveProperty");
const sendOtp = require("../api/routes/sendOtp");
const verifyOtp = require("../api/routes/verifyOtp");
const appVersion = require("../api/routes/appVersions");
const forgotPassword = require("../api/routes/forgotPassword");
const resetPassword = require("../api/routes/resetPassword");
const states = require("../api/routes/states");
const lgas = require("../api/routes/lgas");
// const changePassword = require("../api/routes/changePassword");

module.exports = function (app) {
  app.use(express.json({ limit: "100mb" }));
  app.use(express.urlencoded({ limit: "100mb" }));
  
  // CORS Configuration
  const allowedOrigins = [
    'http://localhost:3000',
    'http://localhost:3001',
    'https://afgog-backend-service.vercel.app',
    'https://afgog-backend-service-*.vercel.app', // Preview deployments
  ];
  
  app.use(cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl)
      if (!origin) return callback(null, true);
      
      // Check if origin is in allowed list or matches preview pattern
      const isAllowed = allowedOrigins.some(allowed => {
        if (allowed.includes('*')) {
          const pattern = allowed.replace('*', '.*');
          return new RegExp(pattern).test(origin);
        }
        return allowed === origin;
      });
      
      if (isAllowed) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
    optionsSuccessStatus: 200
  }));
  
  app.use(express.json());
  // app.use("/api/create-user", createAccount);
  app.use("/api/vendors", vendors);
  app.use("/api/business-type", businessType);
  app.use("/api/product-category", productCategory);
  app.use("/api/product-brand", productBrand);
  app.use("/api/product", product);
  app.use("/api/auth", auth);
  app.use("/api/auth-user", authUser);
  app.use("/api/users", users);
  app.use("/api/cart", carts);
  app.use("/api/orders", orders);
  app.use("/api/store-orders", storeOrders);
  app.use("/api/image", uploadImage);
  app.use("/api/verify-email", verifyEmail);
  app.use("/api/delivery-address", deliveryAddress);
  app.use("/api/payment-cards", paymentCards);
  app.use("/api/property-category", propertyCategory);
  app.use("/api/property", property);
  app.use("/api/inspection", inspection);
  app.use("/api/approve-property", approveProperty);
  app.use("/api/sendOtp", sendOtp);
  app.use("/api/verify-otp", verifyOtp);
  app.use("/api/appVersion", appVersion);
  app.use("/api/forgot-password", forgotPassword);
  app.use("/api/reset-password", resetPassword);
  app.use("/api/state", states);
  app.use("/api/lga", lgas);
  // app.use("/api/changePassword", changePassword);
};
