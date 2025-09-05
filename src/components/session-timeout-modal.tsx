'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from './ui/button';
import { Progress } from './ui/progress';

interface SessionTimeoutModalProps {
  isOpen: boolean;
  onStay: () => void;
  onLogout: () => void;
  remainingTime: number;
}

const TOTAL_TIMEOUT_SECONDS = 30;

export const SessionTimeoutModal = ({ isOpen, onStay, onLogout, remainingTime }: SessionTimeoutModalProps) => {
  const secondsLeft = Math.ceil(remainingTime / 1000);
  const progressValue = (secondsLeft / TOTAL_TIMEOUT_SECONDS) * 100;

  return (
    <AlertDialog open={isOpen} onOpenChange={onStay}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="font-headline">Are you still there?</AlertDialogTitle>
          <AlertDialogDescription>
            You've been inactive for a while. For your security, we'll log you out automatically.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="space-y-2">
            <p className="text-center text-sm text-muted-foreground">
                Logging out in <span className="font-bold text-foreground">{secondsLeft}</span> seconds...
            </p>
            <Progress value={progressValue} className="w-full" />
        </div>
        <AlertDialogFooter>
          <Button variant="outline" onClick={onLogout}>
            Log Out Now
          </Button>
          <AlertDialogAction onClick={onStay}>
            I'm Still Here
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
