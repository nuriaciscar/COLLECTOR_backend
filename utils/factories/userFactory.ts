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
}));

export const getFakeCollection = () => factoryUser.build();
