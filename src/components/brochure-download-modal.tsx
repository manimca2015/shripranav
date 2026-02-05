
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { tours } from '@/lib/data';
import { Download } from 'lucide-react';

type BrochureDownloadModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function BrochureDownloadModal({ isOpen, onClose }: BrochureDownloadModalProps) {
  const [selectedBrochureUrl, setSelectedBrochureUrl] = useState('');

  const toursWithBrochures = tours.filter(tour => tour.brochureUrl);

  const handleDownload = () => {
    if (selectedBrochureUrl) {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Download Tour Brochure</DialogTitle>
          <DialogDescription>
            Select a tour from the list below to download its detailed itinerary.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 space-y-4">
          <Select onValueChange={setSelectedBrochureUrl}>
            <SelectTrigger>
              <SelectValue placeholder="Select a tour..." />
            </SelectTrigger>
            <SelectContent>
              {toursWithBrochures.map(tour => (
                <SelectItem key={tour.id} value={tour.brochureUrl!}>
                  {tour.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            asChild
            disabled={!selectedBrochureUrl}
            onClick={handleDownload}
            className="bg-accent text-accent-foreground hover:bg-accent/90"
          >
            <a href={selectedBrochureUrl} download>
              <Download className="mr-2 h-4 w-4" />
              Download
            </a>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
