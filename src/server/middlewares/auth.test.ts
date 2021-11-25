import jwt from "jsonwebtoken";
import auth from "./auth";

import {
  mockResponse,
  mockAuthRequest,
  mockNextFunction,
} from "../../utils/mocks/mockFunctions";

describe("Given an auth middleware", () => {
  describe("When it gets a request with an incorrect Authorization header", () => {
    test("Then it should invoke the next function", async () => {
      const req = mockAuthRequest(null, "Bearer");
      const res = mockResponse();
      const next = mockNextFunction();

      await auth(req, res, next);

      expect(next).toHaveBeenCalled();
    });
    test("Then it should send an error with status 401 and message 'Not authorized sorry'", async () => {
      const req = mockAuthRequest(null, null);
      const res = mockResponse();
      const next = mockNextFunction();
      const expectedError: {
        message: string;
        code?: number;
      } = new Error("Not authorized sorry");

      await auth(req, res, next);

      expect(next.mock.calls[0][0]).toHaveProperty("code", 401);
      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
  describe("When it receives a request with an Authorization header but no token", () => {
    test("Then it should respond with an error message 'Token is missing' and error status 401", async () => {
      const req = mockAuthRequest(null, "Bearer");
      const res = mockResponse();
      const next = mockNextFunction();
      const expectedError: {
        message: string;
        code?: number;
      } = new Error("Token missing...");

      await auth(req, res, next);

      expect(next.mock.calls[0][0]).toHaveProperty("code", 401);
      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
  describe("When it receives a request with a Authorization header and it validates", () => {
    test("Then it should add userId and username to req and call next function", async () => {
      const req = mockAuthRequest(null, "Bearer token");
      const res = mockResponse();
      const next = mockNextFunction();
      jwt.verify = jest.fn().mockReturnValue("something");

      await auth(req, res, next);

      expect(req).toHaveProperty("idUser");
      expect(req).toHaveProperty("username");
      expect(next).toHaveBeenCalled();
    });
  });
  describe("When it receives a request with a Authorization header but with a token incorrect", () => {
    test("Then it should respond with an error message 'Token invalid' and error status 401", async () => {
      const req = mockAuthRequest(null, "Bearer token");
      const res = mockResponse();
      const next = mockNextFunction();
      const expectedError: {
        message: string;
        code?: number;
      } = new Error("Token invalid");
      jwt.verify = jest.fn().mockReturnValue(null);

      await auth(req, res, next);

      expect(next.mock.calls[0][0]).toHaveProperty("code", 401);
      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});
