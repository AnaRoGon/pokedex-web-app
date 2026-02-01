import type { PaginatorPageChangeEvent } from "primereact/paginator";
import { useEffect, useState } from "react";

export const usePaginator = () => {
  const [first, setFirst] = useState<number>(() => {
    const stored = sessionStorage.getItem("first-state");
    return stored ? Number(stored) : 0;
  });
  const [rows, setRows] = useState(20);

  useEffect(() => {
    sessionStorage.setItem("first-state", "" + first);
  }, [first]);

  const onPageChange = (event: PaginatorPageChangeEvent) => {
    setFirst(event.first);
    setRows(event.rows);
  };

  return { first, rows, onPageChange, setFirst };
};
