import Image from "../../database/models/image";
import User from "../../database/models/user";
import {
  mockNextFunction,
  mockResponse,
  RequestAuth,
  mockAuthRequest,
} from "../../utils/mocks/mockFunctions";
import verifyImage from "./verifyImage";

jest.setTimeout(20000);

describe("Given a verifyImage function", () => {
  describe("When the User field 'collections' contains de id of the collection received", () => {
    test("Then it should invoke next function", async () => {
      const req = mockAuthRequest(null, {
        idCollection: "67298r2245f",
      });
      req.idUser = "w34t34";
      const res = mockResponse();
      const next = mockNextFunction();
      Image.findById = jest.fn().mockResolvedValue({ owner: "w34t34" });

      await verifyImage(req, res, next);

      expect(next).toHaveBeenCalled();
    });
  });
  describe("When the User logged isn't the owner of the collection ", () => {
    test("Then it should call next with an error status 401 and message", async () => {
      const req = mockAuthRequest(null, {
        idCollection: "67298r2245f",
      });
      req.idUser = "w334";
      const res = mockResponse();
      const next = mockNextFunction();
      const error: {
        message: string;
        code?: number;
      } = new Error("Not allowed");

      Image.findById = jest.fn().mockResolvedValue({ owner: "w34" });

      await verifyImage(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
      expect(next.mock.calls[0][0]).toHaveProperty("code", 401);
    });
  });
  describe("When it receives an incorrect id of the image and user", () => {
    test("Then it should call next with an error status 400 and message", async () => {
      const req = mockAuthRequest(null, {
        idCollection: "67298r2245f",
      });
      req.idUser = "t34";
      const res = mockResponse();
      const next = mockNextFunction();
      const expectedError: {
        message: string;
        code?: number;
      } = new Error("Image not found");

      Image.findById = jest.fn().mockRejectedValue(expectedError);

      await verifyImage(req, res, next);

      expect(next).toHaveBeenCalledWith(expectedError);
      expect(next.mock.calls[0][0]).toHaveProperty("code", 400);
    });
  });
});
