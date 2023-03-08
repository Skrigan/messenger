import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../shared/secvices/auth.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.scss']
})
export class ChatsComponent implements OnInit, OnDestroy {
  aSub: Subscription

  constructor(private auth: AuthService) {
  }

  ngOnInit() {
    this.aSub = this.auth.getUsers().subscribe(
      (res) => {
        console.log('Getter is successful: ', res);
      },
      (error) => {
        console.warn(error);
      }
    );
    // this.aSub.unsubscribe();
  }

  ngOnDestroy() {
    if (this.aSub) {
      this.aSub.unsubscribe();
    }
  }

  // async getUsers() {
  //   let response = await fetch('http://127.0.0.1:5000/auth/users', {
  //     method: 'GET'
  //   });
  //   console.log(response);
  // }
}
