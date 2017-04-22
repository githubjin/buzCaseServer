// @flow
import _ from "lodash";

export function resolveUserFromRequest(
  source: Object,
  args: Object,
  req: Object
): any {
  //  sessionToken: master.a,
  //     userId: master.b,
  //     username: master.c,
  //     email: master.email,
  //     emailVerified: master.emailVerified
  const { master } = req;
  if (_.isEmpty(master)) {
    return null;
  }
  return {
    ...master,
    id: master.userId,
    className: "User"
  };
}
