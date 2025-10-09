import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/authContext";

export function Login() {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  
  const navigate = useNavigate()
  const { signIn } = useAuth()

  function onChangeEmailInput(value: string) {
    setEmail(value)
  }

  function onChangePasswordInput(value: string) {
    setPassword(value)
  }

  async function initializeSession() {
    try {
      signIn(email, password)
      
      navigate('/')
    } catch (error) {
      console.error(error)
    }
  }
  
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <Card className="h-[430px] w-[520px] p-8">
        <CardHeader>
          <CardTitle className="text-lg">Fazer Login</CardTitle>
          <CardDescription>Entre na sua conta para acessar seu painel.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-4">
            <div className="flex flex-col gap-3">
              <label htmlFor="email" className="text-sm">E-mail</label>
              <Input 
                type="email"
                id="email" 
                className="w-full" 
                placeholder="Digite o seu e-mail..."
                onChange={(event) => onChangeEmailInput(event.target.value)}
                value={email}
              />
            </div>
            
            <div className="flex flex-col gap-3">
              <label htmlFor="password" className="text-sm">Senha</label>
              <Input 
                type="password"
                id="password" 
                className="w-full" 
                placeholder="Digite o sua senha..."
                onChange={(event) => onChangePasswordInput(event.target.value)}
                value={password}
              />
            </div>

            <div className="flex flex-col gap-3 mt-8">
              <Button 
                type="submit"
                variant="default"
                onClick={() => initializeSession()}
                >
                  Entrar
                  </Button>
              <Link 
                to="/register"
                className="text-center hover:underline"
              >
                Registrar-se
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}