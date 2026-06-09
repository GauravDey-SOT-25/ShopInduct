import {
  users,
  saveUsers
} from "./users.js";

export let currentUser =
  JSON.parse(
    localStorage.getItem("currentUser")
  ) || null;

export function login(
  email,
  password
) {

  if (!email || !password) {
    return {
      success: false,
      message: "All fields are required"
    };
  }

  const user = users.find(
    user =>
      user.email === email &&
      user.password === password
  );

  if (user) {

    currentUser = user;

    localStorage.setItem(
      "currentUser",
      JSON.stringify(user)
    );

    return {
      success: true,
      message: "Login Successful",
      user
    };
  }

  return {
    success: false,
    message: "Invalid Email or Password"
  };
}

export function register(
  email,
  password
) {

  if (!email || !password) {
    return {
      success: false,
      message: "All fields are required"
    };
  }

  if (!email.includes("@")) {
    return {
      success: false,
      message: "Invalid Email Format"
    };
  }

  if (!email.endsWith("@gmail.com")) {
    return {
      success: false,
      message: "Only Gmail addresses are allowed"
    };
  }

  if (password.length < 6) {
    return {
      success: false,
      message:
        "Password must be at least 6 characters"
    };
  }

  const existingUser =
    users.find(
      user =>
        user.email.toLowerCase() ===
        email.toLowerCase()
    );

  if (existingUser) {
    return {
      success: false,
      message: "Email already exists"
    };
  }

  const newUser = {
    id: users.length + 1,
    email,
    password
  };

  users.push(newUser);

  saveUsers();

  return {
    success: true,
    message:
      "Registration Successful",
    user: newUser
  };
}

export function logout() {

  currentUser = null;

  localStorage.removeItem(
    "currentUser"
  );

  return {
    success: true,
    message: "Logged Out"
  };
}