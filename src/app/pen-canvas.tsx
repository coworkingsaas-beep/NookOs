"use client";

import {
  Activity, Armchair, ArrowRight, ArrowUpRight, BadgeCheck, BadgeIndianRupee, BatteryFull, Bell, Bike, Boxes, Building2,
  CalendarCheck, CalendarClock, CalendarDays, CalendarPlus, CalendarRange, CalendarX,
  ChartNoAxesCombined, ChartPie, Check, CheckCheck, ChevronDown, ChevronLeft, ChevronRight,
  ChevronsUpDown, CircleCheck, CircleDollarSign, Clock3, Coffee, Coins, Columns3, CreditCard,
  DoorClosed, DoorOpen, Download, Ellipsis, Eye, FilePlus, FileText, Flag, Hash, Heart, HeartHandshake,
  History, Hourglass, House, IndianRupee, Info, Landmark, Layers, LayoutDashboard,
  LayoutGrid, LifeBuoy, Link as LinkIcon, List, ListChecks, LoaderCircle, LockKeyhole, LogIn, LogOut, Mail, Map as MapIcon, MapPin,
  Megaphone, MessageCircle, MessagesSquare, Mic, Monitor, MonitorOff, MonitorUp, Moon, Palette, Pencil, Phone,
  PhoneCall, Plug, Plus, Presentation, Printer, Projector, QrCode, ReceiptText,
  RefreshCw, Repeat2, Rocket, Save, ScanLine, Search, Send, Settings, Settings2, Shield, ShieldCheck,
  SlidersHorizontal, Sparkles, Ticket, TimerOff, TrendingDown, TriangleAlert, Tv, Undo2,
  Signal, Sun, Upload, User, UserCheck, UserCog, UserMinus, UserPlus, UserRoundPlus, Users, WalletCards, X,
  Wifi, Wrench,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useSyncExternalStore, type CSSProperties } from "react";

export type PenNode = {
  type: string;
  id?: string;
  name?: string;
  width?: number | string;
  height?: number | string;
  fill?: string;
  stroke?: string;
  strokeWidth?: number | Record<string, number>;
  cornerRadius?: number | number[];
  layout?: string;
  layoutPosition?: string;
  gap?: number;
  padding?: number | number[];
  alignItems?: string;
  justifyContent?: string;
  content?: string;
  fontFamily?: string;
  fontSize?: number;
  fontWeight?: number | string;
  fontStyle?: string;
  letterSpacing?: number;
  lineHeight?: number | string;
  textAlign?: string;
  icon?: string;
  clip?: boolean;
  x?: number;
  y?: number;
  ref?: string;
  descendants?: Record<string, Record<string, unknown>>;
  effect?: { type: string; color?: string; offset?: { x: number; y: number }; blur?: number; spread?: number };
  children?: PenNode[];
  [key: string]: unknown;
};

const iconMap = {
  activity: Activity, armchair: Armchair, "arrow-right": ArrowRight, "arrow-up-right": ArrowUpRight,
  "badge-indian-rupee": BadgeIndianRupee, bell: Bell, bike: Bike, "battery-full": BatteryFull, signal: Signal, "building-2": Building2,
  "calendar-check": CalendarCheck, "calendar-clock": CalendarClock, "calendar-days": CalendarDays,
  "calendar-plus": CalendarPlus, "calendar-range": CalendarRange, "calendar-x": CalendarX,
  "chart-no-axes-combined": ChartNoAxesCombined, "chart-pie": ChartPie, check: Check, "check-check": CheckCheck,
  "chevron-down": ChevronDown, "chevron-left": ChevronLeft, "chevron-right": ChevronRight,
  "chevrons-up-down": ChevronsUpDown, "circle-check": CircleCheck,
  "circle-dollar-sign": CircleDollarSign, "clock-3": Clock3, coffee: Coffee, "columns-3": Columns3,
  coins: Coins, "credit-card": CreditCard, "door-closed": DoorClosed, "door-open": DoorOpen, download: Download,
  ellipsis: Ellipsis, eye: Eye, "file-plus": FilePlus, flag: Flag, hash: Hash,
  "badge-check": BadgeCheck, boxes: Boxes, heart: Heart, "heart-handshake": HeartHandshake,
  history: History, hourglass: Hourglass, house: House,
  "indian-rupee": IndianRupee, info: Info, landmark: Landmark, layers: Layers,
  "layout-dashboard": LayoutDashboard, "layout-grid": LayoutGrid, "life-buoy": LifeBuoy,
  link: LinkIcon, list: List,
  "list-checks": ListChecks, "loader-circle": LoaderCircle, "lock-keyhole": LockKeyhole,
  "log-in": LogIn, "log-out": LogOut, mail: Mail, map: MapIcon, "map-pin": MapPin, megaphone: Megaphone,
  "message-circle": MessageCircle, "messages-square": MessagesSquare, mic: Mic, monitor: Monitor, "monitor-off": MonitorOff,
  "monitor-up": MonitorUp, pencil: Pencil, phone: Phone, "phone-call": PhoneCall, plug: Plug,
  plus: Plus, presentation: Presentation, printer: Printer, projector: Projector, "qr-code": QrCode,
  "file-text": FileText, "palette": Palette, "receipt-text": ReceiptText, "refresh-cw": RefreshCw,
  "repeat-2": Repeat2, rocket: Rocket, save: Save, send: Send, shield: Shield,
  "scan-line": ScanLine, search: Search, settings: Settings, "settings-2": Settings2,
  "shield-check": ShieldCheck, "sliders-horizontal": SlidersHorizontal, sparkles: Sparkles,
  ticket: Ticket, "timer-off": TimerOff, "trending-down": TrendingDown, "triangle-alert": TriangleAlert,
  tv: Tv, "undo-2": Undo2, upload: Upload, user: User, "user-check": UserCheck,
  "user-cog": UserCog, "user-minus": UserMinus, "user-plus": UserPlus,
  "user-round-plus": UserRoundPlus, users: Users, "wallet-cards": WalletCards, wifi: Wifi, wrench: Wrench,
} as const;

const colors: Record<string, string> = {
  "$bg": "#F4F6F8", "$surface": "#FFFFFF", "$sidebar": "#0B1118",
  "$sidebar-muted": "#8E9AA8", "$text": "#18212B", "$muted": "#647180",
  "$border": "#DDE3E8", "$accent": "#2B8A74", "$accent-soft": "#E4F4EF",
  "$warning": "#D88424", "$warning-soft": "#FFF2DD", "$danger": "#C85B52",
  "$danger-soft": "#FCECEA", "$blue": "#3B73C5", "$blue-soft": "#EAF1FC",
};

const pageHeaders = new Set([
  "Members Page Header", "Leads Page Header", "Inventory Page Header",
  "Meeting Rooms Page Header", "Bookings Page Header", "Community Page Header",
  "Payments Page Header", "Expenses Page Header", "Maintenance Page Header",
  "Reports Page Header", "Notifications Page Header", "Settings Page Header",
  "Book Space Header", "My Bookings Header", "Access Pass Page Header",
  "Member Community Header", "Member Payments Header", "Support Page Header",
  "Profile Settings Header",
]);
const darkColors: Record<string, string> = {
  "$bg": "#101820", "$surface": "#18212B", "$sidebar": "#0B1118",
  "$sidebar-muted": "#8E9AA8", "$text": "#E7EDF2", "$muted": "#A8B2BC",
  "$border": "#35424D", "$accent": "#42A88D", "$accent-soft": "#1D3835",
  "$warning": "#E6A34C", "$warning-soft": "#48351F", "$danger": "#E27A70",
  "$danger-soft": "#422725", "$blue": "#74A2E8", "$blue-soft": "#243750",
  "#FFFFFF": "#18212B", "#F4F6F8": "#101820", "#F7F8F9": "#151E28",
  "#EDF0F2": "#2A3742", "#DDE3E8": "#35424D", "#151E28": "#111820",
  "#1D3835": "#20483F", "#205E52": "#2B8A74", "#22303B": "#18212B",
  "#26313D": "#35424D", "#66C8B2": "#66C8B2", "#B2BBC5": "#A8B2BC",
  "#B8C2CC": "#A8B2BC", "#C9DDD8": "#24443D", "#D6E8E4": "#24443D",
  "#8B96A2": "#A8B2BC", "#9EABB7": "#A8B2BC", "#B9C3CC": "#A8B2BC",
  "#F0EAF8": "#302941", "#69471E": "#48351F", "#7A4B10": "#48351F", "#F2D5A6": "#69471E",
};
const themeEvent = "nookos-theme-change";
const getTheme = () => window.localStorage.getItem("nookos-theme") === "dark";
const subscribeTheme = (notify: () => void) => {
  window.addEventListener(themeEvent, notify);
  window.addEventListener("storage", notify);
  return () => {
    window.removeEventListener(themeEvent, notify);
    window.removeEventListener("storage", notify);
  };
};
const saveTheme = (dark: boolean) => {
  window.localStorage.setItem("nookos-theme", dark ? "dark" : "light");
  window.dispatchEvent(new Event(themeEvent));
};

const adminDestinations: Record<string, string> = {
  Dashboard: "dashboard", "Members & Teams": "members-and-teams", Leads: "leads",
  "Desk & Cabin Inventory": "desk-and-cabin-inventory", "Meeting Rooms": "meeting-rooms",
  Bookings: "bookings", Community: "community", "Payments & Invoices": "payments-and-invoices",
  Expenses: "expenses", Maintenance: "maintenance", "Reports & Analytics": "reports-and-analytics",
  Notifications: "notifications", Settings: "settings", General: "settings", Locations: "location",
  "Members & access": "members-and-access", "Plans & pricing": "plans-and-pricing",
  "Booking rules": "booking-rules",
};
const memberDestinations: Record<string, string> = {
  Home: "dashboard", "Book a space": "book-a-space", "My bookings": "my-bookings",
  "Access pass": "access-pass", Community: "community", Payments: "payments",
  "Help & support": "help-support", "Profile settings": "profile-settings",
};

export default function PenCanvas({ scene, reusable }: {
  scene: PenNode;
  reusable: PenNode[];
}) {
  const dark = useSyncExternalStore(subscribeTheme, getTheme, () => false);
  const [moreOpen, setMoreOpen] = useState(false);
  const pathname = usePathname();
  const components = new Map(reusable.flatMap((node) => node.id ? [[node.id, node] as const] : []));
  const isDashboard = scene.name === "NookOS / Operations Dashboard" || scene.name === "NookOS / Member Dashboard";
  const showThemeToggle = scene.name?.startsWith("NookOS / Operations") || scene.name?.startsWith("NookOS / Members") || scene.name?.startsWith("NookOS / Leads") || scene.name?.startsWith("NookOS / Desk") || scene.name?.startsWith("NookOS / Meeting") || scene.name?.startsWith("NookOS / Bookings") || scene.name?.startsWith("NookOS / Community") || scene.name?.startsWith("NookOS / Payments") || scene.name?.startsWith("NookOS / Expenses") || scene.name?.startsWith("NookOS / Maintenance") || scene.name?.startsWith("NookOS / Reports") || scene.name?.startsWith("NookOS / Notifications") || scene.name?.startsWith("NookOS / Settings") || scene.name?.startsWith("NookOS Member /");
  const visibleScene = isDashboard ? scene : withoutPageHeading(scene);
  const toggleTheme = () => saveTheme(!dark);
  const isMember = scene.name?.startsWith("NookOS Member /") || scene.name === "NookOS / Member Dashboard";
  const routeFor = (node: PenNode) => {
    const memberNav = node.name?.startsWith("Member Nav /");
    const label = node.name?.replace(/^(Member Nav|Settings Nav|Nav) \/ /, "");
    const destination = label ? (memberNav ? memberDestinations : adminDestinations)[label] : undefined;
    return destination ? `/${memberNav ? "user" : "admin"}/${destination}` : undefined;
  };
  return (
    <main className="pen-stage" aria-label={scene.name}>
      <div className={`pen-page${showThemeToggle ? " pen-app-page" : " pen-standalone"}${dark ? " is-dark" : ""}`}>
        {showThemeToggle && <MobileAppChrome sceneName={scene.name ?? ""} member={isMember} dark={dark} onToggleTheme={toggleTheme} />}
        {visibleScene && <PenElement node={visibleScene} routeFor={routeFor} components={components} parentLayout="row" root dark={dark} onToggleTheme={toggleTheme} showThemeToggle={showThemeToggle} />}
        {showThemeToggle && <MobileQuickAction member={isMember} />}
        {showThemeToggle && <MobileNavigation member={isMember} pathname={pathname} onOpenMore={() => setMoreOpen(true)} />}
        {showThemeToggle && moreOpen && <MobileMoreMenu member={isMember} onClose={() => setMoreOpen(false)} />}
      </div>
    </main>
  );
}

function MobileAppChrome({ sceneName, member, dark, onToggleTheme }: {
  sceneName: string;
  member: boolean;
  dark: boolean;
  onToggleTheme: () => void;
}) {
  const dashboard = sceneName === "NookOS / Operations Dashboard" || sceneName === "NookOS / Member Dashboard";
  const pageName = sceneName.replace(/^NookOS(?: Member| Settings)? \/ /, "");
  const title = dashboard ? `Good morning, ${member ? "Dev" : "Avery"}` : pageName;
  return (
    <header className="mobile-app-header">
      <div className="mobile-status-row"><span>9:41</span><span className="mobile-status-icons"><Signal size={12}/><Wifi size={12}/><BatteryFull size={14}/></span></div>
      <div className="mobile-brand-row">
        <Link className="mobile-brand" href={member ? "/user/dashboard" : "/admin/dashboard"}><span className="mobile-brand-mark">N</span><strong>NookOS</strong></Link>
        <div className="mobile-header-actions">
          <button className="mobile-icon-button" aria-label="Search"><Search size={15}/></button>
          <button className="mobile-icon-button" aria-label="Notifications"><Bell size={15}/></button>
          <button className="mobile-icon-button" type="button" onClick={onToggleTheme} aria-label={`Switch to ${dark ? "day" : "night"} mode`} aria-pressed={dark}>{dark ? <Sun size={15}/> : <Moon size={15}/>}</button>
        </div>
      </div>
      <div className="mobile-welcome-row">
        <div className="mobile-welcome-copy"><strong>{title}</strong><span>{dashboard ? "Wednesday, 20 March" : "Manage your NookOS workspace"}</span></div>
        <div className="mobile-location"><MapPin size={11}/><span>Foundry</span><ChevronDown size={10}/></div>
      </div>
    </header>
  );
}

function MobileNavigation({ member, pathname, onOpenMore }: { member: boolean; pathname: string; onOpenMore: () => void }) {
  const items = member ? [
    { label: "Home", href: "/user/dashboard", icon: House },
    { label: "Book", href: "/user/book-a-space", icon: CalendarPlus },
    { label: "Bookings", href: "/user/my-bookings", icon: CalendarCheck },
    { label: "Access", href: "/user/access-pass", icon: ScanLine },
    { label: "More", href: "/user/profile-settings", icon: LayoutGrid },
  ] : [
    { label: "Home", href: "/admin/dashboard", icon: House },
    { label: "Bookings", href: "/admin/bookings", icon: CalendarCheck },
    { label: "Members", href: "/admin/members-and-teams", icon: Users },
    { label: "Payments", href: "/admin/payments-and-invoices", icon: CreditCard },
    { label: "More", href: "/admin/settings", icon: LayoutGrid },
  ];
  return <nav className="mobile-bottom-nav" aria-label={member ? "Member navigation" : "Admin navigation"}>
    {items.map(({ label, href, icon: Icon }) => {
      const active = pathname === href || (label === "More" && !items.slice(0, 4).some((item) => item.href === pathname));
      return <Link key={href} href={href} onClick={label === "More" ? (event) => { event.preventDefault(); onOpenMore(); } : undefined} className={`mobile-nav-item${active ? " active" : ""}`} aria-current={active ? "page" : undefined}><Icon size={18}/><span>{label}</span></Link>;
    })}
  </nav>;
}

function MobileMoreMenu({ member, onClose }: { member: boolean; onClose: () => void }) {
  const links = member ? [
    { label: "Community", href: "/user/community", icon: MessagesSquare },
    { label: "Payments", href: "/user/payments", icon: CreditCard },
    { label: "Help & support", href: "/user/help-support", icon: LifeBuoy },
    { label: "Profile settings", href: "/user/profile-settings", icon: UserCog },
  ] : [
    { label: "Leads", href: "/admin/leads", icon: UserPlus },
    { label: "Desk & cabin inventory", href: "/admin/desk-and-cabin-inventory", icon: Armchair },
    { label: "Meeting rooms", href: "/admin/meeting-rooms", icon: Building2 },
    { label: "Community", href: "/admin/community", icon: MessagesSquare },
    { label: "Expenses", href: "/admin/expenses", icon: IndianRupee },
    { label: "Maintenance", href: "/admin/maintenance", icon: Wrench },
    { label: "Reports & analytics", href: "/admin/reports-and-analytics", icon: ChartNoAxesCombined },
    { label: "Notifications", href: "/admin/notifications", icon: Bell },
    { label: "Settings", href: "/admin/settings", icon: Settings },
    { label: "Locations", href: "/admin/location", icon: MapPin },
    { label: "Members & access", href: "/admin/members-and-access", icon: ShieldCheck },
    { label: "Plans & pricing", href: "/admin/plans-and-pricing", icon: WalletCards },
    { label: "Booking rules", href: "/admin/booking-rules", icon: ListChecks },
  ];
  return <section className="mobile-more-menu" role="dialog" aria-modal="true" aria-label="More pages">
    <header className="mobile-more-heading"><div><span>NOOKOS {member ? "MEMBER" : "OPERATIONS"}</span><h2>More</h2></div><button type="button" className="mobile-icon-button" onClick={onClose} aria-label="Close more pages"><X size={16}/></button></header>
    <nav aria-label="All pages">{links.map(({ label, href, icon: Icon }) => <Link key={href} href={href} className="mobile-more-link" onClick={onClose}><span className="mobile-more-icon"><Icon size={17}/></span><span>{label}</span><ChevronRight size={15}/></Link>)}</nav>
  </section>;
}

function MobileQuickAction({ member }: { member: boolean }) {
  return <Link className="mobile-quick-action" href={member ? "/user/book-a-space" : "/admin/leads"} aria-label={member ? "Book a space" : "Create new item"}><Plus size={20}/></Link>;
}

function withoutPageHeading(node: PenNode): PenNode | null {
  if (pageHeaders.has(node.name ?? "")) {
    const content = node.children?.filter((child) => !child.name?.endsWith("Header Copy")) ?? [];
    if (!content.length || content.every((child) => child.type === "text")) return null;
    return { ...node, justifyContent: "flex-end", children: content };
  }
  const children = node.children?.map(withoutPageHeading).filter((child): child is PenNode => child !== null);
  return { ...node, children };
}

function resolvedRef(node: PenNode, components: Map<string, PenNode>): PenNode | undefined {
  if (!node.ref) return undefined;
  const component = components.get(node.ref);
  if (!component) return undefined;
  const overrides = node.descendants ?? {};
  const apply = (child: PenNode): PenNode => ({
    ...child,
    ...(child.id ? overrides[child.id] : {}),
    children: child.children?.map(apply),
  });
  return { ...apply(component), ...node, children: component.children?.map(apply) };
}

function PenElement({ node: raw, routeFor, components, parentLayout, root = false, dark = false, onToggleTheme, showThemeToggle = false }: {
  node: PenNode;
  routeFor: (node: PenNode) => string | undefined;
  components: Map<string, PenNode>;
  parentLayout: string;
  root?: boolean;
  dark?: boolean;
  onToggleTheme?: () => void;
  showThemeToggle?: boolean;
}) {
  const node = raw.type === "ref" ? resolvedRef(raw, components) ?? raw : raw;
  const fill = resolveColor(node.fill, dark);
  const style = nodeStyle(node, parentLayout, fill, root, dark);

  if (node.type === "text") {
    return <span className="pen-text" data-pen-name={node.name} style={style}>{node.content}</span>;
  }
  if (node.type === "icon") {
    const Icon = iconMap[node.icon as keyof typeof iconMap];
    return Icon ? <Icon aria-hidden="true" width={dimension(node.width)} height={dimension(node.height)} color={fill} strokeWidth={2}/> : null;
  }
  const children = node.children?.map((child, index) => (
    <PenElement key={child.id ?? child.name ?? index} node={child} routeFor={routeFor} components={components} parentLayout={node.layout === "vertical" ? "vertical" : "row"} dark={dark} onToggleTheme={onToggleTheme} showThemeToggle={showThemeToggle}/>
  ));
  const addThemeToggle = showThemeToggle && (node.name === "Top Bar Actions" || node.name === "Member Top Actions");
  const sidebar = node.name === "Navigation Sidebar" || node.name === "Member Sidebar";
  const sidebarOptions = node.name === "Primary Navigation" || node.name === "Member Navigation";
  const pageContent = node.name === "Dashboard Content" || node.name === "Member Dashboard Content";
  const mainWorkspace = node.name === "Main Workspace" || node.name === "Member Main Workspace";
  const desktopTopBar = node.name === "Top Bar" || node.name === "Member Top Bar";
  const hiddenMobileHeading = node.name === "Dashboard Header" || node.name === "Member Welcome Header";
  const pageHeader = pageHeaders.has(node.name ?? "");
  const mobileGrid = /^(Metrics Row [12]|Membership Summary|Lead Pipeline Summary|Inventory Summary|Meeting Room Summary|Bookings Summary|Community Summary|Payments Summary|Expenses Summary|Maintenance Summary|Reports KPI Summary|Notification Summary|Member Booking Summary|Booking Calendar Summary|Member Payment Summary|Profile Security Summary|Access Summary|Booking Rules Summary|Member Quick Actions|Space Type Selector|Support Categories)$/.test(node.name ?? "");
  const mobileStack = /^(Analytics Overview|Today’s Bookings|Member Day Overview|Member Dashboard Main Grid|Lead Pipeline Board|Members Main Area|Inventory Main Area|Meeting Rooms Main Area|Bookings Main Area|Community Main Area|Payments Main Area|Maintenance Main Area|Expense Analytics|Performance Analytics|Expenses Table|Available Spaces Grid|My Bookings Main Area|Access Pass Main Area|Member Community Main Area|Member Payments Main Area|Support Main Area|Profile Settings Main Area|Settings Main Area|Notifications Main Area)$/.test(node.name ?? "");
  const href = node.type === "frame" ? routeFor(node) : undefined;
  const className = `pen-node${node.type === "ellipse" ? " pen-ellipse" : ""}${root ? " pen-root" : ""}${sidebar ? " pen-sidebar" : ""}${sidebarOptions ? " pen-sidebar-options" : ""}${pageContent ? " pen-content-enter pen-mobile-content" : ""}${mainWorkspace ? " pen-main-workspace" : ""}${desktopTopBar ? " pen-desktop-topbar" : ""}${hiddenMobileHeading ? " pen-mobile-heading" : ""}${pageHeader ? " pen-page-header" : ""}${mobileGrid ? " pen-mobile-grid" : ""}${mobileStack ? " pen-mobile-stack" : ""}`;
  if (href) {
    return <Link className={className} data-pen-name={node.name} style={style} href={href}>{children}</Link>;
  }
  return (
    <div className={className} data-pen-name={node.name} style={style}>
      {children}
      {addThemeToggle && <button className="pen-theme-toggle" type="button" onClick={onToggleTheme} aria-label={`Switch to ${dark ? "day" : "night"} mode`} aria-pressed={dark} title={`Switch to ${dark ? "day" : "night"} mode`}>{dark ? <Sun size={17} aria-hidden="true"/> : <Moon size={17} aria-hidden="true"/>}</button>}
    </div>
  );
}

function nodeStyle(node: PenNode, parentLayout: string, fill: string | undefined, root: boolean, dark: boolean): CSSProperties {
  const style: CSSProperties = {
    boxSizing: "border-box",
    background: node.type === "text" || node.type === "icon" ? undefined : fill,
    color: fill,
    flexShrink: 0,
  };
  if (node.type === "frame" || node.type === "ref") {
    const vertical = node.layout === "vertical";
    style.display = node.layout === "none" ? "block" : "flex";
    style.flexDirection = vertical ? "column" : "row";
    style.gap = node.gap;
    style.alignItems = cssValue(node.alignItems);
    style.justifyContent = cssValue(node.justifyContent);
    style.padding = spacing(node.padding);
    style.borderRadius = radius(node.cornerRadius);
    style.overflow = node.clip ? "hidden" : undefined;
    size(style, "width", node.width, parentLayout, root);
    size(style, "height", node.height, parentLayout === "vertical" ? "vertical" : "row", root);
    if (node.layoutPosition === "absolute") {
      style.position = "absolute";
      style.left = node.x;
      style.top = node.y;
    } else if (node.layout === "none") {
      style.position = "relative";
    }
    if (root) {
      style.height = "auto";
      style.minHeight = `max(${node.height}px, 100vh)`;
      style.overflow = "visible";
    } else if (node.name === "Navigation Sidebar" || node.name === "Member Sidebar") {
      style.position = "sticky";
      style.top = 0;
      style.left = 0;
      style.height = "100vh";
      style.alignSelf = "flex-start";
      style.zIndex = 2;
      style.overflowY = "auto";
    } else if (node.name === "Main Workspace" || node.name === "Member Main Workspace") {
      style.height = "auto";
      style.minHeight = "100vh";
      style.overflow = "visible";
    }
    applyStroke(style, node.stroke, node.strokeWidth, dark);
    if (node.effect?.type === "shadow") {
      const { offset, blur = 0, spread = 0, color = "#00000022" } = node.effect;
      style.boxShadow = `${offset?.x ?? 0}px ${offset?.y ?? 0}px ${blur}px ${spread}px ${color}`;
    }
  } else if (node.type === "rectangle" || node.type === "ellipse") {
    size(style, "width", node.width, parentLayout, false);
    size(style, "height", node.height, parentLayout, false);
    style.borderRadius = radius(node.cornerRadius ?? (node.type === "ellipse" ? 9999 : undefined));
    if (node.x !== undefined || node.y !== undefined) {
      style.position = "absolute";
      style.left = node.x;
      style.top = node.y;
    }
  } else if (node.type === "text") {
    size(style, "width", node.width, parentLayout, false);
    size(style, "height", node.height, parentLayout, false);
    style.fontFamily = font(node.fontFamily);
    style.fontSize = node.fontSize === undefined ? undefined : Math.max(node.fontSize * 1.2, 11);
    style.fontWeight = node.fontWeight as CSSProperties["fontWeight"];
    style.fontStyle = node.fontStyle;
    style.letterSpacing = node.letterSpacing;
    style.lineHeight = node.lineHeight;
    style.textAlign = node.textAlign as CSSProperties["textAlign"];
    style.whiteSpace = "pre-wrap";
    style.flexShrink = 0;
  }
  return style;
}

function size(style: CSSProperties, axis: "width" | "height", value: number | string | undefined, parentLayout: string, root: boolean) {
  if (value === undefined) return;
  if (value === "fill_container") {
    if (root) return;
    if (axis === "width" && parentLayout !== "vertical") {
      style.flex = "1 1 0";
      style.minWidth = 0;
    } else if (axis === "height" && parentLayout === "vertical") {
      style.flex = "1 0 auto";
      style.minHeight = "fit-content";
    } else {
      style[axis] = "100%";
    }
  } else if (typeof value === "number") {
    style[axis] = value;
  }
}

function dimension(value?: number | string) {
  return typeof value === "number" ? value : value === "fill_container" ? "100%" : undefined;
}

function resolveColor(value?: string, dark = false) {
  const color = value ? colors[value] ?? value : undefined;
  return dark && color ? darkColors[value ?? ""] ?? darkColors[color] ?? color : color;
}

function font(value?: string) {
  if (value === "$font") return "var(--font-geist-sans)";
  if (value === "$font-data") return "var(--font-geist-mono)";
  if (value === "Inter") return "Inter Variable, sans-serif";
  if (value === "Newsreader") return "Newsreader Variable, serif";
  return value;
}

function cssValue(value?: string) {
  return value?.replaceAll("_", "-") as CSSProperties["alignItems"];
}

function spacing(value?: number | number[]) {
  if (typeof value === "number") return value;
  if (!value) return undefined;
  return value.length === 2 ? `${value[0]}px ${value[1]}px` : value.map((part) => `${part}px`).join(" ");
}

function radius(value?: number | number[]) {
  if (typeof value === "number") return value;
  return value?.map((part) => `${part}px`).join(" ");
}

function applyStroke(style: CSSProperties, color?: string, width?: number | Record<string, number>, dark = false) {
  if (!color) return;
  const stroke = resolveColor(color, dark);
  if (typeof width === "number" || width === undefined) {
    style.border = `${width ?? 1}px solid ${stroke}`;
    return;
  }
  if (width.top !== undefined) style.borderTop = `${width.top}px solid ${stroke}`;
  if (width.right !== undefined) style.borderRight = `${width.right}px solid ${stroke}`;
  if (width.bottom !== undefined) style.borderBottom = `${width.bottom}px solid ${stroke}`;
  if (width.left !== undefined) style.borderLeft = `${width.left}px solid ${stroke}`;
}
