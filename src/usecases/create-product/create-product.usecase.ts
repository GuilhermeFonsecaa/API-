import { Product } from "../../domain/product/entity/product";
import { ProductGateway } from "../../domain/product/gateway/product.gateway"
import { Usecase } from "../usecase"

//operações entre as entidades e os gateways para realizar ações específicas no sistema

export type CreateProductInputDto = {
    name: string;
    price: number;
}

export type CreateProductOutputDto = {
    id: string;
}

export class CreateProductUseCase implements Usecase<CreateProductInputDto, CreateProductOutputDto> {

    private constructor(private readonly productGateway: ProductGateway) { }

    public static create(productGateway: ProductGateway) {
        return new CreateProductUseCase(productGateway);
    }

    //cria uma nova instância da entidade Product, salva-a usando o ProductGateway, e então retorna os dados do produto criado
    public async execute({ name, price }: CreateProductInputDto): Promise<CreateProductOutputDto> {
        const product = Product.create(name, price);

        await this.productGateway.save(product); 

        const output = this.presentOutput(product);

        return output;
    }

    private presentOutput(product: Product): CreateProductOutputDto {
        const output: CreateProductOutputDto = {
            id: product.id
        }
        return output;
    }
}