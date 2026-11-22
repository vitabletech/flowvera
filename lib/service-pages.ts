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

export const specialtyChemicalsContent: ServicePageContent = {
  heroImage: "/assets/optimized/chemicals.webp",
  engineeringImage: projectAsset("specialty-chemicals"),
  engineeringAlt: "FlowVera industrial water treatment specialty chemicals drums and IBC containers",
  engineeringTitle: "Specialized Chemistry Formulated for Middle Eastern Waters",
  engineeringCopy: "High ambient temperatures, elevated salinity, and extreme silica concentrations present unique scaling and biological fouling challenges. FlowVera provides certified antiscalants, biocides, corrosion inhibitors, and specialty cleaning solutions engineered specifically to protect membranes, prevent downtime, and maximize plant recovery.",
  qualityLabel: "SASO & NSF CERTIFIED",
  qualityCopy: "High-purity chemical formulations verified for industrial water, potable systems, and heavy cooling loops.",
  overviewImage: detailAsset("water-quality"),
  overviewAlt: "Laboratory analysis of water samples for chemical dosing optimization",
  overviewTitle: "Understanding Specialty Water Treatment Formulations",
  overviewLead: "Prevent scale. Control microbiological fouling. Extend asset lifespan.",
  overviewCopy: [
    "Untreated feedwater can rapidly foul reverse osmosis membranes, encrust boiler heat transfer tubes, and create thick biological films in cooling water loops.",
    "Our specialty chemical programs combine proprietary antiscalants, broad-spectrum non-oxidizing biocides, and targeted CIP cleaning compounds with computer projection modeling to ensure peak thermodynamic and membrane separation performance."
  ],
  systemsTitle: "Comprehensive Specialty Chemicals Portfolio",
  systemsCopy: "Explore our industrial-grade water treatment formulations developed for membrane plants, cooling towers, and steam boilers.",
  systems: [
    { title: "RO Antiscalants & Dispersants", image: projectAsset("specialty-chemicals") },
    { title: "Non-Oxidizing Biocides", image: detailAsset("water-quality") },
    { title: "Membrane Cleaners (CIP Acid & Alkali)", image: detailAsset("cip") },
    { title: "Corrosion & Scale Inhibitors", image: "/assets/optimized/chemicals.webp" },
    { title: "Boiler & Cooling Water Chemicals", image: detailAsset("dm-plant") }
  ],
  processTitle: "From Comprehensive Water Analysis to Targeted Dosing",
  processCopy: "Every chemical program follows a verified scientific approach to calculate exact saturation indices and prevent over-chemicalization.",
  steps: [
    { title: "Feedwater Chemical Analysis", copy: "Measure silica, barium, sulfate, calcium hardness, alkalinity, and TDS to calculate LSI, SDI, and Stiff-Davis indices." },
    { title: "Projection & Sizing Modeling", copy: "Run advanced projection software to determine the exact product formulation, recovery ceiling, and dosing concentration (ppm)." },
    { title: "Dosing Skid & Supply Logistics", copy: "Deliver certified drums and IBC containers alongside calibrated digital chemical dosing pumps and level telemetry." },
    { title: "Routine Monitoring & CIP Support", copy: "Provide ongoing normalized permeate flow tracking, differential pressure trending, and scheduled membrane cleaning support." }
  ]
};

export const sparePartsContent: ServicePageContent = {
  heroImage: projectAsset("spares-instruments"),
  engineeringImage: projectAsset("spares-instruments"),
  engineeringAlt: "FlowVera genuine replacement spare parts, pumps, valves, and precision instrumentation",
  engineeringTitle: "Genuine Spares for Maximum Plant Uptime",
  engineeringCopy: "Unplanned downtime in water treatment facilities can halt entire production lines. FlowVera supplies genuine OEM replacement parts, vertical multistage pumps, digital dosing equipment, precision water analyzers, and filter media across Saudi Arabia.",
  qualityLabel: "OEM QUALITY ASSURED",
  qualityCopy: "Every component is factory-inspected, pressure-rated, and certified for Middle Eastern operating conditions.",
  overviewImage: detailAsset("booster"),
  overviewAlt: "High-pressure stainless steel booster pump skid and control instruments",
  overviewTitle: "Critical Spares & Instrumentation for Water Plants",
  overviewLead: "Precision telemetry, rugged hydraulics, and rapid delivery across the Kingdom.",
  overviewCopy: [
    "From mechanical seals and high-pressure impellers to digital conductivity sensors, pH probes, and automatic multi-port control valves, high-quality spare parts preserve plant design parameters.",
    "Our engineering support team helps you identify obsolete serials, calculate hydraulic drop-in replacements, and maintain critical spare inventories for rapid preventative and corrective maintenance."
  ],
  systemsTitle: "Complete Spares & Component Catalog",
  systemsCopy: "Explore our inventory of high-performance replacement pumps, sensors, valves, and filter consumables.",
  systems: [
    { title: "High-Pressure RO Pumps", image: projectAsset("water-pumps") },
    { title: "Precision Water Quality Analyzers", image: projectAsset("spares-instruments") },
    { title: "Digital Chemical Dosing Pumps", image: "/assets/optimized/service-4.webp" },
    { title: "FRP Membrane Pressure Vessels", image: "/assets/optimized/service-3.webp" },
    { title: "Automatic Multiport Control Valves", image: detailAsset("softener") }
  ],
  processTitle: "From Part Identification to Site Handover",
  processCopy: "Our technical procurement workflow ensures 100% mechanical and electrical compatibility before dispatch.",
  steps: [
    { title: "Serial & Spec Verification", copy: "Inspect existing equipment tags, dimensional drawings, fluid parameters, and voltage requirements to ensure exact OEM match." },
    { title: "Hydraulic & Chemical Check", copy: "Verify wetted metallurgy (SS 304, SS 316L, Super Duplex), elastomer grades (EPDM, Viton), and sensor range compatibility." },
    { title: "Rapid Kingdom Dispatch", copy: "Mobilize stock from regional warehouses in Riyadh, Dammam, and Jeddah for express delivery to your facility." },
    { title: "Installation & Calibration", copy: "Provide on-site commissioning, sensor calibration against standard buffers, and pressure testing for zero leaks." }
  ]
};

export const tanksContent: ServicePageContent = {
  heroImage: projectAsset("water-tanks"),
  engineeringImage: projectAsset("water-tanks"),
  engineeringAlt: "FlowVera industrial water storage tanks and connected process distribution piping",
  engineeringTitle: "Heavy-Duty Containment Engineered for Extreme Climates",
  engineeringCopy: "Industrial liquid storage in the Middle East demands resistance to intense solar radiation, extreme thermal cycles, and corrosive atmospheric salinity. FlowVera designs, supplies, and installs Glass-Fused-to-Steel (GLS), GRP sectional panel, and industrial polyethylene tanks built for maximum durability.",
  qualityLabel: "AWWA & SASO COMPLIANT",
  qualityCopy: "Engineered to international standards with certified anti-corrosion linings and structural wind/seismic design.",
  overviewImage: detailAsset("softener"),
  overviewAlt: "Industrial water treatment storage tanks and process filtration vessels",
  overviewTitle: "Specialized Industrial Storage Solutions",
  overviewLead: "Potable reserves, process buffers, and chemical holding systems.",
  overviewCopy: [
    "Storage tanks provide crucial operational buffering between raw municipal or well water supplies, treatment skids, and production demand. Selecting the right tank involves evaluating liquid chemistry, storage volume, structural foundation loads, and piping connection nozzles.",
    "We engineer turnkey containment solutions ranging from modular GRP sectional tanks for basements and roofs to heavy-capacity bolted enamel GLS tanks for wastewater treatment, fire protection reserves, and industrial raw water."
  ],
  systemsTitle: "Engineered Tank & Vessel Portfolio",
  systemsCopy: "Explore our complete range of certified storage tanks and specialized pressure holding vessels.",
  systems: [
    { title: "Glass-Fused-to-Steel (GLS) Tanks", image: projectAsset("water-tanks") },
    { title: "GRP Sectional Panel Tanks", image: "/assets/optimized/service-5.webp" },
    { title: "Food-Grade Polyethylene Tanks", image: detailAsset("softener") },
    { title: "Multimedia & Softener Vessels", image: projectAsset("multimedia-filter") },
    { title: "Process CIP & Chemical Holding", image: detailAsset("cip") }
  ],
  processTitle: "From Site Footprint to Turnkey Handover",
  processCopy: "Every tank installation follows rigorous civil assessment, structural fabrication, and quality verification.",
  steps: [
    { title: "Capacity & Site Survey", copy: "Calculate usable working volume, inspect site elevation, assess ground bearing capacity, and plan piping tie-ins." },
    { title: "Engineering & Foundation", copy: "Provide civil foundation ring-beam drawings, wind load calculations, nozzle orientation layouts, and material specs." },
    { title: "Prefabricated Site Erection", copy: "Deliver precision-manufactured panels and assemble on-site with certified torqued fasteners and UV-stabilized sealants." },
    { title: "Hydro-Testing & Disinfection", copy: "Conduct full-head hydrostatic leakage testing, internal tank chlorination disinfection, and SASO compliance handover." }
  ]
};

