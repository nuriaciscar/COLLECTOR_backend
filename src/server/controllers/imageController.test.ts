import Image from "../../database/models/image";
import {
  addImage,
  deleteImage,
  getImage,
  updateImage,
  getImages,
  addImageOnCollection,
} from "./imageController";
import {
  mockResponse,
  mockNextFunction,
  mockRequest,
} from "../../utils/mocks/mockFunctions";
import {
  getFakeImage,
  getFakeNewImage,
} from "../../utils/factories/imageFactory";
import Collection from "../../database/models/collection";

jest.mock("../../database/models/image.ts");

let image: any;
let newImage: any;
beforeEach(() => {
  image = getFakeImage();
  newImage = getFakeNewImage();
});

describe("Given a getImage function", () => {
  describe("When it's invoked", () => {
    test("Then it should respond with an image and status 200", async () => {
      const res = mockResponse();
      const req = mockRequest(null, {
        idImage: "619d4df45645645",
      });
      const next = mockNextFunction();
      Image.findById = jest.fn().mockReturnThis();
      Image.populate = jest.fn().mockResolvedValue(image);

      await getImage(req, res, next);

      expect(res.json).toHaveBeenCalledWith(image);
    });
  });
  describe("When it's invoked and there's an error", () => {
    test("Then it should invoke next function with an error status 400 and message 'Cannot found any image' ", async () => {
      const res = mockResponse();
      const req = mockRequest();
      const next = mockNextFunction();
      const error: {
        message: string;
        code?: number;
      } = new Error("Cannot found any image");
      error.code = 400;
      Image.findById = jest.fn().mockReturnThis();
      Image.populate = jest.fn().mockRejectedValue(error);

      await getImage(req, res, next);

      expect(next.mock.calls[0][0]).toHaveProperty("code", error.code);
      expect(next.mock.calls[0][0]).toHaveProperty(
        "message",
        "Cannot found any image"
      );
    });
  });
  describe("When it's invoked with a non existent or incorrect id Image", () => {
    test("Then it should invoke next function with an error status 404 and message 'Imagenot found' ", async () => {
      const res = mockResponse();
      const req = mockRequest(null, {
        idImage: "nothing3244",
      });
      const next = mockNextFunction();
      const error: {
        message: string;
        code?: number;
      } = new Error("Image not found");
      error.code = 404;
      Image.findById = jest.fn().mockReturnThis();
      Image.populate = jest.fn().mockResolvedValue(null);

      await getImage(req, res, next);

      expect(next.mock.calls[0][0]).toHaveProperty("code", error.code);
      expect(next.mock.calls[0][0]).toHaveProperty(
        "message",
        "Image not found"
      );
      expect(next).toHaveBeenCalledWith(error);
    });
  });
});

describe("Given an updateImage function", () => {
  describe("When it's invoked with an existing image id", () => {
    test("Then it should return an updated image in res.json", async () => {
      const imageToUpdate = { ...image };
      const res = mockResponse();
      const req = mockRequest(
        { description: "Here with my friends" },
        { idImage: "456576567546" }
      );
      const next = mockNextFunction();
      Image.findByIdAndUpdate = jest.fn().mockResolvedValue(imageToUpdate);

      await updateImage(req, res, next);

      expect(res.json).toHaveBeenCalledWith(imageToUpdate);
    });
  });
  describe("When it's invoked but there's an error", () => {
    test("Then it should invoke next function with an error status 400 and message 'Cannot update this image'", async () => {
      const res = mockResponse();
      const req = mockRequest(
        { description: "Here with my friends" },
        { idImage: "456576567546" }
      );
      const next = mockNextFunction();
      const error: {
        message: string;
        code?: number;
      } = new Error("Cannot update the user");
      error.code = 400;
      Image.findByIdAndUpdate = jest.fn().mockRejectedValue(error);

      await updateImage(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
      expect(next.mock.calls[0][0]).toHaveProperty("code", error.code);
      expect(next.mock.calls[0][0]).toHaveProperty("message", error.message);
    });
  });
});

describe("Given an deleteImage function", () => {
  describe("When it receives a request with a correct id of a image, an object res with a body", () => {
    test("Then it should delete the image", async () => {
      const res = mockResponse();
      const req = mockRequest(null, {
        idImage: "456576567546",
      });
      const next = mockNextFunction();
      Image.findByIdAndDelete = jest.fn().mockResolvedValue(image);
      await deleteImage(req, res, next);

      expect(res.json).toHaveBeenCalledWith(image);
    });
  });
  describe("When it's invoked with req.params with an incorrect id'", () => {
    test("Then it should invoke next function with an error status 404 and error message 'Image not found'", async () => {
      const res = mockResponse();
      const req = mockRequest(null, {
        idImage: "456576567546",
      });
      const next = mockNextFunction();
      const error: {
        message: string;
        code?: number;
      } = new Error("Image not found");
      error.code = 404;
      Image.findByIdAndDelete = jest.fn().mockResolvedValue(null);

      await deleteImage(req, res, next);

      expect(next.mock.calls[0][0]).toHaveProperty("code", error.code);
      expect(next.mock.calls[0][0]).toHaveProperty(
        "message",
        "Image not found"
      );
    });
  });
  describe("When it's invoked and there's an error", () => {
    test("Then it should invoke next function with an error with status 400 and error message 'Cannot delete this image", async () => {
      const res = mockResponse();
      const req = mockRequest();
      const next = mockNextFunction();
      const error: {
        message: string;
        code?: number;
      } = new Error("Cannot delete this image");
      error.code = 400;
      Image.findByIdAndDelete = jest.fn().mockResolvedValue(null);

      await deleteImage(req, res, next);

      expect(next.mock.calls[0][0]).toHaveProperty("code", error.code);
      expect(next.mock.calls[0][0]).toHaveProperty(
        "message",
        "Cannot delete this image"
      );
    });
  });
});

describe("Given an addImage function", () => {
  describe("When it's invoked and there's an error", () => {
    test("Then it should invoke the method json with a new image created", async () => {
      const res = mockResponse();
      const req = mockRequest({ ...newImage }, null);
      const next = mockNextFunction();
      Image.create = jest.fn().mockResolvedValue(newImage);

      await addImage(req, res, next);

      expect(res.json).toHaveBeenCalledWith(newImage);
    });
  });
  describe("When it receives an object res, an object req with a body", () => {
    test("Then it should invoke next function with an error status 400 and an error message 'Cannot add this image'", async () => {
      const res = mockResponse();
      const req = mockRequest();
      const next = mockNextFunction();
      const error: {
        message: string;
        code?: number;
      } = new Error("Cannot add this image");
      error.code = 400;
      Image.create = jest.fn().mockRejectedValue(error);

      await addImage(req, res, next);

      expect(next.mock.calls[0][0]).toHaveProperty("code", error.code);
      expect(next.mock.calls[0][0]).toHaveProperty(
        "message",
        "Cannot add this image"
      );
    });
  });
});

describe("Given an addImagesOnCollection function", () => {
  describe("When it's invoked and there's no error", () => {
    test("Then it should invoke the method json with a new image created in a collection", async () => {
      const res = mockResponse();
      const req = mockRequest({ ...newImage }, null);
      const next = mockNextFunction();
      Image.create = jest.fn().mockResolvedValue(newImage);
      Collection.findByIdAndUpdate = jest.fn().mockResolvedValue({});

      await addImageOnCollection(req, res, next);

      expect(res.json).toHaveBeenCalledWith(newImage);
    });
  });
  describe("When it receives an object res, an object req with a body", () => {
    test("Then it should invoke next function with an error status 400 and message 'Cannot add this image'", async () => {
      const res = mockResponse();
      const req = mockRequest();
      const next = mockNextFunction();
      const error: {
        message: string;
        code?: number;
      } = new Error("Cannot add this image");
      error.code = 400;
      Collection.create = jest.fn().mockRejectedValue(error);

      await addImageOnCollection(req, res, next);

      expect(next.mock.calls[0][0]).toHaveProperty("code", error.code);
      expect(next.mock.calls[0][0]).toHaveProperty(
        "message",
        "Cannot add this image"
      );
    });
  });
});

describe("Given a getImages function", () => {
  describe("When it's invoked", () => {
    test("Then it should respond with the images in the res.json", async () => {
      const res = mockResponse();
      const req = mockRequest({ ...image }, null);
      const next = mockNextFunction();
      Image.find = jest.fn().mockResolvedValue(image);

      await getImages(req, res, next);

      expect(res.json).toHaveBeenCalledWith(image);
    });
  });
  describe("When it's invoked and there's an error", () => {
    test("Then it should invoke next function with an error status 400 and an error message", async () => {
      const res = mockResponse();
      const req = mockRequest({ ...image }, null);
      const next = mockNextFunction();
      const error: {
        message: string;
        code?: number;
      } = new Error("Cannot found any image sorry");
      Image.find = jest.fn().mockRejectedValue(error);

      await getImages(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
      expect(next.mock.calls[0][0]).toHaveProperty("code", 400);
    });
  });
});
