import Category from "../models/CategoryModel";
import CategoryType from "../types/CategoryType";
import AbstractCrudController from "./AbstractCrudController";

export default class CategoryController extends AbstractCrudController<Category> {
    constructor() {
        super(Category);
    }

    async create(data: Omit<CategoryType, "id">): Promise<Category | null> {
        return super.create(data);
    }

    async updateById(id: number, data: CategoryType): Promise<Boolean> {
        return super.updateById(id, data);
    }
}
