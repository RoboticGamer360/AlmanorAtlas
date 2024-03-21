export namespace DB {
  type Location = {
    id: number;
    name: string;
    description: string | null;
    address: string | null;
    category: string;
    color: number | null;
    image: string | null;
  };
}

export namespace API {
  type Location = {
    id: number;
    name: string;
    description?: string | undefined;
    address?: string | undefined;
    category: string;
    color?: string | undefined;
    image: string;
  };

  type LocationsResponse = {
    data?: Location[] | undefined;

    error?: {
      name: string;
      message: string;
    } | undefined;
  };

  type NewLocationRequest = {
    name: string;
    description: string;
    address?: string | undefined;
    category: string;
    color?: string | undefined;
    image?: string | undefined;
  };
}
