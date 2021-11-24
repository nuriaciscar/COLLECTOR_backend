import { notFoundErrorHandler, errorHandler } from "./error";
import { mockRequest, mockResponse } from "../../utils/mocks/mockFunctions";

describe("Given a notFoundErrorHandler middleware", () => {
  describe("When it receives an object res", () => {
    test("Then it should send a response with a 'Endpoint not found' error and status code of 404", async () => {
      const res = mockResponse();
      const req = mockRequest();
      const expectedError = { error: "Endpoint not found" };

      await notFoundErrorHandler(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith(expectedError);
    });
  });
});

describe("Given an errorHandler middleware", () => {
  describe("When it gets a request and an error and no error code", () => {
    test("Then it should send a response with a 'All broken' error and a status code of 500", async () => {
      const res = mockResponse();
      const error = { error: "All broken" };
      const next = () => {};

      await errorHandler(error, null, res, next);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith(error);
    });
  });
});
