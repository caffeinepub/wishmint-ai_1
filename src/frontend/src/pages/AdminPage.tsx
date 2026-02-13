import { usePageMeta } from '../hooks/usePageMeta';
import { useIsCallerAdmin, useListApprovals, useSetApproval } from '../hooks/useQueries';
import AccessDeniedScreen from '../components/auth/AccessDeniedScreen';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, FileText, DollarSign, TrendingUp } from 'lucide-react';
import { toast } from 'sonner';
import { ApprovalStatus } from '../backend';

export default function AdminPage() {
  usePageMeta({
    title: 'Admin Panel - WishMint AI',
    description: 'Administrative dashboard',
  });

  const { data: isAdmin, isLoading: adminLoading } = useIsCallerAdmin();
  const { data: approvals, isLoading: approvalsLoading } = useListApprovals();
  const setApproval = useSetApproval();

  if (adminLoading) {
    return (
      <div className="container py-16">
        <div className="text-center">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return <AccessDeniedScreen />;
  }

  const handleApproval = async (userPrincipal: string, status: ApprovalStatus) => {
    try {
      await setApproval.mutateAsync({
        user: { toText: () => userPrincipal } as any,
        status,
      });
      toast.success(`User ${status === ApprovalStatus.approved ? 'approved' : 'rejected'} successfully`);
    } catch (error) {
      toast.error('Failed to update approval status');
      console.error(error);
    }
  };

  return (
    <div className="container py-8">
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold">Admin Panel</h1>
          <p className="text-muted-foreground mt-2">
            Manage users, approvals, and platform settings
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-muted-foreground">Active users</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Templates</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-muted-foreground">Published templates</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹0</div>
              <p className="text-xs text-muted-foreground">Total earnings</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Growth</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0%</div>
              <p className="text-xs text-muted-foreground">vs last month</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="approvals" className="w-full">
          <TabsList>
            <TabsTrigger value="approvals">User Approvals</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="approvals" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>User Approval Requests</CardTitle>
                <CardDescription>Review and approve user access requests</CardDescription>
              </CardHeader>
              <CardContent>
                {approvalsLoading ? (
                  <p className="text-center text-muted-foreground py-8">Loading approvals...</p>
                ) : !approvals || approvals.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">No pending approvals</p>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>User</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {approvals.map((approval) => (
                        <TableRow key={approval.principal.toText()}>
                          <TableCell className="font-mono text-xs">
                            {approval.principal.toText().slice(0, 20)}...
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                approval.status === ApprovalStatus.approved
                                  ? 'default'
                                  : approval.status === ApprovalStatus.rejected
                                  ? 'destructive'
                                  : 'secondary'
                              }
                            >
                              {approval.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                onClick={() => handleApproval(approval.principal.toText(), ApprovalStatus.approved)}
                                disabled={approval.status === ApprovalStatus.approved || setApproval.isPending}
                              >
                                Approve
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => handleApproval(approval.principal.toText(), ApprovalStatus.rejected)}
                                disabled={approval.status === ApprovalStatus.rejected || setApproval.isPending}
                              >
                                Reject
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="templates" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Template Management</CardTitle>
                <CardDescription>Review and moderate marketplace templates</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center text-muted-foreground py-8">
                  Template management coming soon...
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payments" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Payment Verification</CardTitle>
                <CardDescription>Review manual UPI payment submissions</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center text-muted-foreground py-8">
                  Payment verification coming soon...
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Content Reports</CardTitle>
                <CardDescription>Review and handle reported content</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center text-muted-foreground py-8">
                  Content moderation coming soon...
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
