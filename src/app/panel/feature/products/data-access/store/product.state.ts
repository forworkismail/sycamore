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
    id: 2,
    label: 'price',
    type: 'text',
    width: 0.1,
    mapper: (product: Product) => (product.price ? `${product.price}$` : `-`),
    sortColumnBy: 'price',
    tailwindClass: (product: Product) =>
      product.price && product.price > 10 ? 'text-red-500 justify-end' : 'text-green-500 justify-end',
  },
  {
    id: 3,
    label: 'category',
    type: 'text',
    width: 0.3,
    mapper: (product: Product) => `${product.category}`,
    sortColumnBy: 'category',
  },
  {
    id: 4,
    label: 'description',
    type: 'text',
    width: 0.3,
    mapper: (product: Product) => `${product.description}`,
    sortColumnBy: 'description',
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
