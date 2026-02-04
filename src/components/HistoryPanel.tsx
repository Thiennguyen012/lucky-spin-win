import { useState } from "react";
import { Trophy, Trash2, Download, FileJson } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { exportHistoryAsJSON, exportHistoryAsCSV } from "@/lib/historyStorage";

interface HistoryPanelProps {
  history: number[];
  onClear: () => void;
}

const HistoryPanel = ({ history, onClear }: HistoryPanelProps) => {
  const [showClearDialog, setShowClearDialog] = useState(false);

  const handleConfirmClear = () => {
    onClear();
    setShowClearDialog(false);
  };

  if (history.length === 0) return null;

  return (
    <div className="w-full max-w-2xl bg-card/50 rounded-xl border border-lucky-border/30 p-4 sm:p-6">
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <div className="flex items-center gap-2 text-lucky-gold">
          <Trophy className="w-5 h-5" />
          <span className="font-bold text-sm sm:text-base">SPIN HISTORY</span>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => exportHistoryAsJSON()}
            className="text-muted-foreground hover:text-lucky-gold transition-colors text-sm flex items-center gap-1 px-2 py-1 rounded hover:bg-secondary/50"
            title="Export as JSON"
          >
            <FileJson className="w-4 h-4" />
            <span className="text-xs hidden sm:inline">JSON</span>
          </button>
          <button
            onClick={() => exportHistoryAsCSV()}
            className="text-muted-foreground hover:text-lucky-gold transition-colors text-sm flex items-center gap-1 px-2 py-1 rounded hover:bg-secondary/50"
            title="Export as CSV"
          >
            <Download className="w-4 h-4" />
            <span className="text-xs hidden sm:inline">CSV</span>
          </button>
          <button
            onClick={() => setShowClearDialog(true)}
            className="text-muted-foreground hover:text-destructive transition-colors text-sm flex items-center gap-1 px-2 py-1 rounded hover:bg-secondary/50"
            title="Clear all"
          >
            <Trash2 className="w-4 h-4" />
            <span className="text-xs hidden sm:inline">Clear</span>
          </button>
        </div>
      </div>
      <div className="flex flex-wrap gap-2 sm:gap-3">
        {history.map((number, index) => (
          <div
            key={index}
            className="bg-secondary px-3 py-2 sm:px-4 sm:py-2 rounded-lg border border-lucky-border/30
                       transition-all duration-300 hover:border-lucky-gold"
          >
            <span className="text-muted-foreground text-xs sm:text-sm">
              #{index + 1}:
            </span>
            <span className="text-lucky-gold font-bold ml-1 text-sm sm:text-base">
              {number}
            </span>
          </div>
        ))}
      </div>

      {/* Clear History Dialog */}
      <AlertDialog open={showClearDialog} onOpenChange={setShowClearDialog}>
        <AlertDialogTrigger asChild>
          <button className="hidden" />
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogTitle>Clear History</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to clear all spin history? This action cannot
            be undone.
          </AlertDialogDescription>
          <div className="flex justify-end gap-3">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmClear}
              className="bg-destructive hover:bg-destructive/90"
            >
              Clear
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default HistoryPanel;
