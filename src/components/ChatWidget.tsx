'use client';

import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Sparkles, ArrowRight } from 'lucide-react';
import axios from 'axios';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const QuickActions = [
  { emoji: '🎉', label: 'Upcoming Events', query: 'What events does Samaya Global have coming up?' },
  { emoji: '💝', label: 'How to Donate', query: 'How can I donate to Samaya Global?' },
  { emoji: '🤝', label: 'Volunteer', query: 'How can I volunteer?' },
  { emoji: '🎯', label: 'Our Mission', query: 'Tell me about Samaya Global\'s mission' },
];

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDisclosureOpen, setIsDisclosureOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hi! 👋 I\'m Samaya Care, your smart AI assistant. I\'m here to help with quick answers about our mission, events, donations, and volunteering. What can I help you with?',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const messageToSend = inputValue;
    setInputValue('');
    setLoading(true);

    try {
      const chatHistory = messages
        .filter((m) => m.id !== '1')
        .slice(-10)
        .map((m) => ({ role: m.role, content: m.content }));

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/chat`,
        { message: messageToSend, history: chatHistory }
      );

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.data.message,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 2).toString(),
        role: 'assistant',
        content: 'Oops! Something went wrong. Please try again.',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
      console.error('Chat error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const renderInline = (text: string) => {
    const linkPattern = /(https?:\/\/[^\s]+|\/[a-zA-Z0-9/_-]+)/g;
    const parts = text.split(linkPattern);

    return parts.map((part, index) => {
      if (!part) return null;

      const isUrl = /^https?:\/\//.test(part);
      const isPath = /^\/[a-zA-Z0-9/_-]+$/.test(part);

      const renderBold = (segment: string) => {
        const boldPattern = /(\*\*[^*]+\*\*)/g;
        return segment.split(boldPattern).map((chunk, chunkIndex) => {
          if (!chunk) return null;
          if (!chunk.startsWith('**') || !chunk.endsWith('**')) {
            return <span key={`text-${index}-${chunkIndex}`}>{chunk}</span>;
          }

          return (
            <strong key={`bold-${index}-${chunkIndex}`} className="font-semibold text-emerald-100">
              {chunk.slice(2, -2)}
            </strong>
          );
        });
      };

      if (!isUrl && !isPath) {
        return <span key={`text-${index}`}>{renderBold(part)}</span>;
      }

      return (
        <a
          key={`link-${index}`}
          href={part}
          target={isUrl ? '_blank' : undefined}
          rel={isUrl ? 'noreferrer noopener' : undefined}
          className="underline text-emerald-300 hover:text-emerald-200 transition-colors"
        >
          {renderBold(part)}
        </a>
      );
    });
  };

  const renderMessageContent = (content: string) => {
    const lines = content.split('\n');
    const blocks: React.ReactNode[] = [];
    let listItems: React.ReactNode[] = [];

    const flushList = () => {
      if (!listItems.length) return;
      blocks.push(
        <ul key={`list-${blocks.length}`} className="list-disc pl-5 space-y-1">
          {listItems}
        </ul>
      );
      listItems = [];
    };

    lines.forEach((line, lineIndex) => {
      const trimmed = line.trim();

      if (!trimmed) {
        flushList();
        blocks.push(<div key={`spacer-${lineIndex}`} className="h-2" />);
        return;
      }

      const bulletMatch = /^([•\-*])\s+(.*)$/.exec(trimmed);
      if (bulletMatch) {
        listItems.push(
          <li key={`li-${lineIndex}`}>
            {renderInline(bulletMatch[2])}
          </li>
        );
        return;
      }

      flushList();
      blocks.push(
        <p key={`p-${lineIndex}`}>
          {renderInline(trimmed)}
        </p>
      );
    });

    flushList();
    return blocks;
  };

  return (
    <>
      {isOpen ? (
        <div className="fixed bottom-6 right-6 z-[9999] w-96 max-w-[calc(100vw-24px)] h-[650px] bg-slate-950 border border-emerald-500/30 rounded-3xl shadow-2xl shadow-emerald-500/20 flex flex-col overflow-hidden animate-in slide-in-from-bottom-4 duration-300 backdrop-blur-xl">
          
          {/* Header with gradient */}
          <div className="relative bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-500 p-5 flex items-center justify-between overflow-hidden">
            <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
            <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/20 rounded-full blur-3xl"></div>
            <div className="absolute -left-8 -bottom-8 w-32 h-32 bg-emerald-400/20 rounded-full blur-3xl"></div>
            
            <div className="flex items-center gap-3 relative z-10">
              <div className="w-11 h-11 bg-white rounded-full flex items-center justify-center shadow-lg">
                <Sparkles size={24} className="text-emerald-600 animate-spin" style={{ animationDuration: '3s' }} />
              </div>
              <div>
                <h3 className="font-bold text-white text-lg">Samaya Care</h3>
                <p className="text-emerald-50 text-xs font-medium">Smart AI Assistant</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/20 p-2 rounded-lg transition-all duration-300 relative z-10 active:scale-95"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-gradient-to-b from-slate-900 via-slate-950 to-black/50">
            {messages.length === 1 && !loading ? (
              <div className="space-y-3">
                <div className="bg-slate-800/40 border border-emerald-500/20 rounded-2xl p-4 backdrop-blur-sm">
                  <p className="text-xs text-slate-300 font-medium mb-3">Quick Actions:</p>
                  <div className="space-y-2">
                    {QuickActions.map((action, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          const userMsg: Message = {
                            id: Date.now().toString(),
                            role: 'user',
                            content: action.query,
                            timestamp: new Date(),
                          };
                          setMessages((prev) => [...prev, userMsg]);
                          handleSendMessageInternal(action.query);
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 hover:border-emerald-500/40 rounded-lg text-left text-xs text-emerald-100 transition-all duration-200 group"
                      >
                        <span className="text-sm">{action.emoji}</span>
                        <span className="flex-1 font-medium">{action.label}</span>
                        <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}
                >
                  <div
                    className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed backdrop-blur-sm transition-all duration-200 hover:scale-105 ${
                      msg.role === 'user'
                        ? 'bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-600 text-white rounded-br-none shadow-lg shadow-emerald-500/30 font-medium'
                        : 'bg-slate-800/60 border border-emerald-500/30 text-slate-100 rounded-bl-none shadow-md'
                    }`}
                  >
                    <p className="whitespace-pre-wrap break-words">{renderMessageContent(msg.content)}</p>
                  </div>
                </div>
              ))
            )}
            
            {loading && (
              <div className="flex justify-start animate-in fade-in duration-300">
                <div className="bg-slate-800/60 border border-emerald-500/30 px-4 py-3 rounded-2xl rounded-bl-none shadow-md backdrop-blur-sm">
                  <div className="flex gap-1.5 items-center">
                    <span className="text-xs text-emerald-300 font-medium">Thinking</span>
                    <div className="flex gap-1">
                      <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce"></div>
                      <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '0.15s' }}></div>
                      <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-emerald-500/20 bg-gradient-to-b from-slate-900 to-black/50 p-4 space-y-3 backdrop-blur-xl">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask anything..."
                className="flex-1 px-4 py-3 bg-slate-800/60 border border-emerald-500/30 rounded-xl focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/30 text-slate-100 placeholder-slate-500 text-sm transition-all duration-300 backdrop-blur-sm"
                disabled={loading}
                autoFocus
              />
              <button
                onClick={() => handleSendMessage()}
                disabled={loading || !inputValue.trim()}
                className="px-4 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 disabled:from-slate-600 disabled:to-slate-600 text-white rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 hover:scale-105 active:scale-95"
              >
                <Send size={18} />
              </button>
            </div>
            <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
              <span>✨ Powered by AI - Quick, smart answers</span>
              <button
                type="button"
                onClick={() => setIsDisclosureOpen(true)}
                className="text-emerald-300 hover:text-emerald-200 underline decoration-emerald-400/60"
              >
                AI Disclosure
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Floating Button */
        <div className="fixed bottom-6 right-6 z-[9999] flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-50 text-xs font-semibold shadow-lg shadow-emerald-500/20">
            <span className="text-sm">✨</span>
            Chat with AI
          </div>
          <button
            onClick={() => setIsOpen(true)}
            title="Chat with AI"
            aria-label="Open Samaya Care chat"
            className="w-16 h-16 bg-gradient-to-br from-emerald-400 via-teal-500 to-emerald-600 hover:from-emerald-500 hover:via-teal-600 hover:to-emerald-700 text-white rounded-full flex items-center justify-center shadow-2xl shadow-emerald-500/50 transition-all duration-300 hover:scale-110 hover:shadow-emerald-500/70 active:scale-95 group relative"
          >
            {/* Pulsing rings */}
            <div className="absolute inset-0 rounded-full border-2 border-white/30 group-hover:border-white/50 animate-pulse"></div>
            <div className="absolute inset-1 rounded-full bg-white/10 animate-pulse" style={{ animationDelay: '0.5s' }}></div>

            {/* Icon */}
            <MessageCircle size={28} className="relative z-10 text-white" />

            {/* Smart Badge */}
            <span className="absolute -top-1 -right-1 bg-gradient-to-br from-yellow-400 to-orange-500 text-white text-xs font-black w-6 h-6 rounded-full flex items-center justify-center group-hover:scale-125 transition-transform shadow-lg border border-yellow-300">
              ✨
            </span>
          </button>
        </div>
      )}

      {isDisclosureOpen && (
        <div className="fixed inset-0 z-[10000] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-slate-950 border border-emerald-500/30 rounded-2xl shadow-2xl shadow-emerald-500/20 overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-500">
              <h4 className="text-white font-semibold">AI Disclosure</h4>
              <button
                type="button"
                onClick={() => setIsDisclosureOpen(false)}
                className="text-white/90 hover:text-white hover:bg-white/10 p-2 rounded-lg transition-all"
              >
                Close
              </button>
            </div>
            <div className="px-5 py-4 text-sm text-slate-200 leading-relaxed">
              <p>
                This tool is powered by artificial intelligence and operates independently of Samaya Global. Samaya Global is not responsible for the
                content, outputs, or decisions generated by this AI. Users are encouraged to review and verify all information for accuracy before relying on it.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );

  async function handleSendMessageInternal(messageToSend: string) {
    setLoading(true);
    try {
      const chatHistory = messages
        .filter((m) => m.id !== '1')
        .slice(-10)
        .map((m) => ({ role: m.role, content: m.content }));

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/chat`,
        { message: messageToSend, history: chatHistory }
      );
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.data.message,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 2).toString(),
        role: 'assistant',
        content: 'Oops! Something went wrong. Please try again.',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
      console.error('Chat error:', error);
    } finally {
      setLoading(false);
    }
  }
}
