import { useState, useMemo } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Bale } from '../backend';

interface BaleRecordsTableProps {
  bales: Bale[];
  isLoading: boolean;
}

interface QualityMetrics {
  rd: number;
  trash: number;
  moisture: number;
  micronaire: number;
  length: number;
  strength: number;
}

interface BaleWithMetrics extends Bale {
  metrics: QualityMetrics | null;
}

function parseQualityMetrics(description: string): QualityMetrics | null {
  try {
    return JSON.parse(description) as QualityMetrics;
  } catch {
    return null;
  }
}

type SortField = 'id' | 'rd' | 'trash' | 'moisture' | 'micronaire' | 'length' | 'strength';
type SortDirection = 'asc' | 'desc';

export default function BaleRecordsTable({ bales, isLoading }: BaleRecordsTableProps) {
  const [sortField, setSortField] = useState<SortField>('id');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  const balesWithMetrics: BaleWithMetrics[] = useMemo(
    () =>
      bales.map((bale) => ({
        ...bale,
        metrics: parseQualityMetrics(bale.description),
      })),
    [bales]
  );

  const sortedBales = useMemo(() => {
    return [...balesWithMetrics].sort((a, b) => {
      let aValue: number;
      let bValue: number;

      if (sortField === 'id') {
        aValue = Number(a.id);
        bValue = Number(b.id);
      } else {
        aValue = a.metrics?.[sortField] ?? 0;
        bValue = b.metrics?.[sortField] ?? 0;
      }

      if (sortDirection === 'asc') {
        return aValue - bValue;
      } else {
        return bValue - aValue;
      }
    });
  }, [balesWithMetrics, sortField, sortDirection]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  if (isLoading) {
    return (
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Bale #</TableHead>
              <TableHead>Rd</TableHead>
              <TableHead>Trash %</TableHead>
              <TableHead>Moisture %</TableHead>
              <TableHead>Mic</TableHead>
              <TableHead>Length (mm)</TableHead>
              <TableHead>Strength (g/tex)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[1, 2, 3, 4, 5].map((i) => (
              <TableRow key={i}>
                {[1, 2, 3, 4, 5, 6, 7].map((j) => (
                  <TableCell key={j}>
                    <Skeleton className="h-4 w-16" />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }

  if (sortedBales.length === 0) {
    return (
      <div className="border rounded-lg p-8 text-center">
        <p className="text-muted-foreground">No bale records yet. Add your first bale above.</p>
      </div>
    );
  }

  return (
    <div className="border rounded-lg print:border-2 print:border-gray-300">
      <Table>
        <TableHeader>
          <TableRow className="print:border-b-2 print:border-gray-300">
            <TableHead className="print:text-black print:font-bold">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleSort('id')}
                className="print:hidden -ml-3 h-8 data-[state=open]:bg-accent"
              >
                Bale #
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
              <span className="hidden print:inline">Bale #</span>
            </TableHead>
            <TableHead className="print:text-black print:font-bold">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleSort('rd')}
                className="print:hidden -ml-3 h-8 data-[state=open]:bg-accent"
              >
                Rd
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
              <span className="hidden print:inline">Rd</span>
            </TableHead>
            <TableHead className="print:text-black print:font-bold">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleSort('trash')}
                className="print:hidden -ml-3 h-8 data-[state=open]:bg-accent"
              >
                Trash %
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
              <span className="hidden print:inline">Trash %</span>
            </TableHead>
            <TableHead className="print:text-black print:font-bold">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleSort('moisture')}
                className="print:hidden -ml-3 h-8 data-[state=open]:bg-accent"
              >
                Moisture %
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
              <span className="hidden print:inline">Moisture %</span>
            </TableHead>
            <TableHead className="print:text-black print:font-bold">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleSort('micronaire')}
                className="print:hidden -ml-3 h-8 data-[state=open]:bg-accent"
              >
                Mic
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
              <span className="hidden print:inline">Mic</span>
            </TableHead>
            <TableHead className="print:text-black print:font-bold">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleSort('length')}
                className="print:hidden -ml-3 h-8 data-[state=open]:bg-accent"
              >
                Length (mm)
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
              <span className="hidden print:inline">Length (mm)</span>
            </TableHead>
            <TableHead className="print:text-black print:font-bold">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleSort('strength')}
                className="print:hidden -ml-3 h-8 data-[state=open]:bg-accent"
              >
                Strength (g/tex)
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
              <span className="hidden print:inline">Strength (g/tex)</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedBales.map((bale) => (
            <TableRow key={Number(bale.id)} className="print:border-b print:border-gray-200">
              <TableCell className="font-medium print:text-black">{Number(bale.id) + 1}</TableCell>
              <TableCell className="print:text-black">
                {bale.metrics?.rd.toFixed(1) ?? '-'}
              </TableCell>
              <TableCell className="print:text-black">
                {bale.metrics?.trash.toFixed(1) ?? '-'}
              </TableCell>
              <TableCell className="print:text-black">
                {bale.metrics?.moisture.toFixed(1) ?? '-'}
              </TableCell>
              <TableCell className="print:text-black">
                {bale.metrics?.micronaire.toFixed(1) ?? '-'}
              </TableCell>
              <TableCell className="print:text-black">
                {bale.metrics?.length.toFixed(1) ?? '-'}
              </TableCell>
              <TableCell className="print:text-black">
                {bale.metrics?.strength.toFixed(1) ?? '-'}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
