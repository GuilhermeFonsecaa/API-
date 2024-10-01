import { Request, Response } from "express"
import { ListProductOutputDto, ListProductUseCase } from "../../../../../usecases/list-product/list-product.usecase"
import { HttpMethod, Route } from "../route"

export type ListProductResponseDto = {
    products: {
        id: string,
        name: string,
        price: number,
        quantity: number
    }[]
}

export class ListProductRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly listProductUseCase: ListProductUseCase
    ) { }


    public getPath(): string {
        return this.path;
    }

    public getMethod(): HttpMethod {
        return this.method
    }

    public static create(listProductUseCase: ListProductUseCase) {
        return new ListProductRoute(
            "/products",
            HttpMethod.GET,
            listProductUseCase
        )
    }

    private present(input: ListProductResponseDto): ListProductResponseDto {
        const response: ListProductResponseDto = {
            products: input.products.map((product) => ({
                id: product.id,
                name: product.name,
                price: product.price,
                quantity: product.quantity,
            }),
            )
        }
        return response;
    }


    public getHandler() {
        return async (request: Request, response: Response) => {
            const output: ListProductOutputDto = await this.listProductUseCase.execute();
            const responseBody = this.present(output);
            response.status(200).json(responseBody).send();
        }
    }


}