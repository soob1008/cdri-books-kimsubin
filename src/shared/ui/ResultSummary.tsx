interface ResultSummaryProps {
  total: number;
  label?: string;
}

export default function ResultSummary({
  total,
  label = '검색 결과',
}: ResultSummaryProps) {
  return (
    <div className="flex items-center gap-4">
      <p className="font-medium">{label}</p>
      <p className="font-medium">
        총 <span className="text-primary">{total}</span>건
      </p>
    </div>
  );
}
