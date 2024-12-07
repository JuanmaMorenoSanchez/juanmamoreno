import { Statement } from '@models/statement.models';

export const STATEMENT_OBJECT: Statement = {
  introduction: {
    image: {
      src: 'assets/images/abstract_landscape.jpg',
      alt: 'Juanma Moreno Sánchez detail of a landscape painting'
    },
    content: `My artistic journey is a dynamic exploration that weaves together traditional and contemporary elements, navigating the intersection of the digital and analog, rural and urban landscapes. My work embraces technology as both a subject and a creative tool, maintaining a constant dialogue with the past while embracing the challenges and opportunities of the digital age.`
  },
  sections: [
    {
      title: 'Painting',
      content: [
        `In painting is where, throughout my entire life, I have found a place to retreat and distance myself from the day-to-day.`,
        `This distance involves spending time outside the automatism of routine and the dynamics in which we spend most of our time, a necessary condition to be able to conceive new narratives, places, and forms.`,
        `Painting is an ancient craft that allows as much work on a surface as the artist wishes to dedicate, with the only limits being space and time. <strong>Painting is a precious anachronism.</strong> Simultaneously, painting is always relevant because it is an infinite field of knowledge. Each artist, over the years, discovers small findings on their journey, which together are inevitably unique. That's why the work of an artist who has worked for years is almost always special and valuable.`
      ]
    },
    {
      title: 'Art',
      content: [
        `My refuge in painting, sculpture, generative art, or digital art has yielded different fruits over time. There are peculiarities in my art that are constant and cut across production, and there are others that are variable, coming and going over time:`
      ]
    },
    {
      title: 'Constants',
      items: [
        {
          subtitle: 'Internet',
          content: `Representing technology artistically in painting and making technology by hand are ways of trying to reconcile our two halves; our physical self and our avatar. For a reason, my generation, <a href="https://www.plataformadeartecontemporaneo.com/pac/juanma-moreno-lo-peor-y-lo-mejor-de-la-selfie-generation/" target="_blank" rel="noopener noreferrer"><em>the millennial</em></a>, is the only one that has had to live and work on the Internet, having been educated with pen and paper. Moreover, most images I use in my creative process originate from the Internet. Specifically, through chance encounters with random images. These images are abducted by me, and I take ownership of them. Even before the emergence of AIs, the internet is virtually infinite, considering the tiny information processing capacity we humans have individually.`
        },
        {
          subtitle: 'Disturbing Element',
          content: `In a hypothetical painting, a character looks at or interacts with something. But we don't know who they are, what they are doing, or why they are doing it. Even if it's something indeterminate, the action introduces narrative and invites spending time contemplating the image. The idea is for the image to propose an open premise, something beyond the pose, and for the viewer to complete it.`
        },
        {
          subtitle: 'Tradition',
          content: `Cultural heritage is the DNA of any cultural identity. Great authors and the great themes of art history have had, have, and will have a tremendously gravitational effect. Velázquez, Goya, Menzel, Rego, Hopper, Rauch, etc., have created great masterpieces in which the great themes of the history of art have been developed yesterday and today. Themes that are inherently human and are transversal and universal: love, death, fear,..`
        },
        {
          subtitle: 'Failure as one of the Fine Arts',
          content: `"I have done many things because I have failed at all of them. I start from failure as one of the Fine Arts." This quote from the multifaceted Pepín Tre perfectly illustrates the reason for multidisciplinarity. Genius, divine enlightenment, or inspiration are nothing but mythological clichés. Reality, as always, is much more prosaic: it is failure (real or perceived) that moves an artist to investigate, try new techniques, new ways of reaching the public, etc. On the contrary, I am convinced that success (real or perceived) has a paralyzing capacity and ends up producing artists bored with their own art and themselves.`
        }
      ]
    },
    {
      title: 'Variables',
      items: [
        {
          subtitle: 'Artificial Intelligence',
          content: `<a href="https://www.abc.es/cultura/cultural/javier-villuendas-trienio-aberrante-arte-pocos-vieron-venir-20230915102255-nt.html" target="_blank" rel="noopener noreferrer"><em>In 2019, a minimal advance guard of creators, like Juanma Moreno, already experimented with the old Artificial Intelligence of that time</em></a>, as Javier Villuendas says in his column in ABC Cultural. In 2019, few of us intuited the creative potential of the AI of the time. Old neural networks like StyleGan or Bigbigan stimulated our imagination by creating very interesting monsters. Nowadays, AI-generated art is commonplace and has reached new levels of formal sufficiency. But at that time, the margin of error (loss) was much wider, and accidents produced unheard-of and highly interesting monsters. From 2019 to 2023, the primary source of inspiration for my work shifted from images found on the internet to images that Artificial Intelligences are capable of generating.`
        },
        {
          subtitle: 'Software',
          content: `Software doesn't have to be an ultra-rational and efficient solution to an engineering problem. Software can also satisfy an artist's curiosity, be flexible, organic, random, disorganized, and unpredictable. Once again, we must value error. It is in the brushstroke that goes slightly beyond the contour, the accident that causes software to distort an image until it aberrates, where the value and originality lie.`
        }
      ]
    }
  ]
};