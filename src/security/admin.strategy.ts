import {AuthenticationStrategy} from '@loopback/authentication';
import {service} from '@loopback/core';
import {HttpErrors, Request} from '@loopback/rest';
import {UserProfile} from '@loopback/security';
import parseBearerToken from 'parse-bearer-token';
import {AutenticationService} from '../services';

export class AdminStrategy implements AuthenticationStrategy {
  name: string = 'admin';
  constructor(@service(AutenticationService) public serviceAutentication: AutenticationService) { }
  async authenticate(request: Request): Promise<UserProfile | undefined> {
    let token = parseBearerToken(request);
    if (token) {
      let dataAdmin = this.serviceAutentication.validateToken(token);
      if (dataAdmin) {
        let adminInfo: UserProfile = Object.assign({
          name: dataAdmin.data.name,
          email: dataAdmin.data.email
        });
        return adminInfo;
      } else {
        throw new HttpErrors[405]("Token invalido");
      }
    } else {
      throw new HttpErrors[405]("no se encontro el Token consultado");
    }
  }
}
