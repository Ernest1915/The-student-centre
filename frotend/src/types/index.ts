import React from "react";
import { Url } from "url";

export type IContextType = {
  user: IUser;
  isLoading: boolean;
  setUser: React.Dispatch<React.SetStateAction<IUser>>;
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  checkAuthUser: () => Promise<boolean>;
};

export type INavLink = {
  imgURL: string;
  route: string;
  label: string;
};

export type IHomeLink = {
  route: string;
  label: string;
};

export type IUser = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  bio: string;
};
export type ICafeteria = {
  id: string;
  name: string;
  cuisine: string;
  price_range: string;
  rating: number;
  cafe_image: string;

  


}
export type Meal = {
  id: number;
  name: string;
  price: number;
}
export type INewUser = {
  name: string;
  email: string;
  password: string;
};

export type IHeader = {
  name: string;
  className?: string;
};

export type IUniversity = {
  id: string;
  name: string;
  img: string;
  description: string;
};

export type ICell = {
  value: React.ReactNode;
  className?: string;
};
export type ICardHeader = {
  title: string;
};

export type IDataRow = {
  name: string;
  packageId: string;
  type: string;
  amount: string;
  duration: string;
  interest: number;
};

export type ITrend = {
  user_id: string;
  user_name: string;
  location: string;
  caption: string;
  media_url: string;
};
export type IHostel = {
  $id: string;
  name: string;
  Availability: string;
  package: string;
};

export type HostelType = {
  id: string;
  name: string;
  availability: boolean;
  package: string;
  image?: string;
  location?: string;
  description?: string;
};


export type IRow = ICell[];
export type IData = IRow[];

