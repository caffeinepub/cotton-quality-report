import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import type { Bale } from '../backend';

interface StatisticsCardsProps {
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

function parseQualityMetrics(description: string): QualityMetrics | null {
  try {
    return JSON.parse(description) as QualityMetrics;
  } catch {
    return null;
  }
}

export default function StatisticsCards({ bales, isLoading }: StatisticsCardsProps) {
  const calculateAverages = () => {
    const validBales = bales
      .map((bale) => parseQualityMetrics(bale.description))
      .filter((metrics): metrics is QualityMetrics => metrics !== null);

    if (validBales.length === 0) {
      return {
        avgMicronaire: 0,
        avgLength: 0,
        avgStrength: 0,
        avgTrash: 0,
      };
    }

    const sum = validBales.reduce(
      (acc, metrics) => ({
        micronaire: acc.micronaire + metrics.micronaire,
        length: acc.length + metrics.length,
        strength: acc.strength + metrics.strength,
        trash: acc.trash + metrics.trash,
      }),
      { micronaire: 0, length: 0, strength: 0, trash: 0 }
    );

    return {
      avgMicronaire: sum.micronaire / validBales.length,
      avgLength: sum.length / validBales.length,
      avgStrength: sum.strength / validBales.length,
      avgTrash: sum.trash / validBales.length,
    };
  };

  const averages = calculateAverages();

  const stats = [
    {
      title: 'Avg Micronaire',
      value: averages.avgMicronaire.toFixed(2),
      unit: 'Mic',
    },
    {
      title: 'Avg Length',
      value: averages.avgLength.toFixed(2),
      unit: 'mm',
    },
    {
      title: 'Avg Strength',
      value: averages.avgStrength.toFixed(2),
      unit: 'g/tex',
    },
    {
      title: 'Avg Trash',
      value: averages.avgTrash.toFixed(2),
      unit: '%',
    },
  ];

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i}>
            <CardHeader className="pb-3">
              <Skeleton className="h-4 w-24" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-20" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <Card key={stat.title} className="print:border-2 print:border-gray-300">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground print:text-gray-600">
              {stat.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground print:text-black">
              {stat.value}
              <span className="text-lg text-muted-foreground ml-1 print:text-gray-600">{stat.unit}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
