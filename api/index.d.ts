export namespace DB {
  type ShoppingLocation = {
    id: number;
    name: string;
    description: string | null;
    address: string | null;
    color: number | null;
    image: string | null;
  };

  type FoodLocation = {
    id: number;
    name: string;
    description: string | null;
    address: string | null;
    color: number | null;
    image: string | null;
  };
}

export namespace API {
  type ShoppingLocation = {
    id: number;
    name: string;
    description?: string | undefined;
    address?: string | undefined;
    color?: string | undefined;
    image: string;
  };

  type ShoppingLocationsResponse = {
    data: ShoppingLocation[];
    error: null;
  } | {
    data: null;
    error: {
      name: string;
      message: string;
    };
  };

  type NewShoppingLocationRequest = {
    name: string;
    description?: string | undefined;
    address?: string | undefined;
    color?: string | undefined;
    image?: string | undefined;
  };

  type FoodLocation = {
    id: number;
    name: string;
    description?: string | undefined;
    address?: string | undefined;
    color?: string | undefined;
    image: string;
  };

  type FoodLocationsResponse = {
    data: ShoppingLocation[];
    error: null;
  } | {
    data: null;
    error: {
      name: string;
      message: string;
    };
  };

  type NewFoodLocationRequest = {
    name: string;
    description?: string | undefined;
    address?: string | undefined;
    color?: string | undefined;
    image?: string | undefined;
  };
}
