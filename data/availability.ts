export type Availability = "in-stock" | "available" | "on-request";

export const availabilityLabel: Record<Availability, string> = {
  "in-stock": "In Stock",
  available: "Available",
  "on-request": "Available on Request",
};
