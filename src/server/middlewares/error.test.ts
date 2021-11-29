/* eslint-disable @typescript-eslint/no-unused-vars */
import { notFoundErrorHandler, errorHandler } from "./error";
import {
  IError,
  mockRequest,
  mockResponse,
} from "../../utils/mocks/mockFunctions";

describe("Given a notFoundErrorHandler middleware", () => {
  describe("When it receives an object res", () => {
    test("Then it should send a response with a 'Endpoint not found' error and status code of 404", async () => {
      const res = mockResponse();
      const req = mockRequest();
      const error = new Error("Endpoint not found") as IError;

      await notFoundErrorHandler(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: "Endpoint not found" });
    });
  });
});

describe("Given an errorHandler middleware", () => {
  describe("When it gets a request and an error and no error code", () => {
    test("Then it should send a response with a 'All broken' error and a status code of 500", async () => {
      const res = mockResponse();
      const error = new Error("All broken") as IError;
      const next = () => {};

      await errorHandler(error, null, res, next);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "All broken" });
    });
  });
  describe("When it is invoked by ValidationError", () => {
    test("Then it should response with an error message 'Not valid request'", async () => {
      const res = mockResponse();
      const error = new Error("Validation Error") as IError;
      error.statusCode = 400;

      await errorHandler(error, null, res, null);

      expect(res.json).toHaveBeenCalledWith({ error: error.message });
      expect(res.status).toHaveBeenCalledWith(error.statusCode);
    });
  });
});
