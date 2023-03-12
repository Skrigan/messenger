import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {GeneralService} from "../shared/general.service";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  messageForm: FormGroup;

  constructor(public service: GeneralService) {
  }

  ngOnInit() {
    this.messageForm = new FormGroup({
      text: new FormControl('', Validators.required),
    })
  }

  clearForm() {
    this.messageForm.reset();
  }

  submit() {
    if (this.messageForm.valid) {
      console.log(this.messageForm.value);
    }
  }
}
