import { Product } from "../../domain/product/entity/product";
import { ProductGateway } from "../../domain/product/gateway/product.gateway";
import { CreateProductUseCase } from "../create-product/create-product.usecase";
import { Usecase } from "../usecase";

//operações entre as entidades e os gateways para realizar ações específicas no sistema

export type ListProductInputDto = void;

export type ListProductOutputDto = {
    products: {
        id: string;
        name: string;
        price: number;
        quantity: number
    }[]
}

export class ListProductUseCase implements Usecase<ListProductInputDto, ListProductOutputDto> {
    private constructor(private readonly productGateway: ProductGateway) { }

    public static create(productGateway: ProductGateway) {
        return new ListProductUseCase(productGateway);
    }

//salva em products os produtos que vieram do list do product gateway e retorna os dados dos produtos

    public async execute(): Promise<ListProductOutputDto> {
        const products = await this.productGateway.list();

        const output = this.presentOutput(products);

        return output;
    }

    private presentOutput(products: Product[]): ListProductOutputDto {
        return {
            products: products.map((product) => {
                return {
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    quantity: product.quantity
                }
            })
        }
    }

}