import {
  newSmart,
  useRouter,
  useUIComponents,
  useTranslate,
} from "@bluelibs/x-ui";
import { useEffect, useState, useMemo } from "react";
import { BooksAntTableSmart } from "./BooksTableSmart";
import { PlusOutlined, FilterOutlined } from "@ant-design/icons";
import * as Ant from "antd";
import { Routes } from "@bundles/UIAppBundle";
import { features } from "../../config/features";
import { BooksListFilters } from "./BooksListFilters";

export function BooksList() {
  const UIComponents = useUIComponents();
  const router = useRouter();
  const t = useTranslate();
  const [api, Provider] = newSmart(BooksAntTableSmart);
  const [filtersOpened, setFiltersOpened] = useState(false);
  const onFiltersUpdate = useMemo(() => {
    return (filters) => {
      api.setFlexibleFilters(filters);
    };
  }, []);

  return (
    <UIComponents.AdminLayout>
      <Ant.PageHeader
        title={t("management.books.list.header")}
        extra={[
          features.create ? (
            <Ant.Button
              key="1"
              onClick={() => router.go(Routes.BOOKS_CREATE)}
              icon={<PlusOutlined />}
            >
              {t("management.books.list.create_btn")}
            </Ant.Button>
          ) : null,
          <Ant.Button
            key="2"
            onClick={() => setFiltersOpened(!filtersOpened)}
            icon={<FilterOutlined />}
          >
            {t("generics.list_filters")}
          </Ant.Button>,
        ]}
      />

      {api.state.isError && (
        <Ant.Alert type="error" message={t("generics.error_message")} />
      )}

      <Ant.Layout.Content>
        <Provider>
          <div className="page-books-list">
            {filtersOpened && <BooksListFilters onUpdate={onFiltersUpdate} />}
            <Ant.Input.Search
              name="Search"
              placeholder={t("generics.list_search")}
              className="search"
              onKeyUp={(e) => {
                const value = (e.target as HTMLInputElement).value;
                api.setFilters({
                  // Customise your search filters!
                  title: new RegExp(`${value}`, "i"),
                });
              }}
            />
            <Ant.Table {...api.getTableProps()} />
          </div>
        </Provider>
      </Ant.Layout.Content>
    </UIComponents.AdminLayout>
  );
}
