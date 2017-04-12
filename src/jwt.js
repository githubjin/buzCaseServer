// @flow
import jwt from "jsonwebtoken";

const cert = "cangtiandadi";

export function sign(payload: Object) {
  return jwt.sign(payload, cert);
}

export function verify(token: string) {
  return jwt.verify(token, cert);
}
