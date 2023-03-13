import {Component, OnDestroy, OnInit} from '@angular/core';
import {GeneralService} from "../shared/general.service";
import {Subscription} from "rxjs";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.scss']
})
export class ChatsComponent implements OnInit, OnDestroy {
  aSub: Subscription;
  searchForm: FormGroup;

  constructor(public service: GeneralService) {
  }

  ngOnInit() {
    this.searchForm = new FormGroup({
      number: new FormControl('', [
        Validators.required,
      ]),
    })

    this.aSub = this.service.getChats().subscribe(
      (res) => {
        console.log('chats: ', res);
        this.service.chats = res;
      },
      (error) => {
        console.warn(error);
      }
    );
  }

  submit() {
    if (this.searchForm.valid) {
      this.searchForm.disable();

      this.service.getUsersByNumber(this.searchForm.value).subscribe(
        (res) => {
          this.service.search = res;
          this.searchForm.enable();
          console.log('Search successful: ', this.service.search);
        },
        (error) => {
          console.warn(error);
        }
      )
    }
  }

  clearForm() {
    this.searchForm.reset();
    this.service.search = [];
  }

  ngOnDestroy() {
    if (this.aSub) {
      this.aSub.unsubscribe();
    }
    // this.searchForm.reset();
  }
}
