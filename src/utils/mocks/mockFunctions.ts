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

export interface RequestAuth extends Request {
  idUser?: string;
  username?: string;
  params: any;
}

export interface RequestAuthCollection extends Request {
  idUser?: string;
  username?: string;
  params: any;
  idCollection?: any;
}

export const mockAuthRequest = (body?: any, header?: any, params?: any) => {
  const req = {} as RequestAuth;
  req.body = body;
  req.header = jest.fn().mockReturnValue(header);
  req.idUser = "";
  req.username = "";
  req.params = jest.fn().mockReturnValue(params);

  return req;
};
