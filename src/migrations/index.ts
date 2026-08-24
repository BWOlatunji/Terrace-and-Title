import * as migration_20260824_192717 from './20260824_192717';

export const migrations = [
  {
    up: migration_20260824_192717.up,
    down: migration_20260824_192717.down,
    name: '20260824_192717'
  },
];
