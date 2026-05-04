"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { ArrowLeftRight, Send, CheckCircle } from "lucide-react"

interface Product {
  id: string
  nome: string
  troca: string
  categoria?: string
}

interface NegotiateDialogProps {
  product: Product | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function NegotiateDialog({ product, open, onOpenChange }: NegotiateDialogProps) {
  const [mensagem, setMensagem] = useState("")
  const [enviado, setEnviado] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setEnviado(true)
    setTimeout(() => {
      setEnviado(false)
      setMensagem("")
      onOpenChange(false)
    }, 2000)
  }

  if (!product) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[450px]">
        {enviado ? (
          <div className="py-8 flex flex-col items-center gap-4">
            <div className="size-16 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle className="size-8 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-center">Proposta Enviada!</h3>
            <p className="text-muted-foreground text-center">
              O dono do produto receberá sua proposta em breve.
            </p>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-xl">Fazer Proposta</DialogTitle>
              <DialogDescription>
                Envie uma proposta de troca para este produto.
              </DialogDescription>
            </DialogHeader>
            
            <div className="bg-muted rounded-lg p-4 my-2">
              <div className="flex items-center gap-3 mb-2">
                <div className="size-10 rounded-lg bg-primary/20 flex items-center justify-center">
                  <ArrowLeftRight className="size-5 text-primary" />
                </div>
                <div>
                  <p className="font-bold">{product.nome}</p>
                  <p className="text-sm text-muted-foreground">Troca por: {product.troca}</p>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-2">
                <div className="grid gap-2">
                  <Label htmlFor="mensagem">Sua proposta</Label>
                  <Textarea
                    id="mensagem"
                    placeholder="Descreva o que você tem para oferecer em troca..."
                    value={mensagem}
                    onChange={(e) => setMensagem(e.target.value)}
                    rows={4}
                    required
                  />
                </div>
              </div>
              <DialogFooter className="mt-4">
                <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                  Cancelar
                </Button>
                <Button type="submit" className="gap-2">
                  <Send className="size-4" />
                  Enviar Proposta
                </Button>
              </DialogFooter>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
