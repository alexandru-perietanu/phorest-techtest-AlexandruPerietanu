import Service from '@ember/service';
import { baseURL, user } from 'phorest-test/util/constants';

export default class ClientLoader extends Service.extend({
  // anything which *must* be merged to prototype here
  
}) {
  // normal class body definition here
  loadClientDataByEmail(email: String) {
    let url:string = `${baseURL}eTC3QY5W3p_HmGHezKfxJw/client?email=${email}&page=0&size=150`;
    return this.loadClientData(url);
  }

  loadClientDataByPhoneNumber(phone: String) {
    let url:string = `${baseURL}eTC3QY5W3p_HmGHezKfxJw/client?phone=${[phone]}&page=0&size=150`;
    return this.loadClientData(url);
  }
  
  async loadClientData(url: string) {  
      const response = await fetch(url, {
        method: "GET", 
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin", 
        headers: {
          "accept": "*/*",
          "Content-Type": "application/json",
          "Authorization": `Basic ${btoa(user.username + ":" + user.password)}`
        },
        redirect: "follow", 
        referrerPolicy: "no-referrer"
      });

      return response.json();
    }
  }
  

// DO NOT DELETE: this is how TypeScript knows how to look up your services.
declare module '@ember/service' {
  interface Registry {
    'client-loader': ClientLoader;
  }
}
