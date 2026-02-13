import { describe, it, expect } from "vitest";
import { Vault } from "./Vault.js";

/**
 * /bin/bash test.sh src/test-examples/Vault.test.ts
 */
describe("Vault", () => {
  const OWNER = "Alice";
  const KEY = "secure-password-123";

  it("should initialize with correct owner", () => {
    const vault = new Vault(OWNER, KEY);
    expect(vault.owner).toBe(OWNER);
  });

  it("should allow depositing funds", () => {
    const vault = new Vault(OWNER, KEY);
    vault.deposit(100);
    expect(vault.getBalance(KEY)).toBe(100);
  });

  it("should throw error when depositing non-positive amount", () => {
    const vault = new Vault(OWNER, KEY);
    expect(() => vault.deposit(0)).toThrow(
      "Vault error: Deposit amount must be positive",
    );
    expect(() => vault.deposit(-50)).toThrow(
      "Vault error: Deposit amount must be positive",
    );
  });

  it("should allow withdrawing funds with correct key", () => {
    const vault = new Vault(OWNER, KEY);
    vault.deposit(200);
    const withdrawn = vault.withdraw(50, KEY);
    expect(withdrawn).toBe(50);
    expect(vault.getBalance(KEY)).toBe(150);
  });

  it("should throw error when withdrawing with incorrect key", () => {
    const vault = new Vault(OWNER, KEY);
    vault.deposit(100);
    expect(() => vault.withdraw(50, "wrong-key")).toThrow(
      "Vault error: Invalid secret key",
    );
  });

  it("should throw error when withdrawing more than balance", () => {
    const vault = new Vault(OWNER, KEY);
    vault.deposit(100);
    expect(() => vault.withdraw(150, KEY)).toThrow(
      "Vault error: Insufficient balance",
    );
  });

  it("should protect balance access without correct key", () => {
    const vault = new Vault(OWNER, KEY);
    vault.deposit(100);
    expect(() => vault.getBalance("invalid")).toThrow(
      "Vault error: Invalid secret key",
    );
  });
});
