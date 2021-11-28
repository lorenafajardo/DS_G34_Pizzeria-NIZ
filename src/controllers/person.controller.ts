import {service} from '@loopback/core';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  HttpErrors,
  param,
  patch,
  post,
  put,
  requestBody,
  response
} from '@loopback/rest';
import {Keys} from '../config/keys';
import {Person} from '../models';
import {Credentials} from '../models/credentials.model';
import {PersonRepository} from '../repositories';
import {AutenticationService} from '../services';
import {NotificationsService} from '../services/notifications.service';

const fetch = require('node-fetch');

export class PersonController {
  constructor(
    @repository(PersonRepository)
    public personRepository: PersonRepository,
    @service(AutenticationService)
    public servicioAutentication: AutenticationService,
    @service(NotificationsService)
    public notificationsService: NotificationsService
  ) { }

  @post('/people')
  @response(200, {
    description: 'Person model instance',
    content: {'application/json': {schema: getModelSchemaRef(Person)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Person, {
            title: 'NewPerson',
            exclude: ['id'],
          }),
        },
      },
    })
    person: Omit<Person, 'id'>,
  ): Promise<Person> {
    const password = this.servicioAutentication.generatePasswordFunction();
    const passwordEncrypt = this.servicioAutentication.encryptPasswordFunction(password);
    person.password = passwordEncrypt;
    const instPerson = await this.personRepository.create(person);
    if (instPerson) {
      const contenido = `<table style="width:100%; background: #FF010378;  border:1px solid red">
      <tr>
        <th><h2 style="color:white">Bienvenido al sistema de ordenes pizzeria Niz</h2></th>
      </tr>
    </table>
    <br>
    <table style="width:100%; background: white">
       <tr>
        <th>
         <img src="https://home2med.com/photos/logo.jpg">
        </th>
        <th>
          <h2><b>Registro Exitoso !!!!!</b></h2>
         <p>Sus datos para ingresar al sistema son los siguientes:</p>
          <p><span style="font-weight:bold">Usuario:</span> ${instPerson.email}
          </p>
          <p>Contraseña: ${password}</p>
        </th>
      </tr>
    </table>
    <br>
    <div style="text-align:center">
    <p>Pizzeria NIZ</p>
    <p>Centro Comercial Las Huertas de Tutaina Local 07</p>
    <p>Celular:321 876 5342</p>
    <p>Colon, Putumayo</p>
    <hr>
    </div>

    <div style="text-align:center">
    <img src="https://home2med.com/photos/portada01.png">
    </div>`
      this.notificationsService.sendEmail(instPerson.email, Keys.subject, contenido);
    }
    return instPerson;
  }

  @post('/showInfoPerson')
  @response(200, {
    description: 'Person model instance',
  })
  async showInfoPerson(@requestBody() instCredentials: Credentials) {
    const person = await this.servicioAutentication.showInfoPerson(instCredentials.user, instCredentials.key)
    if (person) {
      const tokenGenerate = this.servicioAutentication.generateToken(person)
      return {
        data: {
          _id: person.id,
          name: person.names,
          lastname: person.lastName,
          contact: person.phone,
          email: person.email,
          password: person.password
        },
        tokenG: tokenGenerate
      }
    } else {
      throw new HttpErrors[404]('Correo electrónico y/o contraseñas no concuerdan');
    }
  }

  @get('/people/count')
  @response(200, {
    description: 'Person model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Person) where?: Where<Person>,
  ): Promise<Count> {
    return this.personRepository.count(where);
  }

  @get('/people')
  @response(200, {
    description: 'Array of Person model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Person, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Person) filter?: Filter<Person>,
  ): Promise<Person[]> {
    return this.personRepository.find(filter);
  }

  @patch('/people')
  @response(200, {
    description: 'Person PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Person, {partial: true}),
        },
      },
    })
    person: Person,
    @param.where(Person) where?: Where<Person>,
  ): Promise<Count> {
    return this.personRepository.updateAll(person, where);
  }

  @get('/people/{id}')
  @response(200, {
    description: 'Person model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Person, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Person, {exclude: 'where'}) filter?: FilterExcludingWhere<Person>
  ): Promise<Person> {
    return this.personRepository.findById(id, filter);
  }

  @patch('/people/{id}')
  @response(204, {
    description: 'Person PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Person, {partial: true}),
        },
      },
    })
    person: Person,
  ): Promise<void> {
    await this.personRepository.updateById(id, person);
  }

  @put('/people/{id}')
  @response(204, {
    description: 'Person PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() person: Person,
  ): Promise<void> {
    await this.personRepository.replaceById(id, person);
  }

  @del('/people/{id}')
  @response(204, {
    description: 'Person DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.personRepository.deleteById(id);
  }
}
