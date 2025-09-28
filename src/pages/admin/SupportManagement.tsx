import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  MessageCircle, Search, Filter, Eye, Reply, Clock, CheckCircle,
  AlertTriangle, User, Phone, Mail, Star, FileText
} from "lucide-react";

const SupportManagement = () => {
  const tickets = [
    {
      id: "TIC-001",
      customer: "John Smith",
      email: "john.smith@email.com",
      phone: "+1 234-567-8900",
      subject: "Issue with fuel delivery",
      category: "Delivery",
      priority: "high",
      status: "open",
      created: "2024-12-19 10:30",
      lastUpdate: "2024-12-19 14:15",
      description: "Fuel delivery was scheduled for 2 PM but driver never showed up. Need immediate assistance."
    },
    {
      id: "TIC-002",
      customer: "Sarah Johnson",
      email: "sarah.j@email.com", 
      phone: "+1 234-567-8901",
      subject: "Billing question",
      category: "Billing",
      priority: "medium",
      status: "in-progress",
      created: "2024-12-19 09:15",
      lastUpdate: "2024-12-19 11:30",
      description: "I was charged twice for the same service. Can you help me understand my bill?"
    },
    {
      id: "TIC-003",
      customer: "Mike Wilson",
      email: "mike.wilson@email.com",
      phone: "+1 234-567-8902",
      subject: "App not working",
      category: "Technical",
      priority: "medium",
      status: "open",
      created: "2024-12-18 16:45",
      lastUpdate: "2024-12-19 08:00",
      description: "The mobile app keeps crashing when I try to place an order."
    },
    {
      id: "TIC-004",
      customer: "Emily Davis",
      email: "emily.davis@email.com",
      phone: "+1 234-567-8903", 
      subject: "Service feedback",
      category: "Feedback",
      priority: "low",
      status: "resolved",
      created: "2024-12-18 14:20",
      lastUpdate: "2024-12-19 09:10",
      description: "Great service! Just wanted to leave positive feedback for the mechanic."
    }
  ];

  const faqs = [
    {
      id: "FAQ-001",
      question: "How do I track my fuel delivery?",
      answer: "You can track your delivery in real-time using our mobile app or website. You'll receive notifications when your driver is on the way.",
      category: "Delivery",
      views: 245,
      helpful: 89
    },
    {
      id: "FAQ-002",
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, debit cards, Apple Pay, Google Pay, and PayPal for your convenience.",
      category: "Payment", 
      views: 189,
      helpful: 76
    },
    {
      id: "FAQ-003",
      question: "How do I cancel my service appointment?",
      answer: "You can cancel your appointment up to 2 hours before the scheduled time through the app or by calling our support line.",
      category: "Appointments",
      views: 156,
      helpful: 62
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-destructive text-destructive-foreground";
      case "medium": return "bg-secondary text-secondary-foreground";
      case "low": return "bg-muted text-muted-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open": return "bg-secondary text-secondary-foreground";
      case "in-progress": return "bg-accent text-accent-foreground";
      case "resolved": return "bg-accent text-accent-foreground";
      case "closed": return "bg-muted text-muted-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "open": return <AlertTriangle className="w-4 h-4" />;
      case "in-progress": return <Clock className="w-4 h-4" />;
      case "resolved": return <CheckCircle className="w-4 h-4" />;
      case "closed": return <CheckCircle className="w-4 h-4" />;
      default: return <MessageCircle className="w-4 h-4" />;
    }
  };

  const TicketCard = ({ ticket }: { ticket: any }) => (
    <Card className="hover:shadow-medium transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="font-semibold">{ticket.subject}</h3>
            <p className="text-sm text-muted-foreground">{ticket.customer}</p>
          </div>
          <div className="flex gap-2">
            <Badge className={getPriorityColor(ticket.priority)}>
              {ticket.priority}
            </Badge>
            <Badge className={getStatusColor(ticket.status)}>
              {getStatusIcon(ticket.status)}
              <span className="ml-1">{ticket.status}</span>
            </Badge>
          </div>
        </div>

        <div className="mb-3">
          <p className="text-sm text-muted-foreground line-clamp-2">
            {ticket.description}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-3 text-xs">
          <div>
            <p className="text-muted-foreground">Created</p>
            <p className="font-semibold">{ticket.created}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Last Update</p>
            <p className="font-semibold">{ticket.lastUpdate}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Category</p>
            <p className="font-semibold">{ticket.category}</p>
          </div>
          <div>
            <p className="text-muted-foreground">ID</p>
            <p className="font-mono">{ticket.id}</p>
          </div>
        </div>

        <div className="flex gap-2">
          <Button size="sm" variant="outline" className="flex-1">
            <Eye className="w-3 h-3 mr-1" />
            View
          </Button>
          <Button size="sm" variant="outline" className="flex-1">
            <Reply className="w-3 h-3 mr-1" />
            Reply
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const FAQCard = ({ faq }: { faq: any }) => (
    <Card className="hover:shadow-medium transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="font-semibold mb-2">{faq.question}</h3>
            <p className="text-sm text-muted-foreground">{faq.answer}</p>
          </div>
          <Badge variant="outline">
            {faq.category}
          </Badge>
        </div>

        <div className="flex justify-between items-center text-sm">
          <div className="flex gap-4">
            <span className="text-muted-foreground">{faq.views} views</span>
            <span className="text-accent">{faq.helpful} helpful</span>
          </div>
          <Button size="sm" variant="outline">
            Edit
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const openTickets = tickets.filter(t => t.status === "open");
  const inProgressTickets = tickets.filter(t => t.status === "in-progress");
  const resolvedTickets = tickets.filter(t => t.status === "resolved");

  return (
    <DashboardLayout userRole="admin">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Support Management</h1>
            <p className="text-muted-foreground">Handle customer support and inquiries</p>
          </div>
          <Button>
            <MessageCircle className="w-4 h-4 mr-2" />
            New Ticket
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-secondary">{openTickets.length}</p>
                <p className="text-sm text-muted-foreground">Open Tickets</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-accent">{inProgressTickets.length}</p>
                <p className="text-sm text-muted-foreground">In Progress</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold">{resolvedTickets.length}</p>
                <p className="text-sm text-muted-foreground">Resolved</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-accent">4.8</p>
                <p className="text-sm text-muted-foreground">Satisfaction</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input placeholder="Search tickets..." className="pl-10" />
          </div>
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>

        {/* Support Management Tabs */}
        <Tabs defaultValue="tickets" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="tickets">Support Tickets ({tickets.length})</TabsTrigger>
            <TabsTrigger value="faqs">FAQs ({faqs.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="tickets" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
              {tickets.map((ticket) => (
                <TicketCard key={ticket.id} ticket={ticket} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="faqs" className="space-y-4">
            <div className="mb-4">
              <Button>
                <FileText className="w-4 h-4 mr-2" />
                Add FAQ
              </Button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {faqs.map((faq) => (
                <FAQCard key={faq.id} faq={faq} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default SupportManagement;