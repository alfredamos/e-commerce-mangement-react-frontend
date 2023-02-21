import { useEffect } from "react";
import { returnUrlRxJs } from "../store/return-url-rxjs.store";


export function useReturnUrl(url: string): void{
    useEffect(() => {
        returnUrlRxJs.updateData$(url);
    },[url])
}