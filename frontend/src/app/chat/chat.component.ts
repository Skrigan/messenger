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
      // console.log('chat', this.chat);
      if (this.chat === undefined) {
        this.potentialMember = this.service.search.find((item) => item.id === params['memberId']);
        console.log('potentialMember: ', this.potentialMember);
        console.log('firstname: ', this.potentialMember.firstname);
        console.log('lastname: ', this.potentialMember.lastname);
        console.log('number: ', this.potentialMember.number);
      }
      // console.log('chat', this.chat);
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
      // console.log('chat: ', this.chat);
      this.messageForm.disable();
      const payload = {}
      payload['sender'] = this.service.user.id;
      payload['text'] = this.messageForm.value.text;
      if (this.chat) {
        payload['conversationId'] = this.chat.id;
        // console.log('payload: ', payload);
        this.service.sendMessage(payload).subscribe(
          (res) => {
            // console.log('res', res);
            this.chat.messages.push(res);
            // console.log('AFTER PUSH: ', this.chat);
            this.messageForm.reset();
            this.messageForm.enable();
            // console.log('aaaaaaaa', this.chat);
            // //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            // this.service.getChats().subscribe(
            //   (res) => {
            //     console.log('chats: ', res);
            //     this.service.chats = res;
            //   },
            //   (error) => {
            //     console.warn(error);
            //   }
            // );
            // this.chat = this.service.chats.find((item) => item.member.id === this.params);
            // console.log('aaaaaaaa2', this.chat);
          },
          (error) => {
            console.warn(error);
            this.messageForm.enable();
          }
        )
      } else {
        payload['member'] = this.potentialMember.id;
        // console.log('payload: ', payload);
        this.service.newChat(payload).subscribe(
          (res) => {
            console.log('res', res);
            console.log('aaaaaaaa', this.chat);
            //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            this.service.getChats().subscribe(
              (res) => {
                console.log('res: ', res);
                this.service.chats = res;
                console.log('this.service.chats: ', this.service.chats)
                this.chat = this.service.chats.find((item) => {
                  console.log('item.member.id: ', item.member.id, '\n', 'this.params: ', this.params)
                  return  item.member.id === this.params
                });
                console.log('aaaaaaaa2', this.chat);
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
