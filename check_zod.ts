import { z } from "zod";

console.log("Zod version:", z.version || "unknown");
try {
  const schema = z.object({
    email: (z as any).email ? (z as any).email("test") : "z.email missing",
  });
  console.log("Schema created successfully");
} catch (e) {
  console.log("Error creating schema with z.email:", e.message);
}

const err = z.string().safeParse(123);
if (!err.success) {
  console.log("treeifyError exists:", typeof (z as any).treeifyError);
}
