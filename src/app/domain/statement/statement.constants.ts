import { Statement } from "./statement.entity";

export const STATEMENT_OBJECT: Statement = {
  introduction: {
    image: {
      src: 'assets/images/abstract_landscape.jpg',
      alt: 'Juanma Moreno Sánchez detail of a landscape painting'
    },
    content: 'statement.introduction.content'
  },
  sections: [
    {
      title: 'statement.painting.title',
      content: [
        'statement.painting.distance',
        'statement.painting.outOfNoise',
        'statement.painting.anacronism'
      ]
    },
    {
      title: 'statement.art.title',
      content: [
        'statement.art.arts'
      ]
    },
    {
      title: 'statement.constants.title',
      items: [
        {
          subtitle: 'statement.constants.items.first.title',
          content: 'statement.constants.items.first.content'
        },
        {
          subtitle: 'statement.constants.items.second.title',
          content: 'statement.constants.items.second.content'
        },
        {
          subtitle: 'statement.constants.items.third.title',
          content: 'statement.constants.items.third.content'
        },
        {
          subtitle: 'statement.constants.items.fourth.title',
          content: 'statement.constants.items.fourth.content'
        }
      ]
    },
    {
      title: 'statement.variables.title',
      items: [
        {
          subtitle: 'statement.variables.items.first.title',
          content: 'statement.variables.items.first.content'
        },
        {
          subtitle: 'statement.variables.items.second.title',
          content: 'statement.variables.items.second.content'
        }
      ]
    }
  ]
};
