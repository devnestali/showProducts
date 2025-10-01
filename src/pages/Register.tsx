import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

export function Register() {
  const navigate = useNavigate()

  function handleNavigationToLogin() {
    navigate('/login')
  }
  
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <Card className="h-[520px] w-[520px] p-8">
        <CardHeader>
          <CardTitle className="text-lg">Registre-se na aplicação</CardTitle>
          <CardDescription>Introduza seus dados e tenha acesso a plataforma.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-4">
            <div className="flex flex-col gap-3">
              <label htmlFor="username" className="text-sm">Nome de usuário</label>
              <Input 
                type="text"
                id="username" 
                className="w-full" 
                placeholder="Digite o seu e-mail..." 
              />
            </div>
            
            <div className="flex flex-col gap-3">
              <label htmlFor="email" className="text-sm">E-mail</label>
              <Input 
                type="email"
                id="email" 
                className="w-full" 
                placeholder="Digite o seu e-mail..." 
              />
            </div>
            
            <div className="flex flex-col gap-3">
              <label htmlFor="password" className="text-sm">Senha</label>
              <Input 
                type="password"
                id="password" 
                className="w-full" 
                placeholder="Digite o sua senha..." 
              />
            </div>

            <div className="flex flex-col gap-3 mt-8">
              <Button variant="default">Registrar</Button>
              <Button 
                variant="link"
                onClick={() => handleNavigationToLogin()}
              >
                Voltar ao login
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}