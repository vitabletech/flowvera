export type ServicePageContent = {
  heroImage: string;
  engineeringImage: string;
  engineeringAlt: string;
  engineeringTitle: string;
  engineeringCopy: string;
  qualityLabel: string;
  qualityCopy: string;
  overviewImage: string;
  overviewAlt: string;
  overviewTitle: string;
  overviewLead: string;
  overviewCopy: string[];
  systemsTitle: string;
  systemsCopy: string;
  systems: { title: string; image: string }[];
  processTitle: string;
  processCopy: string;
  steps: { title: string; copy: string }[];
};

const detailAsset = (name: string) => `/assets/optimized/service-details/${name}.webp`;
const projectAsset = (name: string) => `/assets/optimized/project-${name}.webp`;

export const servicePages: Record<string, ServicePageContent> = {
  "water-treatment-systems": {
    heroImage: detailAsset("hero"),
    engineeringImage: detailAsset("engineers"),
    engineeringAlt: "Two engineers reviewing water treatment equipment and water samples",
    engineeringTitle: "Engineered Around Your Water Requirements",
    engineeringCopy: "Every water source and application comes with different treatment requirements. FlowVera develops practical water treatment solutions based on water quality, capacity, operating conditions and the needs of each facility.",
    qualityLabel: "QUALITY GUARANTEE",
    qualityCopy: "Every system is wet-tested and validated under real ionic loads prior to site handover.",
    overviewImage: detailAsset("water-quality"),
    overviewAlt: "Untreated and clear treated water samples in front of a reverse osmosis system",
    overviewTitle: "Understanding Water Treatment Plants & Systems",
    overviewLead: "Turning raw water into water suitable for your needs.",
    overviewCopy: [
      "Water treatment plants are engineered systems designed to remove unwanted impurities, suspended particles, dissolved minerals and other contaminants from water.",
      "By combining technologies such as filtration, reverse osmosis, water softening and demineralisation, these systems improve water quality to meet specific industrial and commercial requirements."
    ],
    systemsTitle: "Complete Water Treatment Systems",
    systemsCopy: "Explore the treatment systems we design and supply for industrial and commercial applications.",
    systems: [
      { title: "RO Standard Plants", image: detailAsset("ro-plant") },
      { title: "Booster Systems", image: detailAsset("booster") },
      { title: "Water Softener Plants", image: detailAsset("softener") },
      { title: "Demineralisation (DM) Plants", image: detailAsset("dm-plant") },
      { title: "CIP Systems", image: detailAsset("cip") }
    ],
    processTitle: "From Water Analysis to System Performance",
    processCopy: "Each project follows a practical engineering process to identify the right treatment solution and deliver a system suited to its application.",
    steps: [
      { title: "Understand the Requirements", copy: "Assess raw water source, comprehensive chemical quality (TDS, hardness, silica), target daily capacity, and intended end-use standards." },
      { title: "Design the Solution", copy: "Select appropriate treatment technologies, membrane types, hydraulics, pressure stages, and telemetry automation configurations." },
      { title: "Supply & Commission", copy: "Coordinate high-spec equipment fabrication, on-site skid installation, civil piping tie-ins, wet pressure testing, and validation." },
      { title: "Technical Support", copy: "Provide ongoing Kingdom-wide technical assistance, spare filter consumables, antiscalant chemicals, and planned field maintenance." }
    ]
  },
  "ro-maintenance": {
    heroImage: "/assets/optimized/service-2.webp",
    engineeringImage: detailAsset("engineers"),
    engineeringAlt: "Water treatment engineers reviewing an RO installation",
    engineeringTitle: "Technical Care That Keeps Your RO Working",
    engineeringCopy: "Consistent water quality starts with a well-maintained system. FlowVera helps you assess operating performance, plan servicing and select suitable replacement components around your equipment and production needs.",
    qualityLabel: "PERFORMANCE FIRST",
    qualityCopy: "Maintenance recommendations start with your system readings, water quality and service history.",
    overviewImage: projectAsset("ro-plant"),
    overviewAlt: "Industrial reverse osmosis plant with membrane housings and pipework",
    overviewTitle: "Understanding RO Maintenance & Technical Services",
    overviewLead: "Protecting your membranes. Supporting your production.",
    overviewCopy: [
      "Changes in flow, pressure or treated-water conductivity can indicate fouling, scaling, worn components or changing feed-water conditions. Reviewing these trends helps identify the right maintenance action.",
      "From routine inspections and pre-filter replacement to membrane cleaning and troubleshooting, a planned approach helps reduce avoidable downtime and supports dependable operation."
    ],
    systemsTitle: "Support Across Your RO System",
    systemsCopy: "Practical servicing and technical assistance for the equipment you rely on every day.",
    systems: [
      { title: "Routine RO Servicing", image: detailAsset("ro-plant") },
      { title: "Membrane Replacement", image: "/assets/optimized/service-3.webp" },
      { title: "Cleaning & CIP Support", image: detailAsset("cip") },
      { title: "Pump & Pressure Checks", image: detailAsset("booster") },
      { title: "Water Quality Review", image: detailAsset("water-quality") }
    ],
    processTitle: "From System Readings to Reliable Operation",
    processCopy: "A structured service approach helps identify the issue, agree the scope and verify your system after maintenance.",
    steps: [
      { title: "Review the System", copy: "Collect equipment details, service history, feed-water analysis and recent flow, pressure and conductivity readings." },
      { title: "Identify the Cause", copy: "Review operating trends, pre-treatment condition and membrane performance before recommending the service scope." },
      { title: "Service & Verify", copy: "Carry out agreed maintenance or component replacement and compare post-service readings against the system requirements." },
      { title: "Plan Ongoing Care", copy: "Discuss inspection intervals, consumables and monitoring practices appropriate to your water source and operating hours." }
    ]
  },
  "membranes-filtration": {
    heroImage: "/assets/optimized/service-3.webp",
    engineeringImage: detailAsset("engineers"),
    engineeringAlt: "Engineers assessing filtration equipment at a water treatment facility",
    engineeringTitle: "The Right Separation for Your Water",
    engineeringCopy: "Membranes, filter media and ion exchange resins perform different roles in water treatment. FlowVera helps you review water chemistry, equipment compatibility and required output to choose a practical combination.",
    qualityLabel: "APPLICATION MATCHED",
    qualityCopy: "Element dimensions, water chemistry and operating limits guide every product selection.",
    overviewImage: detailAsset("dm-plant"),
    overviewAlt: "Cation and anion exchange vessels in an industrial demineralisation plant",
    overviewTitle: "Understanding Membranes, Filtration & Ion Exchange",
    overviewLead: "Targeted treatment for particles, salts and dissolved ions.",
    overviewCopy: [
      "Filtration removes suspended material, reverse osmosis reduces dissolved salts, and ion exchange addresses selected dissolved ions. The right process depends on your feed water and the quality needed downstream.",
      "Correct sizing and pre-treatment help protect the equipment. Replacement products should be checked for dimensions, material compatibility, flow requirements and operating conditions."
    ],
    systemsTitle: "Products for Every Filtration Stage",
    systemsCopy: "Explore separation technologies for new treatment systems and replacement requirements.",
    systems: [
      { title: "RO Membrane Elements", image: "/assets/optimized/service-3.webp" },
      { title: "Multimedia Filtration", image: projectAsset("multimedia-filter") },
      { title: "Activated Carbon Filters", image: projectAsset("activated-carbon-filter") },
      { title: "Water Softening Resins", image: detailAsset("softener") },
      { title: "Demineralisation Resins", image: detailAsset("dm-plant") }
    ],
    processTitle: "From Water Chemistry to the Right Media",
    processCopy: "We start with your application and existing equipment to narrow down suitable filtration and ion exchange options.",
    steps: [
      { title: "Assess Water Quality", copy: "Review feed-water analysis, contaminants of concern and the treated-water quality your process requires." },
      { title: "Check Compatibility", copy: "Confirm element dimensions, vessel configuration, operating pressure, temperature and existing pre-treatment." },
      { title: "Select & Supply", copy: "Agree appropriate membranes, media or resins, quantities and product specifications before supply." },
      { title: "Support Replacement", copy: "Discuss installation requirements, start-up checks and monitoring to help you manage the replacement cycle." }
    ]
  },
  "pumps-dosing-automation": {
    heroImage: "/assets/optimized/service-4.webp",
    engineeringImage: detailAsset("booster"),
    engineeringAlt: "Industrial booster pump skid with stainless steel manifolds",
    engineeringTitle: "Control Flow. Dose Precisely. Operate Confidently.",
    engineeringCopy: "Pumping, dosing and controls need to work together. FlowVera helps you select equipment around the required flow, pressure, chemical compatibility and integration needs of your water treatment process.",
    qualityLabel: "PROCESS COMPATIBILITY",
    qualityCopy: "Selection considers the handled liquid, duty point, materials and control requirements.",
    overviewImage: projectAsset("water-pumps"),
    overviewAlt: "Water pumping equipment for an industrial treatment application",
    overviewTitle: "Understanding Pumps, Dosing & Automation",
    overviewLead: "Bringing reliable movement and control to your process.",
    overviewCopy: [
      "Pumps move water through treatment and distribution systems, while dosing equipment introduces the chemicals needed for the process. Instruments and controls help operators track conditions and manage equipment.",
      "Correct equipment selection considers the duty point, liquid characteristics, power supply and control strategy. Integration should be reviewed against the existing plant and operating requirements."
    ],
    systemsTitle: "Equipment That Works Together",
    systemsCopy: "Pumping, chemical dosing and control options for industrial and commercial water systems.",
    systems: [
      { title: "Transfer & Feed Pumps", image: projectAsset("water-pumps") },
      { title: "Booster Pump Systems", image: detailAsset("booster") },
      { title: "Chemical Dosing Systems", image: "/assets/optimized/service-4.webp" },
      { title: "Process Instruments", image: projectAsset("spares-instruments") },
      { title: "Plant Control Integration", image: detailAsset("ro-plant") }
    ],
    processTitle: "From Duty Point to Integrated Control",
    processCopy: "A practical equipment review connects your process needs with pumping, dosing and automation requirements.",
    steps: [
      { title: "Define the Duty", copy: "Confirm required flow, operating pressure, handled liquid, dosing needs and available power supply." },
      { title: "Select the Equipment", copy: "Review pump characteristics, wetted materials, instruments and control functions for the application." },
      { title: "Integrate & Check", copy: "Coordinate agreed connections and controls, then check operation against the specified process conditions." },
      { title: "Support Operation", copy: "Discuss operating checks, spare parts, calibration needs and maintenance for the selected equipment." }
    ]
  },
  "industrial-tanks": {
    heroImage: "/assets/optimized/service-5.webp",
    engineeringImage: projectAsset("water-tanks"),
    engineeringAlt: "Industrial water storage tanks with connected process pipework",
    engineeringTitle: "Storage Designed Around Your Site",
    engineeringCopy: "The right tank is more than a capacity figure. FlowVera helps you review the stored liquid, installation space, connection layout and service conditions to select suitable storage and filtration vessels.",
    qualityLabel: "FIT FOR PURPOSE",
    qualityCopy: "Capacity, material compatibility and installation conditions guide your tank specification.",
    overviewImage: detailAsset("softener"),
    overviewAlt: "Industrial filtration vessels with service pipework and a brine tank",
    overviewTitle: "Understanding Industrial Tanks & Storage Solutions",
    overviewLead: "Practical storage and process vessels for your facility.",
    overviewCopy: [
      "Storage tanks provide a buffer between water supply, treatment and demand. Filtration vessels contain the media used for processes such as softening, carbon filtration and demineralisation.",
      "Tank selection depends on contents, usable capacity, temperature, pressure and installation conditions. Access, supports and inlet, outlet, vent and drain connections also need to be considered."
    ],
    systemsTitle: "Storage & Vessel Solutions",
    systemsCopy: "Explore tank and vessel applications for water treatment, process storage and filtration.",
    systems: [
      { title: "Water Storage Tanks", image: projectAsset("water-tanks") },
      { title: "Filtration Vessels", image: projectAsset("multimedia-filter") },
      { title: "Softener & Brine Tanks", image: detailAsset("softener") },
      { title: "Ion Exchange Vessels", image: detailAsset("dm-plant") },
      { title: "Process & CIP Tanks", image: detailAsset("cip") }
    ],
    processTitle: "From Storage Requirements to Site Readiness",
    processCopy: "We review capacity, compatibility and site constraints before agreeing the right tank or vessel for your application.",
    steps: [
      { title: "Understand the Use", copy: "Confirm the intended contents, required usable capacity and any process or filtration requirements." },
      { title: "Review the Site", copy: "Check installation space, access, supports, service conditions and required pipe connections." },
      { title: "Specify & Supply", copy: "Agree material, dimensions, fittings and operating limits, then coordinate supply for your installation." },
      { title: "Support the Lifecycle", copy: "Discuss inspection access, cleaning needs and replacement fittings to support long-term operation." }
    ]
  }
};
