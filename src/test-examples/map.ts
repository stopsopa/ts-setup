/**
 * Simple User Registry using Map
 */
export class UserRegistry {
  /**
   * Private Map to store user data (ID as key, Name as value).
   */
  private users: Map<number, string> = new Map();

  /**
   * Adds a new user to the registry.
   */
  addUser(id: number, name: string): void {
    this.users.set(id, name);
  }

  /**
   * Retrieves a user by their ID.
   */
  getUser(id: number): string | undefined {
    return this.users.get(id);
  }

  /**
   * Removes a user from the registry.
   * Returns true if the user existed and was removed, false otherwise.
   */
  removeUser(id: number): boolean {
    return this.users.delete(id);
  }

  /**
   * Checks if a user exists in the registry.
   */
  hasUser(id: number): boolean {
    return this.users.has(id);
  }

  /**
   * Returns the total number of users in the registry.
   */
  get totalUsers(): number {
    return this.users.size;
  }

  /**
   * Clears all users from the registry.
   */
  clearRegistry(): void {
    this.users.clear();
  }

  /**
   * Returns an array of all user names.
   */
  getAllUserNames(): string[] {
    return Array.from(this.users.values());
  }

  /**
   * Returns an array of all user IDs.
   */
  getAllUserIds(): number[] {
    return Array.from(this.users.keys());
  }
}
