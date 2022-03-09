import { factory, primaryKey } from '@mswjs/data';
import { nanoid } from '@reduxjs/toolkit';

export const db = factory({
  user: {
    id: primaryKey(nanoid),
    username: String,
    email: String,
    password: String
  }
});
