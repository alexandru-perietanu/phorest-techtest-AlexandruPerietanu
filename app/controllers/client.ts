import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { ClientData, ValidField } from 'phorest-test/types/types';
import ClientLoader from 'phorest-test/services/client-loader';
import FieldValidator from 'phorest-test/services/field-validator';

export default class Client extends Controller.extend({
  // anything which *must* be merged to prototype here
}) {
  // normal class body definition here
  @tracked
  noResultFound = false;
  @tracked
  emailValidation: ValidField = { valid: true };
  @tracked
  phoneValidation: ValidField = { valid: true };
  @tracked
  email: String = "";
  @tracked
  phone: String = "";
  @tracked
  clients: Array<ClientData> | null = null;
  @service clientLoader!: ClientLoader;
  @service fieldValidator!: FieldValidator;

  @action
  findClientByEmail() {
    this.resetValidation();
    this.emailValidation = this.fieldValidator.validateEmail(this.email);
    if (this.emailValidation.valid) {
      this.loadClientDataByEmail();
    }
  }

  @action
  findClientByPhone() {
    this.resetValidation();
    this.phoneValidation = this.fieldValidator.validatePhoneNumber(this.phone);
    if (this.phoneValidation.valid) {
      this.loadClientDataByPhoneNumber();
    }
  }

  resetValidation() {
    this.emailValidation = {
      valid: true
    };

    this.phoneValidation = {
      valid: true
    };
  }

  loadClientDataByPhoneNumber() {
    this.clientLoader!.loadClientDataByPhoneNumber(this.phone).then(data => {
      this.handleClientsLoad(data);
    });
  }

  loadClientDataByEmail() {
    this.clientLoader!.loadClientDataByEmail(this.email).then(data => {
      this.handleClientsLoad(data);
    });
  }

  handleClientsLoad(data: any) {
    if (data.page.size == 0) {
      this.noResultFound = true;
      return;
    } else {
      this.noResultFound = false;
    }
    this.clients = data._embedded.clients;
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your controllers.
declare module '@ember/controller' {
  interface Registry {
    'client': Client;
  }
}
