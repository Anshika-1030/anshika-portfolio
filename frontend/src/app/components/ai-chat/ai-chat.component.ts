import { Component } from '@angular/core';
import { AiService, AIResponse } from '../../services/ai.service';

interface ChatMessage {
  role: 'user' | 'ai';
  message: string;
}

@Component({
  selector: 'app-ai-chat',
  templateUrl: './ai-chat.component.html',
  styleUrls: ['./ai-chat.component.css']
})
export class AiChatComponent {

  question = '';

  loading = false;

  messages: ChatMessage[] = [
    {
      role: 'ai',
      message:
        "Hi! I'm Anshika's AI assistant. Ask me about her skills, projects or professional experience."
    }
  ];

  constructor(private aiService: AiService) {}

  askQuestion(question?: string): void {

    const text = (question || this.question).trim();

    if (!text || this.loading) {
      return;
    }

    this.messages.push({
      role: 'user',
      message: text
    });

    this.question = '';

    this.loading = true;

    this.aiService.ask(text).subscribe({

      next: (response: AIResponse) => {

        this.messages.push({
          role: 'ai',
          message: response.response
        });

        this.loading = false;

      },

      error: (error: unknown) => {

        console.error('AI request failed:', error);

        this.messages.push({
          role: 'ai',
          message:
            'Sorry, I could not connect to the AI service. Please make sure the backend and Ollama are running.'
        });

        this.loading = false;

      }

    });
  }
}