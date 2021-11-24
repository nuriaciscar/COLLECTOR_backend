/* eslint-disable import/prefer-default-export */
import { Factory } from "fishery";

import { lorem, internet } from "faker";

import ObjectID from "bson-objectid";

const factoryUser = Factory.define(() => ({
  name: lorem.words(2),
  username: internet.userName(),
  password: internet.password(),
  email: internet.email(),
  collections: new ObjectID(),
  id: new ObjectID(),
}));

const factoryNewUser = Factory.define(() => ({
  name: lorem.words(2),
  username: internet.userName(),
  password: internet.password(),
  email: internet.email(),
  collections: new ObjectID(),
  id: new ObjectID(),
}));

export const getFakeUser = () => factoryUser.build();
export const getFakeNewUser = () => factoryNewUser.build();
