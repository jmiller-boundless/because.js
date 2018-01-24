import { expect } from 'chai';
import {} from 'mocha';
import { KeyFrontend } from '../src/services/key/frontend';
import { TokenFrontend } from "../src/services/token/frontend";
import { Frontend } from "../src/frontend";
import { FrontendClass } from "../src/service_frontend";
import { Host, hosts } from "../src/hosts";
import { NodeClient as Client } from "../src/flavors/node_es5";



describe('Key validation', () => {
  it('should return Boundless', () => {
    const host: Host = hosts["test"];
    const classes: {[name: string]: FrontendClass} = {
        "tokens": TokenFrontend,
        "keys": KeyFrontend
    };
    const frontend: Frontend = new Frontend(classes, new Client(), host, undefined);
    const kfe = new KeyFrontend(frontend,host);
    frontend.login(undefined,undefined,"MTIzND9UaGF0cyB0aGUga2luZCBvZiB0aGluZyBhbiBpZGlvdCB3b3VsZCBoYXZlIG9uIGhpcyBsdWdnYWdlIQ").then(function(lr){
      let prom = kfe.validate_key("MTIzND9UaGF0cyB0aGUga2luZCBvZiB0aGluZyBhbiBpZGlvdCB3b3VsZCBoYXZlIG9uIGhpcyBsdWdnYWdlIQ");
      prom.then(function(result){
        console.log("result",result);
        expect(result.organization).to.equal('Boundless');
        done();
      }).catch((error)=>{
        console.log("error",error);
      });
    }).catch((error)=>{
      console.log("error",error);
    });;


  });
});
