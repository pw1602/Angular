import { InMemoryDbService } from 'in-memory-web-api';

import { User } from './user';

export class InMemUserService implements InMemoryDbService {
  createDb() {
    const users = [
      { id: 1, name: 'Andrzej', surname: 'Lotnisko', email: 'andrzej@wp.pl', password: 'andrzej' },
      { id: 2, name: 'Adam', surname: 'Lotnisko', email: 'adam@wp.pl', password: 'adam' }
    ];
    return {users};
  }
}
