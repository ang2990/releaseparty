# releaseparty

This is a project we're building together! Here’s a simple guide on how we're using Git and Gemini to manage it.

## What are Git and Gemini in this project?

Think of it like this:

*   **Gemini (that's me!)**: I'm your coding assistant. You tell me what you want to do in plain English (like "add dark mode"), and I'll handle the technical side of things.
*   **Git**: This is like a time machine for our project. It lets us save snapshots of our work at any point. It's a way to track all the changes we make, so we never lose anything and can always go back to an older version if we need to.
*   **GitHub**: This is an online backup for our Git time machine. It's a safe place to store all our snapshots.

## Our Simple Workflow

Our process is straightforward:

1.  **You give me a task**: You tell me what change you want to make (e.g., "Set this site up to serve index.html").
2.  **I make the changes**: I edit the code and files to get the task done.
3.  **You tell me to save the work**: When you're happy with the changes, you tell me to `commit and push`.

When you say `commit and push`, here's what I do:

*   **`commit`**: I take a "snapshot" of all the changes we've just made. I write a clear message describing what was changed (like "feat: Add dark mode"). This creates a new point in our project's history.
*   **`push`**: I then send that new snapshot (and any others we've made) to our online backup on GitHub. This keeps our online version up-to-date with the version on this computer.

## Common Commands in Plain English

You'll mostly just tell me what to do, but here's what some of the commands mean when you see me use them:

*   **`commit`**: "Take a snapshot of the recent changes."
*   **`push`**: "Send my saved snapshots to the online backup on GitHub."
*   **`git status`**: "Show me a summary of what's changed since our last snapshot." (I use this to see what needs to be saved).

## Development and Deployment

### Running Locally

To start the local development server and preview your changes:

```bash
bun run dev
```

This will run the SvelteKit development server, usually accessible at `http://localhost:5173`.

### Deployment to Cloudflare Workers



This project is configured to be deployed to Cloudflare Workers. To deploy the site, run the following command:



```bash

bun run deploy

```



This command will first build the SvelteKit project and then deploy it to Cloudflare Workers using Wrangler.



**Note:** You will need to be logged into your Cloudflare account. If you are not logged in, you will be prompted to log in.



### Important Links



*   **GitHub Repository**: [https://github.com/ang2990/releaseparty](https://github.com/ang2990/releaseparty)

*   **Cloudflare Dashboard**: [https://dash.cloudflare.com/](https://dash.cloudflare.com/)

*   **Deployed Application**: [**[PLEASE PROVIDE DEPLOYED URL]**] - *Once deployed, please update this link!*
