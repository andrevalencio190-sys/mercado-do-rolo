"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Plus } from "lucide-react"

interface AddProductDialogProps {
  onAdd: (produto: { nome: string; troca: string; categoria: string }) => void
}

const categorias = [
  "Eletrônicos",
  "Móveis",
  "Roupas",
  "Veículos",
  "Esportes",
  "Casa e Jardim",
  "Outros",
]

export function AddProductDialog({ onAdd }: AddProductDialogProps) {
  const [open, setOpen] = useState(false)
  const [nome, setNome] = useState("")
  const [troca, setTroca] = useState("")
  const [categoria, setCategoria] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (nome && troca) {
      onAdd({ nome, troca, categoria: categoria || "Outros" })
      setNome("")
      setTroca("")
      setCategoria("")
      setOpen(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg" className="gap-2 font-semibold shadow-lg hover:shadow-xl transition-shadow">
          <Plus className="size-5" />
          Anunciar Produto
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl">Anunciar Produto para Troca</DialogTitle>
          <DialogDescription>
            Preencha as informações do produto que você quer trocar.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="nome">Nome do produto</Label>
              <Input
                id="nome"
                placeholder="Ex: iPhone 12, Bicicleta, Sofá..."
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="categoria">Categoria</Label>
              <Select value={categoria} onValueChange={setCategoria}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione uma categoria" />
                </SelectTrigger>
                <SelectContent>
                  {categorias.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="troca">Aceita trocar por</Label>
              <Input
                id="troca"
                placeholder="Ex: Notebook, TV, Dinheiro..."
                value={troca}
                onChange={(e) => setTroca(e.target.value)}
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit">Publicar Anúncio</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
