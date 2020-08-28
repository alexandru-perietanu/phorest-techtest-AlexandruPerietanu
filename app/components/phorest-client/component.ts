import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import VoucherLoader from 'phorest-test/services/voucher-loader';
import { action } from '@ember/object';
import { VoucherData, ClientData, ValidField } from 'phorest-test/types/types';
import FieldValidator from 'phorest-test/services/field-validator';

interface ClientArgs {
    model: ClientData
}

export default class PhorestClientComponent extends Component<ClientArgs> {
    @tracked
    voucherAmountValidation: ValidField = { valid: true };
    @tracked
    voucher: VoucherData | null = null;
    @tracked
    voucherValue: String = "100";
    @service voucherLoader!: VoucherLoader;
    @service fieldValidator!: FieldValidator;

    @action
    loadVoucherForClient() {
        this.resetValidation();
        this.voucherAmountValidation = this.fieldValidator.validateVoucherAmount(this.voucherValue);
        if (this.voucherAmountValidation.valid) {
            this.voucherLoader!.loadClientVoucher(this.args.model.clientId!, this.voucherValue).then(data => {
                this.voucher = data;
            });
        }
    }

    resetValidation() {
        this.voucherAmountValidation = {
            valid: true
        };
    }

    get issueDate() {
        if (!this.voucher) {
            return "";
        }
        let issueDate = this.voucher?.issueDate;
        return issueDate?.substr(0, issueDate?.indexOf("T"));
    }

    get expiryDate() {
        if (!this.voucher) {
            return "";
        }
        let expiryDate = this.voucher?.expiryDate;
        return expiryDate?.substr(0, expiryDate?.indexOf("T"));
    }
}
