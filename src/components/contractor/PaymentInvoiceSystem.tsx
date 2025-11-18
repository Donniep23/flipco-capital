"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  DollarSign,
  Plus,
  Download,
  Send,
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  FileText,
  CreditCard,
  TrendingUp,
  Receipt,
  Edit,
  Eye,
  X
} from "lucide-react";

interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

interface Invoice {
  id: string;
  invoiceNumber: string;
  projectId: string;
  projectName: string;
  clientName: string;
  issueDate: string;
  dueDate: string;
  status: "draft" | "sent" | "paid" | "overdue" | "cancelled";
  items: InvoiceItem[];
  subtotal: number;
  tax: number;
  total: number;
  notes?: string;
  paymentMethod?: string;
  paidDate?: string;
}

interface PaymentInvoiceSystemProps {
  contractorId: string;
}

export default function PaymentInvoiceSystem({ contractorId }: PaymentInvoiceSystemProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "invoices" | "payments" | "create">("overview");
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [invoiceFilter, setInvoiceFilter] = useState<"all" | "draft" | "sent" | "paid" | "overdue">("all");

  // Mock data - in real app this would come from API
  const invoices: Invoice[] = [
    {
      id: "inv-001",
      invoiceNumber: "INV-2025-001",
      projectId: "project-1",
      projectName: "Oakwood Renovation",
      clientName: "Flipco Capital",
      issueDate: "2025-10-25",
      dueDate: "2025-11-09",
      status: "sent",
      items: [
        {
          id: "1",
          description: "Kitchen Cabinet Installation",
          quantity: 1,
          rate: 8500,
          amount: 8500
        }
      ],
      subtotal: 8500,
      tax: 680,
      total: 9180,
      notes: "Payment due within 15 days of invoice date."
    },
    {
      id: "inv-002",
      invoiceNumber: "INV-2025-002",
      projectId: "project-2",
      projectName: "Pine Street Fix & Flip",
      clientName: "Flipco Capital",
      issueDate: "2025-10-15",
      dueDate: "2025-10-30",
      status: "paid",
      items: [
        {
          id: "4",
          description: "Bathroom Demolition",
          quantity: 1,
          rate: 2500,
          amount: 2500
        }
      ],
      subtotal: 2500,
      tax: 200,
      total: 2700,
      paymentMethod: "ACH Transfer",
      paidDate: "2025-10-28"
    }
  ];

  const financialSummary = {
    totalEarnings: invoices.filter(inv => inv.status === "paid").reduce((sum, inv) => sum + inv.total, 0),
    pendingPayments: invoices.filter(inv => inv.status === "sent").reduce((sum, inv) => sum + inv.total, 0),
    draftInvoices: invoices.filter(inv => inv.status === "draft").reduce((sum, inv) => sum + inv.total, 0),
    thisMonthEarnings: 11880,
    avgInvoiceValue: invoices.length > 0 ? invoices.reduce((sum, inv) => sum + inv.total, 0) / invoices.length : 0
  };

  const filteredInvoices = invoiceFilter === "all"
    ? invoices
    : invoices.filter(inv => inv.status === invoiceFilter);

  const getStatusColor = (status: Invoice["status"]) => {
    switch (status) {
      case "paid": return "bg-green-100 text-green-800";
      case "sent": return "bg-blue-100 text-blue-800";
      case "draft": return "bg-gray-100 text-gray-800";
      case "overdue": return "bg-red-100 text-red-800";
      case "cancelled": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
        {(["overview", "invoices", "payments", "create"] as const).map((tab) => (
          <Button
            key={tab}
            variant={activeTab === tab ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveTab(tab)}
            className="flex-1 capitalize"
          >
            {tab === "create" && <Plus className="h-4 w-4 mr-2" />}
            {tab}
          </Button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          {/* Financial Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Total Earnings</p>
                    <p className="text-2xl font-bold text-slate-900">
                      {formatCurrency(financialSummary.totalEarnings)}
                    </p>
                  </div>
                  <DollarSign className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Pending Payments</p>
                    <p className="text-2xl font-bold text-slate-900">
                      {formatCurrency(financialSummary.pendingPayments)}
                    </p>
                  </div>
                  <Clock className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">This Month</p>
                    <p className="text-2xl font-bold text-slate-900">
                      {formatCurrency(financialSummary.thisMonthEarnings)}
                    </p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Avg Invoice</p>
                    <p className="text-2xl font-bold text-slate-900">
                      {formatCurrency(financialSummary.avgInvoiceValue)}
                    </p>
                  </div>
                  <Receipt className="h-8 w-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Invoices */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="h-5 w-5 mr-2" />
                Recent Invoices
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {invoices.slice(0, 3).map((invoice) => (
                <div key={invoice.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium text-slate-900">{invoice.invoiceNumber}</p>
                    <p className="text-sm text-slate-600">{invoice.projectName}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{formatCurrency(invoice.total)}</p>
                    <Badge className={getStatusColor(invoice.status)}>
                      {invoice.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Invoices Tab */}
      {activeTab === "invoices" && (
        <div className="space-y-4">
          {/* Filters */}
          <div className="flex items-center justify-between">
            <div className="flex space-x-2">
              {(["all", "draft", "sent", "paid", "overdue"] as const).map((filter) => (
                <Button
                  key={filter}
                  variant={invoiceFilter === filter ? "default" : "outline"}
                  size="sm"
                  onClick={() => setInvoiceFilter(filter)}
                >
                  {filter === "all" ? "All" : filter.charAt(0).toUpperCase() + filter.slice(1)}
                </Button>
              ))}
            </div>
            <Button onClick={() => setActiveTab("create")} className="bg-green-600 hover:bg-green-700">
              <Plus className="h-4 w-4 mr-2" />
              Create Invoice
            </Button>
          </div>

          {/* Invoices List */}
          <div className="space-y-3">
            {filteredInvoices.map((invoice) => (
              <Card key={invoice.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-3">
                        <h3 className="font-semibold text-slate-900">{invoice.invoiceNumber}</h3>
                        <Badge className={getStatusColor(invoice.status)}>
                          {invoice.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-slate-600">{invoice.projectName} - {invoice.clientName}</p>
                      <div className="flex items-center space-x-4 text-sm text-slate-500">
                        <span>Issued: {formatDate(invoice.issueDate)}</span>
                        <span>Due: {formatDate(invoice.dueDate)}</span>
                      </div>
                    </div>

                    <div className="text-right space-y-2">
                      <p className="text-2xl font-bold text-slate-900">{formatCurrency(invoice.total)}</p>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedInvoice(invoice)}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          View
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Payments Tab */}
      {activeTab === "payments" && (
        <Card>
          <CardHeader>
            <CardTitle>Payment History</CardTitle>
            <CardDescription>Track all your payments and transaction history</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {invoices.filter(inv => inv.status === "paid").map((invoice) => (
                <div key={invoice.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-3">
                      <h4 className="font-medium text-slate-900">{invoice.invoiceNumber}</h4>
                      <Badge className="bg-green-100 text-green-800">Completed</Badge>
                    </div>
                    <p className="text-sm text-slate-600">{invoice.projectName}</p>
                    <div className="flex items-center space-x-4 text-sm text-slate-500">
                      <span>Payment Date: {formatDate(invoice.paidDate!)}</span>
                      <span>Method: {invoice.paymentMethod}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-slate-900">{formatCurrency(invoice.total)}</p>
                    <CheckCircle className="h-5 w-5 text-green-600 ml-auto mt-1" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Create Invoice Tab */}
      {activeTab === "create" && (
        <Card>
          <CardHeader>
            <CardTitle>Create New Invoice</CardTitle>
            <CardDescription>Generate an invoice for completed work</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-semibold text-slate-900">Invoice Details</h3>
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="project">Project</Label>
                    <select className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md">
                      <option value="">Select Project</option>
                      <option value="project-1">Oakwood Renovation</option>
                      <option value="project-2">Pine Street Fix & Flip</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="client">Client</Label>
                    <Input id="client" defaultValue="Flipco Capital" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor="issueDate">Issue Date</Label>
                      <Input id="issueDate" type="date" defaultValue={new Date().toISOString().split('T')[0]} />
                    </div>
                    <div>
                      <Label htmlFor="dueDate">Due Date</Label>
                      <Input id="dueDate" type="date" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-slate-900">Invoice Items</h3>
                <div className="space-y-3">
                  <div className="grid grid-cols-4 gap-2 text-sm font-medium text-slate-600">
                    <span>Description</span>
                    <span>Qty</span>
                    <span>Rate</span>
                    <span>Amount</span>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    <Input placeholder="Work description" />
                    <Input type="number" placeholder="1" />
                    <Input type="number" placeholder="0.00" />
                    <Input type="number" placeholder="0.00" readOnly />
                  </div>
                  <Button variant="outline" size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Item
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <Button variant="outline" onClick={() => setActiveTab("invoices")}>
                Cancel
              </Button>
              <Button variant="outline">Save as Draft</Button>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Send className="h-4 w-4 mr-2" />
                Create & Send
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Invoice Detail Modal */}
      {selectedInvoice && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">{selectedInvoice.invoiceNumber}</h2>
                <Button variant="outline" size="sm" onClick={() => setSelectedInvoice(null)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-2">From:</h3>
                    <p className="text-sm text-slate-600">
                      Mike Johnson Construction<br />
                      123 Builder St<br />
                      Austin, TX 78701
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">To:</h3>
                    <p className="text-sm text-slate-600">
                      {selectedInvoice.clientName}<br />
                      Project: {selectedInvoice.projectName}
                    </p>
                  </div>
                </div>

                <div className="border rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left">Description</th>
                        <th className="px-4 py-3 text-right">Qty</th>
                        <th className="px-4 py-3 text-right">Rate</th>
                        <th className="px-4 py-3 text-right">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedInvoice.items.map((item) => (
                        <tr key={item.id}>
                          <td className="px-4 py-3">{item.description}</td>
                          <td className="px-4 py-3 text-right">{item.quantity}</td>
                          <td className="px-4 py-3 text-right">{formatCurrency(item.rate)}</td>
                          <td className="px-4 py-3 text-right">{formatCurrency(item.amount)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="flex justify-end">
                  <div className="w-64 space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal:</span>
                      <span>{formatCurrency(selectedInvoice.subtotal)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tax:</span>
                      <span>{formatCurrency(selectedInvoice.tax)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total:</span>
                      <span>{formatCurrency(selectedInvoice.total)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
