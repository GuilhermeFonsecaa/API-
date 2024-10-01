import { ApiExpress } from "./infra/api/express/api.express";
import { CreateProductRoute } from "./infra/api/express/routes/product/create-product.route";
import { ListProductRoute } from "./infra/api/express/routes/product/list-product.route";
import { ProductRepositoryPrisma } from "./infra/repositories/product/product.repository.prisma";
import { prisma } from "./package/prisma/prisma";
import { CreateProductUseCase } from "./usecases/create-product/create-product.usecase";
import { ListProductUseCase } from "./usecases/list-product/list-product.usecase";

function main() {

    const repository = ProductRepositoryPrisma.create(prisma);

    const createProductUseCase = CreateProductUseCase.create(repository);
    const listProductUseCase = ListProductUseCase.create(repository);

    const createRoute = CreateProductRoute.create(createProductUseCase);
    const listRoute = ListProductRoute.create(listProductUseCase);

    const port = 8000;

    const api = ApiExpress.create([createRoute, listRoute]);

    api.start(port);

}

main();