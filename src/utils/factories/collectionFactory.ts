/* eslint-disable import/prefer-default-export */
import { Factory } from "fishery";

import { lorem, image } from "faker";

const factoryCollection = Factory.define(() => ({
  name: lorem.words(2),
  images: image.imageUrl(),
}));

const factoryNewCollection = Factory.define(() => ({
  name: lorem.words(2),
  images: image.imageUrl(),
}));

export const getFakeCollection = () => factoryCollection.build();

export const getFakeNewCollection = () => factoryNewCollection.build();
