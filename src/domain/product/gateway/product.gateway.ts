import { Product } from "../entity/product";

// interface que define os métodos que qualquer implementação de persistência de produtos deve ter
export interface ProductGateway {
    save(product: Product): Promise<void>
    list(): Promise<Product[]>
}