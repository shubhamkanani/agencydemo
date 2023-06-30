import {
  collection,
  field,
  relation,
  shortcuts,
  sharedModel,
  faker,
} from '../utils';
import { Books } from './Books';

export const Users = collection({
  id: 'Users',
  representedBy: 'fullName',
  behaviors: {
    softdeletable: true,
  },
  mock: {
    count: 10,
  },
  fields: [
    // Standard fields present for user (isEnabled, createdAt)
    ...shortcuts.fields.user.standard(),
    // Information about password storage (hash, email, etc)
    shortcuts.field.user.password(),
    shortcuts.field.softdeletable(),
    ...shortcuts.fields.timestampable(),
    field({
      id: 'roles',
      type: field.types.ENUM,
      enumValues: ['ADMIN', 'WORKER'],
      isArray: true,
    }),
    field({
      id: 'fullName',
      type: field.types.STRING,
      isReducer: true,
    }),
    field({
      id: 'email',
      type: field.types.STRING,
      isReducer: true,
    }),
    field({
      id: 'books',
      type: field.types.STRING,
      isArray: true,
      isRequired: false,
      isReducer: true,
      collection: Books
    }),
  ],
  relations: [...shortcuts.relations.blameable()],
});
