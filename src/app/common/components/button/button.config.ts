export type ButtonType = 'primary' | 'secondary' | 'danger' | 'link' | 'icon';

export interface ButtonItem {
  type: ButtonType;
  class: string;
}

export const BUTTON_TYPES: Record<ButtonType, ButtonItem> = {
  primary: {
    type: 'primary',
    class: 'bg-primary border-primary border shadow rounded-lg text-white hover:bg-opacity-90',
  },
  secondary: {
    type: 'secondary',
    class: 'border-gray-300 border shadow rounded-lg hover:bg-gray-50',
  },
  danger: {
    type: 'danger',
    class: 'bg-danger border-danger border text-white shadow rounded-lg hover:bg-opacity-90',
  },
  link: {
    type: 'link',
    class: 'text-primary hover:text-opacity-70 underline text-sm p-1',
  },
  icon: {
    type: 'icon',
    class: 'text-primary hover:text-opacity-70 p-2 rounded-full hover:bg-tertiary transition-colors duration-200',
  },
};
