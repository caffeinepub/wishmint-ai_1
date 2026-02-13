import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useGetAllPaymentRequests, useUpdatePaymentStatus } from '../../hooks/useQueries';
import { PaymentRequest } from '../../backend';
import { toast } from 'sonner';
import { ExternalLink, Loader2 } from 'lucide-react';

type StatusFilter = 'all' | 'pending' | 'approved' | 'rejected';

export default function PaymentRequestsCard() {
  const [activeFilter, setActiveFilter] = useState<StatusFilter>('all');
  const { data: requests, isLoading, isError, refetch } = useGetAllPaymentRequests();
  const updateStatus = useUpdatePaymentStatus();

  const handleStatusUpdate = async (requestId: bigint, statusType: 'approved' | 'rejected') => {
    try {
      const newStatus = statusType === 'approved' ? { approved: null } : { rejected: null };
      await updateStatus.mutateAsync({ 
        requestId, 
        newStatus: newStatus as any 
      });
      toast.success(`Payment request ${statusType} successfully`);
    } catch (error: any) {
      toast.error(error.message || 'Failed to update payment status');
      console.error(error);
    }
  };

  const getStatusString = (status: any): string => {
    if (typeof status === 'object' && status !== null) {
      const keys = Object.keys(status);
      if (keys.length > 0) {
        return keys[0];
      }
    }
    return String(status);
  };

  const filterRequests = (requests: PaymentRequest[] | undefined): PaymentRequest[] => {
    if (!requests) return [];
    
    if (activeFilter === 'all') return requests;
    
    return requests.filter(req => {
      const statusStr = getStatusString(req.status);
      return statusStr === activeFilter;
    });
  };

  const filteredRequests = filterRequests(requests);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment Requests</CardTitle>
        <CardDescription>Review and approve manual UPI payment requests</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeFilter} onValueChange={(v) => setActiveFilter(v as StatusFilter)}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="approved">Approved</TabsTrigger>
            <TabsTrigger value="rejected">Rejected</TabsTrigger>
          </TabsList>

          <TabsContent value={activeFilter} className="mt-6">
            {isLoading ? (
              <div className="text-center py-12">
                <Loader2 className="h-8 w-8 animate-spin mx-auto text-muted-foreground" />
                <p className="text-muted-foreground mt-4">Loading payment requests...</p>
              </div>
            ) : isError ? (
              <div className="text-center py-12 space-y-4">
                <p className="text-destructive">Failed to load payment requests</p>
                <Button onClick={() => refetch()} variant="outline">
                  Retry
                </Button>
              </div>
            ) : filteredRequests.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No payment requests found</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Request ID</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Transaction ID</TableHead>
                    <TableHead>Screenshot</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRequests.map((request) => {
                    const statusStr = getStatusString(request.status);
                    return (
                      <TableRow key={request.requestId.toString()}>
                        <TableCell className="font-mono text-xs">
                          #{request.requestId.toString()}
                        </TableCell>
                        <TableCell className="font-mono text-xs">
                          {request.user.toText().slice(0, 12)}...
                        </TableCell>
                        <TableCell className="font-mono text-sm">
                          {request.transactionId}
                        </TableCell>
                        <TableCell>
                          {request.screenshot ? (
                            <Button
                              variant="ghost"
                              size="sm"
                              asChild
                            >
                              <a
                                href={request.screenshot.getDirectURL()}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <ExternalLink className="h-4 w-4 mr-1" />
                                View
                              </a>
                            </Button>
                          ) : (
                            <span className="text-muted-foreground text-sm">No screenshot</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              statusStr === 'approved'
                                ? 'default'
                                : statusStr === 'rejected'
                                ? 'destructive'
                                : 'secondary'
                            }
                          >
                            {statusStr}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {new Date(Number(request.timestamp) / 1000000).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              onClick={() => handleStatusUpdate(request.requestId, 'approved')}
                              disabled={statusStr === 'approved' || updateStatus.isPending}
                            >
                              Approve
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleStatusUpdate(request.requestId, 'rejected')}
                              disabled={statusStr === 'rejected' || updateStatus.isPending}
                            >
                              Reject
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
