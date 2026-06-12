import { Injectable } from '@nestjs/common';

@Injectable()
export class LlmService {
  async generateAnswer(
    question: string,
    context: string,
  ): Promise<string> {
    console.log('LLM CALLED');
    const response = await fetch(
      'http://localhost:11434/api/generate',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'mistral',
          prompt: `
Answer ONLY using the provided context.

Context:
${context}

Question:
${question}
`,
          stream: false,
        }),
      },
    );
console.log('LLM CALLED');
    const data = await response.json();
console.log('LLM CALLED', data);
    return data.response;
  }
}