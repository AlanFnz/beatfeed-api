//////// CONFIG ////////
const CONFIG_BASE = "/config";
const PARAM_CONFIG_ID = "/:configId";
//////// USERS /////////
const USERS_BASE = "/users";
const PARAM_USER_ID = "/:userId";
/// PERMISSION FLAGS ///
const PERMISSION_FLAGS = "/permissionFlags";
const PARAM_PERMISSION_FLAGS = "/:permissionFlags";

////////////////////////
////////////////////////
////////////////////////

export const USERS = {
  USERS: USERS_BASE,
  USER_ID: USERS_BASE + PARAM_USER_ID,
  USER_PERMISSION_FLAGS:
    USERS_BASE + PARAM_USER_ID + PERMISSION_FLAGS + PARAM_PERMISSION_FLAGS,
};

export const CONFIG = {
  CONFIG: CONFIG_BASE,
  CONFIG_ID: CONFIG_BASE + PARAM_CONFIG_ID,
};
