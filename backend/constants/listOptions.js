import { LIST_CONSTANTS } from "./listConstant.js";

export const listOptions = Object.keys(LIST_CONSTANTS).map((key) => ({
  name: LIST_CONSTANTS[key],
  value: LIST_CONSTANTS[key],
}));
