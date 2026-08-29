import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface AIResponse {
  response: string;
}

@Injectable({
  providedIn: 'root'
})
export class AiService {

  private apiUrl = 'http://localhost:3000/api/chat';

  constructor(private http: HttpClient) {}

  ask(message: string): Observable<AIResponse> {
    return this.http.post<AIResponse>(
      this.apiUrl,
      { message }
    );
  }
}