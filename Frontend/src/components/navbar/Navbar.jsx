import { Link } from "react-router-dom";
import { UserButton } from "@clerk/clerk-react";
import { useMediaQuery } from "react-responsive";
import { Bell } from "lucide-react";

import { navItems } from "@/config/config";
import { Button, buttonVariants } from "@/components/ui/button";
import { MobileSidebar } from "@/components/sidebar/MobileSidebar";
import { ModeToggle } from "@/components/themes/mode-toggle";
import { useGetUserQuery } from "@/services/queries";

const Navbar = () => {
  const { isSignedIn } = useGetUserQuery();
  const isMobile = useMediaQuery({ query: "(max-width: 640px)" });

  return (
    <nav className="h-[80px] flex justify-between items-center gap-8">
      <div className="flex flex-3 items-center gap-1">
        <Link className="flex items-center gap-2 font-bold text-lg mr-3" to="/">
          <img
            src="/logo.png"
            alt="logo"
            className="w-[24px] h-[24px] dark:invert"
          />
          <span className="block sm:hidden md:block">GharFinder</span>
        </Link>
        {navItems.map((item) => (
          <Link
            to={item.link}
            key={item.title}
            className={`${buttonVariants({
              variant: "link",
            })} hidden sm:flex`}
          >
            {item.title}
          </Link>
        ))}
      </div>

      <div className="flex flex-2 items-center justify-end h-full px-2 gap-4">
        <ModeToggle />
        {isSignedIn ? (
          <div className="hidden sm:flex items-center justify-between gap-4">
            <UserButton afterSignOutUrl="/" />
            <Button variant="outline" size="icon">
              <Bell />
            </Button>
          </div>
        ) : (
          <div className="hidden sm:flex items-center justify-between gap-4">
            <Button size="sm" asChild>
              <Link to="/sign-in">Sign In</Link>
            </Button>
            <Button size="sm" variant="outline" asChild>
              <Link to="/sign-up">Sign Up</Link>
            </Button>
          </div>
        )}

        {isMobile && <MobileSidebar />}
      </div>
    </nav>
  );
};

export default Navbar;
