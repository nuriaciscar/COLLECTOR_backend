import { Request, Response } from "express";

export const mockResponse = () => {
  const res = {} as Response;
  res.status = jest.fn().mockReturnThis();
  res.json = jest.fn().mockReturnThis();

  return res;
};
export const mockRequest = () => {
  const req = {} as Request;
  return req;
};

