interface User {
  id: string;
  username: string;
  roomId: string;
};

const users: User[] = []

function addUser(user: User) {
  user.username = user.username.trim().toLowerCase();
  user.roomId = user.roomId.trim().toLowerCase();
  // Check if the user already exists in the users array
  const existingUser = users.find(u => u.username==user.username && u.roomId === user.roomId);
  if (existingUser) {
    // If the user already exists, return an error message
    return {error: "User already exists in this room"};
  }
  users.push(user);
  return {user}
}

function removeUser(id: string,) {
  const index = users.findIndex(u => u.id === id);
  if (index !== -1) {
    const deletedUser = users.splice(index, 1);
    return deletedUser[0];
  };
}

function getUsersInRoom(roomId: string) {
  return users.filter(user => user.roomId === roomId);
}

function getUserById(id: string) {
  return users.find(user => user.id === id);
}

module.exports = {addUser, removeUser, getUsersInRoom, getUserById};