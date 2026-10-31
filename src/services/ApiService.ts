import axios, { Axios, AxiosError, AxiosRequestConfig } from "axios";

interface RequestParams {
  endpoint: string;
  data?: object;
  params?: object;
  contentType?: string;
}

export class ApiService {
  private readonly instance: Axios;

  constructor(baseUrl: string) {
    this.instance = axios.create({
      baseURL: baseUrl,
      timeout: 30000,
    });

    this.instance.interceptors.request.use(
      (config) => {
        const headers: any = config.headers;
        const accessToken = "";

        if (accessToken) {
          headers.Authorization = `Bearer ${accessToken}`;
        }

        return { ...config, headers };
      },
      (error) => Promise.reject(error),
    );

    this.instance.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        if (error.response?.status === 401) {
          // logout
        }
        return Promise.reject(error);
      },
    );
  }

  protected async get<T>({ endpoint, params }: RequestParams) {
    const config: AxiosRequestConfig = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      url: endpoint,
      params,
    };
    return (await this.instance.request<T>(config)).data;
  }

  protected async post<T>({ endpoint, data }: RequestParams) {
    const config: AxiosRequestConfig = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      url: endpoint,
      data,
    };
    return (await this.instance.request<T>(config)).data;
  }

  protected async put<T>({ endpoint, data }: RequestParams) {
    const config: AxiosRequestConfig = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      url: endpoint,
      data,
    };
    return (await this.instance.request<T>(config)).data;
  }

  protected async delete<T>({ endpoint, data }: RequestParams) {
    const config: AxiosRequestConfig = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      url: endpoint,
      data,
    };
    return (await this.instance.request<T>(config)).data;
  }
}

export const apiService = new ApiService("");
