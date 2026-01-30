import { useRef } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import type { Character } from "../../types/character";
import { TableRow } from "./TableRow";
import { TableHeader } from "./TableHeader";

interface Props {
  rows: Character[];
}

export const Table = ({ rows }: Props) => {
  const parentRef = useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 52,
  });

  return (
    <div className="overflow-hidden">
      <TableHeader />

      <div ref={parentRef} className="h-[600px] overflow-auto">
        <div
          style={{
            height: rowVirtualizer.getTotalSize(),
            position: "relative",
          }}
        >
          {rowVirtualizer.getVirtualItems().map((v) => (
            <TableRow
              key={v.key}
              row={rows[v.index]}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                transform: `translateY(${v.start}px)`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
