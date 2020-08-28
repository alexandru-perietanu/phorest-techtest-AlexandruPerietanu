import Service from '@ember/service';
import { ValidField } from 'phorest-test/types/types';

export default class FieldValidator extends Service.extend({
  // anything which *must* be merged to prototype here
}) {
  // normal class body definition here
  validateEmail(email: String): ValidField {
    let validField: ValidField = {
      valid: true
    }

    if (!email.length) {
      validField.valid = false;
      validField.errorMessage = "Email can't be empty";
    }
    return validField;
  }

  validatePhoneNumber(phone:String): ValidField {
    let validField: ValidField = {
      valid: true
    }

    if (!phone.length) {
      validField.valid = false;
      validField.errorMessage = "Phone can't be empty";
      return validField;
    }
    return validField;
  }

  validateVoucherAmount(amout:String): ValidField {
    let validField: ValidField = {
      valid: true
    }

    if (!amout.length) {
      validField.valid = false;
      validField.errorMessage = "Amount can't be empty";
      return validField;
    }

    if (isNaN(Number(amout))) {
      validField.valid = false;
      validField.errorMessage = "Amount must be a number";
      return validField;
    }

    if (Number(amout) < 1 || Number(amout) > 100) {
      validField.valid = false;
      validField.errorMessage = "Amount must be between 1 and 100";
      return validField;
    }

    return validField;
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your services.
declare module '@ember/service' {
  interface Registry {
    'field-validator': FieldValidator;
  }
}
