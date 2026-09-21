import { notFound } from "next/navigation";
import design from "@/data/coworking-design.json";
import PenCanvas, { type PenNode } from "../../pen-canvas";

const userPages: Record<string, string> = {
  dashboard: "NookOS / Member Dashboard",
  "book-a-space": "NookOS Member / Book a Space",
  "my-bookings": "NookOS Member / My Bookings",
  "access-pass": "NookOS Member / Access Pass",
  community: "NookOS Member / Community",
  payments: "NookOS Member / Payments",
  "help-support": "NookOS Member / Help & Support",
  "profile-settings": "NookOS Member / Profile Settings",
};

const adminPages: Record<string, string> = {
  dashboard: "NookOS / Operations Dashboard",
  "members-and-teams": "NookOS / Members & Teams",
  leads: "NookOS / Leads",
  "desk-and-cabin-inventory": "NookOS / Desk & Cabin Inventory",
  "meeting-rooms": "NookOS / Meeting Rooms",
  bookings: "NookOS / Bookings",
  community: "NookOS / Community",
  "payments-and-invoices": "NookOS / Payments & Invoices",
  expenses: "NookOS / Expenses",
  maintenance: "NookOS / Maintenance",
  "reports-and-analytics": "NookOS / Reports & Analytics",
  notifications: "NookOS / Notifications",
  settings: "NookOS / Settings",
  location: "NookOS Settings / Location",
  "members-and-access": "NookOS Settings / Members & Access",
  "plans-and-pricing": "NookOS Settings / Plans & Pricing",
  "booking-rules": "NookOS Settings / Booking Rules",
};

const reusable = design.children.filter(
  (node) => node.type === "frame" && node.reusable === true,
) as unknown as PenNode[];

export default async function DashboardPage({
  params,
}: {
  params: Promise<{ dashboard: string; page?: string[] }>;
}) {
  const { dashboard, page = [] } = await params;
  const pages = dashboard === "user" ? userPages : dashboard === "admin" ? adminPages : null;
  if (!pages) notFound();

  const screenName = pages[page[0] ?? "dashboard"];
  if (!screenName || page.length > 1) notFound();

  const scene = design.children.find((node) => node.type === "frame" && node.name === screenName);
  if (!scene) notFound();

  return <PenCanvas scene={scene as unknown as PenNode} reusable={reusable} />;
}
