import { useState } from 'react';
import { useAddBale } from '../hooks/useQueries';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Plus } from 'lucide-react';
import { toast } from 'sonner';

export default function BaleEntryForm() {
  const [formData, setFormData] = useState({
    rd: '',
    trash: '',
    moisture: '',
    micronaire: '',
    length: '',
    strength: '',
  });

  const addBaleMutation = useAddBale();

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields are filled
    const values = Object.values(formData);
    if (values.some((v) => v === '')) {
      toast.error('Please fill in all fields');
      return;
    }

    // Validate all fields are valid numbers
    const numericValues = {
      rd: parseFloat(formData.rd),
      trash: parseFloat(formData.trash),
      moisture: parseFloat(formData.moisture),
      micronaire: parseFloat(formData.micronaire),
      length: parseFloat(formData.length),
      strength: parseFloat(formData.strength),
    };

    if (Object.values(numericValues).some((v) => isNaN(v))) {
      toast.error('Please enter valid numbers');
      return;
    }

    try {
      // Encode the quality metrics as JSON in the description field
      const description = JSON.stringify(numericValues);
      await addBaleMutation.mutateAsync(description);
      
      // Reset form
      setFormData({
        rd: '',
        trash: '',
        moisture: '',
        micronaire: '',
        length: '',
        strength: '',
      });
      
      toast.success('Bale record added successfully');
    } catch (error) {
      toast.error('Failed to add bale record');
      console.error('Error adding bale:', error);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Bale Record</CardTitle>
        <CardDescription>Enter quality metrics for a new cotton bale</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="rd">Rd (Reflectance)</Label>
              <Input
                id="rd"
                type="number"
                step="0.1"
                placeholder="e.g., 75.5"
                value={formData.rd}
                onChange={(e) => handleChange('rd', e.target.value)}
                disabled={addBaleMutation.isPending}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="trash">Trash %</Label>
              <Input
                id="trash"
                type="number"
                step="0.1"
                placeholder="e.g., 2.5"
                value={formData.trash}
                onChange={(e) => handleChange('trash', e.target.value)}
                disabled={addBaleMutation.isPending}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="moisture">Moisture %</Label>
              <Input
                id="moisture"
                type="number"
                step="0.1"
                placeholder="e.g., 7.2"
                value={formData.moisture}
                onChange={(e) => handleChange('moisture', e.target.value)}
                disabled={addBaleMutation.isPending}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="micronaire">Micronaire (Mic)</Label>
              <Input
                id="micronaire"
                type="number"
                step="0.1"
                placeholder="e.g., 4.3"
                value={formData.micronaire}
                onChange={(e) => handleChange('micronaire', e.target.value)}
                disabled={addBaleMutation.isPending}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="length">Length (mm)</Label>
              <Input
                id="length"
                type="number"
                step="0.1"
                placeholder="e.g., 28.5"
                value={formData.length}
                onChange={(e) => handleChange('length', e.target.value)}
                disabled={addBaleMutation.isPending}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="strength">Strength (g/tex)</Label>
              <Input
                id="strength"
                type="number"
                step="0.1"
                placeholder="e.g., 30.2"
                value={formData.strength}
                onChange={(e) => handleChange('strength', e.target.value)}
                disabled={addBaleMutation.isPending}
              />
            </div>
          </div>

          <div className="flex justify-end">
            <Button type="submit" disabled={addBaleMutation.isPending}>
              {addBaleMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Adding...
                </>
              ) : (
                <>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Bale Record
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
