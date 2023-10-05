export type ButtonType = 'primary' | 'secondary' | 'danger' | 'link';

export interface ButtonItem {
  type: ButtonType;
  class: string;
}

export const BUTTON_TYPES: Record<ButtonType, ButtonItem> = {
  primary: {
    type: 'primary',
    class: 'bg-primary border-primary border shadow py-1.5 px-2.5 rounded-lg text-white hover:bg-opacity-90',
  },
  secondary: {
    type: 'secondary',
    class: 'border-gray-300 border shadow py-1.5 px-2.5 rounded-lg hover:bg-gray-50',
  },
  danger: {
    type: 'danger',
    class: 'bg-danger border-danger border text-white shadow py-1.5 px-2.5 rounded-lg hover:bg-opacity-90',
  },
  link: {
    type: 'link',
    class: 'text-primary hover:text-opacity-70 underline text-sm py-1.5 px-2.5',
  },
};
