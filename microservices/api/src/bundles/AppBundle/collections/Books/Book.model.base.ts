/** @overridable */
import { ObjectId } from "@bluelibs/ejson";
import { Schema, Is, a, an } from "@bluelibs/validator-bundle";

@Schema()
export class Book {
  @Is(an.objectId())
  _id?: ObjectId;

  @Is(a.string().required())
  name: string;
}
