/** @overridable */
import { ObjectId } from "@bluelibs/ejson";
import { Schema, Is, a, an } from "@bluelibs/validator-bundle";

@Schema()
export class BookUpdateInput {
  @Is(a.string().nullable())
  name?: string;
}
