export type UserRole = "admin" | "creator";

export function getUserRole(isAdmin: boolean): UserRole {
  return isAdmin ? "admin" : "creator";
}
