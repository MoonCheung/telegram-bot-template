import { env } from "cloudflare:workers";
import { Bot } from "grammy";

const bot = new Bot(env.BOT_TOKEN);

bot.command('start', (ctx) => {
  return ctx.reply('👋 Hello! Webhook is working!');
});

bot.command('help', async (ctx) => {
  const commands = await ctx.api.getMyCommands();
	const info = commands.reduce((acc, val) => `${acc}/${val.command} - ${val.description}\n`, '');
	return ctx.reply(info);
});

bot.command('ping', (ctx) => {
  return ctx.reply('🏓 Pong! 延迟测试成功')
})

bot.on('message:text', (ctx) => {
  console.log('收到消息:', ctx.message.text)
  return ctx.reply(`✅ 收到: ${ctx.message.text}`)
})

export { bot }