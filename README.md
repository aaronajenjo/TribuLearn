# Firebase Studio

This is a NextJS starter in Firebase Studio.

To get started, take a look at src/app/page.tsx.

## Running Locally

To run this application on your local machine, follow these steps:

### 1. Install Dependencies

Open a terminal in the project's root directory and run the following command to install all the necessary packages:

```bash
npm install
```

### 2. Set Up Environment Variables

The application uses Genkit for its AI features, which requires an API key for the Gemini models.

1.  Create a new file named `.env` in the root of the project.
2.  Add your Gemini API key to this file:

```
GEMINI_API_KEY=YOUR_API_KEY_HERE
```

Replace `YOUR_API_KEY_HERE` with your actual key.

### 3. Run the Development Servers

You'll need to run two separate processes in two different terminals: one for the Next.js application and one for the Genkit AI flows.

**Terminal 1: Start Genkit**

In your first terminal, run the following command to start the Genkit development server. Using `genkit:watch` is recommended as it will automatically reload when you make changes to your AI flows.

```bash
npm run genkit:watch
```

**Terminal 2: Start the Next.js App**

In a second terminal, run the `dev` script to start the main web application:

```bash
npm run dev
```

Once both servers are running, you can access the application by navigating to **http://localhost:9002** in your web browser.
