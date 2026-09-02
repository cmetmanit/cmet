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
    id: "cmet-wcr-bina-solar-mou",
    title: "CMET, MANIT Signs MOU with West Central Railway for Optimization of 1.7 MW Solar Plant at Bina",
    date: "5 August 2026",
    category: "MOU",
    featuredImage: "picture/news/news-4/WhatsApp Image 2026-09-01 at 16.08.09 (1).jpeg",
    images: [
      "picture/news/news-4/WhatsApp Image 2026-09-01 at 16.08.09 (1).jpeg",
      "picture/news/news-4/WhatsApp Image 2026-09-01 at 16.08.10.jpeg",
      "picture/news/news-4/WhatsApp Image 2026-09-01 at 16.08.09.jpeg",
      "picture/news/news-4/WhatsApp Image 2026-09-01 at 16.08.10 (1).jpeg",
      "picture/news/news-4/WhatsApp Image 2026-09-01 at 16.08.10 (2).jpeg",
      "picture/news/news-4/WhatsApp Image 2026-09-01 at 16.08.10 (3).jpeg"
    ],
    shortDescription: "The Centre for Mission on Energy Transition (CMET), MANIT Bhopal has signed an MOU with West Central Railway, BPL Division to enhance the performance of the 1.7 MW solar power plant installed at Bina.",
    fullDescription: `<p><strong>Bhopal | 5 August 2026</strong></p>
    <p>The Centre for Mission on Energy Transition (CMET), Maulana Azad National Institute of Technology (MANIT), Bhopal has signed a Memorandum of Understanding (MOU) with West Central Railway, BPL Division to enhance the performance of the 1.7 MW solar power plant installed at Bina.</p>
    <p>Under this 2-year collaboration, CMET will conduct detailed technical studies to identify reasons for lower generation. The scope includes solar radiance analysis, assessment of system losses due to dust, shading, wiring and inverter inefficiencies, panel orientation &amp; tilt optimization, and recommendations for efficient cleaning methods.</p>
    <p>WCR will provide plant access, operational data, maintenance records, and coordination support for the study.</p>
    <p>The MOU was signed by Sr. Divisional Electrical Engineer (TRD), WCR Bhopal and Dr. Anupama Sharma, Dean (ID &amp; IR), MANIT Bhopal.</p>
    <p>This partnership aims to support Indian Railways’ goal of promoting renewable energy and reducing carbon footprint in railway operations through research and technology transfer.</p>`
  },
  {
    id: "cmet-reactive-power-demo-july2026",
    title: "CMET, MANIT Conducts Technical Demonstration on Reactive Power Compensation",
    date: "30–31 July 2026",
    category: "Events",
    featuredImage: "picture/news/news-3/WhatsApp Image 2026-08-06 at 16.23.48.jpeg",
    images: [
      "picture/news/news-3/WhatsApp Image 2026-08-06 at 16.23.48.jpeg",
      "picture/news/news-3/WhatsApp Image 2026-08-06 at 16.23.48 (1).jpeg",
      "picture/news/news-3/WhatsApp Image 2026-08-06 at 16.23.47.jpeg",
      "picture/news/news-3/WhatsApp Image 2026-08-06 at 16.23.40.jpeg",
      "picture/news/news-3/WhatsApp Image 2026-08-06 at 16.23.41.jpeg",
      "picture/news/news-3/WhatsApp Image 2026-08-06 at 16.23.44.jpeg",
      "picture/news/news-3/WhatsApp Image 2026-08-06 at 16.23.45.jpeg",
      "picture/news/news-3/WhatsApp Image 2026-08-06 at 16.23.45 (1).jpeg",
      "picture/news/news-3/WhatsApp Image 2026-08-06 at 16.23.46.jpeg"
    ],
    shortDescription: "CMET, MANIT Bhopal successfully conducted a two-day technical demonstration on Reactive Power Compensation and Utilisation of Existing Solar PV Inverters for Voltage Management.",
    fullDescription: `<p><strong>Bhopal, 30–31 July 2026</strong></p>
    <p>The Centre for Microgrid and Energy Transition (CMET), MANIT Bhopal successfully conducted a two-day technical demonstration programme on <strong>"Reactive Power Compensation and Utilisation of Existing Solar PV Inverters for Voltage Management"</strong> under the visionary leadership of Dr. Priyanka Paliwal, Chairperson, CMET and Dr. Mukesh Kirar, Vice-Chairperson, CMET.</p>
    <h5>CMET's Technical Contribution</h5>
    <p>CMET led the design and execution of live demonstrations showcasing two key applications:</p>
    <ol>
      <li><strong>Q@Night – 30 July 2026:</strong> Demonstration of reactive power compensation using existing solar inverters during night hours.</li>
      <li><strong>Reactive Power Compensation – 31 July 2026:</strong> Demonstration of voltage regulation during sunshine hours.</li>
    </ol>
    <p>Through these demonstrations, CMET highlighted how existing solar PV inverters can be utilized for reactive power support to achieve effective voltage regulation at both the inverter terminals and the Point of Common Coupling (PCC). The sessions provided practical insights into grid support functions without additional hardware investment.</p>
    <h5>Key Visitors &amp; Industry Engagement</h5>
    <p>The programme saw active participation from senior officials of leading power distribution utilities:</p>
    <ul>
      <li>Shri Rishi Garg, Managing Director, MPMKVVCL along with his technical team</li>
      <li>Senior officers from TGSPDCL, Telangana and UPPCL, Uttar Pradesh</li>
      <li>Technical team from MPUVNL</li>
    </ul>
    <p>The presence of field officers brought valuable distribution-level perspectives, and CMET facilitated technical discussions on scaling these solutions in real utility networks.</p>
    <p>CMET also acknowledges the support of Shri Manu Shrivastav, ACS, NRED, Govt. of MP for his encouragement, and the coordination support from MPUVNL and the CMET team members: Dr. Narayan Prasad Gupta, Mr. Rishabh Ranjan, Mr. Goutam Yadav, Mr. Rahul Soni, Mr. Swapnil Sahu, Mrs. Gitanjali Mishra, Mrs. Noreen Khan, and Ms. Mantasha Alam.</p>
    <p>The programme reflects CMET's commitment to bridging academia and industry for practical solutions in renewable energy integration and grid stability.</p>`
  },
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
