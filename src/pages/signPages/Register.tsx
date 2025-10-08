import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import { api } from "@/lib/axios";
import { AxiosError } from "axios";

export function Register() {
  const [username, setUsername] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  
  const navigate = useNavigate()

  function onChangeUsernameInput(value: string) {
    setUsername(value)
  }

  function onChangeEmailInput(value: string) {
    setEmail(value)
  }

  function onChangePasswordInput(value: string) {
    setPassword(value)
  }
 
  function handleNavigationToLogin() {
    navigate('/')
  }

  async function registerNewUser() {
    if(!email || !username || !password) {
      alert('Todos os campos devem ser preenchidos.')
    }
    
    try {
      const response = await api.post('/user', {
      username,
      email,
      password
    })

    alert(response.data.message)
    handleNavigationToLogin()
    
    } catch (error) {
      if(error instanceof AxiosError) {
        alert(error.response?.data.message)
      } else {
        alert('Erro desconhecido. Entre em contato com o desenvolvedor.')
      }

    }
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
                placeholder="Digite o seu nome de usuário..."
                onChange={(event) => onChangeUsernameInput(event.target.value)}
                value={username}
              />
            </div>
            
            <div className="flex flex-col gap-3">
              <label htmlFor="email" className="text-sm">E-mail</label>
              <Input 
                type="email"
                id="email" 
                className="w-full" 
                placeholder="Digite o seu e-mail..."
                onChange={(event) => onChangeEmailInput(event?.target.value)}
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
                onChange={(event) => onChangePasswordInput(event?.target.value)}
                value={password}
              />
            </div>

            <div className="flex flex-col gap-3 mt-8">
              <Button 
                type="button"
                variant="default"
                onClick={() => registerNewUser()}
              >
                Registrar
              </Button>
              <Link 
                to="/"
                className="text-center hover:underline"
              >
                Voltar ao login
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}