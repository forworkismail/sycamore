export type TextTitleType = 'title' | 'subtitle';

export interface TextTitleOptions {
  type: TextTitleType;
  class: string;
}

export const TEXT_TITLE_STYLES: Record<TextTitleType, TextTitleOptions> = {
  title: {
    type: 'title',
    class: 'text-xl font-bold text-primary',
  },
  subtitle: {
    type: 'subtitle',
    class: 'text-lg font-bold text-primary',
  },
};
