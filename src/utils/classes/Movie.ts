import { MovieDetail, MovieResponse } from "../types/movie";
import { client } from "../services/client";

export default class Movie {
  private path: string;

  constructor(path: string) {
    this.path = path;
  }

  public getList = async (type: string) => {
    const url = `/${this.path}/${type}`;
    const result = await client.get<MovieResponse>(url);
    return result.data;
  };

  public getDetail = async (id: number) => {
    const url = `/${this.path}/${id}`;
    const result = await client.get<MovieDetail>(url);
    return result.data;
  };

  public search = async (keyword: string) => {
    const result = await client.get<MovieResponse>(this.path, {
      params: {
        query: keyword,
      },
    });
    return result.data;
  };
}
