<h1 align="center">🤖 Telegram Bot Template</h1>

Bot starter template based on [grammY](https://grammy.dev/) bot framework.

## Usage

Follow these steps to set up and run your bot using this template:

1. **Create a New Repository**

    Start by creating a new repository using this template. You can do this by clicking [here](https://github.com/mooncheung/telegram-bot-template/generate).

2. **Environment Variables Setup**

    Create an environment variables file by copying the provided example file:
     ```bash
     cp wrangler.example.toml wrangler.toml
     ```
    Open the newly created `wrangler.toml` file and set the `BOT_TOKEN` environment variable.

3. **Launching the Bot**

    You can run your bot in both development and production modes.

    **Development Mode:**

    Install the required dependencies:
    ```bash
    pnpm install
    ```
    Start the bot in watch mode (auto-reload when code changes):
    ```bash
    pnpm run dev
    ```
    Simultaneously launch the internal network penetration service to expose our local service to the public network. Open a new terminal window: 
    ```bash
    pnpm run tunnel
    ```

   **Production Mode:**

    Install only production dependencies:
    ```bash
    pnpm run deploy
    ```
    Wait for the project to compile and deploy to Cloudflare Workers