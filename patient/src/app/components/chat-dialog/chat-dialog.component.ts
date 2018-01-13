import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ChatbotService, Message } from '../../services/chatbot.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/scan';

@Component({
  selector: 'app-chat-dialog',
  templateUrl: './chat-dialog.component.html',
  styleUrls: ['./chat-dialog.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ChatDialogComponent implements OnInit {

  messages: Observable<Message[]>;
  formValue: string;
  constructor(public chat: ChatbotService) { }
  ngOnInit() {
    // appends to array after each new message is added to feedSource
    this.messages = this.chat.conversation.asObservable()
      .scan((acc, val) => acc.concat(val));
  }
  sendMessage() {
    this.chat.converse(this.formValue);
    this.formValue = '';
  }
}
