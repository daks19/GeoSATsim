Vercel deployment instructions

1. Run the client build locally:

```bash
npm run build:client
```

2. Commit and push your repo to GitHub.

3. In Vercel, create a new project from your GitHub repo.

4. In the Vercel project settings, set the Root Directory to the project root and configure the Build Command to:

npm run build:client

Set the Output Directory to:

dist/public

5. Deploy. Vercel will use the static build and serve your app.
