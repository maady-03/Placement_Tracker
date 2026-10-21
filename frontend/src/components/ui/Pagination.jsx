import { ChevronLeft, ChevronRight } from "lucide-react";
import Button from "./Button";

function Pagination({ page, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between border-t border-line px-5 py-3">
      <p className="font-mono text-xs text-ink-muted">
        Page {page} of {totalPages}
      </p>

      <div className="flex items-center gap-2">
        <Button
          variant="secondary"
          size="sm"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
          aria-label="Previous page"
        >
          <ChevronLeft size={14} />
          Prev
        </Button>

        <Button
          variant="secondary"
          size="sm"
          disabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}
          aria-label="Next page"
        >
          Next
          <ChevronRight size={14} />
        </Button>
      </div>
    </div>
  );
}

export default Pagination;