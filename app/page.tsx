"use client"

import { useState } from "react"
import { ProductCard } from "@/components/product-card"
import { AddProductDialog } from "@/components/add-product-dialog"
import { NegotiateDialog } from "@/components/negotiate-dialog"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ArrowLeftRight, Search, Sparkles, TrendingUp, Users } from "lucide-react"

interface Product {
  id: string
  nome: string
  troca: string
  categoria?: string
}

const produtosIniciais: Product[] = [
  { id: "1", nome: "iPhone 12 Pro", troca: "MacBook ou Notebook gamer", categoria: "Eletrônicos" },
  { id: "2", nome: "Bicicleta Caloi 29", troca: "Smartphone ou Videogame", categoria: "Esportes" },
  { id: "3", nome: "Sofá 3 lugares", troca: "Mesa de jantar ou Guarda-roupa", categoria: "Móveis" },
  { id: "4", nome: "PlayStation 5", troca: "Xbox Series X ou PC Gamer", categoria: "Eletrônicos" },
  { id: "5", nome: "Guitarra Fender", troca: "Bateria ou Violão", categoria: "Outros" },
  { id: "6", nome: "Smart TV 55 polegadas", troca: "Notebook ou Tablet", categoria: "Eletrônicos" },
]

const categorias = ["Todos", "Eletrônicos", "Móveis", "Roupas", "Veículos", "Esportes", "Casa e Jardim", "Outros"]

export default function MercadoDoRolo() {
  const [produtos, setProdutos] = useState<Product[]>(produtosIniciais)
  const [busca, setBusca] = useState("")
  const [categoriaAtiva, setCategoriaAtiva] = useState("Todos")
  const [produtoNegociando, setProdutoNegociando] = useState<Product | null>(null)
  const [dialogAberto, setDialogAberto] = useState(false)

  const adicionarProduto = (produto: { nome: string; troca: string; categoria: string }) => {
    const novoProduto: Product = {
      id: Date.now().toString(),
      ...produto,
    }
    setProdutos([novoProduto, ...produtos])
  }

  const handleNegociar = (produto: Product) => {
    setProdutoNegociando(produto)
    setDialogAberto(true)
  }

  const produtosFiltrados = produtos.filter((produto) => {
    const matchBusca = 
      produto.nome.toLowerCase().includes(busca.toLowerCase()) ||
      produto.troca.toLowerCase().includes(busca.toLowerCase())
    const matchCategoria = categoriaAtiva === "Todos" || produto.categoria === categoriaAtiva
    return matchBusca && matchCategoria
  })

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <header className="bg-primary">
        <div className="container mx-auto px-4 py-12 md:py-20">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="size-12 rounded-xl bg-primary-foreground/10 flex items-center justify-center">
                <ArrowLeftRight className="size-6 text-primary-foreground" />
              </div>
              <h1 className="text-3xl md:text-5xl font-black text-primary-foreground tracking-tight">
                Mercado do Rolo
              </h1>
            </div>
            <p className="text-lg md:text-xl text-primary-foreground/80 mb-8 max-w-xl">
              Aqui tudo vira negócio. Troque seus produtos com outras pessoas de forma fácil e segura.
            </p>
            <AddProductDialog onAdd={adicionarProduto} />
          </div>
        </div>
      </header>

      {/* Stats Section */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-3 gap-4 md:gap-8 max-w-2xl">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <TrendingUp className="size-5 text-primary" />
              </div>
              <div>
                <p className="text-xl md:text-2xl font-bold text-foreground">{produtos.length}</p>
                <p className="text-xs md:text-sm text-muted-foreground">Anúncios ativos</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-lg bg-accent/20 flex items-center justify-center shrink-0">
                <Users className="size-5 text-accent" />
              </div>
              <div>
                <p className="text-xl md:text-2xl font-bold text-foreground">1.2k</p>
                <p className="text-xs md:text-sm text-muted-foreground">Usuários</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-lg bg-green-500/10 flex items-center justify-center shrink-0">
                <Sparkles className="size-5 text-green-600" />
              </div>
              <div>
                <p className="text-xl md:text-2xl font-bold text-foreground">847</p>
                <p className="text-xs md:text-sm text-muted-foreground">Trocas feitas</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Search and Filter */}
        <div className="mb-8 space-y-4">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
            <Input
              placeholder="Buscar produtos ou trocas..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="pl-10 h-12 text-base"
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            {categorias.map((cat) => (
              <Badge
                key={cat}
                variant={categoriaAtiva === cat ? "default" : "secondary"}
                className="cursor-pointer px-4 py-2 text-sm transition-colors hover:bg-primary hover:text-primary-foreground"
                onClick={() => setCategoriaAtiva(cat)}
              >
                {cat}
              </Badge>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        {produtosFiltrados.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {produtosFiltrados.map((produto) => (
              <ProductCard 
                key={produto.id} 
                product={produto} 
                onNegociar={handleNegociar}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="size-20 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
              <Search className="size-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Nenhum produto encontrado</h3>
            <p className="text-muted-foreground">
              Tente ajustar sua busca ou filtros para encontrar mais resultados.
            </p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t mt-12 bg-card">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <ArrowLeftRight className="size-5 text-primary" />
              <span className="font-bold text-foreground">Mercado do Rolo</span>
            </div>
            <p className="text-sm text-muted-foreground text-center">
              © 2026 Mercado do Rolo. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>

      {/* Negotiate Dialog */}
      <NegotiateDialog 
        product={produtoNegociando}
        open={dialogAberto}
        onOpenChange={setDialogAberto}
      />
    </div>
  )
}
