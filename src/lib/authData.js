import roles from "@/data/roles";
import users from "@/data/users";

export async function findUserByEmail(email) {
  const user = users.find((item) => item.email.toLowerCase() === email.toLowerCase());
  if (!user) return null;

  const role = roles.find((item) => item.id === user.roleId);
  return { ...user, roleName: role ? role.name : "Reader" };
}

export async function findUserById(id) {
  const user = users.find((item) => item.id === id);
  if (!user) return null;

  const role = roles.find((item) => item.id === user.roleId);
  return { ...user, roleName: role ? role.name : "Reader" };
}

export async function isEmailTaken(email) {
  return users.some((item) => item.email.toLowerCase() === email.toLowerCase());
}

export async function updateUserProfile(userId, { name, email }) {
  const user = users.find((item) => item.id === userId);
  if (!user) return;
  user.name = name;
  user.email = email.toLowerCase();
}

export async function updateUserPassword(userId, passwordHash) {
  const user = users.find((item) => item.id === userId);
  if (user) user.passwordHash = passwordHash;
}
