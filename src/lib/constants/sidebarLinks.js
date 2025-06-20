import {
  FaHome,
  FaEnvelope,
  FaBriefcase,
  FaThLarge,
  FaFileAlt,
  FaTags,
  FaUsers,
  FaImages,
  FaCogs,
  FaUser,
  FaBlog,
  FaQuoteRight,
  FaPhoneAlt,
  FaCalendarCheck,
  FaClipboardList,
  FaShieldAlt,
  FaUndoAlt,
  FaFileContract,
  FaInfoCircle,
  FaAddressCard,
} from "react-icons/fa";
import { Resources } from "../permissions";

export const ADMIN_SIDEBAR_LINKS = [
  {
    key: Resources.DASHBOARD,
    label: "Dashboard",
    href: "/admin",
    icon: <FaHome />,
  },
  {
    key: Resources.SERVICE_ORDERS,
    label: "Service Orders",
    href: "/admin/serviceOrders",
    icon: <FaClipboardList />,
  },
  // {
  //   key: Resources.CALL_ORDERS,
  //   label: "Call Orders",
  //   href: "/admin/callOrders",
  //   icon: <FaCalendarCheck />,
  // },
  {
    key: Resources.ENQUIRIES,
    label: "Enquiries",
    href: "/admin/enquiries",
    icon: <FaEnvelope />,
  },
  {
    key: Resources.SERVICES,
    label: "Services",
    href: "/admin/services",
    icon: <FaBriefcase />,
  },
  // {
  //   key: Resources.CALL_PLANS,
  //   label: "Call Plans",
  //   href: "/admin/callPlans",
  //   icon: <FaPhoneAlt />,
  // },
  {
    key: Resources.BLOGS,
    label: "Blogs",
    href: "/admin/blogs",
    icon: <FaBlog />,
  },
  {
    key: Resources.CATEGORIES,
    label: "Categories",
    href: "/admin/categories",
    icon: <FaThLarge />,
  },
  {
    key: Resources.TAGS,
    label: "Tags",
    href: "/admin/tags",
    icon: <FaTags />,
  },
  {
    key: Resources.MEDIA,
    label: "Media",
    href: "/admin/media",
    icon: <FaImages />,
  },
  {
    key: Resources.USERS,
    label: "Users",
    href: "/admin/users",
    icon: <FaUser />,
  },
  // {
  //     key: Resources.SETTINGS,
  //     label: 'Settings',
  //     href: '/admin/settings',
  //     icon: <FaCogs />,
  // },
  {
    key: Resources.TESTIMONIALS,
    label: "Testimonials",
    href: "/admin/testimonials",
    icon: <FaQuoteRight />,
  },
  // new policy & info pages
  {
    key: Resources.PRIVACY_POLICY,
    label: "Privacy Policy",
    href: "/admin/privacy-policy",
    icon: <FaShieldAlt />,
  },
  {
    key: Resources.REFUND_POLICY,
    label: "Refund Policy",
    href: "/admin/refund-policy",
    icon: <FaUndoAlt />,
  },
  {
    key: Resources.TERMS_AND_CONDITIONS,
    label: "Terms & Conditions",
    href: "/admin/terms-and-conditions",
    icon: <FaFileContract />,
  },
  // {
  //     key: Resources.ABOUT_US,
  //     label: 'About Us',
  //     href: '/admin/about-us',
  //     icon: <FaInfoCircle />,
  // },
  // {
  //     key: Resources.CONTACT_US,
  //     label: 'Contact Us',
  //     href: '/admin/contact-us',
  //     icon: <FaAddressCard />,
  // },
];

export const NAVBAR_LINKS = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Shop",
    href: "/shop",
  },
  {
    label: "Blogs",
    href: "/blogs",
  },
  {
    label: "About Us",
    href: "/about-us",
  },
  {
    label: "Our Story",
    href: "/our-story",
  },
  {
    label: "Contact Us",
    href: "/contact-us",
  },
];
