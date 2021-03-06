import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { getFakeNewUser, getFakeUser } from "../../utils/factories/userFactory";

import User from "../../database/models/user";

import { getUser, loginUser, registerUser, updateUser } from "./userController";

import {
  mockResponse,
  mockNextFunction,
  mockRequest,
} from "../../utils/mocks/mockFunctions";

jest.mock("../../database/models/user");

let user: any;
let newUser: any;
beforeEach(() => {
  user = getFakeUser();
  newUser = getFakeNewUser();
});

describe("Given a getUser function", () => {
  describe("When it's invoked with an id of a user", () => {
    test("Then it should respond with an existent user", async () => {
      const res = mockResponse();
      const req = mockRequest(null, { idUser: "619d4896bfa17fbebcc35e74" });
      const next = mockNextFunction();

      User.findById = jest.fn().mockReturnThis();
      User.populate = jest.fn().mockResolvedValue(user);

      await getUser(req, res, next);

      expect(User.findById).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(user);
    });
  });
  describe("When it receives a request with an id and no exists any user with the id", () => {
    test("Then it should invoke next with an error ststus 404 and message 'User not found'", async () => {
      const res = mockResponse();
      const req = mockRequest(null, { idUser: "619d4896bf" });
      const next = mockNextFunction();
      const error: {
        message: string;
        code?: number;
      } = new Error("User not found");
      error.code = 404;
      User.findById = jest.fn().mockReturnThis();
      User.populate = jest.fn().mockResolvedValue(null);

      await getUser(req, res, next);

      expect(next.mock.calls[0][0]).toHaveProperty("code", 404);
      expect(next.mock.calls[0][0]).toHaveProperty("message", error.message);
      expect(next).toHaveBeenCalledWith(error);
    });
  });
  describe("When it receives a req with a non existent idUser", () => {
    test("Then it should invoke next function with an error status 400 and message 'Cannot found any user'", async () => {
      const res = null;
      const req = mockRequest(null, { idUser: "61erg" });
      const next = mockNextFunction();
      const error: {
        message: string;
        code?: number;
      } = new Error("Cannot found any user");
      error.code = 400;
      User.findById = jest.fn().mockReturnThis();
      User.populate = jest.fn().mockRejectedValue(error);

      await getUser(req, res, next);

      expect(next.mock.calls[0][0]).toHaveProperty("code", error.code);
      expect(next.mock.calls[0][0]).toHaveProperty("message", error.message);
    });
  });
});

describe("Given a loginUser function", () => {
  describe("When it receives a request with an incorrect username", () => {
    test("Then it should invoke next function with an error status 401 and message 'Wrong credentials'", async () => {
      const usernameFailed = "pepe";
      const res = mockResponse();
      const req = mockRequest({ username: usernameFailed }, null);
      const next = mockNextFunction();
      const error: {
        message: string;
        code?: number;
      } = new Error("Wrong credentials");
      error.code = 401;
      User.findOne = jest.fn().mockResolvedValue(null);

      await loginUser(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
      expect(next.mock.calls[0][0]).toHaveProperty("code", error.code);
      expect(next.mock.calls[0][0]).toHaveProperty("message", error.message);
    });
  });
  describe("When it receives a request with a correct username but incorrect password", () => {
    test("Then it should invoke next function with an error status 401 and message 'Wrong password'", async () => {
      const passwordFailed = "12345";
      const res = mockResponse();
      const req = mockRequest(
        { username: "pepe", password: passwordFailed },
        null
      );
      const next = mockNextFunction();
      const error: {
        message: string;
        code?: number;
      } = new Error("Wrong password");
      error.code = 401;
      User.findOne = jest.fn().mockResolvedValue({
        username: "pepe",
        password: passwordFailed,
      });
      bcrypt.compare = jest.fn().mockResolvedValue(false);

      await loginUser(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
      expect(next.mock.calls[0][0]).toHaveProperty("code", error.code);
      expect(next.mock.calls[0][0]).toHaveProperty("message", error.message);
    });
  });
  describe("When it receives a request with a correct username an password", () => {
    test("Then it should invoke res.json with an object with a token", async () => {
      const res = mockResponse();
      const req = mockRequest({ username: "pepe", password: "1234" }, null);
      const next = mockNextFunction();
      User.findOne = jest
        .fn()
        .mockResolvedValue({ username: "pepe", password: "1234" });
      bcrypt.compare = jest.fn().mockResolvedValue(true);
      const tokenUser = "token";
      jwt.sign = jest.fn().mockReturnValue(tokenUser);
      const expectedResponse = {
        token: tokenUser,
      };

      await loginUser(req, res, next);

      expect(res.json).toHaveBeenCalledWith(expectedResponse);
    });
  });
});
describe("Given a registerUser function", () => {
  describe("When it receives a request with an already existing username", () => {
    test("Then it should invoke next function with an error status 401 and message 'Username already taken'", async () => {
      const usernameTaken = "pepe";
      const res = mockResponse();
      const req = mockRequest({ username: usernameTaken }, null);
      const next = mockNextFunction();
      const error: {
        message: string;
        code?: number;
      } = new Error("Username already taken");
      error.code = 400;
      User.findOne = jest.fn().mockResolvedValue(true);

      await registerUser(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
      expect(next.mock.calls[0][0]).toHaveProperty("code", error.code);
      expect(next.mock.calls[0][0]).toHaveProperty("message", error.message);
    });
  });
  describe("When it receives a request with a new username", () => {
    test("Then it should invoke res.json and respond with a 200 status", async () => {
      const registeredUser = { ...newUser, password: "password" };
      const res = mockResponse();
      const req = mockRequest({ user }, null);
      const next = mockNextFunction();

      User.findOne = jest.fn().mockResolvedValue(null);
      bcrypt.hash = jest.fn().mockResolvedValue("password");
      User.create = jest.fn().mockResolvedValue(registeredUser);

      await registerUser(req, res, next);

      expect(res.json).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
    });
  });
});
describe("Given an updateUser function", () => {
  describe("When it's invoked with an existing user id", () => {
    test("Then it should return an updated user in res.json", async () => {
      const userToUpdate = { ...user };
      const res = mockResponse();
      const req = mockRequest({ name: "pepe" }, { idUser: "619d4896bf" });
      const next = mockNextFunction();

      User.findByIdAndUpdate = jest.fn().mockResolvedValue(userToUpdate);

      await updateUser(req, res, next);

      expect(res.json).toHaveBeenCalledWith(userToUpdate);
    });
  });
  describe("When it's invoked but there's an error", () => {
    test("Then it should invoke next function with an error status 400 and message 'Cannot update the user'", async () => {
      const res = mockResponse();
      const req = mockRequest({ name: "pepe" }, { idUser: "619d4896bf" });
      const next = mockNextFunction();
      const error: {
        message: string;
        code?: number;
      } = new Error("Cannot update the user");
      error.code = 400;

      User.findByIdAndUpdate = jest.fn().mockRejectedValue(error);

      await updateUser(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
      expect(next.mock.calls[0][0]).toHaveProperty("code", error.code);
      expect(next.mock.calls[0][0]).toHaveProperty("message", error.message);
    });
  });
});
