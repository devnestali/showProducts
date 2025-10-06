import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import { api } from "@/lib/axios";

type UserInfoData = {
  id: number
  token: string
}

export function Login() {
  const [email, setEmail] = useState<string>()
  const [password, setPassword] = useState<string>()
  
  
  const navigate = useNavigate()
  
  function handleNavigationToRegister() {
    navigate('/register')
  }

  function onChangeEmailInput(value: string) {
    setEmail(value)
  }

  function onChangePasswordInput(value: string) {
    setPassword(value)
  }

  async function initializeSession(event: React.FormEvent) {
    event.preventDefault()
    
    try {
      const { data } = await api.post('/session', { email, password })

      const userInfo: UserInfoData = {
        id: data.user.id,
        token: data.token
      }

      localStorage.setItem('@showProducts@user:id', String(userInfo.id))
      localStorage.setItem('@showProducts@user:token', userInfo.token)

      alert('Usuário logado com sucesso.')
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
              />
            </div>

            <div className="flex flex-col gap-3 mt-8">
              <Button 
                variant="default"
                onClick={(event) => initializeSession(event)}
                >
                  Entrar
                  </Button>
              <Button 
                variant="link"
                onClick={() => handleNavigationToRegister()}
              >
                Registrar-se
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}