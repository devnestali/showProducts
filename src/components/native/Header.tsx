import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList
} from "@/components/ui/navigation-menu"

import { Separator } from "@/components/ui/separator"

export function Header() {
  return (
    <div>
      <header className="h-20 flex items-center justify-between p-8">
        <p>showProducts</p>

        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem className="flex items-center gap-12">
              <NavigationMenuLink asChild>
                <a href="/">Início</a>
              </NavigationMenuLink>
              <NavigationMenuLink asChild>
                <a href="/">Pedidos</a>
              </NavigationMenuLink>
              <NavigationMenuLink asChild>
                <a href="/">Grafico</a>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </header>

      <Separator />
    </div>
  )
}