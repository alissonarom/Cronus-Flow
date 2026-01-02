import 'dotenv/config';
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

type GenerateParams = {
  leadMessage: string;
  channel?: string;
  language?: string;
};

export async function generateSalesReply({
  leadMessage,
  channel = 'whatsapp',
  language = 'pt-BR'
}: GenerateParams): Promise<string> {
  const completion = await client.chat.completions.create({
    model: 'gpt-4o-mini',
    temperature: 0.6,
    messages: [
      {
        role: 'system',
        content:
          'Você é um vendedor consultivo experiente. Gere respostas curtas, claras e persuasivas.'
      },
      {
        role: 'user',
        content: leadMessage
      }
    ]
  });

  return completion.choices[0].message.content || '';
}
