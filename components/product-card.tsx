"use client"

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeftRight, MessageCircle, Package } from "lucide-react"

interface Product {
  id: string
  nome: string
  troca: string
  categoria?: string
}

interface ProductCardProps {
  product: Product
  onNegociar: (product: Product) => void
}

export function ProductCard({ product, onNegociar }: ProductCardProps) {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/50 bg-card">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-3">
            <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Package className="size-6 text-primary" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-card-foreground leading-tight">{product.nome}</h3>
              {product.categoria && (
                <Badge variant="secondary" className="mt-1 text-xs">
                  {product.categoria}
                </Badge>
              )}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="flex items-center gap-2 p-3 rounded-lg bg-muted">
          <ArrowLeftRight className="size-4 text-accent shrink-0" />
          <span className="text-sm text-muted-foreground">
            Troca por: <span className="font-medium text-foreground">{product.troca}</span>
          </span>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={() => onNegociar(product)} 
          className="w-full gap-2 font-semibold"
        >
          <MessageCircle className="size-4" />
          Negociar
        </Button>
      </CardFooter>
    </Card>
  )
}
