import { useGetAllBales } from './hooks/useQueries';
import Header from './components/Header';
import BaleEntryForm from './components/BaleEntryForm';
import StatisticsCards from './components/StatisticsCards';
import BaleRecordsTable from './components/BaleRecordsTable';
import { Button } from './components/ui/button';
import { Printer } from 'lucide-react';
import { SiX, SiGithub } from 'react-icons/si';

function App() {
  const { data: bales = [], isLoading } = useGetAllBales();

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-background">
      <Header baleCount={bales.length} />
      
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="print:hidden mb-8">
          <BaleEntryForm />
        </div>

        <div className="mb-8">
          <StatisticsCards bales={bales} isLoading={isLoading} />
        </div>

        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold text-foreground">Bale Records</h2>
            <Button onClick={handlePrint} variant="outline" className="print:hidden">
              <Printer className="mr-2 h-4 w-4" />
              Print Report
            </Button>
          </div>
          <BaleRecordsTable bales={bales} isLoading={isLoading} />
        </div>
      </main>

      <footer className="print:hidden border-t border-border mt-16 py-8 bg-card">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Cotton Quality Report. All rights reserved.
            </div>
            <div className="text-sm text-muted-foreground">
              Built with ❤️ using{' '}
              <a
                href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground hover:underline font-medium"
              >
                caffeine.ai
              </a>
            </div>
            <div className="flex gap-4">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <SiX className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <SiGithub className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
