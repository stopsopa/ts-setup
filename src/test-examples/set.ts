/**
 * Simple Tag Manager using Set
 */
export class TagManager {
  /**
   * Private Set to store unique tags.
   */
  private tags: Set<string> = new Set();

  /**
   * Adds a new tag, normalizing it to lowercase and trimming whitespace.
   */
  addTag(tag: string): void {
    this.tags.add(tag.toLowerCase().trim());
  }

  /**
   * Checks if a tag exists (case-insensitive).
   */
  hasTag(tag: string): boolean {
    return this.tags.has(tag.toLowerCase().trim());
  }

  /**
   * Removes a tag. Returns true if removed.
   */
  removeTag(tag: string): boolean {
    return this.tags.delete(tag.toLowerCase().trim());
  }

  /**
   * Returns the number of unique tags.
   */
  get count(): number {
    return this.tags.size;
  }

  /**
   * Removes all tags.
   */
  clear(): void {
    this.tags.clear();
  }

  /**
   * Returns all tags as an array.
   */
  getTags(): string[] {
    return Array.from(this.tags);
  }

  /**
   * Returns the intersection of current tags with an input array.
   */
  getIntersection(otherTags: string[]): string[] {
    const common = new Set<string>();
    for (const tag of otherTags) {
      const normalized = tag.toLowerCase().trim();
      if (this.tags.has(normalized)) {
        common.add(normalized);
      }
    }
    return Array.from(common);
  }
}
