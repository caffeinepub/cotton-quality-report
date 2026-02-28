import { Badge } from '@/components/ui/badge';

interface HeaderProps {
  baleCount: number;
}

export default function Header({ baleCount }: HeaderProps) {
  const isComplete = baleCount >= 100;
  const today = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <header className="bg-card border-b border-border print:border-b-2 print:border-black">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight print:text-black">
              COTTON QUALITY REPORT
            </h1>
            <p className="text-sm text-muted-foreground mt-1 print:text-gray-600">
              Lot Reference: <span className="font-semibold text-foreground print:text-black">100-BALE-INSP-2026</span>
            </p>
          </div>
          <div className="flex flex-col items-start md:items-end gap-2">
            <p className="text-sm text-muted-foreground print:text-gray-600">
              Date: <span className="font-medium text-foreground print:text-black">{today}</span>
            </p>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground print:text-gray-600">Status:</span>
              {isComplete ? (
                <Badge className="bg-green-600 text-white hover:bg-green-700 print:bg-green-600">
                  COMPLETED
                </Badge>
              ) : (
                <Badge variant="outline" className="print:border-gray-400">
                  Incomplete ({baleCount}/100)
                </Badge>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
