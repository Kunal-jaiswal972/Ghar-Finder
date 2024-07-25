export const DEV_MODE = false;
export const toastOptions = { duration: 4000, position: "top-center" };
export const initialZoomLvl = 8;
export const animationDuration = 2;

export const cityOptions = ["london", "delhi", "new york"];
export const typeOptions = ["buy", "rent"];
export const propertyOptions = ["apartment", "house", "condo", "land"];

export const navItems = [
  {
    title: "Home",
    link: "/",
  },
  {
    title: "About",
    link: "/about",
  },
  {
    title: "Contacts",
    link: "/contacts",
  },
];
export const sideBarItems = [
  ...navItems,
  {
    title: "Sign In",
    link: "/sign-in",
  },
  {
    title: "Sign Up",
    link: "/sign-up",
  },
];
