import { describe, it, expect } from "vitest";
import {
  UserSchema,
  PostSchema,
  PasswordSchema,
  SearchQuerySchema,
} from "./zod.js";

/**
 * /bin/bash test.sh src/test-examples/zod.test.ts
 */
describe("Zod Validation Examples", () => {
  describe("UserSchema", () => {
    it("should validate a correct user object", () => {
      const validUser = {
        id: "550e8400-e29b-41d4-a716-446655440000",
        username: "johndoe",
        email: "john@example.com",
        age: 25,
      };

      const result = UserSchema.safeParse(validUser);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.username).toBe("johndoe");
        expect(result.data.createdAt).toBeInstanceOf(Date);
      }
    });

    it("should fail for invalid email", () => {
      const invalidUser = {
        id: "550e8400-e29b-41d4-a716-446655440000",
        username: "johndoe",
        email: "invalid-email",
      };

      const result = UserSchema.safeParse(invalidUser);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].path).toContain("email");
      }
    });

    it("should fail for too short username", () => {
      const result = UserSchema.safeParse({
        id: "550e8400-e29b-41d4-a716-446655440000",
        username: "jo",
        email: "john@example.com",
      });
      expect(result.success).toBe(false);
    });
  });

  describe("PostSchema", () => {
    it("should validate a post with tags", () => {
      const validPost = {
        title: "Learn Zod",
        content: "Zod is amazing!",
        authorId: "550e8400-e29b-41d4-a716-446655440000",
        tags: ["typescript", "validation"],
      };

      const result = PostSchema.safeParse(validPost);
      expect(result.success).toBe(true);
    });

    it("should fail if tags array is empty", () => {
      const invalidPost = {
        title: "Learn Zod",
        content: "Zod is amazing!",
        authorId: "550e8400-e29b-41d4-a716-446655440000",
        tags: [],
      };

      const result = PostSchema.safeParse(invalidPost);
      expect(result.success).toBe(false);
    });
  });

  describe("PasswordSchema", () => {
    it("should validate a strong password", () => {
      expect(PasswordSchema.safeParse("Password123").success).toBe(true);
    });

    it("should fail if no uppercase", () => {
      const result = PasswordSchema.safeParse("password123");
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          "Password must contain at least one uppercase letter",
        );
      }
    });

    it("should fail if no number", () => {
      expect(PasswordSchema.safeParse("PasswordNoNum").success).toBe(false);
    });
  });

  describe("SearchQuerySchema", () => {
    it("should transform and pipe data", () => {
      const input = {
        query: "  MY SEARCH  ",
        page: "5",
      };

      const result = SearchQuerySchema.safeParse(input);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.query).toBe("my search");
        expect(result.data.page).toBe(5);
      }
    });

    it("should fail if page is not a valid number string", () => {
      const result = SearchQuerySchema.safeParse({
        query: "test",
        page: "abc",
      });
      expect(result.success).toBe(false);
    });
  });
});
