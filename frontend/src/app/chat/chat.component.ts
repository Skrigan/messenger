import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {GeneralService} from "../shared/general.service";
import {ActivatedRoute, Params} from "@angular/router";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  messageForm: FormGroup;
  chat: any = null;

  constructor(public service: GeneralService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.chat = this.service.chats.find((item) => item.member.id === params['memberId']);
    })
    this.messageForm = new FormGroup({
      text: new FormControl('', Validators.required),
    })
  }

  getMessageClass(message) {
    return message.sender === this.chat.member.id ? 'message' : 'message message__my'
  }

  clearForm() {
    this.messageForm.reset();
  }

  submit() {
    if (this.messageForm.valid) {
      console.log('chat: ', this.chat);
      // this.messageForm.disable();
      const payload = {}
      payload['conversationId'] = this.chat.id;
      payload['sender'] = this.service.user.id;
      payload['text'] = this.messageForm.value.text;
      console.log('payload: ', payload);
      this.service.sendMessage(this.messageForm.value).subscribe(
        (res) => {
          console.log('res', res);

          this.messageForm.enable();
        },
        (error) => {
          console.warn(error);
        }
      )
    }
  }
}
