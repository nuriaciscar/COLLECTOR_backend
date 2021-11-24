import { getFakeUser } from "../../../utils/factories/userFactory";

import User from "../../database/models/user";

import getUser from "./userController";

import {
  mockResponse,
  mockNextFunction,
  mockRequest,
} from "../../../utils/mocks/mockFunctions";

jest.mock("../../database/models/user");

let user: any;

beforeEach(() => {
  user = getFakeUser();
});

describe("Given a getUser function", () => {
  describe("When it's invoked with an id of a user", () => {
    test("Then it should respond with an existent user", async () => {
      const res = mockResponse();
      const req = {
        params: { idUser: "619d4896bfa17fbebcc35e74" },
      };
      const next = mockNextFunction();

      User.findById = jest.fn().mockResolvedValue(user);

      await getUser(req, res, next);

      expect(User.findById).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(user);
    });
  });
  describe("When it eceives a req with a non existent idUser", () => {
    test("Then it should invoke next function with an error status 400 and message 'Cannot found any user'", async () => {
      const res = null;
      const req = {
        params: { idUser: "3435" },
      };
      const next = mockNextFunction();
      const error = new Error("Cannot found any user");
      error.code = 400;
      User.findById = jest.fn().mockRejectedValue(error);

      await getUser(req, res, next);

      expect(next.mock.calls[0][0]).toHaveProperty("code", error.code);
      expect(next.mock.calls[0][0]).toHaveProperty("message", error.message);
    });
  });
});
