export namespace DB {
  type ShoppingLocation = {
    id: number;
    name: string;
    description: string | null;
    address: string | null;
    color: number | null;
    image: string | null;
    pending: 1 | 2;
  };

  type FoodLocation = {
    id: number;
    name: string;
    description: string | null;
    address: string | null;
    color: number | null;
    image: string | null;
    pending: 1 | 2;
  };

  type FishingLocation = {
    id: number;
    name: string;
    description: string | null;
    color: number | null;
    image: string | null;
    gmapurl: string | null;
    accessibility: string | null;
    fish: string | null;
    pending: 1 | 2;
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

  type UpdateShoppingLocationRequest = {
    name?: string | undefined;
    description?: string | undefined | null;
    address?: string | undefined | null;
    color?: string | undefined | null;
    image?: string | undefined | null;
  }

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

  type UpdateFoodLocationRequest = {
    name?: string | undefined;
    description?: string | undefined | null;
    address?: string | undefined | null;
    color?: string | undefined | null;
    image?: string | undefined | null;
  };

  type FishingLocation = {
    id: number;
    name: string;
    description?: string | undefined;
    color?: string | undefined;
    image: string;
    gmapurl?: string | undefined;
    fish?: string | undefined;
    accessibility?: string | undefined;
  };

  type FishingLocationsResponse = {
    data: FishingLocation[];
    error: null;
  } | {
    data: null;
    error: {
      name: string;
      message: string;
    };
  };

  type NewFishingLocationRequest = {
    name: string;
    description?: string | undefined;
    color?: string | undefined;
    image?: string | undefined;
    gmapurl?: string | undefined;
    fish?: string | undefined;
    accessibility?: string | undefined;
  };

  type UpdateFishingLocationRequest = {
    name?: string | undefined;
    description?: string | undefined | null;
    color?: string | undefined | null;
    image?: string | undefined | null;
    gmapurl?: string | undefined;
    fish?: string | undefined;
    accessibility?: string | undefined | null;
  };
}
