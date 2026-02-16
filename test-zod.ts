import { z } from 'zod';

const schema = z.object({
  foo: z.string()
});

const result = schema.safeParse({ foo: 123 });

if (!result.success) {
  console.log('ZodError found.');
  // In Zod v4, use .issues instead of .errors
  if ('issues' in result.error) {
    console.log('Issues:', result.error.issues);
  } else {
    console.log('No issues property found.');
  }
}
