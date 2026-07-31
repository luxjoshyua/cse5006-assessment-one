export interface Props {
  title: string
  columns: string[]
  rows: string[][]
  emptyMessage?: string
}

export default function MetricTable({
  title,
  columns,
  rows,
  emptyMessage = "No data.",
}: Props) {
  return (
    <div className="flex flex-col gap-2 rounded-lg border border-border bg-surface p-4">
      <h3 className="text-sm font-semibold">{title}</h3>
      {rows.length === 0 ? (
        <p className="text-sm text-muted">{emptyMessage}</p>
      ) : (
        <table className="w-full text-sm">
          <caption className="sr-only">{title}</caption>
          <thead>
            <tr className="border-b border-border text-left text-muted">
              {columns.map((col) => (
                <th key={col} scope="col" className="pb-1 font-medium">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i} className="border-b border-border/50 last:border-0">
                {row.map((cell, j) => (
                  <td
                    key={j}
                    className={`py-1 ${j > 0 ? "text-right tabular-nums" : "truncate"}`}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
