import { TableColumn, TableState, createInitialTableState } from 'app/common/store/table/table.state';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
}

export enum ProductType {
  ELECTRONICS = 'ELECTRONICS',
  CLOTHING = 'CLOTHING',
  FOOD = 'FOOD',
}

export const productColumns: TableColumn<Product>[] = [
  {
    id: 1,
    label: 'Full description',
    type: 'text',
    width: 0.5,
    mapper: (product: Product) => `${product.name} ${product.description}`,
    sortColumnBy: 'name',
  },
  {
    id: 3,
    label: 'price',
    type: 'text',
    mapper: (product: Product) => `${product.price} $`,
    sortColumnBy: 'price',
  },
  {
    id: 4,
    label: 'category',
    type: 'text',
    mapper: (product: Product) => `${product.category}`,
    sortColumnBy: 'category',
  },
];

interface ProductTableState extends TableState<Product> {
  selectedProductId: number | null;
  type: ProductType;
}

export function createInitialProductTableState(): ProductTableState {
  return {
    ...createInitialTableState<Product>(),
    columns: productColumns,
    selectedProductId: null,
    type: ProductType.ELECTRONICS,
    sort: {
      column: 'name',
      direction: 'asc',
    },
  };
}
