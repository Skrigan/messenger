import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {GeneralService} from "../shared/general.service";
import {Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss']
})
export class AuthorizationComponent implements OnInit, OnDestroy {
  form: FormGroup
  aSub: Subscription

  constructor(private auth: GeneralService,
              private router: Router) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      number: new FormControl('1234512345', [
        Validators.required,
        Validators.pattern('^[\\+]?[(]?[0-9]{3}[)]?[-\\s\\.]?[0-9][-\\s\\.]?[0-9][-\\s\\.]?[0-9][-\\s\\.]?[0-9]{4,6}$')
      ]),
      password: new FormControl('12345', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(12),
      ]),
    });
  }

  ngOnDestroy() {
    if (this.aSub) {
      this.aSub.unsubscribe();
    }
  }

  submit() {
    if (this.form.valid) {
      this.form.disable();

      this.aSub = this.auth.login(this.form.value).subscribe(
        (res) => {
          console.log('Login successful: ', res);
          this.router.navigate(['/chats'])
        },
        (error) => {
          console.warn(error);
          this.form.enable();
        }
      );
      // console.log(this.form.value);
      // this.auth.login(this.form.value).then((res) => console.log(res.body));
      // this.auth.login(this.form.value)
      this.form.reset();
    }
  }
}
