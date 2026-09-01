import { Statement } from './statement.entity';

/**
 * The statement, in the order he wants it read: who is writing, what painting
 * gives him that a screen cannot, where the images come from, and why failure
 * is the part worth keeping.
 *
 * Paragraphs rather than the labelled "constants and variables" this replaced.
 * That scheme split one account — images found on the internet, then generated,
 * then broken on purpose — across two headings that were really the same story.
 */
export const STATEMENT_OBJECT: Statement = {
  introduction: {
    image: {
      src: 'assets/images/abstract_landscape.jpg',
      alt: 'Juanma Moreno Sánchez detail of a landscape painting',
    },
    content: 'statement.introduction.content',
  },
  sections: [
    {
      title: 'statement.painting.title',
      content: [
        'statement.painting.limits',
        'statement.painting.recontextualising',
        'statement.painting.rule',
      ],
    },
    {
      title: 'statement.images.title',
      content: ['statement.images.found', 'statement.images.accident'],
    },
    {
      title: 'statement.failure.title',
      content: ['statement.failure.content'],
    },
  ],
};
