import { Hono } from "hono";
import { Bot, webhookCallback } from "grammy";

type Env = {
  BOT_TOKEN: string;
  IMAGE_HOST: string;
};

const app = new Hono<{ Bindings: Env }>();

app.get('/', (c) => c.text('Hello! Your Telegram bot server is running.'));

app.post('/webhook', async (c) => {
  console.log("Received a webhook update from Telegram!");
  const bot = new Bot(c.env.BOT_TOKEN);

  console.log('body:', c.body)

  bot.command('start', (ctx) => {
    return ctx.reply('👋 Hello! Webhook is working!');
  });

  bot.command('help', (ctx) => {
    return ctx.reply('👋 Need any help?');
  });

  bot.on('message:text', async (ctx) => {
    console.log('watch message:', ctx.message.text)
  })

  const handler = webhookCallback(bot, 'hono');
  return await handler(c);
})

export default app;