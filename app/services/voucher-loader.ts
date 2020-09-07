import Service from '@ember/service';

export default class VoucherLoader extends Service.extend({
  // anything which *must* be merged to prototype here
}) {
  // normal class body definition here

  async loadClientVoucher(clinetId: String, voucherValue: String) {
    let data = {
      clientId: clinetId,
      creatingBranchId: "SE-J0emUgQnya14mOGdQSw",
      expiryDate: "2020-08-27T21:37:18.499Z",
      issueDate: "2020-08-27T21:37:18.499Z",
      originalBalance: voucherValue,
    };
    let url: string = "http://api-gateway-dev.phorest.com/third-party-api-server/api/business/eTC3QY5W3p_HmGHezKfxJw/voucher";
    const response = await fetch(url, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "accept": "*/*",
        "Content-Type": "application/json",
        "Authorization": `Basic ${btoa("global/cloud@apiexamples.com:VMlRo/eh+Xd8M~l")}`
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(data)
    });

    return response.json();
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your services.
declare module '@ember/service' {
  interface Registry {
    'voucher-loader': VoucherLoader;
  }
}
