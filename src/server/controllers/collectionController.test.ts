import Collection from "../../database/models/collection";
import getCollections from "./collectionsController";
import {
  mockResponse,
  mockNextFunction,
  mockRequest,
} from "../../../utils/mocks/mockFunctions";
import { getFakeCollection } from "../../../utils/factories/collectionFactory";

jest.mock("../../database/models/collection.ts");

let collections: any;
beforeEach(() => {
  collections = getFakeCollection();
});

describe("Given a getCollections function", () => {
  describe("When it's invoked", () => {
    test("Then it should respond with an array of collections", async () => {
      const res = mockResponse();
      const req = mockRequest();
      const next = mockNextFunction();

      Collection.find = jest.fn().mockResolvedValue(collections);
      await getCollections(req, res, next);

      expect(Collection.find).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(collections);
    });
  });
  describe("When it's invoked and there's an error", () => {
    test("Then it should invoke next function with an error status 400 and message 'Cannot found any collection' ", async () => {
      const res = mockResponse();
      const req = mockRequest();
      const next = mockNextFunction();
      const error = new Error("Cannot found any collection");
      error.code = 400;
      Collection.find = jest.fn().mockRejectedValue(error);

      await getCollections(req, res, next);

      expect(next.mock.calls[0][0]).toHaveProperty("code", error.code);
      expect(next.mock.calls[0][0]).toHaveProperty(
        "message",
        "Cannot found any collection"
      );
    });
  });
});
