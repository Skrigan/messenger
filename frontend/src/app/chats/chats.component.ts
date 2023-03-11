import {Component, OnDestroy, OnInit} from '@angular/core';
import {GeneralService} from "../shared/general.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.scss']
})
export class ChatsComponent implements OnInit, OnDestroy {
  aSub: Subscription

  constructor(private service: GeneralService) {
  }

  ngOnInit() {
    this.aSub = this.service.getChats().subscribe(
      (res) => {
        console.log('res: ', res)
      },
      (error) => {
        console.warn(error);
      }
    );

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
