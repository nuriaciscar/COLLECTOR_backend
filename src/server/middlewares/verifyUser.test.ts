import {
  mockRequest,
  mockNextFunction,
  mockResponse,
} from "../../utils/mocks/mockFunctions";
import verifyUser from "./verifyUser";

describe("Given a verifyUser function", () => {
  describe("When it receives an id by params that matches with the user id ", () => {
    test("Then it should invoke next function", async () => {
      const req = mockRequest(null, { idUser: "w34t34t435534" });
      req.idUser = "w34t34t435534";
      const res = mockResponse();
      const next = mockNextFunction();

      await verifyUser(req, res, next);

      expect(next).toHaveBeenCalledWith();
    });
  });
  describe("When it receives an id by params that not matches with the user id ", () => {
    test("Then it should invoke next function with an error status 401 and message 'User not verified'", async () => {
      const req = mockRequest(null, { idUser: "w34t34t435534" });
      req.idUser = "w34t34";
      const res = mockResponse();
      const next = mockNextFunction();

      const expectedError: {
        message: string;
        code?: number;
      } = new Error("User not verified");

      await verifyUser(req, res, next);

      expect(next.mock.calls[0][0]).toHaveProperty("code", 401);
      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});
