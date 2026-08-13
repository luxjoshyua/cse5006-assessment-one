import type { Feed } from "./types"

const GFG = "https://media.geeksforgeeks.org/wp-content/uploads"

const SAMPLE_FEED: Feed = {
  id: "cse5006-blogs",
  title: "CSE5006 Blogs",
  description: "Syndicated posts published by the CSE5006 RSS Server.",
  siteUrl: "https://lms.latrobe.edu.au",
  items: [
    {
      slug: "getting-started-with-react-components",
      title: "Getting Started with React Components",
      link: "https://lms.latrobe.edu.au/blog/getting-started-with-react-components",
      summary:
        "Components are the building blocks of any React application. This post covers how to define one, pass data with props, and compose them together.",
      content:
        "A React component is a function that returns markup. Components accept input through props and return the elements that describe what should appear on screen. Breaking an interface into small, focused components makes each piece easier to reason about and reuse, and it means a change to one part of the page does not require touching the rest of it.",
      publishedAt: "2026-07-02T09:00:00.000Z",
      author: "Priya Anand",
      categories: ["React"],
      enclosure: {
        url: `${GFG}/20211213172224/1.png`,
        type: "image/png",
      },
    },
    {
      slug: "understanding-state-and-props",
      title: "Understanding State and Props",
      link: "https://lms.latrobe.edu.au/blog/understanding-state-and-props",
      summary:
        "Props pass data down, state holds data that changes. Knowing which to reach for is most of the battle when structuring a React app.",
      content:
        "Props are read-only values passed from a parent component to a child. State is data a component owns and can change over time, usually in response to user interaction. A common mistake is storing something in state that could be derived from props, which leads to two sources of truth that can drift apart.",
      publishedAt: "2026-07-05T10:30:00.000Z",
      author: "Daniel Osei",
      categories: ["React", "Fundamentals"],
      enclosure: {
        url: `${GFG}/20211213172225/2.png`,
        type: "image/png",
      },
    },
    {
      slug: "dynamic-routing-in-next-js",
      title: "Dynamic Routing in Next.js",
      link: "https://lms.latrobe.edu.au/blog/dynamic-routing-in-next-js",
      summary:
        "Dynamic segments let one file serve many pages. This post walks through building a detail page driven by a URL parameter.",
      content:
        "In the App Router, a folder named with square brackets creates a dynamic segment. The value in the URL is passed to the page as a parameter, which the page uses to look up the matching record. One file therefore serves every item in a collection, and adding new content requires no new routes.",
      publishedAt: "2026-07-09T14:15:00.000Z",
      author: "Priya Anand",
      categories: ["Next.js", "Routing"],
      enclosure: {
        url: `${GFG}/20211213172226/3.png`,
        type: "image/png",
      },
    },
    {
      slug: "styling-with-css-custom-properties",
      title: "Styling with CSS Custom Properties",
      link: "https://lms.latrobe.edu.au/blog/styling-with-css-custom-properties",
      summary:
        "Custom properties make theming straightforward: define a value once, reference it everywhere, and swap the whole palette by changing one attribute.",
      content:
        "A CSS custom property is a variable declared on a selector and inherited by its descendants. Declaring a set of colour variables on the document root, then redeclaring them under a theme attribute, allows an entire interface to switch appearance without touching individual components.",
      publishedAt: "2026-07-12T08:45:00.000Z",
      author: "Marco Rossi",
      categories: ["CSS", "Theming"],
      enclosure: {
        url: `${GFG}/20211213172227/4.png`,
        type: "image/png",
      },
    },
    {
      slug: "an-introduction-to-rss",
      title: "An Introduction to RSS",
      link: "https://lms.latrobe.edu.au/blog/an-introduction-to-rss",
      summary:
        "RSS is a simple XML format for publishing updates. Understanding its structure explains why feed readers all look broadly similar.",
      content:
        "An RSS document describes a channel containing a series of items. Each item carries a title, a link, a description, a publication date, and optionally an author, categories, and an enclosure for attached media. Because the format is fixed, any reader can display any feed, which is what makes syndication work across unrelated publishers.",
      publishedAt: "2026-07-15T11:00:00.000Z",
      author: "Daniel Osei",
      categories: ["RSS", "Web"],
      enclosure: {
        url: `${GFG}/20211213172229/5.png`,
        type: "image/png",
      },
    },
  ],
}

export const SAMPLE_FEEDS: Feed[] = [SAMPLE_FEED]
