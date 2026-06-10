import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  ValidatorFn,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';

export interface IntakeInitialValues {
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
}

@Component({
  selector: 'app-talent-match-intake',
  templateUrl: './talent-match-intake.component.html',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
})
export class TalentMatchIntakeComponent implements OnInit {
  @Input() required: boolean = true;
  @Input() requiredFields: Array<keyof IntakeInitialValues> = [
    'name',
    'email',
    'phone',
    'company',
  ];
  @Input() initialValues: IntakeInitialValues = {};
  @Output() formReady = new EventEmitter<FormGroup>();

  intakeForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.intakeForm = this.fb.group({
      name: [this.initialValues.name ?? '', this.fieldValidators('name')],
      email: [
        this.initialValues.email ?? '',
        this.fieldValidators('email', [Validators.email]),
      ],
      phone: [
        this.initialValues.phone ?? '',
        this.fieldValidators('phone', [
          Validators.pattern(/^[\d\s\+\-\(\)\.]{7,20}$/),
        ]),
      ],
      company: [
        this.initialValues.company ?? '',
        this.fieldValidators('company'),
      ],
    });
    this.formReady.emit(this.intakeForm);
  }

  private fieldValidators(
    field: keyof IntakeInitialValues,
    extra: ValidatorFn[] = [],
  ): ValidatorFn[] {
    const isRequired = this.required && this.requiredFields.includes(field);
    return [...(isRequired ? [Validators.required] : []), ...extra];
  }
}
