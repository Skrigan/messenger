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
  // chats: any[];
  // search: any = [];

  constructor(public service: GeneralService) {
  }

  // chatView(res: any) {
  //   const fragment = document.createDocumentFragment();
  //   for (let item of res) {
  //     console.log('item: ', item);
  //     let cont = document.createEvent('div');
  //   }
  // }

  ngOnInit() {
    this.searchForm = new FormGroup({
      number: new FormControl('', [
        Validators.required,
        // Validators.minLength(4),
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

    //fff

    // this.aSub = this.service.getChats().subscribe(
    //   (res) => {
    //     console.log('res: ', res)
    //   },
    //   (error) => {
    //     console.warn(error);
    //   }
    // );

    // this.aSub = this.service.getUserByNumber('1234512345').subscribe(
    //   (res) => {
    //     console.log('Getter is successful: ', res);
    //   },
    //   (error) => {
    //     console.warn(error);
    //   }
    // );
    // this.aSub.unsubscribe();
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
  }

  // async getUsers() {
  //   let response = await fetch('http://127.0.0.1:5000/service/users', {
  //     method: 'GET'
  //   });
  //   console.log(response);
  // }
}
