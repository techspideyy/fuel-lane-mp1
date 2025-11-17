import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  IndianRupee,
  Search,
  Filter,
  Eye,
  RefreshCw,
  Download,
  CreditCard,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
} from "lucide-react";

const PaymentManagement = () => {
  // ------------------------------------------------------
  // Static Data (Option B)
  // ------------------------------------------------------

  const transactions = [
    {
      id: "TXN-001",
      customer: "John Smith",
      amount: 7559.16,
      service: "Oil Change",
      method: "Credit Card",
      status: "completed",
      date: "2024-12-19 14:30",
      reference: "ch_1234567890",
    },
    {
      id: "TXN-002",
      customer: "Sarah Johnson",
      amount: 20622.0,
      service: "Brake Service",
      method: "Debit Card",
      status: "completed",
      date: "2024-12-19 11:15",
      reference: "ch_1234567891",
    },
    {
      id: "TXN-003",
      customer: "Mike Wilson",
      amount: 13167.0,
      service: "Tire Replacement",
      method: "Apple Pay",
      status: "pending",
      date: "2024-12-19 09:45",
      reference: "ch_1234567892",
    },
    {
      id: "TXN-004",
      customer: "Emily Davis",
      amount: 6300.0,
      service: "Fuel Delivery",
      method: "Credit Card",
      status: "failed",
      date: "2024-12-19 08:20",
      reference: "ch_1234567893",
    },
  ];

  const paymentMethods = [
    {
      name: "Credit Card",
      count: 245,
      percentage: 68,
      revenue: 1317162.0,
      status: "active",
    },
    {
      name: "Debit Card",
      count: 89,
      percentage: 25,
      revenue: 455301.0,
      status: "active",
    },
    {
      name: "Apple Pay",
      count: 18,
      percentage: 5,
      revenue: 74823.0,
      status: "active",
    },
    {
      name: "Google Pay",
      count: 7,
      percentage: 2,
      revenue: 19698.0,
      status: "active",
    },
  ];

  const refunds = [
    {
      id: "REF-001",
      customer: "Jane Doe",
      originalAmount: 10080.0,
      refundAmount: 10080.0,
      reason: "Service Cancellation",
      status: "processed",
      date: "2024-12-18",
    },
    {
      id: "REF-002",
      customer: "Bob Wilson",
      originalAmount: 7182.0,
      refundAmount: 3591.0,
      reason: "Partial Service",
      status: "pending",
      date: "2024-12-19",
    },
  ];

  // ------------------------------------------------------
  // Status helpers
  // ------------------------------------------------------

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
      case "processed":
        return "bg-accent text-accent-foreground";
      case "pending":
        return "bg-secondary text-secondary-foreground";
      case "failed":
        return "bg-destructive text-destructive-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
      case "processed":
        return <CheckCircle className="w-4 h-4" />;
      case "pending":
        return <Clock className="w-4 h-4" />;
      case "failed":
        return <XCircle className="w-4 h-4" />;
      default:
        return <AlertTriangle className="w-4 h-4" />;
    }
  };

  // ------------------------------------------------------
  // Component Cards
  // ------------------------------------------------------

  const TransactionCard = ({ transaction }: { transaction: any }) => (
    <Card className="hover:shadow-medium transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="font-semibold">{transaction.customer}</h3>
            <p className="text-sm text-muted-foreground">{transaction.service}</p>
          </div>

          <Badge className={getStatusColor(transaction.status)}>
            {getStatusIcon(transaction.status)}
            <span className="ml-1 capitalize">{transaction.status}</span>
          </Badge>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-3 text-sm">
          <div>
            <p className="text-muted-foreground">Amount</p>
            <p className="font-bold text-lg">₹{transaction.amount}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Method</p>
            <p className="font-semibold">{transaction.method}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Date</p>
            <p className="font-semibold">{transaction.date}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Reference</p>
            <p className="font-mono text-xs">{transaction.reference}</p>
          </div>
        </div>

        <div className="flex gap-2">
          <Button size="sm" variant="outline" className="flex-1">
            <Eye className="w-3 h-3 mr-1" /> Details
          </Button>

          {transaction.status === "failed" && (
            <Button size="sm" variant="secondary" className="flex-1">
              <RefreshCw className="w-3 h-3 mr-1" /> Retry
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );

  const MethodCard = ({ method }: { method: any }) => (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
              <CreditCard className="w-5 h-5 text-primary" />
            </div>
            <h3 className="font-semibold">{method.name}</h3>
          </div>

          <Badge className={getStatusColor(method.status)}>{method.status}</Badge>
        </div>

        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <p className="text-muted-foreground">Transactions</p>
            <p className="font-bold">{method.count}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Percentage</p>
            <p className="font-bold">{method.percentage}%</p>
          </div>
          <div className="col-span-2">
            <p className="text-muted-foreground">Revenue</p>
            <p className="font-bold text-lg text-accent">
              ₹{method.revenue.toLocaleString()}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const RefundCard = ({ refund }: { refund: any }) => (
    <Card className="hover:shadow-medium transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="font-semibold">{refund.customer}</h3>
            <p className="text-sm text-muted-foreground">{refund.reason}</p>
          </div>

          <Badge className={getStatusColor(refund.status)}>
            {getStatusIcon(refund.status)}
            <span className="ml-1 capitalize">{refund.status}</span>
          </Badge>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-3 text-sm">
          <div>
            <p className="text-muted-foreground">Original</p>
            <p className="font-bold">₹{refund.originalAmount}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Refund</p>
            <p className="font-bold text-destructive">₹{refund.refundAmount}</p>
          </div>
          <div className="col-span-2">
            <p className="text-muted-foreground">Date</p>
            <p className="font-semibold">{refund.date}</p>
          </div>
        </div>

        <div className="flex gap-2">
          <Button size="sm" variant="outline" className="flex-1">
            <Eye className="w-3 h-3 mr-1" /> Details
          </Button>

          {refund.status === "pending" && (
            <Button size="sm" variant="secondary" className="flex-1">
              Process
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );

  // ------------------------------------------------------
  // Computed Lists
  // ------------------------------------------------------

  const completedTransactions = transactions.filter((t) => t.status === "completed");
  const pendingTransactions = transactions.filter((t) => t.status === "pending");
  const failedTransactions = transactions.filter((t) => t.status === "failed");

  // ------------------------------------------------------
  // Page UI
  // ------------------------------------------------------

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Payment Management</h1>
          <p className="text-muted-foreground">
            Monitor transactions and payments
          </p>
        </div>

        <div className="flex gap-2">
          <Button variant="outline">
            <RefreshCw className="w-4 h-4 mr-2" /> Refresh
          </Button>
          <Button>
            <Download className="w-4 h-4 mr-2" /> Export
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-accent">
                ₹{transactions.reduce((sum, t) => sum + t.amount, 0).toLocaleString()}
              </p>
              <p className="text-sm text-muted-foreground">Total Revenue</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold">{completedTransactions.length}</p>
              <p className="text-sm text-muted-foreground">Completed</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-secondary">
                {pendingTransactions.length}
              </p>
              <p className="text-sm text-muted-foreground">Pending</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-destructive">
                {failedTransactions.length}
              </p>
              <p className="text-sm text-muted-foreground">Failed</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search + Filter */}
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input placeholder="Search transactions..." className="pl-10" />
        </div>

        <Button variant="outline">
          <Filter className="w-4 h-4 mr-2" /> Filter
        </Button>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="transactions" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="transactions">
            Transactions ({transactions.length})
          </TabsTrigger>
          <TabsTrigger value="methods">Payment Methods</TabsTrigger>
          <TabsTrigger value="refunds">Refunds ({refunds.length})</TabsTrigger>
        </TabsList>

        {/* Transactions */}
        <TabsContent value="transactions" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
            {transactions.map((transaction) => (
              <TransactionCard key={transaction.id} transaction={transaction} />
            ))}
          </div>
        </TabsContent>

        {/* Payment Methods */}
        <TabsContent value="methods" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {paymentMethods.map((method, index) => (
              <MethodCard key={index} method={method} />
            ))}
          </div>
        </TabsContent>

        {/* Refunds */}
        <TabsContent value="refunds" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
            {refunds.map((refund) => (
              <RefundCard key={refund.id} refund={refund} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PaymentManagement;
