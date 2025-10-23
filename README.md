# FocusPlan - Frontend
Application for FocusPlan website.

## Technologies
- Framework: React with Next.js
- Language: TypeScript
- Styling: Tailwind CSS and shadcn/ui
- Icons: lucide-react

## Environment Variables

The frontend requires an environment variable to know the backend API URL.

- **Local development**: Create a `.env.local` file based on `.env.local.example`:

```bash
cp .env.local.example .env.local
```

Fill in the backend URL for local development:

```bash
NEXT_PUBLIC_API_URL=http://localhost:3001
```


Production: The .env file should contain the URL of the deployed backend:

```bash
NEXT_PUBLIC_API_URL=https://api-focusplan.onrender.com
```


Note:

.env.local is used for development and does not affect production.

.env is used only in production builds.

Running the application (Development)

1. Install the dependencies
<pre> pnpm install </pre>
2. Start the development server
<pre> pnpm run dev </pre>
3. Open your browser and navigate to http://localhost:3000

## Building the application
To create a production version of your app: 
<pre> pnpm run build</pre>

You can preview the production build with <pre>pnpm start</pre>
Additional Notes

Make sure your backend is running locally (http://localhost:3001) when using .env.local.

To switch to the deployed backend, update .env.local or use the .env file for production builds.