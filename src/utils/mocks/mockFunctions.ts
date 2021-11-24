import { Request, Response } from "express";

export const mockResponse = () => {
  const res = {} as Response;
  res.status = jest.fn().mockReturnThis();
  res.json = jest.fn().mockReturnThis();

  return res;
};

export const mockRequest = (body?: any, params?: any) => {
  const req = {} as Request;
  req.body = body;
  req.params = params;

  return req;
};
export const mockNextFunction = () => {
  const next = jest.fn();
  return next;
};