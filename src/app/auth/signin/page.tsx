"use client"

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Sparkles, AlertCircle, Mail } from 'lucide-react'
import type React from 'react'
import { useState } from 'react'

import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className='text-center'>
          <div className='flex items-center justify-center gap-2-md'>
            <Sparkles className='w-8 h-8 text-purple-600' />
            <span className='text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent'>
              Chibi Studio AI</span>
          </div>
          <CardTitle className='text-2xl'>Fazer Login</CardTitle>
          <p className='text-gray-600'>Entre na sua conta para continuar</p>
        </CardHeader>

        <CardContent>
          {error && (
            <div className='mb-4 p-3 bg-red-200 rounded-lg flex flex-items gap-2 text-red-700'>
              <AlertCircle className='w-5 h-5 flex-shrink-0' />
              <span className='text-sm'>{error}</span>
            </div>
          )}

          <form className='space-4'>
            <div>
              <Label htmlFor='email'>Email</Label>
              <div className='relative'>
                <Mail className='absolute left-3 top-3 w-5 h-5 text-gray-400' />
                <Input
                  id="email"
                  type='email'
                  placeholder='seu@email.com'
                  value={}
                  className='pl-10'
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor='password'>Senha</Label>
              <div className='relative'>
                <Mail className='absolute left-3 top-3 w-5 h-5 text-gray-400' />
                <Input
                  id="password"
                  type='password'
                  placeholder='Sua senha'
                  value={}
                  className='pl-10'
                  required
                />
              </div>
            </div>

            <Button
              type='submit'
              className='w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700'
              disabled={}
            >


            </Button>
          </form>
          <div className='mt-6 text-center'>
            <p className='text-sm text-gray-600'>
              Não tem conta?{" "}
              <Link href="/auth/signup" className='text-purple-600 hover:underline font-medium'>
                Criar Conta Grátis
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>

  )
}
