export const SITE_NAME = "Refurbd";
export const SITE_DESCRIPTION =
  "Premium refurbished laptops and PCs at up to 60% off retail. Every device tested, graded, and backed by a 12-month warranty.";

export const FREE_SHIPPING_THRESHOLD = 99;
export const CURRENCY = "AUD";
export const CURRENCY_SYMBOL = "$";
export const GST_RATE = 0.1; // 10% GST (Australia)

export const SHIPPING_METHODS = [
  {
    id: "standard-au",
    name: "Standard Shipping",
    description: "5-7 business days",
    price: 9.95,
    freeAbove: FREE_SHIPPING_THRESHOLD,
  },
  {
    id: "express-au",
    name: "Express Shipping",
    description: "2-3 business days",
    price: 14.95,
    freeAbove: null,
  },
  {
    id: "standard-nz",
    name: "NZ Standard Shipping",
    description: "7-14 business days",
    price: 19.95,
    freeAbove: null,
  },
] as const;

export const PRODUCT_GRADES = [
  {
    value: "CERTIFIED_REFURBISHED",
    label: "Certified Refurbished",
    shortLabel: "Certified",
    description: "Like new condition. Manufacturer certified, original packaging.",
    color: "emerald",
  },
  {
    value: "EXCELLENT",
    label: "Excellent",
    shortLabel: "Excellent",
    description: "Minimal signs of use. Barely distinguishable from new.",
    color: "green",
  },
  {
    value: "GOOD",
    label: "Good",
    shortLabel: "Good",
    description: "Minor cosmetic wear. Fully functional, great value.",
    color: "blue",
  },
  {
    value: "FAIR",
    label: "Fair",
    shortLabel: "Fair",
    description: "Noticeable cosmetic wear. Fully functional, best price.",
    color: "amber",
  },
  {
    value: "ACCEPTABLE",
    label: "Acceptable",
    shortLabel: "Acceptable",
    description: "Significant cosmetic wear. Fully functional, lowest price.",
    color: "gray",
  },
] as const;

export const AU_STATES = [
  { value: "NSW", label: "New South Wales" },
  { value: "VIC", label: "Victoria" },
  { value: "QLD", label: "Queensland" },
  { value: "WA", label: "Western Australia" },
  { value: "SA", label: "South Australia" },
  { value: "TAS", label: "Tasmania" },
  { value: "ACT", label: "Australian Capital Territory" },
  { value: "NT", label: "Northern Territory" },
] as const;

export const NZ_REGIONS = [
  { value: "AUK", label: "Auckland" },
  { value: "WGN", label: "Wellington" },
  { value: "CAN", label: "Canterbury" },
  { value: "WKO", label: "Waikato" },
  { value: "BOP", label: "Bay of Plenty" },
  { value: "OTA", label: "Otago" },
  { value: "MWT", label: "Manawatu-Wanganui" },
  { value: "HKB", label: "Hawke's Bay" },
  { value: "TKI", label: "Taranaki" },
  { value: "NTL", label: "Northland" },
  { value: "STL", label: "Southland" },
  { value: "GIS", label: "Gisborne" },
  { value: "MBH", label: "Marlborough" },
  { value: "NSN", label: "Nelson" },
  { value: "TAS", label: "Tasman" },
  { value: "WTC", label: "West Coast" },
] as const;

export const TRUST_BADGES = [
  {
    icon: "Shield",
    label: "12-Month Warranty",
    description: "Full coverage on every device",
  },
  {
    icon: "RotateCcw",
    label: "30-Day Returns",
    description: "Hassle-free return policy",
  },
  {
    icon: "CheckCircle",
    label: "30-Point Tested",
    description: "Rigorous quality inspection",
  },
  {
    icon: "Lock",
    label: "Secure Payments",
    description: "Encrypted checkout via Stripe",
  },
] as const;
