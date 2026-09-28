export type ChatTurn = {
  role: 'assistant' | 'user';
  content: string;
};

export async function sendChatMessage(messages: ChatTurn[]): Promise<string> {
  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages })
  });

  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.message || 'Unable to send your message. Please try again.');
  }

  return result.reply;
}