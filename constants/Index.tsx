// NAVIGATION
export const NAV_LINKS = [
    { href: '/', key: 'home', label: 'Home' },
    { href: '/plants', key: 'Plants', label: 'Plants' },
    { href: '/nurserylocator', key: 'Nursery Locator', label: 'Nursery Locator' },
    { href: '/plantfinder', key: 'Plant Finder', label: 'Plant Finder' },
    { href: '/contact', key: 'contact_us', label: 'Contact Us' },
  ];
  
  export const FOOTER_LINKS = [
    {
      title: 'Learn More',
      links: [
        'About Plantus',
        'Privacy Policy',
        'Contact Us',
      ],
    },
  ];
  
  export const FOOTER_CONTACT_INFO = {
    title: 'Contact Us',
    links: [
      { label: 'Admin Officer', value: '123-456-7890' },
      { label: 'Email Officer', value: 'plantus@gmail.com' },
    ],
  };
  
  export const SOCIALS = {
    title: 'Social',
    links: [
      '/facebook.svg',
      '/instagram.svg',
      '/twitter.svg',
      '/youtube.svg',
    ],
  };

  export const FEATURES = [
    {
      title: 'Real maps can be offline',
      icon: '/map.svg',
      variant: 'green',
      description:
        'We provide a solution for you to be able to use our application when climbing, yes offline maps you can use at any time there is no signal at the location',
    },
    {
      title: 'Set an adventure schedule',
      icon: '/calendar.svg',
      variant: 'green',
      description:
        "Schedule an adventure with friends. On holidays, there are many interesting offers from Hilink. That way, there's no more discussion",
    },
    {
      title: 'Technology using augment reality',
      icon: '/tech.svg',
      variant: 'green',
      description:
        'Technology uses augmented reality as a guide to your hiking trail in the forest to the top of the mountain. Already supported by the latest technology without an internet connection',
    },
    {
      title: 'Many new locations every month',
      icon: '/location.svg',
      variant: 'orange',
      description:
        'Lots of new locations every month, because we have a worldwide community of climbers who share their best experiences with climbing',
    },
  ];