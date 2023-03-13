import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
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
  chat: any = undefined;
  potentialMember: any;
  params: any;

  constructor(public service: GeneralService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.params = params['memberId'];
      this.chat = this.service.chats.find((item) => item.member.id === params['memberId']);
      if (this.chat === undefined) {
        this.potentialMember = this.service.search.find((item) => item.id === params['memberId']);
      }
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
      this.messageForm.disable();
      const payload = {}
      payload['sender'] = this.service.user.id;
      payload['text'] = this.messageForm.value.text;
      if (this.chat) {
        payload['conversationId'] = this.chat.id;
        this.service.sendMessage(payload).subscribe(
          (res) => {
            this.chat.messages.push(res);
            this.messageForm.reset();
            this.messageForm.enable();
          },
          (error) => {
            console.warn(error);
            this.messageForm.enable();
          }
        )
      } else {
        payload['member'] = this.potentialMember.id;
        this.service.newChat(payload).subscribe(
          (res) => {
            this.service.getChats().subscribe(
              (res) => {
                this.service.chats = res;
                this.chat = this.service.chats.find((item) => {
                  return  item.member.id === this.params
                });
                this.messageForm.reset();
                this.messageForm.enable();
              },
              (error) => {
                console.warn(error);
                this.messageForm.reset();
                this.messageForm.enable();
              }
            );
          },
          (error) => {
            console.warn(error);
            this.messageForm.reset();
            this.messageForm.enable();
          }
        )
      }
    }
  }
}
