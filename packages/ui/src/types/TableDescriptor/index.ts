import type { CategoryTypes } from "~/types/TableStatus";

export interface StatusItem {
  value: number | string;
  category: CategoryTypes;
}
