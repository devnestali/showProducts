import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList
} from "@/components/ui/navigation-menu"

import { Separator } from "@/components/ui/separator"

import { Link } from "react-router-dom"

export function Header() {
  return (
    <div>
      <header className="h-20 flex items-center justify-between p-8">
        <p>showProducts</p>

        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem className="flex items-center gap-12">
              <NavigationMenuLink asChild>
                <Link to="/">Início</Link>
              </NavigationMenuLink>
              <NavigationMenuLink asChild>
                <Link to="/orders-graph">Grafico</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </header>

      <Separator />
    </div>
  )
}