import { NavigationMenu, NavigationMenuItem, NavigationMenuLink } from "@radix-ui/react-navigation-menu"
import { Link, useLocation } from "react-router"
import { NavigationMenuList } from "../ui/navigation-menu"
import { cn } from "@/lib/utils";


export const CustomMenu = () => {

  const { pathname } = useLocation();
  const isActive = (path: string) => {
    return pathname === path;
  }
  return (
    <NavigationMenu className="py-5">
      <NavigationMenuList>
        {/* Home */}
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={cn(isActive("/") && 'bg-slate-200', 'p-2 rounded-md')}>
            <Link to="/">Inicio</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        {/* Search */}
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={cn(isActive("/search") && 'bg-slate-200', 'p-2 rounded-md')}>
            <Link to="/search">Buscar superheroes</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

      </NavigationMenuList>
    </NavigationMenu>
  )
}
