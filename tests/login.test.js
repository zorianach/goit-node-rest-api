import mongoose from "mongoose";
import supertest from "supertest";
import app from "../app.js";
import dotenv from "dotenv";

dotenv.config();
mongoose.set("strictQuery", false);

const { DB_HOST } = process.env;

describe("login", () => {
  beforeAll(async () => {
    await mongoose.connect(DB_HOST); //connect database before each test
  });

  afterAll(async () => {
    await mongoose.disconnect(DB_HOST); //close database after each test
  });

  it("should login user", async () => {
    const response = await supertest(app).post("/api/users/login").send({
      email: "machine@gmail.com",
      password: "tractor",
    });

    expect(response.statusCode).toBe(200);
    expect(response.body.user).toEqual({
      email: "machine@gmail.com",
      subscription: "business",
    });
    // expect(response.body.user.email).toBe("machine@gmail.com")
    // expect(response.body.user.subscription).toBe( "business");
  });

  it("should not login if email or password is wrong", async () => {
    const response = await supertest(app).post("/api/users/login").send({
      email: "machine@gmail.com",
      password: "buldozer",
    });

    expect(response.statusCode).toBe(401);
  });
});

// "POST /api/users/login"
