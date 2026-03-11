'use client';

import { useActionState } from 'react';
import { sendToTelegram } from './actions';

export default function InputPage() {
  const [state, formAction, isPending] = useActionState(sendToTelegram, {
    success: false,
    message: '',
  });

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="text-6xl mb-4">📬</div>
          <h1 className="text-4xl font-bold tracking-tight">Input Page</h1>
          <p className="text-zinc-400 mt-2">Your message goes straight to Telegram</p>
        </div>

        <form action={formAction} className="bg-zinc-900 rounded-3xl p-8 space-y-6 shadow-2xl">
          <div>
            <label className="block text-sm font-medium mb-2 text-zinc-400">Your Name</label>
            <input
              type="text"
              name="name"
              required
              className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-5 py-4 focus:outline-none focus:border-blue-500 transition"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-zinc-400">Email Address</label>
            <input
              type="email"
              name="email"
              required
              className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-5 py-4 focus:outline-none focus:border-blue-500 transition"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-zinc-400">Message</label>
            <textarea
              name="message"
              required
              rows={5}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-5 py-4 focus:outline-none focus:border-blue-500 transition resize-none"
              placeholder="Type your message here..."
            />
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-white text-black font-semibold py-4 rounded-2xl hover:bg-zinc-200 transition disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isPending ? 'Sending...' : 'Send to Telegram'}
          </button>

          {state.message && (
            <p className={`text-center font-medium ${state.success ? 'text-green-400' : 'text-red-400'}`}>
              {state.message}
            </p>
          )}
        </form>

        <p className="text-center text-zinc-500 text-xs mt-8">
          Hosted on Vercel • Connected to Telegram
        </p>
      </div>
    </div>
  );
}