"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Send,
  Paperclip,
  Image,
  Phone,
  Video,
  MoreVertical,
  Clock,
  CheckCheck,
  Search,
  User,
  Settings
} from "lucide-react";

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: string;
  type: "text" | "image" | "file";
  fileUrl?: string;
  fileName?: string;
  isRead: boolean;
  projectId?: string;
}

interface ChatUser {
  id: string;
  name: string;
  role: "contractor" | "project_manager" | "client";
  avatar?: string;
  isOnline: boolean;
  lastSeen?: string;
}

interface RealtimeChatProps {
  contractorId: string;
  currentUserId: string;
}

export default function RealtimeChat({ contractorId, currentUserId }: RealtimeChatProps) {
  const [selectedChat, setSelectedChat] = useState<string | null>("pm-1");
  const [messageText, setMessageText] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Mock data - in real app this would come from WebSocket/API
  const chatUsers: ChatUser[] = [
    {
      id: "pm-1",
      name: "Jennifer Walsh",
      role: "project_manager",
      isOnline: true,
      avatar: "JW"
    },
    {
      id: "pm-2",
      name: "Marcus Rodriguez",
      role: "project_manager",
      isOnline: false,
      lastSeen: "2 hours ago"
    },
    {
      id: "client-1",
      name: "Sarah Johnson",
      role: "client",
      isOnline: true,
      avatar: "SJ"
    },
    {
      id: "client-2",
      name: "Robert Chen",
      role: "client",
      isOnline: false,
      lastSeen: "1 day ago"
    }
  ];

  const messages: Record<string, Message[]> = {
    "pm-1": [
      {
        id: "1",
        senderId: "pm-1",
        senderName: "Jennifer Walsh",
        content: "Hi Mike! Just checking in on the Oakwood project. How's the kitchen cabinet installation going?",
        timestamp: "2025-10-30T09:15:00Z",
        type: "text",
        isRead: true
      },
      {
        id: "2",
        senderId: currentUserId,
        senderName: "Mike Johnson",
        content: "Good morning Jennifer! The cabinets are going great. About 75% complete. Should finish by end of day tomorrow.",
        timestamp: "2025-10-30T09:22:00Z",
        type: "text",
        isRead: true
      },
      {
        id: "3",
        senderId: currentUserId,
        senderName: "Mike Johnson",
        content: "Here's a progress photo from this morning",
        timestamp: "2025-10-30T09:23:00Z",
        type: "image",
        fileUrl: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400",
        isRead: true
      },
      {
        id: "4",
        senderId: "pm-1",
        senderName: "Jennifer Walsh",
        content: "Excellent work! The quality looks fantastic. The client will be thrilled. Any issues with the hardware delivery?",
        timestamp: "2025-10-30T10:45:00Z",
        type: "text",
        isRead: false
      },
      {
        id: "5",
        senderId: currentUserId,
        senderName: "Mike Johnson",
        content: "No issues with hardware. Everything arrived on schedule. Planning to start the countertop installation Monday.",
        timestamp: "2025-10-30T11:02:00Z",
        type: "text",
        isRead: false
      }
    ],
    "client-1": [
      {
        id: "6",
        senderId: "client-1",
        senderName: "Sarah Johnson",
        content: "Hi Mike! I love how the kitchen is coming along. When do you think we can schedule the final walkthrough?",
        timestamp: "2025-10-29T14:30:00Z",
        type: "text",
        isRead: true
      },
      {
        id: "7",
        senderId: currentUserId,
        senderName: "Mike Johnson",
        content: "Hi Sarah! Thank you! I'm planning to finish everything by Friday. We could do the walkthrough on Saturday morning if that works for you?",
        timestamp: "2025-10-29T15:15:00Z",
        type: "text",
        isRead: true
      }
    ]
  };

  const filteredUsers = chatUsers.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedUser = chatUsers.find(user => user.id === selectedChat);
  const chatMessages = selectedChat ? messages[selectedChat] || [] : [];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  const handleSendMessage = () => {
    if (!messageText.trim() || !selectedChat) return;

    // In real app, this would send via WebSocket
    console.log("Sending message:", {
      to: selectedChat,
      content: messageText,
      type: "text"
    });

    setMessageText("");
  };

  const handleFileUpload = (type: "image" | "file") => {
    if (fileInputRef.current) {
      fileInputRef.current.accept = type === "image" ? "image/*" : "*";
      fileInputRef.current.click();
    }
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatLastSeen = (lastSeen: string) => {
    return `Last seen ${lastSeen}`;
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case "project_manager": return "bg-blue-100 text-blue-800";
      case "client": return "bg-green-100 text-green-800";
      case "contractor": return "bg-orange-100 text-orange-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case "project_manager": return "PM";
      case "client": return "Client";
      case "contractor": return "Contractor";
      default: return role;
    }
  };

  return (
    <div className="flex h-[600px] bg-white rounded-lg border overflow-hidden">
      {/* Chat List Sidebar */}
      <div className="w-1/3 border-r flex flex-col">
        {/* Search Header */}
        <div className="p-4 border-b">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search conversations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto">
          {filteredUsers.map((user) => {
            const lastMessage = messages[user.id]?.[messages[user.id]?.length - 1];
            const unreadCount = messages[user.id]?.filter(m => !m.isRead && m.senderId !== currentUserId).length || 0;

            return (
              <div
                key={user.id}
                onClick={() => setSelectedChat(user.id)}
                className={`p-4 border-b cursor-pointer transition-colors hover:bg-gray-50 ${
                  selectedChat === user.id ? "bg-blue-50 border-r-2 border-r-blue-500" : ""
                }`}
              >
                <div className="flex items-center space-x-3">
                  {/* Avatar */}
                  <div className="relative">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center">
                      <span className="text-white font-medium text-sm">
                        {user.avatar || user.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    {user.isOnline && (
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                    )}
                  </div>

                  {/* User Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <p className="font-medium text-slate-900 truncate">{user.name}</p>
                      <Badge className={`text-xs ${getRoleColor(user.role)}`}>
                        {getRoleLabel(user.role)}
                      </Badge>
                    </div>

                    {lastMessage ? (
                      <p className="text-sm text-slate-600 truncate">
                        {lastMessage.type === "image" ? "📷 Photo" :
                         lastMessage.type === "file" ? "📎 File" :
                         lastMessage.content}
                      </p>
                    ) : (
                      <p className="text-sm text-slate-400">Start a conversation</p>
                    )}

                    <p className="text-xs text-slate-400">
                      {user.isOnline ? "Online" : formatLastSeen(user.lastSeen || "")}
                    </p>
                  </div>

                  {/* Unread Badge */}
                  {unreadCount > 0 && (
                    <Badge className="bg-red-500 text-white text-xs">
                      {unreadCount}
                    </Badge>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Chat Content */}
      <div className="flex-1 flex flex-col">
        {selectedUser ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center">
                    <span className="text-white font-medium text-sm">
                      {selectedUser.avatar || selectedUser.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  {selectedUser.isOnline && (
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                  )}
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">{selectedUser.name}</h3>
                  <div className="flex items-center space-x-2">
                    <Badge className={`text-xs ${getRoleColor(selectedUser.role)}`}>
                      {getRoleLabel(selectedUser.role)}
                    </Badge>
                    <span className="text-sm text-slate-600">
                      {selectedUser.isOnline ? "Online" : formatLastSeen(selectedUser.lastSeen || "")}
                    </span>
                  </div>
                </div>
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

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {chatMessages.map((message, index) => {
                const isOwn = message.senderId === currentUserId;
                const showAvatar = index === 0 || chatMessages[index - 1].senderId !== message.senderId;

                return (
                  <div
                    key={message.id}
                    className={`flex ${isOwn ? "justify-end" : "justify-start"}`}
                  >
                    <div className={`flex space-x-2 max-w-xs lg:max-w-md ${isOwn ? "flex-row-reverse space-x-reverse" : ""}`}>
                      {/* Avatar */}
                      {showAvatar && !isOwn && (
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-white font-medium text-xs">
                            {selectedUser?.avatar || selectedUser?.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                      )}

                      {/* Message Bubble */}
                      <div className={`rounded-lg px-4 py-2 ${
                        isOwn
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 text-slate-900"
                      }`}>
                        {message.type === "image" ? (
                          <div className="space-y-2">
                            {message.content && <p>{message.content}</p>}
                            <img
                              src={message.fileUrl}
                              alt="Shared image"
                              className="rounded max-w-full h-auto"
                            />
                          </div>
                        ) : message.type === "file" ? (
                          <div className="flex items-center space-x-2">
                            <Paperclip className="h-4 w-4" />
                            <span>{message.fileName}</span>
                          </div>
                        ) : (
                          <p>{message.content}</p>
                        )}

                        <div className={`flex items-center justify-between mt-1 text-xs ${
                          isOwn ? "text-blue-200" : "text-slate-500"
                        }`}>
                          <span>{formatTime(message.timestamp)}</span>
                          {isOwn && (
                            <CheckCheck className={`h-3 w-3 ml-2 ${
                              message.isRead ? "text-blue-200" : "text-blue-300"
                            }`} />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-center space-x-2 bg-gray-100 rounded-lg px-4 py-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                    </div>
                    <span className="text-xs text-gray-600">{selectedUser.name} is typing...</span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="p-4 border-t">
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleFileUpload("file")}
                >
                  <Paperclip className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleFileUpload("image")}
                >
                  <Image className="h-4 w-4" />
                </Button>
                <Input
                  placeholder="Type a message..."
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  className="flex-1"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!messageText.trim()}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Hidden File Input */}
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              onChange={(e) => {
                // In real app, handle file upload here
                console.log("File selected:", e.target.files?.[0]);
              }}
            />
          </>
        ) : (
          /* No Chat Selected */
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Select a conversation</h3>
              <p className="text-gray-600">Choose someone to start chatting with</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
