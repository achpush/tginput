'use server';

export async function sendToTelegram(prevState: any, formData: FormData) {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const message = formData.get('message') as string;

  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    return { success: false, message: 'Telegram is not configured yet' };
  }

  const text = `📨 *New Submission!*

👤 *Name:* ${name}
📧 *Email:* ${email}
💬 *Message:*
${message}

🕒 ${new Date().toLocaleString()}`;

  try {
    const res = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: 'Markdown',
      }),
    });

    if (!res.ok) throw new Error('Telegram API error');
    return { success: true, message: '✅ Sent to Telegram!' };
  } catch (err) {
    console.error(err);
    return { success: false, message: '❌ Failed to send. Please try again.' };
  }
}