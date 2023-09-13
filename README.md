## About
This is a NextJS application that is used for analyzing of journals to find about their moods. It can analyze whether the user is in good mood or bad mood. For this purpose openAI api is used.It can further analyze the mood of the user over a week. It uses clerk for authentication.  
[Website link](https://mood-diary360.vercel.app/)
## Tech Stacks
* NextJs
* Clerk
* Prisma
* vitest
 
## Getting Started
Go to planetscale and set up your database. Install pscale cli and connect to database.
Move to production branch and connect to database. copy the database url and paste it in .env of your project;
create another .env.local file in the root.
* paste all the clerk keys and openAI api keys

```bash
1) npm install
2) npx prisma init
2) npx prisma generate
3) npm run dev
```

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
