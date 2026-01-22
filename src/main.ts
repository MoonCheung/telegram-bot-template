import { Hono } from "hono";
import { env } from "cloudflare:workers";
import { bot } from '#root/bot';
import { webhookCallback } from 'grammy';

type Env = {
  BOT_TOKEN: string;
  IMAGE_HOST: string;
};

const app = new Hono<{ Bindings: Env }>();

app.get('/', (c) => c.text('Hello! Your Telegram bot server is running.'));

app.post('/bot', async (ctx, next) => {
  console.log("Received a webhook update from Telegram!");
  self.host = new URL(ctx.req.url).host;
	return next();
}, webhookCallback(bot, 'hono', {
	secretToken: env.BOT_WEBHOOK_SECRET
}))

// 设置 Webhook 的端点（部署后访问一次即可）
app.get('/setup', async (ctx) => {
  const host = new URL(ctx.req.url).host;
  const botUrl = `https://${host}/bot`;

  // 立即返回响应，不等待 Telegram API
  ctx.executionCtx.waitUntil(
    (async () => {
      try {
        await bot.api.setWebhook(botUrl, { 
          secret_token: env.BOT_WEBHOOK_SECRET,
          drop_pending_updates: true
        });
        await bot.api.setMyCommands([
          { command: 'settings', description: 'Setting up the bot' },
        ]);
        console.log('✅ Webhook setup successful:', botUrl);
      } catch (err) {
        console.error('❌ Webhook setup failed:', err);
      }
    })()
  );

  // 立即返回响应
  return ctx.text(`Webhook setup initiated for ${botUrl}. Check console for result.`);
})

app.get('/status', async (ctx) => {
  try {
    const me = await bot.api.getMe()
    const webhookInfo = await bot.api.getWebhookInfo()
    
    return ctx.json({
      bot: {
        id: me.id,
        username: me.username,
        first_name: me.first_name
      },
      webhook: {
        url: webhookInfo.url || '未设置',
        pending_updates: webhookInfo.pending_update_count,
        last_error: webhookInfo.last_error_message || '无'
      }
    })
  } catch (error: any) {
    return ctx.json({ error: error.message }, 500)
  }
})

app.get('/remove-webhook', async (ctx) => {
  try {
    await bot.api.deleteWebhook({ drop_pending_updates: true })
    return ctx.json({ success: true, message: 'Webhook 已删除' })
  } catch (error: any) {
    return ctx.json({ error: error.message }, 500)
  }
})

export default app;