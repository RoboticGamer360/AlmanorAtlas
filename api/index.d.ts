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

  type FishingLocation = {
    id: number;
    name: string;
    description: string | null;
    color: number | null;
    image: string | null;
    location: string;
    accessibility: string;
  };

  type Fish = {
    id: number;
    name: string;
  };

  type Bait = {
    id: number;
    name: string;
  };

  type FishingLocationFish = {
    location_id: number;
    fish_id: number;
  };

  type FishingLocationBait = {
    location_id: number;
    bait_id: number;
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

  type FishingLocation = {
    id: number;
    name: string;
    description?: string | undefined;
    color?: string | undefined;
    image: string;
    location: string;
    bait: string[];
    fish: string[];
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
    location: string;
    bait: string[];
    fish: string[];
    accessibility?: string | undefined;
  };
}
