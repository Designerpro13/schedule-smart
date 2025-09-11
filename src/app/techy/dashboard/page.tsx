
'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/auth-context';
import { useRouter } from 'next/navigation';
import type { SystemLog, SupportTicket, TicketStatus } from '@/lib/types';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Wrench, List, Ticket, LogOut, CheckCircle2, Circle, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

export default function TechyDashboardPage() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  
  const [logs, setLogs] = useState<SystemLog[]>([]);
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);
  const [isTicketDialogOpen, setIsTicketDialogOpen] = useState(false);
  const [updatedStatus, setUpdatedStatus] = useState<TicketStatus>('Open');

  useEffect(() => {
    if (!user) {
      router.push('/login');
    } else if (user.role !== 'techy') {
      router.push('/');
    } else {
      fetchTechyData();
    }
  }, [user, router]);

  const fetchTechyData = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/techy-data');
      const data = await res.json();
      setLogs(data.logs);
      setTickets(data.tickets);
    } catch (error) {
      console.error('Failed to fetch techy data', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to fetch support data.',
      });
    } finally {
      setLoading(false);
    }
  };
  
  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const handleManageTicketClick = (ticket: SupportTicket) => {
    setSelectedTicket(ticket);
    setUpdatedStatus(ticket.status);
    setIsTicketDialogOpen(true);
  };

  const handleUpdateTicketStatus = () => {
    if (!selectedTicket) return;
    const updatedTickets = tickets.map(t =>
      t.id === selectedTicket.id ? { ...t, status: updatedStatus } : t
    );
    setTickets(updatedTickets);

    toast({
      title: 'Ticket Status Updated',
      description: `Ticket ${selectedTicket.id} status changed to ${updatedStatus}.`,
    });
    setIsTicketDialogOpen(false);
    setSelectedTicket(null);
  };

  const getLogLevelClass = (level: SystemLog['level']) => {
    switch (level) {
      case 'ERROR': return 'text-destructive font-bold';
      case 'WARN': return 'text-amber-600 font-semibold';
      case 'INFO': return 'text-sky-600';
      case 'DEBUG': return 'text-muted-foreground';
      default: return '';
    }
  };

  const getTicketStatusIcon = (status: TicketStatus) => {
    switch (status) {
      case 'Open': return <Circle className="text-green-500" />;
      case 'In Progress': return <Clock className="text-yellow-500" />;
      case 'Closed': return <CheckCircle2 className="text-red-500" />;
      case 'Resolved': return <CheckCircle2 className="text-blue-500" />;
      default: return null;
    }
  };

  if (!user || user.role !== 'techy') {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-4 border-b bg-background/80 backdrop-blur-sm md:px-6">
        <div className="flex items-center gap-4">
          <Wrench className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold tracking-tight font-headline">Tech Support Dashboard</h1>
        </div>
        <div className="flex items-center gap-4">
           <span className="text-sm font-medium text-muted-foreground hidden sm:inline-block">{user.profile.name}</span>
           <Button variant="ghost" size="icon" onClick={handleLogout}>
              <LogOut className="h-5 w-5" />
           </Button>
        </div>
      </header>

      <main className="p-4 md:p-6">
        <Tabs defaultValue="tickets">
          <TabsList className="mb-4">
            <TabsTrigger value="tickets"><Ticket className="mr-2 h-4 w-4" />Support Tickets</TabsTrigger>
            <TabsTrigger value="logs"><List className="mr-2 h-4 w-4" />System Logs</TabsTrigger>
          </TabsList>
          
          <TabsContent value="tickets">
            <Card>
              <CardHeader>
                <CardTitle>Active & Past Support Tickets</CardTitle>
                <CardDescription>Manage and resolve user-submitted support tickets.</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Subject</TableHead>
                      <TableHead>Requester</TableHead>
                      <TableHead>Submitted</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {loading ? (
                      Array.from({ length: 4 }).map((_, i) => (
                        <TableRow key={i}>
                          <TableCell><Skeleton className="h-5 w-16" /></TableCell>
                          <TableCell><Skeleton className="h-5 w-48" /></TableCell>
                          <TableCell><Skeleton className="h-5 w-32" /></TableCell>
                          <TableCell><Skeleton className="h-5 w-32" /></TableCell>
                          <TableCell><Skeleton className="h-6 w-24 rounded-full" /></TableCell>
                          <TableCell className="text-right"><Skeleton className="h-8 w-24 ml-auto" /></TableCell>
                        </TableRow>
                      ))
                    ) : (
                      tickets.map((ticket) => (
                        <TableRow key={ticket.id}>
                          <TableCell className="font-code font-semibold">{ticket.id}</TableCell>
                          <TableCell>{ticket.subject}</TableCell>
                          <TableCell>{ticket.requester}</TableCell>
                          <TableCell>{ticket.submitted}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="flex items-center gap-2">
                                {getTicketStatusIcon(ticket.status)}
                                {ticket.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="outline" size="sm" onClick={() => handleManageTicketClick(ticket)}>
                              <Wrench className="h-4 w-4 mr-2" />
                              Manage
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="logs">
            <Card>
              <CardHeader>
                <CardTitle>System Event Logs</CardTitle>
                <CardDescription>A read-only stream of system events.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-muted font-code text-xs rounded-lg p-4 h-[500px] overflow-y-auto">
                  {loading ? (
                    <div className="space-y-2">
                       {Array.from({ length: 10 }).map((_, i) => <Skeleton key={i} className="h-4 w-full" />)}
                    </div>
                  ) : (
                     logs.map((log) => (
                        <p key={log.id} className="whitespace-pre-wrap">
                          <span className="text-muted-foreground">{log.timestamp}</span>
                          {' '}[<span className={cn(getLogLevelClass(log.level))}>{log.level}</span>]
                          {' '}<span className="text-foreground">{log.message}</span>
                        </p>
                      ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

       <Dialog open={isTicketDialogOpen} onOpenChange={setIsTicketDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Manage Ticket: {selectedTicket?.id}</DialogTitle>
            <DialogDescription>
              Update the status of this support ticket.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <p><span className="font-semibold">Subject:</span> {selectedTicket?.subject}</p>
            <p><span className="font-semibold">Requester:</span> {selectedTicket?.requester} ({selectedTicket?.requester_email})</p>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="ticket-status" className="text-right font-semibold">
                Status
              </label>
              <Select value={updatedStatus} onValueChange={(value: TicketStatus) => setUpdatedStatus(value)}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Open">Open</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Resolved">Resolved</SelectItem>
                  <SelectItem value="Closed">Closed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsTicketDialogOpen(false)}>Cancel</Button>
            <Button type="submit" onClick={handleUpdateTicketStatus}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
