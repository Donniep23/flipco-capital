"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  ArrowLeft,
  Save,
  Plus,
  Trash2,
  MessageSquare,
  Edit3,
  Eye,
  ChevronUp,
  ChevronDown
} from "lucide-react";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  order: number;
}

export default function FAQEditor() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [faqItems, setFaqItems] = useState<FAQItem[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    // Check authentication
    const session = localStorage.getItem("flipco_admin_session");
    if (session !== "authenticated") {
      router.push("/admin");
      return;
    }
    setIsAuthenticated(true);

    // Load FAQ data from API
    loadFAQs();
  }, [router]);

  const loadFAQs = async () => {
    try {
      const response = await fetch('/api/faq');
      const result = await response.json();

      if (result.success && result.data && result.data.length > 0) {
        const formatted = result.data.map((item: any) => ({
          id: item.faq_id,
          question: item.question,
          answer: item.answer,
          order: item.order_index
        }));
        setFaqItems(formatted);
      } else {
        // Use defaults if database is empty
        const initialFAQs: FAQItem[] = [
          { id: "1", question: "What is the minimum investment amount?", answer: "Our minimum investment starts at $50,000 per project.", order: 1 },
          { id: "2", question: "What is the typical timeline for a project?", answer: "Most projects are completed within 3-6 months.", order: 2 },
          { id: "3", question: "What are the main risks involved?", answer: "Real estate investment carries inherent risks including market fluctuations.", order: 3 },
          { id: "4", question: "How are profits distributed?", answer: "Profits are distributed based on your investment percentage in the project LLC.", order: 4 },
          { id: "5", question: "How do you select properties?", answer: "Our team uses advanced market analysis to identify undervalued properties.", order: 5 },
          { id: "6", question: "What level of involvement do investors have?", answer: "Investors can choose their level of involvement with regular updates.", order: 6 },
          { id: "7", question: "Are there any tax implications I should know about?", answer: "Yes, real estate investments have tax implications including potential capital gains.", order: 7 },
          { id: "8", question: "How do I get started?", answer: "Getting started is simple: Schedule a consultation with our team.", order: 8 }
        ];
        setFaqItems(initialFAQs);
      }
    } catch (error) {
      console.error('Error loading FAQs:', error);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSaveMessage("");

    try {
      // Save each FAQ item to the database
      for (const item of faqItems) {
        await fetch('/api/faq', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: item.id,
            faq_id: item.id,
            question: item.question,
            answer: item.answer,
            order_index: item.order,
            is_visible: true
          })
        });
      }
      setSaveMessage("✅ FAQ content saved successfully!");
    } catch (error: any) {
      setSaveMessage(`❌ Error: ${error.message}`);
    }

    setIsSaving(false);
    setTimeout(() => setSaveMessage(""), 3000);
  };

  const addNewFAQ = async () => {
    const newFAQ: FAQItem = {
      id: `faq-${Date.now()}`,
      question: "New Question",
      answer: "New Answer",
      order: faqItems.length + 1
    };

    try {
      await fetch('/api/faq', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          faq_id: newFAQ.id,
          question: newFAQ.question,
          answer: newFAQ.answer,
          order_index: newFAQ.order,
          is_visible: true
        })
      });
      setFaqItems([...faqItems, newFAQ]);
    } catch (error) {
      console.error('Error adding FAQ:', error);
    }
  };

  const deleteFAQ = async (id: string) => {
    try {
      await fetch(`/api/faq?id=${id}`, { method: 'DELETE' });
      setFaqItems(faqItems.filter(item => item.id !== id));
    } catch (error) {
      console.error('Error deleting FAQ:', error);
    }
  };

  const updateFAQ = (id: string, field: 'question' | 'answer', value: string) => {
    setFaqItems(faqItems.map(item =>
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const moveFAQ = (id: string, direction: 'up' | 'down') => {
    const index = faqItems.findIndex(item => item.id === id);
    if (
      (direction === 'up' && index === 0) ||
      (direction === 'down' && index === faqItems.length - 1)
    ) return;

    const newItems = [...faqItems];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;

    // Swap items
    [newItems[index], newItems[targetIndex]] = [newItems[targetIndex], newItems[index]];

    // Update order numbers
    newItems.forEach((item, idx) => {
      item.order = idx + 1;
    });

    setFaqItems(newItems);
  };

  if (!isAuthenticated) {
    return <div className="min-h-screen bg-slate-100 flex items-center justify-center">
      <p>Checking authentication...</p>
    </div>;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Button
                variant="ghost"
                onClick={() => router.push("/admin/dashboard")}
                className="mr-4"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
              <div>
                <h1 className="text-xl font-bold text-slate-900">FAQ Editor</h1>
                <p className="text-sm text-slate-500">Manage frequently asked questions</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {saveMessage && (
                <Alert className="max-w-md">
                  <AlertDescription>{saveMessage}</AlertDescription>
                </Alert>
              )}
              <Button
                variant="outline"
                onClick={() => window.open("/#faq", "_blank")}
              >
                <Eye className="h-4 w-4 mr-2" />
                Preview FAQ
              </Button>
              <Button
                onClick={handleSave}
                disabled={isSaving}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Save className="h-4 w-4 mr-2" />
                {isSaving ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">FAQ Management</h2>
              <p className="text-slate-600">Add, edit, and reorder frequently asked questions</p>
            </div>
            <Button
              onClick={addNewFAQ}
              className="bg-green-600 hover:bg-green-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add New FAQ
            </Button>
          </div>
        </div>

        <div className="space-y-6">
          {faqItems.map((faq, index) => (
            <Card key={faq.id} className="shadow-sm">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <MessageSquare className="h-5 w-5" />
                    FAQ #{faq.order}
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => moveFAQ(faq.id, 'up')}
                      disabled={index === 0}
                    >
                      <ChevronUp className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => moveFAQ(faq.id, 'down')}
                      disabled={index === faqItems.length - 1}
                    >
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => deleteFAQ(faq.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor={`question-${faq.id}`}>Question</Label>
                  <Input
                    id={`question-${faq.id}`}
                    value={faq.question}
                    onChange={(e) => updateFAQ(faq.id, 'question', e.target.value)}
                    placeholder="Enter the question"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor={`answer-${faq.id}`}>Answer</Label>
                  <Textarea
                    id={`answer-${faq.id}`}
                    value={faq.answer}
                    onChange={(e) => updateFAQ(faq.id, 'answer', e.target.value)}
                    placeholder="Enter the detailed answer"
                    rows={4}
                    className="mt-1"
                  />
                </div>
              </CardContent>
            </Card>
          ))}

          {faqItems.length === 0 && (
            <Card>
              <CardContent className="flex items-center justify-center h-64">
                <div className="text-center">
                  <MessageSquare className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-slate-900 mb-2">No FAQ Items</h3>
                  <p className="text-slate-600 mb-4">Get started by adding your first FAQ item</p>
                  <Button onClick={addNewFAQ} className="bg-green-600 hover:bg-green-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Add First FAQ
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Quick Tips */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-lg">Quick Tips</CardTitle>
            <CardDescription>Best practices for effective FAQ management</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-600">
              <div>
                <h4 className="font-medium text-slate-900 mb-1">Question Writing</h4>
                <ul className="space-y-1">
                  <li>• Use clear, direct language</li>
                  <li>• Start with question words (What, How, When)</li>
                  <li>• Keep questions concise</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-slate-900 mb-1">Answer Writing</h4>
                <ul className="space-y-1">
                  <li>• Provide comprehensive but concise answers</li>
                  <li>• Use specific examples when helpful</li>
                  <li>• Include relevant links or references</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
