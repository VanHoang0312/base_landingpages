import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  page: number;
  total: number;
  pageSize: number;
  onChange: (page: number) => void;
}

export function AdminPagination({ page, total, pageSize, onChange }: Props) {
  const totalPages = Math.ceil(total / pageSize);
  if (totalPages <= 1) return null;

  const from = Math.min((page - 1) * pageSize + 1, total);
  const to = Math.min(page * pageSize, total);

  const pages: (number | "...")[] = [];
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    pages.push(1);
    if (page > 3) pages.push("...");
    for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++) pages.push(i);
    if (page < totalPages - 2) pages.push("...");
    pages.push(totalPages);
  }

  return (
    <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
      <p className="text-sm text-gray-400">
        Hiển thị <span className="font-medium text-gray-600">{from}–{to}</span> / {total}
      </p>
      <div className="flex items-center gap-1">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          disabled={page === 1}
          onClick={() => onChange(page - 1)}
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>
        {pages.map((p, i) =>
          p === "..." ? (
            <span key={`dots-${i}`} className="px-2 text-gray-400 text-sm">…</span>
          ) : (
            <Button
              key={p}
              variant={p === page ? "default" : "outline"}
              size="sm"
              className={`h-8 w-8 p-0 ${p === page ? "brand-gradient text-white border-0" : ""}`}
              onClick={() => onChange(p)}
            >
              {p}
            </Button>
          )
        )}
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          disabled={page === totalPages}
          onClick={() => onChange(page + 1)}
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
