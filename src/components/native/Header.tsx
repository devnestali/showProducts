import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList
} from "@/components/ui/navigation-menu"
import { Separator } from "@/components/ui/separator"


import { LogOut } from 'lucide-react'

import { Link } from "react-router-dom"
import { Button } from "../ui/button"
import { useAuth } from "@/contexts/authContext"

export function Header() {
  const { signOut, isAdmin } = useAuth()
  
  function handleSignOut() {
    try {
      signOut()
    } catch (error) {
      alert('Não foi possível sair da aplicação.')
    }
  }

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
              {
                isAdmin && (
                  <NavigationMenuLink asChild>
                    <Link to="/graph">Grafico</Link>
                  </NavigationMenuLink>
                )
              }
              <NavigationMenuLink asChild>
                <Button 
                  type="button"
                  className=" cursor-pointer"
                  onClick={() => handleSignOut()}
                >
                  <div className="flex items-center gap-2">
                    <LogOut color="#000000" />
                    Sair
                  </div>
                </Button>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </header>

      <Separator />
    </div>
  )
}