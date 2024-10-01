
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface CreateCategorySublevel1Input {
    categorySublevel2?: Nullable<CreateCategorySublevel2InputNested[]>;
    desc?: Nullable<string>;
    name: string;
}

export interface CreateCategorySublevel2Input {
    categorySublevel1Id: number;
    desc?: Nullable<string>;
    name: string;
}

export interface CreateCategorySublevel2InputNested {
    desc?: Nullable<string>;
    name: string;
}

export interface CreateItemInput {
    amount: number;
    categoryId: number;
    costPrice: number;
    desc?: Nullable<string>;
    itemImg?: Nullable<string>;
    name: string;
    price: number;
}

export interface UpdateCategorySublevel1Input {
    categorySublevel2?: Nullable<Nullable<CreateCategorySublevel2Input>[]>;
    desc?: Nullable<string>;
    name?: Nullable<string>;
}

export interface UpdateCategorySublevel2Input {
    categorySublevel1Id?: Nullable<number>;
    desc?: Nullable<string>;
    name?: Nullable<string>;
}

export interface UpdateItemInput {
    amount?: Nullable<number>;
    categoryId?: Nullable<number>;
    costPrice?: Nullable<number>;
    desc?: Nullable<string>;
    itemImg?: Nullable<string>;
    name?: Nullable<string>;
    price?: Nullable<number>;
}

export interface CategorySublevel1 {
    categorySublevel2: CategorySublevel2[];
    desc?: Nullable<string>;
    id: number;
    name: string;
}

export interface CategorySublevel2 {
    categorySublevel1Id?: Nullable<number>;
    desc?: Nullable<string>;
    id: number;
    name: string;
}

export interface Item {
    amount: number;
    categoryId?: Nullable<number>;
    categorySubLevel1?: Nullable<CategorySublevel1>;
    costPrice: number;
    desc?: Nullable<string>;
    id?: Nullable<number>;
    itemImg?: Nullable<string>;
    name?: Nullable<string>;
    price: number;
}

export interface IMutation {
    createCategorySublevel1(input: CreateCategorySublevel1Input): Nullable<CategorySublevel1> | Promise<Nullable<CategorySublevel1>>;
    createCategorySublevel2(input: CreateCategorySublevel2Input): CategorySublevel2 | Promise<CategorySublevel2>;
    createCategoryWithSubcategories(input: CreateCategorySublevel1Input): CategorySublevel1 | Promise<CategorySublevel1>;
    createItem(input: CreateItemInput): Item | Promise<Item>;
    deleteCategory(id: number): CategorySublevel1 | Promise<CategorySublevel1>;
    deleteCategorySublevel2(id: number): CategorySublevel2 | Promise<CategorySublevel2>;
    deleteItem(id: number): Item | Promise<Item>;
    updateCategory(id: number, input: UpdateCategorySublevel1Input): CategorySublevel1 | Promise<CategorySublevel1>;
    updateCategorySublevel2(data: UpdateCategorySublevel2Input, id: number): CategorySublevel2 | Promise<CategorySublevel2>;
    updateItem(data: UpdateItemInput, id: number): Item | Promise<Item>;
}

export interface IQuery {
    getAllCategories(): Nullable<Nullable<CategorySublevel1>[]> | Promise<Nullable<Nullable<CategorySublevel1>[]>>;
    getAllCategorySublevel2(): CategorySublevel2[] | Promise<CategorySublevel2[]>;
    getAllItems(): Item[] | Promise<Item[]>;
    getCategorySublevel2ById(id: number): CategorySublevel2 | Promise<CategorySublevel2>;
    getCategoryWithId(id?: Nullable<number>): Nullable<CategorySublevel1> | Promise<Nullable<CategorySublevel1>>;
    getItemById(id: number): Nullable<Item> | Promise<Nullable<Item>>;
    getItemByName(name: string): Nullable<Item> | Promise<Nullable<Item>>;
}

type Nullable<T> = T | null;
