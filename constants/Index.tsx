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
      title: 'Plant Identification',
      icon: '/map.svg',
      variant: 'green',
      description:
        'Identified plant name, scientific name and other relevant details related to healthy growth and care for the plant',
    },
    {
      title: 'Leaves or flower images',
      icon: '/calendar.svg',
      variant: 'green',
      description:
        "Detailed information about the plant, including its botanical classification, optimal growing circumstances, need for sunlight and watering, and typical uses",
    },
    {
      title: 'Plant Information Access',
      icon: '/tech.svg',
      variant: 'green',
      description:
        'Technology uses augmented reality as a guide to your hiking trail in the forest to the top of the mountain. Already supported by the latest technology without an internet connection',
    },
    {
      title: 'Plant Nursery Locator',
      icon: '/location.svg',
      variant: 'orange',
      description:
        'Users should be able to find informations about nearby plant nurseries based on their location',
    },
  ];

  export interface Plant {
    id: string;
    name: string;
    imageurl: string;
    description: string;
    botanicalname: string;
    family: string;
    planttype: string;
    maturesize: string;
    temperature: string;
    sunexposure: string;
    water: string;
    soiltype: string;
    fertilizer: string;
    soilph: string;
    bloomtime: string;
    flowercolor: string;
  }
  
  export interface Nursery {
    id: string;
    name: string;
    imageurl: string;
    place: string;
    address: string;
    location: {
      latitude: number;
      longitude: number;
    };
  }