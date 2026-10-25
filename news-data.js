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
    id: "cmet-two-day-exposure-program-oct2026",
    title: "Two-Day Exposure & Dissemination Program on Dynamic Voltage Regulation Using Solar Inverter",
    date: "27th & 28th October 2026",
    category: "Upcoming Event",
    featuredImage: "picture/cmet-brochure-cover.jpg",
    images: [
      "picture/cmet-brochure-cover.jpg",
      "picture/cmet-dynamic-voltage-control.jpg",
      "picture/cmet-brochure-page-5.jpg",
      "picture/cmet-brochure-page-2.jpg"
    ],
    shortDescription: "CMET, MANIT Bhopal is hosting a Two-Day Exposure Visit of 14 Delegates from Odisha along with officials from MPUVNL, MPERC and NRED on Dynamic Voltage Regulation Using Solar Inverter.",
    fullDescription: `<div class="d-flex align-items-center gap-2 mb-3">
      <span class="badge bg-danger text-white px-3 py-2 rounded-pill fw-semibold" style="letter-spacing: 0.5px;">UPCOMING PROGRAM</span>
      <span class="badge bg-secondary-subtle text-secondary px-3 py-2 rounded-pill fw-semibold">27th &ndash; 28th October 2026</span>
    </div>

    <p class="lead"><strong>Centre for Mission on Energy Transition (CMET), MANIT Bhopal</strong> is hosting a <strong>Two-Day Exposure Visit of 14 Delegates from Odisha</strong> along with officials from <strong>MPUVNL, MPERC, and NRED</strong> on <em>Dynamic Voltage Regulation Using Solar Inverter</em>.</p>

    <div class="alert alert-info border-0 rounded-4 p-3 my-4 d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-3" style="background: linear-gradient(135deg, rgba(19, 122, 106, 0.12), rgba(2, 132, 199, 0.12)); border-left: 4px solid var(--teal, #137a6a) !important;">
      <div>
        <div class="fw-bold text-dark fs-6 mb-1 d-flex align-items-center gap-2">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#137a6a" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
          Official CMET Event Brochure
        </div>
        <p class="small text-muted mb-0">Download or view the comprehensive event brochure detailing technical models and itinerary.</p>
      </div>
      <a href="picture/CMET_Brochure_V4.pdf" target="_blank" rel="noopener noreferrer" class="btn btn-sm text-nowrap rounded-pill px-3 py-2 fw-semibold text-white shadow-sm" style="background: #137a6a; border: none;">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="me-1"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
        Download Brochure (PDF)
      </a>
    </div>

    <h5>Program Objective</h5>
    <p>The objective of this exposure visit is to showcase CMET's field-proven implementation models in dynamic voltage regulation and reactive power support using existing and advanced solar inverters, and to foster mutual learning, regulatory harmonization, and collaboration between state institutions and distribution utilities.</p>

    <h5 class="mt-4 mb-3">Event Itinerary</h5>

    <div class="p-3 mb-3 rounded-3" style="background: #f8fafc; border: 1px solid #e2e8f0; border-left: 4px solid #0284c7;">
      <h6 class="fw-bold mb-2" style="color: #0284c7;">Day 1 &ndash; 27th October: Demonstration &amp; Interaction</h6>
      <ul class="mb-0 ps-3 text-secondary" style="line-height: 1.8;">
        <li><strong>Welcome &amp; Introduction:</strong> Warm reception and introduction of the 14 delegates from Odisha and institutional representatives.</li>
        <li><strong>Presentation and Demonstration of Best Practices:</strong> In-depth technical briefing on dynamic reactive power capabilities, Volt-VAR control, and grid code compliance.</li>
        <li><strong>Interactive Session and Knowledge Exchange:</strong> Bilateral dialogue on grid integration hurdles, utility requirements, and scalable solar inverter solutions.</li>
        <li><strong>Meeting with MPERC:</strong> High-level deliberation on regulatory frameworks and the MPERC regulations on reactive power support.</li>
        <li><strong>Meeting with ACS &amp; Departmental Leadership:</strong> Strategic exchange with Additional Chief Secretary (ACS), New and Renewable Energy Department (NRED), and key state officials.</li>
      </ul>
    </div>

    <div class="p-3 mb-4 rounded-3" style="background: #f8fafc; border: 1px solid #e2e8f0; border-left: 4px solid #10b981;">
      <h6 class="fw-bold mb-2" style="color: #10b981;">Day 2 &ndash; 28th October: Field Exposure Visit</h6>
      <ul class="mb-0 ps-3 text-secondary" style="line-height: 1.8;">
        <li><strong>On-Site Field Visit &amp; Live Demonstration:</strong> Hands-on technical inspection of live inverter installations, terminal voltage regulation, and feeder-level reactive power compensation.</li>
        <li><strong>Closing Session &amp; Experience Sharing:</strong> Synthesis of key takeaways, cross-state collaboration roadmaps, and concluding remarks.</li>
      </ul>
    </div>

    <div class="p-3 rounded-3 bg-light border text-center">
      <span class="text-muted d-block small mb-2">Interested delegates and participants can access the full brochure below:</span>
      <a href="picture/CMET_Brochure_V4.pdf" target="_blank" rel="noopener noreferrer" class="btn btn-outline-dark btn-sm rounded-pill px-4 py-2 fw-semibold">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="me-1"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
        Open CMET_Brochure_V4.pdf
      </a>
    </div>`
  },
  
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
