/* eslint-disable import/prefer-default-export */
import { Factory } from "fishery";

import { lorem, image } from "faker";
import ObjectID from "bson-objectid";

const factoryImage = Factory.define(() => ({
  description: lorem.words(3),
  images: image.imageUrl(),
  imageLocal: image.imageUrl(),
  owner: new ObjectID(),
}));

const factoryNewImage = Factory.define(() => ({
  description: lorem.words(3),
  images: image.imageUrl(),
  imageLocal: image.imageUrl(),
  owner: new ObjectID(),
}));

export const getFakeImage = () => factoryImage.build();

export const getFakeNewImage = () => factoryNewImage.build();
