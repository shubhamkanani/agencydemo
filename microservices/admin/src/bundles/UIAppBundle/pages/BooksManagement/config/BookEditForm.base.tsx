/** @overridable */
import { XRouter, use, IComponents, QueryBodyType } from "@bluelibs/x-ui";
import { XForm } from "@bluelibs/x-ui-admin";
import { Service, Inject } from "@bluelibs/core";
import { SmileOutlined } from "@ant-design/icons";
import { Routes } from "@bundles/UIAppBundle";
import * as Ant from "antd";
import { Book, BooksCollection } from "@bundles/UIAppBundle/collections";

@Service({ transient: true })
export class BookEditForm extends XForm {
  @Inject(() => BooksCollection)
  collection: BooksCollection;

  build() {
    const { UIComponents } = this;
    const { t } = this.i18n;

    this.add([
      {
        id: "name",
        label: t("management.books.fields.name"),
        name: ["name"],
        required: true,
        component: Ant.Input,
      },
    ]);
  }

  static getRequestBody(): QueryBodyType<Book> {
    return {
      _id: 1,
      name: 1,
    };
  }

  onSubmit(_id, values: Partial<Book>): Promise<void> {
    const { t } = this.i18n;

    return this.collection
      .updateOne(_id, { $set: values })
      .then(({ _id }) => {
        Ant.notification.success({
          message: t("generics.success"),
          description: t("management.books.edit_confirmation"),
          icon: <SmileOutlined />,
        });
      })
      .catch((err) => {
        Ant.notification.warn({
          message: t("generics.error"),
          description: t("generics.error_message"),
        });
      });
  }
}
