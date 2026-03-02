import * as migration_20260302_175410_init from './20260302_175410_init';

export const migrations = [
  {
    up: migration_20260302_175410_init.up,
    down: migration_20260302_175410_init.down,
    name: '20260302_175410_init'
  },
];
