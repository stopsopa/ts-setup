import { z } from 'zod';

/**
 * Example TypeScript Script
 * This script demonstrates:
 * 1. Zod schema validation
 * 2. TypeScript interfaces derived from Zod
 * 3. Asynchronous data handling
 * 4. Modern ESM syntax
 */

// 1. Define a Zod schema for a User
const UserSchema = z.object({
  id: z.string().uuid(),
  username: z.string().min(3).max(20),
  email: z.string().email(),
  role: z.enum(['admin', 'user', 'guest']).default('user'),
  createdAt: z.date().default(() => new Date()),
});

// 2. Derive TypeScript type from the schema
type User = z.infer<typeof UserSchema>;

// 3. Mock database/service
const users: User[] = [];

async function createUser(data: unknown): Promise<User> {
  console.log('Creating user with data:', data);
  
  // Validate input data
  const validatedData = await UserSchema.parseAsync({
    id: crypto.randomUUID(),
    ...data as any,
  });

  // Simulate async delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  users.push(validatedData);
  return validatedData;
}

try {
  console.log('--- TypeScript Example Started ---');

  // Successful creation
  const newUser = await createUser({
    username: 'johndoe',
    email: 'john@example.com',
    role: 'admin',
  });

  console.log('Successfully created user:', newUser);

  // Demonstration of Zod error handling
  console.log('\n--- Testing Validation Error ---');
  try {
    await createUser({
      username: 'js', // Too short
      email: 'not-an-email',
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('Validation failed as expected:');
      error.errors.forEach((err) => {
        console.error(`- [${err.path.join('.')}] ${err.message}`);
      });
    }
    else {
      throw error;
    }
  }

  console.log('\nCurrent users in "database":', users);
  console.log('\n--- TypeScript Example Finished ---');
} catch (error) {
  console.error('Unexpected error:', error);
  process.exit(1);
}

