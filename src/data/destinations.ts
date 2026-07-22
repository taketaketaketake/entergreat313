export interface Destination {
  id: string;
  name: string;
  addressLines: string[];
  guidance: string;
}

// Addresses change — the letter builder tells users to verify before mailing.
export const destinations: Destination[] = [
  {
    id: "mi-parole-board",
    name: "Michigan Parole Board",
    addressLines: ["Michigan Parole Board", "P.O. Box 30003", "Lansing, MI 48909"],
    guidance:
      "Include the person's full name and MDOC number on every page. Verify the current address at michigan.gov/corrections before mailing.",
  },
  {
    id: "defense-attorney",
    name: "Through a Defense Attorney",
    addressLines: [],
    guidance:
      "Character letters for a judge should be given to the defense attorney, who submits them to the court. Ask the family for the attorney's name and address — do not mail directly to the judge.",
  },
  {
    id: "mdoc-facility",
    name: "A Correctional Facility (letter to someone inside)",
    addressLines: [],
    guidance:
      "Address format: Full Name, MDOC Number, then the facility's mailing address. Look up the facility and its mail rules at michigan.gov/corrections — many facilities route mail through a central processing address.",
  },
  {
    id: "custom",
    name: "Other / Custom Address",
    addressLines: [],
    guidance: "Enter the full mailing address. Double-check it with the court clerk or facility before sending.",
  },
];
