"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Send,
  Paperclip,
  Image,
  Phone,
  Video,
  MoreVertical,
  Circle,
  CheckCheck,
  Camera
} from "lucide-react";

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderRole: "contractor" | "manager" | "client";
  content: string;
  timestamp: Date;
  type: "text" | "image" | "file";
  fileUrl?: string;
  fileName?: string;
  status: "sent" | "delivered" | "read";
}

interface ChatParticipant {
  id: string;
  name: string;
  role: "contractor" | "manager" | "client";
  avatar?: string;
  isOnline: boolean;
  lastSeen?: Date;
}

interface ChatInterfaceProps {
  projectId: string;
  currentUserId: string;
  currentUserRole: "contractor" | "manager" | "client";
}

export default function ChatInterface({
  projectId,
  currentUserId,
  currentUserRole
}: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      senderId: "manager-1",
      senderName: "Ela Namazi",
      senderRole: "manager",
      content: "Good morning Mike! How's the tile work progressing in the master bathroom?",
      timestamp: new Date(2025, 9, 30, 9, 15),
      type: "text",
      status: "read"
    },
    {
      id: "2",
      senderId: "contractor-1",
      senderName: "Mike Johnson",
      senderRole: "contractor",
      content: "Morning Ela! Making great progress. About 70% complete. Should finish by Thursday as planned.",
      timestamp: new Date(2025, 9, 30, 9, 18),
      type: "text",
      status: "read"
    },
    {
      id: "3",
      senderId: "contractor-1",
      senderName: "Mike Johnson",
      senderRole: "contractor",
      content: "Here's the current progress:",
      timestamp: new Date(2025, 9, 30, 9, 19),
      type: "image",
      fileUrl: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400",
      fileName: "bathroom_progress_10-30.jpg",
      status: "delivered"
    },
    {
      id: "4",
      senderId: "manager-1",
      senderName: "Ela Namazi",
      senderRole: "manager",
      content: "Excellent work! The tile pattern looks perfect. Client will be thrilled.",
      timestamp: new Date(2025, 9, 30, 9, 25),
      type: "text",
      status: "sent"
    }
  ]);

  const [newMessage, setNewMessage] = useState("");
  const [participants] = useState<ChatParticipant[]>([
    {
      id: "manager-1",
      name: "Ela Namazi",
      role: "manager",
      isOnline: true
    },
    {
      id: "contractor-1",
      name: "Mike Johnson",
      role: "contractor",
      isOnline: true
    },
    {
      id: "client-1",
      name: "Robert Williams",
      role: "client",
      isOnline: false,
      lastSeen: new Date(2025, 9, 30, 8, 30)
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      senderId: currentUserId,
      senderName: currentUserRole === "contractor" ? "Mike Johnson" : "Sarah Chen",
      senderRole: currentUserRole,
      content: newMessage,
      timestamp: new Date(),
      type: "text",
      status: "sent"
    };

    setMessages(prev => [...prev, message]);
    setNewMessage("");
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const isImage = file.type.startsWith('image/');
    const message: Message = {
      id: Date.now().toString(),
      senderId: currentUserId,
      senderName: currentUserRole === "contractor" ? "Mike Johnson" : "Sarah Chen",
      senderRole: currentUserRole,
      content: isImage ? "Photo shared" : "File shared",
      timestamp: new Date(),
      type: isImage ? "image" : "file",
      fileUrl: URL.createObjectURL(file),
      fileName: file.name,
      status: "sent"
    };

    setMessages(prev => [...prev, message]);
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case "contractor": return "bg-green-100 text-green-800";
      case "manager": return "bg-blue-100 text-blue-800";
      case "client": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "sent": return <Circle className="h-3 w-3" />;
      case "delivered": return <CheckCheck className="h-3 w-3" />;
      case "read": return <CheckCheck className="h-3 w-3 text-blue-500" />;
      default: return null;
    }
  };

  return (
    <Card className="h-[600px] flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg">Project Chat</CardTitle>
            <p className="text-sm text-slate-600">Oakwood Renovation Team</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Phone className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm">
              <Video className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Participants */}
        <div className="flex items-center space-x-2 pt-2">
          {participants.map((participant) => (
            <div key={participant.id} className="flex items-center space-x-1">
              <Badge className={getRoleColor(participant.role)}>
                {participant.name}
              </Badge>
              <div className={`w-2 h-2 rounded-full ${participant.isOnline ? 'bg-green-400' : 'bg-gray-300'}`} />
            </div>
          ))}
        </div>
      </CardHeader>

      <Separator />

      {/* Messages */}
      <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => {
          const isOwnMessage = message.senderId === currentUserId;

          return (
            <div
              key={message.id}
              className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[70%] ${isOwnMessage ? 'order-2' : 'order-1'}`}>
                {!isOwnMessage && (
                  <div className="flex items-center space-x-2 mb-1">
                    <Badge className={getRoleColor(message.senderRole)}>
                      {message.senderName}
                    </Badge>
                    <span className="text-xs text-slate-500">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                )}

                <div
                  className={`rounded-lg p-3 ${
                    isOwnMessage
                      ? 'bg-green-600 text-white'
                      : 'bg-slate-100 text-slate-900'
                  }`}
                >
                  {message.type === "image" ? (
                    <div className="space-y-2">
                      <img
                        src={message.fileUrl}
                        alt={message.fileName}
                        className="rounded-lg max-w-full h-auto"
                      />
                      <p className="text-sm">{message.content}</p>
                    </div>
                  ) : message.type === "file" ? (
                    <div className="flex items-center space-x-2">
                      <Paperclip className="h-4 w-4" />
                      <span className="text-sm">{message.fileName}</span>
                    </div>
                  ) : (
                    <p>{message.content}</p>
                  )}
                </div>

                {isOwnMessage && (
                  <div className="flex items-center justify-end space-x-1 mt-1">
                    <span className="text-xs text-slate-500">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                    {getStatusIcon(message.status)}
                  </div>
                )}
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </CardContent>

      <Separator />

      {/* Message Input */}
      <div className="p-4">
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
          >
            <Paperclip className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
          >
            <Camera className="h-4 w-4" />
          </Button>
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            className="flex-1"
          />
          <Button onClick={handleSendMessage} className="bg-green-600 hover:bg-green-700">
            <Send className="h-4 w-4" />
          </Button>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          onChange={handleFileUpload}
          className="hidden"
          accept="image/*,.pdf,.doc,.docx"
        />
      </div>
    </Card>
  );
}
