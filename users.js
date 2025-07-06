;
var users = [];
function addUser(user) {
    user.username = user.username.trim().toLowerCase();
    user.roomId = user.roomId.trim().toLowerCase();
    // Check if the user already exists in the users array
    var existingUser = users.find(function (u) { return u.username == user.username && u.roomId === user.roomId; });
    if (existingUser) {
        // If the user already exists, return an error message
        return { error: "User already exists in this room" };
    }
    users.push(user);
    return { user: user };
}
function removeUser(id) {
    var index = users.findIndex(function (u) { return u.id === id; });
    if (index !== -1) {
        var deletedUser = users.splice(index, 1);
        return deletedUser[0];
    }
    ;
}
function getUsersInRoom(roomId) {
    return users.filter(function (user) { return user.roomId === roomId; });
}
function getUserById(id) {
    return users.find(function (user) { return user.id === id; });
}
module.exports = { addUser: addUser, removeUser: removeUser, getUsersInRoom: getUsersInRoom, getUserById: getUserById };
