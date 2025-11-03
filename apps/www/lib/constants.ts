interface ComponentSection {
  title: string
  items: {
    name: string
    href: string
    description: string
  }[]
}
export const COMPONENT_SECTIONS: ComponentSection[] = [
  {
    title: 'Backgrounds',
    items: [
      {
        name: 'CPPN Lava',
        href: '/components/cppn-lava',
        description: 'A CPPN Lava component',
      },
      {
        name: 'CPPN Gradient',
        href: '/components/cppn-gradient',
        description: 'A CPPN Gradient component',
      },
      {
        name: 'Glitch Bands',
        href: '/components/glitch-bands',
        description: 'A Glitch Bands component',
      },
      {
        name: 'Grainy Liquid',
        href: '/components/grainy-liquid',
        description: 'A Grainy Liquid component',
      },
      {
        name: 'Interactive Grid',
        href: '/components/interactive-grid',
        description: 'An Interactive Grid component',
      },
      {
        name: 'Beams',
        href: '/components/beams',
        description: 'A Beams component',
      },
    ],
  },
  {
    title: 'Buttons',
    items: [
      {
        name: 'Shimmer Button',
        href: '/components/shimmer-button',
        description: 'An animated button with a shimmer effect',
      },
      {
        name: 'Simple Button',
        href: '/components/simple-button',
        description: 'A clean and simple button component',
      },
      {
        name: 'Stateful Button',
        href: '/components/stateful-button',
        description: 'A button with different states',
      },
    ],
  },
  {
    title: 'Form Elements',
    items: [
      {
        name: 'Checkbox',
        href: '/components/checkbox',
        description: 'An animated checkbox component',
      },
      {
        name: 'Checkbox Label',
        href: '/components/checkbox-label',
        description: 'A checkbox with integrated label',
      },
    ],
  },
  // {
  //   title: 'Icons',
  //   items: [
  //     {
  //       name: 'Heart Icon',
  //       href: '/components/heart-icon',
  //       description: 'An animated heart icon for likes',
  //     },
  //     {
  //       name: 'Save Icon',
  //       href: '/components/save-icon',
  //       description: 'An animated save icon',
  //     },
  //   ],
  // },
  // {
  //   title: 'Text & Typography',
  //   items: [
  //     {
  //       name: 'Flip Text',
  //       href: '/components/flip-text',
  //       description: 'Animated text that flips between different words',
  //     },
  //   ],
  // },
  {
    title: 'Components',
    items: [
      {
        name: 'Like Save Card',
        href: '/components/like-save-card',
        description: 'A card component with like and save functionality',
      },
      {
        name: 'Pin List',
        href: '/components/pin-list',
        description: 'A list component for pinned items',
      },
      {
        name: 'Roadmap',
        href: '/components/roadmap',
        description: 'A roadmap visualization component',
      },
      {
        name: 'Install Tabs',
        href: '/components/install-tabs',
        description: 'A tabs component for installing packages',
      },
    ],
  },
]

export const urlRegistry = 'http://ui.rohanm.dev'
