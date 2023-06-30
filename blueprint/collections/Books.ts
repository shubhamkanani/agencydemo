import { app, collection, field, relation, shortcuts, faker } from "../utils";

export const Books = collection({
  id: "Books",
  fields: [field.string("name")],
  mock: {
    count: 100,
  },
  relations: [],
});
