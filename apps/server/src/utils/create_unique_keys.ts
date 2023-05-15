import { uid } from "uid";

export function createID(name: string) {
  return `${name}_${uid(+process.env.SIZE_OF_ID)}`;
}

export function createApiKey() {
  return uid(+process.env.SIZE_OF_API_KEY);
}
