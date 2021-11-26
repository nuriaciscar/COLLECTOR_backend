import User from "../../database/models/user";
import {
  mockRequest,
  mockNextFunction,
  mockResponse,
  RequestAuthCollection,
} from "../../utils/mocks/mockFunctions";
import verifyCollection from "./verifyCollection";

describe("Given a verifyCollection function", () => {
  describe("When the User field 'collections' contains de id of the collection received", () => {
    test("Then it should invoke next function", async () => {
      const req: RequestAuthCollection = mockRequest(null, {
        idCollection: "67298r2245f",
      });
      req.idUser = "w34t34";
      const res = mockResponse();
      const next = mockNextFunction();

      User.findOne = jest
        .fn()
        .mockResolvedValue({
          id: req.idUser,
          collections: [req.params.idCollection],
        });

      await verifyCollection(req, res, next);

      expect(req).toHaveProperty("idUser");
      expect(next).toHaveBeenCalled();
    });
  });
  describe("When the User field 'collections' not contains de id of the collection received", () => {
    test("Then it should invoke next with an error status 401 and message 'Not allowed'", async () => {
      const req: RequestAuthCollection = mockRequest(null, {
        idCollection: "67298r22",
      });
      req.idUser = "w34t34";
      const res = mockResponse();
      const next = mockNextFunction();
      const expectedError: {
        message: string;
        code?: number;
      } = new Error("Not allowed");

      User.findOne = jest.fn().mockResolvedValue({
        id: req.idUser,
        collections: [],
      });

      await verifyCollection(req, res, next);

      expect(next.mock.calls[0][0]).toHaveProperty("code", 401);
      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});
