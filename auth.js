import { users } from "./users.js";

export let currentUser = null;

export function login(email, password) {

  const user = users.find(
    user =>
      user.email === email &&
      user.password === password
  );

  if (user) {

    currentUser = user;

    return {
      success: true,
      user
    };
  }

  return {
    success: false,
    message: "Invalid Email or Password"
  };
}