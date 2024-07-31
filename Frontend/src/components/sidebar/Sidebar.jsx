import { useLocation, useNavigate } from "react-router-dom";
import { LogOutIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { navItems } from "@/config/config";

import { Button } from "@/components/ui/button";
import { SignOutButton, UserButton } from "@clerk/clerk-react";
import { useGetUserQuery } from "@/services/queries";

const Sidebar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { isSignedIn, user } = useGetUserQuery();

  const signOutOptions = [
    { title: "Sign In", link: "/sign-in" },
    { title: "Sign Up", link: "/sign-up" },
  ];

  return (
    <div className="space-y-4 flex flex-col h-full text-primary bg-secondary">
      <div className="p-3 flex flex-1 justify-between flex-col">
        <div className="space-y-2">
          {isSignedIn ? (
            <div className="flex items-center gap-2 mb-5">
              <UserButton afterSignOutUrl="/" />
              {user.firstName}
            </div>
          ) : (
            signOutOptions.map((items) => (
              <SideBarBtns
                key={items.title}
                items={items}
                pathname={pathname}
                onNavigate={navigate}
              />
            ))
          )}

          {navItems.map((items) => (
            <SideBarBtns
              key={items.title}
              items={items}
              pathname={pathname}
              onNavigate={navigate}
            />
          ))}
        </div>

        {isSignedIn && (
          <SignOutButton signOutOptions={{ redirectUrl: "/sign-in" }}>
            <Button variant="destructive" className="space-x-2">
              <span>Log Out</span>
              <LogOutIcon />
            </Button>
          </SignOutButton>
        )}
      </div>
    </div>
  );
};

const SideBarBtns = ({ items, onNavigate, pathname }) => {
  return (
    <div
      onClick={() => onNavigate(items.link)}
      className={cn(
        "text-muted-foreground text-xs group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-primary hover:bg-primary/10 rounded-lg transition",
        pathname === items.link && "bg-primary/10 text-primary"
      )}
    >
      {items.title}
    </div>
  );
};

export default Sidebar;
