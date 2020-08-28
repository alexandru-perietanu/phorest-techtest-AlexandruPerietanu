import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import FieldValidator from 'phorest-test/services/field-validator';
import { ValidField } from 'phorest-test/types/types';

module('Unit | Service | field-validator', function(hooks) {
  setupTest(hooks);

  test('Validate Amount Empty Error', function(assert) {
    let service: FieldValidator = this.owner.lookup('service:field-validator');
    let validateString = "";
    let validField: ValidField = service.validateVoucherAmount(validateString);
    assert.equal(validField.valid, false);
    assert.equal(validField.errorMessage, "Amount can't be empty");
  });

  test('Validate Amount Is Number Error', function(assert) {
    let service: FieldValidator = this.owner.lookup('service:field-validator');
    let validateStringBad = "aaa";
    let validFieldBad: ValidField = service.validateVoucherAmount(validateStringBad);
    assert.equal(validFieldBad.valid, false);
    assert.equal(validFieldBad.errorMessage, "Amount must be a number");
  });

  test('Validate Amount Is Number', function(assert) {
    let service: FieldValidator = this.owner.lookup('service:field-validator');
    let validateStringGood = "50";
    let validFieldGood: ValidField = service.validateVoucherAmount(validateStringGood);
    assert.equal(validFieldGood.valid, true);
  });

  test('Validate Amount Is In Range Error', function(assert) {
    let service: FieldValidator = this.owner.lookup('service:field-validator');
    let validateString = "101";
    let validField: ValidField = service.validateVoucherAmount(validateString);
    assert.equal(validField.valid, false);
    assert.equal(validField.errorMessage, "Amount must be between 1 and 100");
  });

  test('Validate Amount Is In Range', function(assert) {
    let service: FieldValidator = this.owner.lookup('service:field-validator');
    let validateString = "60";
    let validField: ValidField = service.validateVoucherAmount(validateString);
    assert.equal(validField.valid, true);
  });

  test('Validate Email Empty Error', function(assert) {
    let service: FieldValidator = this.owner.lookup('service:field-validator');
    let validateString = "";
    let validField: ValidField = service.validateEmail(validateString);
    assert.equal(validField.valid, false);
    assert.equal(validField.errorMessage, "Email can't be empty");
  });

  test('Validate Phone Empty Error', function(assert) {
    let service: FieldValidator = this.owner.lookup('service:field-validator');
    let validateString = "";
    let validField: ValidField = service.validatePhoneNumber(validateString);
    assert.equal(validField.valid, false);
    assert.equal(validField.errorMessage, "Phone can't be empty");
  });
});

