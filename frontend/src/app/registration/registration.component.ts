import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  form: FormGroup

  ngOnInit() {
    this.form = new FormGroup({
      phone: new FormControl('', [
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

  submit() {
    if (this.form.valid) {
      // console.log('Form submitted: ', this.form);
      const formData = {...this.form.value};
      console.log('formData: ', formData);
      this.form.reset();
    }
  }
}
