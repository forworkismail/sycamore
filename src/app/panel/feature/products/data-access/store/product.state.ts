import { TableColumn, TableState, createInitialTableState } from 'app/common/components/table/store/table.state';

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
    label: 'id',
    type: 'text',
    width: 0,
    dependsOn: ['id'],
    mapper: (product: Product) => `${product.id}`,
    sortColumnBy: 'id',
    visible: true,
  },
  {
    label: 'Full description',
    type: 'text',
    width: 0.5,
    dependsOn: ['name', 'description'],
    mapper: (product: Product) => `${product.name} ${product.description}`,
    sortColumnBy: 'name',
    visible: true,
  },
  {
    label: 'price',
    type: 'text',
    width: 0.1,
    dependsOn: ['price'],
    mapper: (product: Product) => (product.price ? `${product.price}` : ''),
    sortColumnBy: 'price',
    tailwindClass: (product: Product) =>
      product.price && product.price > 10 ? 'text-red-500 justify-end' : 'text-green-500 justify-end',
    visible: false,
  },
  {
    label: 'category',
    type: 'text',
    width: 0.5,
    dependsOn: ['category'],
    mapper: (product: Product) => (product.category ? `${product.category}` : ''),
    sortColumnBy: 'category',
    visible: true,
  },
  {
    label: 'description',
    type: 'text',
    width: 0.3,
    dependsOn: ['description'],
    mapper: (product: Product) => `${product.description}`,
    sortColumnBy: 'description',
    visible: false,
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
