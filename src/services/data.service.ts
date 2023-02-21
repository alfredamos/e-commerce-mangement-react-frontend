import Axios from "../utils/axios.util";


export class DataService<T>{
    async create(url:string, resource: T): Promise<T>{
        const response = await Axios.post(url, resource);
        const data: T = response.data;
        return data;
    }

    async delete(url:string): Promise<T>{
        const response = await Axios.delete(url);
        const data: T = response.data;
        return data;
    }

    async update(url:string, resource: T): Promise<T>{
        const response = await Axios.patch(url, resource);
        const data: T = response.data;
        return data;
    }

    async findOne(url:string): Promise<T>{
        const response = await Axios.get(url);
        const data: T = response.data;
        return data;
    }

    async findAll(url:string): Promise<T[]>{
        const response = await Axios.get(url);
        const data: T[] = response.data;
        return data;
    }
}