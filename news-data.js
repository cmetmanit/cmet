/**
 * CMET News & Events Data Source
 * 
 * To add a new event/news item in the future, simply add a new object to this array.
 * No HTML modification is required!
 * 
 * Fields per news item:
 * - id: (string) Unique identifier
 * - title: (string) Event title
 * - date: (string) Formatted event date (e.g., "August 04, 2026")
 * - category: (string) Optional tag: "Workshops", "Research", "Pilots", "Announcements"
 * - featuredImage: (string) Path to primary thumbnail image
 * - images: (array) Array of image paths (supports multiple images)
 * - shortDescription: (string, optional) Brief summary displayed on cards
 * - fullDescription: (string, optional) Detailed write-up displayed in modal view
 */

const CMET_NEWS_DATA = [
  {
    id: "cmet-wattpower-seminar",
    title: "CMET Participation in Technical Seminar on Dynamic Reactive Power Compensation for Grid Support",
    date: "2026",
    category: "Seminars",
    featuredImage: "picture/news/news-2/1 (2).jpeg",
    images: [
      "picture/news/news-2/1 (2).jpeg",
      "picture/news/news-2/2 (2).jpeg",
      "picture/news/news-2/3 (2).jpeg",
      "picture/news/news-2/4 (2).jpeg",
      "picture/news/news-2/6 (2).jpeg",
      "picture/news/news-2/7.jpeg",
      "picture/news/news-2/8.jpeg"
    ],
    shortDescription: "CMET participated in the technical seminar on Dynamic Reactive Power Compensation for Grid Support organized by WattPower at Bhopal.",
    fullDescription: `<p>CMET participated in the technical seminar on <strong>"Dynamic Reactive Power Compensation for Grid Support"</strong> organized by WattPower at Bhopal.</p>
    <p>The seminar brought together renewable energy developers, technology providers and industry experts to discuss emerging approaches for strengthening grid stability through advanced inverter functionalities and reactive power support. Technical sessions covered topics including inverter selection, dynamic reactive power compensation, Volt–VAR and Q(U) control strategies, and evolving grid code requirements.</p>
    <p>During the interactions, CMET shared insights from its recent work on decentralized reactive power management and informed participating developers about the recently notified <strong>MPERC regulations on reactive power support</strong>, which establish the regulatory framework for dynamic voltage regulation in Madhya Pradesh. The discussions focused on the practical implementation of these provisions and their implications for future renewable energy projects.</p>
    <p>CMET's participation provided an opportunity to engage with stakeholders from across the renewable energy sector, exchange technical perspectives, and support the wider adoption of grid-support capabilities for reliable and resilient power systems.</p>`
  },
  {
    id: "cmet-event-1",
    title: "CMET Event at MANIT Bhopal",
    date: "2026",
    category: "Events",
    featuredImage: "picture/news/cmet-1.jpeg",
    images: [
      "picture/news/cmet-1.jpeg",
      "picture/news/cmet-2.jpeg"
    ],
    shortDescription: "",
    fullDescription: ""
  }
];
