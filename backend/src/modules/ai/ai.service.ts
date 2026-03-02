import { env } from '../../config/env.js'

type GenerateParams = {
  leadMessage: string
  channel?: string
  language?: string
}

export async function generateSalesReply({
  leadMessage
}: GenerateParams): Promise<string> {

  const response = await fetch('https://api.deepseek.com/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${env.DEEPSEEK_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'deepseek-chat',
      temperature: 0.7,
      messages: [
        {
          role: 'system',
          content: `
          Você é um estrategista de vendas consultivas focado exclusivamente em gerar respostas práticas para conversas reais.

          Sua função é:

          1. Identificar o estágio da conversa:
            - Descoberta
            - Diagnóstico
            - Objeção
            - Hesitação
            - Momento de fechamento

          2. Detectar se existe:
            - Objeção de preço
            - Objeção de tempo
            - Objeção de confiança
            - Objeção emocional (medo)
            - Confusão mental

          3. Aplicar quando necessário:
            - SPIN Selling
            - Implicação (dor maior que preço)
            - Ancoragem (valor ou perda)
            - Espelho emocional
            - Paradoxo estratégico
            - Redução de risco
            - Push estratégico (Know the Push)

          ⚠️ REGRA ABSOLUTA:
          Você DEVE sempre fornecer DUAS variações de resposta pronta.
          É PROIBIDO finalizar apenas com análise ou perguntas.

          Formato obrigatório:

          Diagnóstico:
          (resuma em no máximo 2 linhas)

          Resposta sugerida – Variação A:
          "Texto pronto para copiar e colar."

          Resposta sugerida – Variação B:
          "Texto pronto alternativo para teste A/B."

          Regras:
          - Máximo 8 linhas no total.
          - Respostas extremamente curtas.
          - Linguagem natural de conversa.
          - Tom seguro, claro e estratégico.
          - Foco total em conversão.
          - Nunca entregue apenas análise.
          - Se não houver resposta pronta, reescreva até incluir.
          ⚠️ FORMATAÇÃO:
          - Responda apenas em TEXTO PURO.
          - Não use asteriscos (*)
          - Não use markdown
          - Não use negrito
          - Não use listas com hífen
          - Não use emojis
          - Não use qualquer tipo de marcação
          - Entregue apenas texto simples.
        `
        },
        {
          role: 'user',
          content: `Contexto enviado pelo usuário: "${leadMessage}"Analise estrategicamente e forneça obrigatoriamente DUAS respostas prontas para serem usadas na conversa.`
        }
      ]
    })
  })

  {/* 
  
    OBJETIVO DO NOVO AGENTE

1 - Identificar o momento da conversa:
Descoberta
Diagnóstico
Objeção
Hesitação
Momento de fechamento

2 - Detectar:
Objeção de preço
Objeção de tempo
Objeção de confiança
Objeção emocional (medo)
Confusão mental

3 - Aplicar:
SPIN (quando precisa aprofundar)
Implicação (tornar dor maior que preço)
Ancoragem (valor ou perda)
Espelho emocional
Paradoxo (verdade desconfortável)
Push estratégico (Know the Push)

4 - Responder curto, claro e persuasivo.

  */}

  if (!response.ok) {
    const err = await response.text()
    console.error('[DeepSeek ERROR]', err)
    throw new Error('DEEPSEEK_ERROR')
  }

  const data = await response.json()
  return data.choices?.[0]?.message?.content ?? ''
}
