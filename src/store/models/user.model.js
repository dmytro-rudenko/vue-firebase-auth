import { merge } from "lodash";

export class UserModel {
  id;
  name;
  email;
  uid;
  lastActiveAt;

  constructor(params = {}) {
    params.name = params.name || params.displayName;
    delete params.displayName;

    merge(this, params);
  }

  getDataObj() {
    const { id, name, email, uid, lastActiveAt } = this;

    return { id, name, email, uid, lastActiveAt };
  }
}
