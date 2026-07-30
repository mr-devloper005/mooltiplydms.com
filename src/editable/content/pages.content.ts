import { slot4BrandConfig } from '@/editable/theme/brand.config'

export const pagesContent = {
  home: {
    metadata: {
      title: 'Digital growth and business intelligence platform',
      description: 'Discover profiles, visual showcases, articles, and professional resources through a modern business-first experience.',
      openGraphTitle: 'Digital growth and business intelligence platform',
      openGraphDescription: 'Explore business profiles, visual content, and professional resources through a streamlined discovery experience.',
      keywords: ['business platform', 'digital growth', 'professional directory', 'business intelligence'],
    },
    hero: {
      badge: 'Empowering business owners',
      title: ['The future of', 'digital growth.'],
      description: 'We specialize in connecting business owners with the tools and visibility they need to transform operations and accelerate decision-making.',
      primaryCta: { label: 'Get Started', href: '/contact' },
      secondaryCta: { label: 'Discover More', href: '/image-sharing' },
      searchPlaceholder: 'Search profiles, services, topics…',
      focusLabel: 'Focus',
      featureCardBadge: 'latest profiles',
      featureCardTitle: 'Latest profiles shape the visual identity of the homepage.',
      featureCardDescription: 'Recent images and profiles stay at the center of the experience.',
    },
    intro: {
      badge: 'About the platform',
      title: 'Built for discovery, visibility, and connected business growth.',
      paragraphs: [
        'This platform brings together business profiles, visual showcases, and professional resources so visitors can discover and connect naturally.',
        'Instead of separating profiles, images, and supporting content into disconnected surfaces, the platform keeps them connected with consistent navigation.',
        'Whether someone starts with a profile, a visual post, or a resource page, they can keep discovering related content without friction.',
      ],
      sideBadge: 'At a glance',
      sidePoints: [
        'Profile-first homepage with stronger emphasis on identity and imagery.',
        'Connected sections for profiles, visuals, articles, and resources.',
        'Cleaner browsing rhythm designed to make discovery feel easier.',
        'Modern interactions that keep the experience fast and polished.',
      ],
      primaryLink: { label: 'Browse gallery', href: '/image-sharing' },
      secondaryLink: { label: 'See gallery', href: '/image-sharing' },
    },
    cta: {
      badge: 'Start growing',
      title: 'Ready to elevate your digital presence?',
      description: 'Join the platform and reach a wider audience through profiles, visual showcases, and professional content.',
      primaryCta: { label: 'Get Started', href: '/contact' },
      secondaryCta: { label: 'Contact Us', href: '/contact' },
    },
    taskSection: {
      heading: 'Latest {label}',
      descriptionSuffix: 'Browse the newest posts in this section.',
    },
  },
  about: {
    badge: 'Our Mission',
    title: 'Accelerating digital growth for business owners.',
    description: `${slot4BrandConfig.siteName} is built to make business discovery, visual showcasing, and professional networking feel like one unified experience.`,
    paragraphs: [
      'We connect business owners with the visibility and tools they need to grow their digital presence and reach new audiences.',
      'Whether someone discovers a business profile, explores a visual portfolio, or reads an industry insight, they can continue exploring without losing context.',
    ],
    values: [
      {
        title: 'Intelligent Discovery',
        description: 'We prioritize clarity, relevance, and structure so business owners can be found by the right audience.',
      },
      {
        title: 'Connected Presence',
        description: 'Profiles, visual showcases, articles, and resources stay connected for a seamless discovery experience.',
      },
      {
        title: 'Built for Growth',
        description: 'Modern tools and clean design help businesses stand out and build trust with potential clients.',
      },
    ],
  },
  contact: {
    eyebrow: `Contact ${slot4BrandConfig.siteName}`,
    title: 'Let us help you grow your business presence.',
    description: 'Tell us about your goals and we will connect you with the right solutions to accelerate your digital growth.',
    formTitle: 'Send a message',
  },

  search: {
    metadata: {
      title: 'Search',
      description: 'Search profiles, topics, categories, and content across the platform.',
    },
    hero: {
      badge: 'Search the platform',
      title: 'Find profiles, services, and resources faster.',
      description: 'Use keywords, categories, and content types to discover posts from every active section.',
      placeholder: 'Search by keyword, topic, category, or name',
    },
    resultsTitle: 'Latest searchable content',
  },
  create: {
    metadata: {
      title: 'Create',
      description: 'Create and submit new content for the platform.',
    },
    locked: {
      badge: 'Member access',
      title: 'Login to create new content.',
      description: 'Use your account to access the publishing workspace and create profiles, posts, and resources.',
    },
    hero: {
      badge: 'Publishing workspace',
      title: 'Create content for every active section.',
      description: 'Choose the content type, add details, and prepare clean content with images, links, and descriptions.',
    },
    formTitle: 'Content details',
    submitLabel: 'Submit content',
    successTitle: 'Content submitted successfully.',
  },
  auth: {
    login: {
      metadataDescription: 'Login to the platform.',
      badge: 'Welcome back',
      title: 'Sign in to your account.',
      description: 'Login to continue managing your profiles, submissions, and content.',
      formTitle: 'Login',
      submitLabel: 'Continue',
      noAccount: 'No account matched these details. Create an account first.',
      success: 'Login successful. Redirecting...',
      createCta: 'Create an account',
    },
    signup: {
      metadataDescription: 'Create an account on the platform.',
      badge: 'Get started',
      title: 'Create your account.',
      description: 'Sign up to access the platform, manage your presence, and submit content.',
      formTitle: 'Create account',
      submitLabel: 'Create account',
      passwordShort: 'Use at least 4 characters for the password.',
      success: 'Account created successfully. Redirecting...',
      loginCta: 'Login',
    },
  },
  detailPages: {
    article: {
      relatedTitle: 'Related articles',
      fallbackTitle: 'Article details',
    },
    listing: {
      relatedTitle: 'Related listings',
      fallbackTitle: 'Listing details',
    },
    image: {
      relatedTitle: 'Related visuals',
      fallbackTitle: 'Image details',
    },
    profile: {
      relatedTitle: 'Suggested profiles',
      fallbackDescription: 'Profile details will appear here once available.',
      visitButton: 'Visit Official Site',
    },
  },
} as const
