import { Injectable } from '@nestjs/common';
import mariadb from 'mariadb';
import mariadb_config from '../../config/mariadb-config.json';

@Injectable()
export class Mariadb {
  public pool = mariadb.createPool(mariadb_config);
}
