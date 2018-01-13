import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
import { ApiAiClient } from 'api-ai-javascript';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

// Message class for displaying messages in the component
export class Message {
  constructor(public content: string, public sentBy: string) { }
}

@Injectable()
export class ChatbotService {
  readonly token = environment.dialogflow.angularBot;
  readonly client = new ApiAiClient({accessToken: this.token});
  conversation = new BehaviorSubject<Message[]>([]);

  constructor() { }

  // Sends and receives messages via DialogFlow
  converse(msg: string) {
    const userMessage = new Message(msg, 'user');
    this.update(userMessage);
    return this.client.textRequest(msg)
      .then(res => {
        const speech = res.result.fulfillment.speech;
        const botMessage = new Message(speech, 'bot');
        this.update(botMessage);
      });
  }
  // Adds message to source
  update(msg: Message) {
    this.conversation.next([msg]);
  }

}

 /*  talk() { // testing the object it returns
    this.client.textRequest('who are you')
          .then(res => console.log(res));
  }
} */
