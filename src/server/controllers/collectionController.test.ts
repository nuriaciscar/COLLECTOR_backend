import Collection from "../../database/models/collection";
import {
  addCollection,
  getCollections,
  deleteCollection,
  getCollection,
  updateCollection,
} from "./collectionsController";
import {
  mockResponse,
  mockNextFunction,
  mockRequest,
} from "../../utils/mocks/mockFunctions";
import {
  getFakeCollection,
  getFakeNewCollection,
} from "../../utils/factories/collectionFactory";
import User from "../../database/models/user";

jest.mock("../../database/models/collection.ts");

let collections: any;
let newCollection: any;
beforeEach(() => {
  collections = getFakeCollection();
  newCollection = getFakeNewCollection();
});

describe("Given a getCollections function", () => {
  describe("When it's invoked", () => {
    test("Then it should respond with an array of collections", async () => {
      const res = mockResponse();
      const req = mockRequest();
      const next = mockNextFunction();
      Collection.find = jest.fn().mockReturnThis();
      Collection.populate = jest.fn().mockResolvedValue(collections);

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
      const error: {
        message: string;
        code?: number;
      } = new Error("Cannot found any collection");
      error.code = 400;
      Collection.find = jest.fn().mockReturnThis();
      Collection.populate = jest.fn().mockRejectedValue(error);

      await getCollections(req, res, next);

      expect(next.mock.calls[0][0]).toHaveProperty("code", error.code);
      expect(next.mock.calls[0][0]).toHaveProperty(
        "message",
        "Cannot found any collection"
      );
    });
  });
});

describe("Given an addCollection function", () => {
  describe("When it's invoked and there's an error", () => {
    test("Then it should invoke the method json with a new collection created", async () => {
      const res = mockResponse();
      const req = mockRequest({ ...newCollection }, null);
      const next = mockNextFunction();
      Collection.create = jest.fn().mockResolvedValue(newCollection);
      User.findOneAndUpdate = jest.fn().mockResolvedValue({});

      await addCollection(req, res, next);

      expect(res.json).toHaveBeenCalledWith(newCollection);
    });
  });
  describe("When it receives an object res, an object req with a body", () => {
    test("Then it should invoke next function with an error status 400 and message 'Cannot create the collection'", async () => {
      const res = mockResponse();
      const req = mockRequest();
      const next = mockNextFunction();
      const error: {
        message: string;
        code?: number;
      } = new Error("Cannot create the collection");
      error.code = 400;
      Collection.create = jest.fn().mockRejectedValue(error);

      await addCollection(req, res, next);

      expect(next.mock.calls[0][0]).toHaveProperty("code", error.code);
      expect(next.mock.calls[0][0]).toHaveProperty(
        "message",
        "Cannot create the collection"
      );
    });
  });
});

describe("Given an deleteCollection function", () => {
  describe("When it receives a request with a correct id of a collection, an object res with a body", () => {
    test("Then it should delete the collection", async () => {
      const res = mockResponse();
      const req = mockRequest(null, {
        idCollection: "619df365bfa17fbebcc35e79",
      });
      const next = mockNextFunction();

      Collection.findByIdAndDelete = jest.fn().mockResolvedValue(collections);
      await deleteCollection(req, res, next);

      expect(Collection.findByIdAndDelete).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(collections);
    });
  });
  describe("When it's invoked with req.params with an incorrect id'", () => {
    test("Then it should invoke next function with an error status 404 and message 'Collection not found'", async () => {
      const res = mockResponse();
      const req = mockRequest(null, {
        idCollection: "619dfbcc35e79",
      });
      const next = mockNextFunction();
      const error: {
        message: string;
        code?: number;
      } = new Error("Collection not found");
      error.code = 404;
      Collection.findByIdAndDelete = jest.fn().mockResolvedValue(null);
      await deleteCollection(req, res, next);

      expect(Collection.findByIdAndDelete).toHaveBeenCalledWith(
        req.params.idCollection
      );
      expect(next.mock.calls[0][0]).toHaveProperty("code", error.code);
      expect(next.mock.calls[0][0]).toHaveProperty(
        "message",
        "Collection not found"
      );
    });
  });
  describe("When it's invoked and there's an error", () => {
    test("Then it should invoke next function with an error with status 400 and message 'Cannot delete the collection", async () => {
      const res = mockResponse();
      const req = mockRequest();
      const next = mockNextFunction();
      const error: {
        message: string;
        code?: number;
      } = new Error("Cannot delete the collection");
      error.code = 400;

      await deleteCollection(req, res, next);

      Collection.findByIdAndDelete = jest.fn().mockResolvedValue(null);

      expect(next.mock.calls[0][0]).toHaveProperty("code", error.code);
      expect(next.mock.calls[0][0]).toHaveProperty(
        "message",
        "Cannot delete the collection"
      );
    });
  });
});

describe("Given an getCollection function", () => {
  describe("When it receives a request with a correct id of a collection, an object res with a body", () => {
    test("Then it should respond with a collection", async () => {
      const res = mockResponse();
      const req = mockRequest(null, {
        idCollection: "619d4896bfa17fbebcc35e74",
      });
      const next = mockNextFunction();

      Collection.findById = jest.fn().mockReturnThis();
      Collection.populate = jest.fn().mockResolvedValue(collections);
      await getCollection(req, res, next);

      expect(Collection.findById).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(collections);
    });
  });
  describe("When it's invoked and there's an error", () => {
    test("Then it should invoke next function with an error status 400 and message 'Cannot found any collection' ", async () => {
      const res = mockResponse();
      const req = mockRequest();
      const next = mockNextFunction();
      const error: {
        message: string;
        code?: number;
      } = new Error("Cannot found any collection");
      error.code = 400;
      Collection.findById = jest.fn().mockReturnThis();
      Collection.populate = jest.fn().mockRejectedValue(error);

      await getCollection(req, res, next);

      expect(next.mock.calls[0][0]).toHaveProperty("code", error.code);
      expect(next.mock.calls[0][0]).toHaveProperty(
        "message",
        "Cannot found any collection"
      );
    });
    describe("When it's invoked with a non existent id Collection", () => {
      test("Then it should invoke next function with an error status 404 and message 'Collection not found' ", async () => {
        const res = mockResponse();
        const req = mockRequest(null, {
          idCollection: "619dfbcc35e79",
        });
        const next = mockNextFunction();
        const error: {
          message: string;
          code?: number;
        } = new Error("Collection not found");
        error.code = 404;
        Collection.findById = jest.fn().mockReturnThis();
        Collection.populate = jest.fn().mockResolvedValue(null);
        await getCollection(req, res, next);

        expect(Collection.findById).toHaveBeenCalledWith(
          req.params.idCollection
        );
        expect(next.mock.calls[0][0]).toHaveProperty("code", error.code);
        expect(next.mock.calls[0][0]).toHaveProperty(
          "message",
          "Collection not found"
        );
        expect(next).toHaveBeenCalledWith(error);
      });
    });
  });
});

describe("Given an updateCollection function", () => {
  describe("When it's invoked with an existing collection id", () => {
    test("Then it should return an updated collection in res.json", async () => {
      const collectionToUpdate = { ...collections };
      const res = mockResponse();
      const req = mockRequest(
        { name: "summer" },
        { idCollection: "63453519d4896bf" }
      );
      const next = mockNextFunction();
      Collection.findByIdAndUpdate = jest
        .fn()
        .mockResolvedValue(collectionToUpdate);

      await updateCollection(req, res, next);

      expect(Collection.findByIdAndUpdate).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(collectionToUpdate);
    });
  });
  describe("When it's invoked but there's an error", () => {
    test("Then it should invoke next function with an error status 400 and message 'Cannot update the collection'", async () => {
      const res = mockResponse();
      const req = mockRequest(
        { name: "summer" },
        { idCollection: "63453519d4896bf" }
      );
      const next = mockNextFunction();
      const error: {
        message: string;
        code?: number;
      } = new Error("Cannot update the user");
      error.code = 400;

      Collection.findByIdAndUpdate = jest.fn().mockRejectedValue(error);

      await updateCollection(req, res, next);

      expect(Collection.findByIdAndUpdate).toHaveBeenCalled();
      expect(next).toHaveBeenCalledWith(error);
      expect(next.mock.calls[0][0]).toHaveProperty("code", error.code);
      expect(next.mock.calls[0][0]).toHaveProperty("message", error.message);
    });
  });
});
