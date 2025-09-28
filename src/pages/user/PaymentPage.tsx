import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { 
  CreditCard, 
  Smartphone, 
  Wallet, 
  Building, 
  Shield,
  CheckCircle,
  ArrowLeft,
  Download,
  QrCode
} from "lucide-react";

const PaymentPage = () => {
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [showInvoice, setShowInvoice] = useState(false);

  const orderDetails = {
    id: "FO-2024-001",
    service: "Premium Petrol",
    quantity: "50L",
    unitPrice: 102.50,
    subtotal: 5125.00,
    deliveryFee: 25.00,
    gst: 927.00,
    total: 6077.00
  };

  const paymentMethods = [
    {
      id: "upi",
      name: "UPI Payment",
      description: "Pay using Google Pay, PhonePe, Paytm",
      icon: Smartphone,
      color: "bg-accent"
    },
    {
      id: "card",
      name: "Credit/Debit Card",
      description: "Visa, Mastercard, RuPay",
      icon: CreditCard,
      color: "bg-primary"
    },
    {
      id: "wallet",
      name: "Digital Wallet",
      description: "Paytm, Mobikwik, Amazon Pay",
      icon: Wallet,
      color: "bg-secondary"
    },
    {
      id: "netbanking",
      name: "Net Banking",
      description: "All major banks supported",
      icon: Building,
      color: "bg-muted"
    }
  ];

  const handlePayment = () => {
    // Simulate successful payment
    setShowInvoice(true);
  };

  if (showInvoice) {
    return (
      <DashboardLayout userRole="user">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Success Header */}
          <div className="bg-success-gradient rounded-lg p-6 text-white text-center">
            <CheckCircle className="w-16 h-16 mx-auto mb-4" />
            <h1 className="text-3xl font-bold mb-2">Payment Successful!</h1>
            <p className="text-white/90">Your order has been confirmed and will be delivered soon</p>
          </div>

          {/* Invoice */}
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Tax Invoice</CardTitle>
              <p className="text-muted-foreground">Order #{orderDetails.id}</p>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Invoice Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-2">Bill To:</h3>
                  <div className="text-sm text-muted-foreground">
                    <p>John Doe</p>
                    <p>123 Marine Drive</p>
                    <p>Mumbai, Maharashtra 400001</p>
                    <p>Phone: +91 98765 43210</p>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">From:</h3>
                  <div className="text-sm text-muted-foreground">
                    <p>FuelPro Services Pvt Ltd</p>
                    <p>456 Business Park</p>
                    <p>Mumbai, Maharashtra 400001</p>
                    <p>GSTIN: 27XXXXX1234X1ZX</p>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Order Items */}
              <div>
                <h3 className="font-semibold mb-4">Order Details</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <div>
                      <p className="font-medium">{orderDetails.service}</p>
                      <p className="text-sm text-muted-foreground">
                        {orderDetails.quantity} × ₹{orderDetails.unitPrice}/L
                      </p>
                    </div>
                    <span className="font-medium">₹{orderDetails.subtotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Payment Summary */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{orderDetails.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span>₹{orderDetails.deliveryFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>GST (18%)</span>
                  <span>₹{orderDetails.gst.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total Amount</span>
                  <span>₹{orderDetails.total.toFixed(2)}</span>
                </div>
              </div>

              <div className="text-center space-y-4">
                <div className="flex items-center justify-center gap-2 text-accent">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-medium">Paid via UPI</span>
                </div>
                
                <div className="flex gap-4 justify-center">
                  <Button variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Download Invoice
                  </Button>
                  <Button variant="outline">
                    Track Order
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout userRole="user">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Payment</h1>
            <p className="text-muted-foreground">Complete your order payment</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Payment Methods */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Select Payment Method
                </CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-4">
                  {paymentMethods.map((method) => (
                    <div key={method.id} className="flex items-center space-x-2">
                      <RadioGroupItem value={method.id} id={method.id} />
                      <Label 
                        htmlFor={method.id} 
                        className="flex-1 cursor-pointer"
                      >
                        <div className="flex items-center gap-3 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                          <div className={`w-10 h-10 ${method.color} rounded-full flex items-center justify-center`}>
                            <method.icon className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <p className="font-medium">{method.name}</p>
                            <p className="text-sm text-muted-foreground">{method.description}</p>
                          </div>
                        </div>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Payment Details Form */}
            <Card>
              <CardHeader>
                <CardTitle>Payment Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {paymentMethod === "upi" && (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="upi-id">UPI ID</Label>
                      <Input 
                        id="upi-id" 
                        placeholder="username@paytm / 9876543210@ybl"
                      />
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground mb-4">Or scan QR code</p>
                      <div className="w-32 h-32 bg-muted rounded-lg flex items-center justify-center mx-auto">
                        <QrCode className="w-16 h-16 text-muted-foreground" />
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === "card" && (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="card-number">Card Number</Label>
                      <Input 
                        id="card-number" 
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiry">Expiry Date</Label>
                        <Input id="expiry" placeholder="MM/YY" maxLength={5} />
                      </div>
                      <div>
                        <Label htmlFor="cvv">CVV</Label>
                        <Input id="cvv" placeholder="123" maxLength={3} />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="cardholder">Cardholder Name</Label>
                      <Input id="cardholder" placeholder="John Doe" />
                    </div>
                  </div>
                )}

                {paymentMethod === "wallet" && (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="wallet">Select Wallet</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose wallet" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="paytm">Paytm Wallet</SelectItem>
                          <SelectItem value="mobikwik">Mobikwik</SelectItem>
                          <SelectItem value="amazonpay">Amazon Pay</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="mobile">Mobile Number</Label>
                      <Input id="mobile" placeholder="+91 98765 43210" />
                    </div>
                  </div>
                )}

                {paymentMethod === "netbanking" && (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="bank">Select Bank</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose your bank" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sbi">State Bank of India</SelectItem>
                          <SelectItem value="hdfc">HDFC Bank</SelectItem>
                          <SelectItem value="icici">ICICI Bank</SelectItem>
                          <SelectItem value="axis">Axis Bank</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white">
                      ⛽
                    </div>
                    <div>
                      <p className="font-medium">{orderDetails.service}</p>
                      <p className="text-sm text-muted-foreground">Order #{orderDetails.id}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Subtotal ({orderDetails.quantity})</span>
                    <span>₹{orderDetails.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery Fee</span>
                    <span>₹{orderDetails.deliveryFee.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>GST (18%)</span>
                    <span>₹{orderDetails.gst.toFixed(2)}</span>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>₹{orderDetails.total.toFixed(2)}</span>
                </div>

                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    <span>Secure payment</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>30-minute delivery</span>
                  </div>
                </div>

                <Button 
                  className="w-full bg-fuel-gradient hover:opacity-90" 
                  size="lg"
                  onClick={handlePayment}
                >
                  Pay ₹{orderDetails.total.toFixed(2)}
                </Button>

                <p className="text-xs text-center text-muted-foreground">
                  By proceeding, you agree to our Terms & Conditions
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PaymentPage;