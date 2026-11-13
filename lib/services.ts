export const services = [
  {
    slug: "water-treatment-systems",
    title: "Water Treatment Plants & Systems",
    description: "We supply water treatment plants designed to meet different water quality and industrial requirements.",
    image: "/assets/optimized/service-1.webp",
    details: "Discuss a treatment system around your source water, target water quality and operating capacity. Selection depends on a review of your application rather than a one-size-fits-all specification.",
    requirements: ["Water source and available water analysis", "Required flow rate and treated-water application", "Installation location and operating conditions"]
  },
  {
    slug: "ro-maintenance",
    title: "RO Maintenance & Technical Services",
    description: "From routine servicing to membrane replacement, we help keep your RO systems running smoothly.",
    image: "/assets/optimized/service-2.webp",
    details: "Contact the team about routine RO care, membrane replacement or an operating issue. Sharing the equipment details and recent performance readings helps identify the right next step.",
    requirements: ["RO system model and membrane configuration", "Recent flow, pressure and water-quality readings", "Maintenance history and description of the issue"]
  },
  {
    slug: "membranes-filtration",
    title: "Membranes, Filtration & Ion Exchange",
    description: "Find the right membranes, filter media and ion exchange products for your water treatment needs.",
    image: "/assets/optimized/service-3.webp",
    details: "Explore membrane, filtration and ion exchange options for your process. Compatibility, water chemistry and required output should be reviewed before a product is selected.",
    requirements: ["Existing element, cartridge or vessel dimensions", "Source-water analysis and required water quality", "Quantity and replacement or new-installation requirements"]
  },
  {
    slug: "pumps-dosing-automation",
    title: "Pumps, Dosing & Automation Systems",
    description: "Explore pumps, dosing equipment and automatic control systems for reliable water treatment operations.",
    image: "/assets/optimized/service-4.webp",
    details: "Discuss pumping, chemical dosing and control equipment for your water treatment application. The team can review your operating conditions and integration needs.",
    requirements: ["Required flow rate and operating pressure", "Liquid or chemical being handled", "Power supply, controls and integration requirements"]
  },
  {
    slug: "industrial-tanks",
    title: "Industrial Tanks & Storage Solutions",
    description: "We offer a range of industrial tanks for water storage and filtration applications.",
    image: "/assets/optimized/service-5.webp",
    details: "Enquire about tanks for storage or filtration applications. Capacity, material compatibility, available space and service conditions determine the appropriate option.",
    requirements: ["Required capacity and intended contents", "Available installation space and connections", "Material, pressure and temperature requirements"]
  },
  {
    slug: "specialty-chemicals",
    title: "Specialty Water Treatment Chemicals",
    description: "Discuss antiscalants, biocides, corrosion and scale inhibitors, molybdate and acidic cleaners for your treatment process.",
    image: "/assets/optimized/chemicals.webp",
    details: "Chemical selection and dosing depend on water chemistry, equipment compatibility and operating conditions. Ask the team for application-specific guidance and relevant safety documentation before use.",
    requirements: ["Water analysis and treatment application", "Existing equipment and chemical programme", "Required quantity and available safety specifications"]
  }
];

export function serviceHref(slug: string): string {
  return `/products/${slug}/`;
}

export const publicPages = [
  { title: "Home", href: "/" },
  { title: "About Us", href: "/about-us/" },
  { title: "Products & Services", href: "/products/" },
  ...services.map((service) => ({ title: service.title, href: serviceHref(service.slug) })),
  { title: "Spare Parts", href: "/spare-parts/" },
  { title: "Tanks", href: "/tanks/" },
  { title: "Request a Quotation", href: "/enquiry/" },
  { title: "Terms and Conditions", href: "/terms/" },
  { title: "Privacy Policy", href: "/privacy/" },
  { title: "Sitemap", href: "/site-map/" }
];
