import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { 
  MessageCircle, Send, Phone, Mail, Clock, HelpCircle,
  Search, ChevronDown, ChevronRight, Bot, User
} from "lucide-react";
import { useState } from "react";

const Support = () => {
  const [chatMessages, setChatMessages] = useState([
    { id: 1, type: 'bot', message: 'Hello! How can I help you today?' },
    { id: 2, type: 'user', message: 'I need help with my fuel delivery' },
    { id: 3, type: 'bot', message: 'I can help you with that! Can you please provide your order number?' }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  const faqs = [
    {
      id: 1,
      question: "How do I track my fuel delivery?",
      answer: "You can track your delivery in real-time using our mobile app or website. Go to 'Order Tracking' section and enter your order ID to see live updates."
    },
    {
      id: 2,
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, debit cards, Apple Pay, Google Pay, and PayPal for your convenience."
    },
    {
      id: 3,
      question: "How do I cancel or reschedule my appointment?",
      answer: "You can cancel or reschedule up to 2 hours before your appointment time through the app or by calling our support line."
    },
    {
      id: 4,
      question: "What areas do you serve?",
      answer: "We currently serve major metropolitan areas. Check our coverage map in the app or contact us to see if we serve your location."
    },
    {
      id: 5,
      question: "How do I get a refund?",
      answer: "Refunds are processed within 5-7 business days. Contact our support team with your order details to initiate a refund request."
    }
  ];

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const userMessage = { id: Date.now(), type: 'user' as const, message: newMessage };
      setChatMessages([...chatMessages, userMessage]);
      setNewMessage('');
      
      // Simulate bot response
      setTimeout(() => {
        const botResponse = { id: Date.now() + 1, type: 'bot' as const, message: 'Thank you for your message. Our team will get back to you shortly.' };
        setChatMessages(prev => [...prev, botResponse]);
      }, 1000);
    }
  };

  return (
    <DashboardLayout userRole="user">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Support Center</h1>
          <p className="text-muted-foreground">Get help when you need it</p>
        </div>

        {/* Quick Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-4 text-center">
              <Phone className="w-8 h-8 mx-auto mb-2 text-primary" />
              <h3 className="font-semibold">Call Us</h3>
              <p className="text-sm text-muted-foreground mb-3">24/7 Support Available</p>
              <Button variant="outline" size="sm">
                1-800-FUEL-NOW
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <Mail className="w-8 h-8 mx-auto mb-2 text-primary" />
              <h3 className="font-semibold">Email Support</h3>
              <p className="text-sm text-muted-foreground mb-3">Response within 2 hours</p>
              <Button variant="outline" size="sm">
                support@fuelnow.com
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <MessageCircle className="w-8 h-8 mx-auto mb-2 text-primary" />
              <h3 className="font-semibold">Live Chat</h3>
              <p className="text-sm text-muted-foreground mb-3">Instant assistance</p>
              <Badge className="bg-green-100 text-green-800">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                Online
              </Badge>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="chat" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="chat">Live Chat</TabsTrigger>
            <TabsTrigger value="faq">FAQ</TabsTrigger>
            <TabsTrigger value="contact">Contact Form</TabsTrigger>
          </TabsList>

          <TabsContent value="chat">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bot className="w-5 h-5" />
                  Live Chat Support
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <ScrollArea className="h-96 border rounded-lg p-4">
                    <div className="space-y-4">
                      {chatMessages.map((msg) => (
                        <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                          <div className={`flex items-start gap-2 max-w-xs ${msg.type === 'user' ? 'flex-row-reverse' : ''}`}>
                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                              {msg.type === 'bot' ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                            </div>
                            <div className={`p-3 rounded-lg ${
                              msg.type === 'user' 
                                ? 'bg-primary text-primary-foreground' 
                                : 'bg-muted'
                            }`}>
                              <p className="text-sm">{msg.message}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                  
                  <div className="flex gap-2">
                    <Input
                      placeholder="Type your message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    />
                    <Button onClick={handleSendMessage}>
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="faq">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HelpCircle className="w-5 h-5" />
                  Frequently Asked Questions
                </CardTitle>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input placeholder="Search FAQs..." className="pl-10" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {faqs.map((faq) => (
                    <div key={faq.id} className="border rounded-lg">
                      <button
                        className="w-full p-4 text-left flex items-center justify-between hover:bg-muted/50 transition-colors"
                        onClick={() => setExpandedFAQ(expandedFAQ === faq.id ? null : faq.id)}
                      >
                        <h3 className="font-semibold">{faq.question}</h3>
                        {expandedFAQ === faq.id ? (
                          <ChevronDown className="w-4 h-4" />
                        ) : (
                          <ChevronRight className="w-4 h-4" />
                        )}
                      </button>
                      {expandedFAQ === faq.id && (
                        <div className="px-4 pb-4">
                          <Separator className="mb-4" />
                          <p className="text-muted-foreground">{faq.answer}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contact">
            <Card>
              <CardHeader>
                <CardTitle>Contact Form</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Send us a message and we'll get back to you within 24 hours
                </p>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">Full Name</label>
                      <Input placeholder="Your full name" />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Email</label>
                      <Input type="email" placeholder="your@email.com" />
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium">Subject</label>
                    <Input placeholder="What is this about?" />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium">Priority</label>
                    <select className="w-full p-2 border rounded-md">
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                      <option value="urgent">Urgent</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium">Message</label>
                    <Textarea 
                      placeholder="Please describe your issue or question..."
                      rows={6}
                    />
                  </div>
                  
                  <Button className="w-full">
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Support;