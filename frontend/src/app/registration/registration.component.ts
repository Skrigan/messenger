import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {GeneralService} from "../shared/general.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit, OnDestroy {
  form: FormGroup
  aSub: Subscription

  constructor(private auth: GeneralService,
              private router: Router) { //!!!!!!!!!!!!!!!!!!!!
  }

  ngOnInit() {
    this.form = new FormGroup({
      number: new FormControl('', [
        Validators.required,
        Validators.pattern('^[\\+]?[(]?[0-9]{3}[)]?[-\\s\\.]?[0-9][-\\s\\.]?[0-9][-\\s\\.]?[0-9][-\\s\\.]?[0-9]{4,6}$')
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(12),
      ]),
      firstname: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required),
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
      this.aSub = this.auth.register(this.form.value).subscribe(
        (res) => {
          console.log('Registration successful: ', res);
          this.router.navigate(['/authorization'], {
            queryParams: {
              registered: true
            }
          })
        },
        (error) => {
          console.warn(error);
          this.form.enable();
        }
      );
      // console.log('Form submitted: ', this.form);
      const formData = {...this.form.value};
      console.log('formData: ', formData);
      this.form.reset();
    }
  }
}
