/**
 * Pagination type
 */
export type Pagination = {
    pageIndex: number;
    pageSize:number;
}

/**
 * Filter type
 */
export type Filter = {
    ca?: string;
    client?:string;
    statut?:string;
    index?:string;
}

export type BaserowFilterType =
  | "equal"
  | "not_equal"
  | "contains"
  | "contains_not"
  | "higher_than"
  | "lower_than"
  | "date_equal"
  | "date_not_equal"
  | "date_before"
  | "date_after"
  | "boolean"
  | "empty"
  | "not_empty"
  | "multiple_collaborators_has"
  | "link_row_has"
  | "single_select_equal"
  | "has_value_equal";

export type BaserowFilterOperator =
  | "AND"
  | "OR";

export interface BaserowFilter {
  field: string | number;
  type: BaserowFilterType;
  value: string | number | boolean | null;
}

export class BaserowFilterBuilder {
  private filters: BaserowFilter[] = [];

  add(
    field: string | number,
    type: BaserowFilterType,
    value: string | number | boolean | null |undefined
  ) {
    if(value)
      this.filters.push({ field, type, value });
    return this; // chaining
  }
  /**
   * Retourne le tableau filters utilisable directement dans la requête Baserow
   */
  toJSON() {
    return {
      filters: {
        filter_type: "AND",
        filters: [...this.filters]
      }
    };
  }

  clear() {
    this.filters = [];
  }
}
