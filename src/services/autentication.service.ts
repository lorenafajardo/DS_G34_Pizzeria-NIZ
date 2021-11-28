import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {Keys} from '../config/keys';
import {Person} from '../models';
import {PersonRepository} from '../repositories';
const generador = require('password-generator');
const cryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');

@injectable({scope: BindingScope.TRANSIENT})
export class AutenticationService {
  constructor(
    @repository(PersonRepository)
    public personRepository: PersonRepository,
  ) { }
  /*
   * Add service methods here
   */
  generatePasswordFunction() {
    const clave = generador(8, false);
    return clave;
  }

  encryptPasswordFunction(clave: string) {
    const encryptedKey = cryptoJS.MD5(clave).toString();
    return encryptedKey;
  }

  showInfoPerson(userEmail: string, userPassword: string) {
    try {
      const person = this.personRepository.findOne({
        where: {
          email: userEmail, password: userPassword
        }
      });
      if (person) {
        return person;
      }
      return false;
    } catch {
      return false;
    }
  }

  generateToken(person: Person) {
    const token = jwt.sign({
      data: {
        id: person.id,
        name: person.names,
        email: person.email
      },
    }, Keys.JWTkey);
    return token;
  }

  validateToken(token: string) {
    try {
      const data = jwt.verify(token, Keys.JWTkey);
      return data;
    } catch {
      return false;
    }
  }
}
