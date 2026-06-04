const savedUsers =
  JSON.parse(
    localStorage.getItem("users")
  );

export let users =
  savedUsers || [
    {
      id: 1,
      email: "user1@gmail.com",
      password: "123456"
    },
    {
      id: 2,
      email: "user2@gmail.com",
      password: "123456"
    },
    {
      id: 3,
      email: "user3@gmail.com",
      password: "123456"
    },
    {
      id: 4,
      email: "user4@gmail.com",
      password: "123456"
    },
    {
      id: 5,
      email: "user5@gmail.com",
      password: "123456"
    }
  ];

export function saveUsers() {
  localStorage.setItem(
    "users",
    JSON.stringify(users)
  );
}