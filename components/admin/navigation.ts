import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Image,
  Settings,
} from "lucide-react";

export const navigation = [
  {
    name: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    name: "Products",
    href: "/admin/products",
    icon: Package,
  },
  {
    name: "Orders",
    href: "/admin/orders",
    icon: ShoppingCart,
  },
  {
    name: "Gallery",
    href: "/admin/gallery",
    icon: Image,
  },
  {
    name: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
];