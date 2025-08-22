require("dotenv").config(); // load environment variables
const mongoose = require("mongoose");
const User = require("../models/User");

describe("Admin User Creation", () => {
  beforeAll(async () => {
    // Connect to test DB
    await mongoose.connect(process.env.MONGO_URI_TEST);
  });

  afterAll(async () => {
    // Clean up DB and close connection
    await User.deleteMany({});
    await mongoose.connection.close();
  });

  it("should create a new admin user", async () => {
    const admin = new User({
      name: "Admin Test",
      email: "admin@test.com",
      password: "password123", // will be hashed if pre-save hook exists
      isAdmin: true,
    });

    const savedAdmin = await admin.save();

    expect(savedAdmin).toHaveProperty("_id");
    expect(savedAdmin).toHaveProperty("isAdmin", true);
    expect(savedAdmin.email).toBe("admin@test.com");
  });
});
