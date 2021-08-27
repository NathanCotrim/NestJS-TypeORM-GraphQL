import * as path from 'path';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const options: TypeOrmModuleOptions = {
  type: 'sqlite',
  database: path.resolve(__dirname, '..', '..', 'data', 'sqlite.db'),
  logging: true,
  entities: [path.resolve(__dirname, '..', 'db', 'models', '*')],
  migrations: [path.resolve(__dirname, '..', 'db', 'migrations', '*')],
};

export { options };
