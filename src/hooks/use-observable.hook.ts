import { useEffect, useState } from "react";
import { Observable } from "rxjs";

export function useObservable<T>(source$: Observable<T>, initialData: T): T {
  const [data, setData] = useState(initialData);

  useEffect(() => {
    if(source$){
      const subs = source$.subscribe(setData);
    
      return () => {
        subs.unsubscribe();
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [source$]);

  return data;
}
