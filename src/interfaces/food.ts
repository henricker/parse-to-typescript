
export type FoodType = {
    id: number,
    name: string,
    description: string,
    price: number,
    available: boolean,
    image: string
}

export type CreateFoodType = Omit<FoodType, 'id'>;