"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Copy, RefreshCw, RotateCw } from "lucide-react";

const emailServices = [
  { id: "domain", label: "Domain" },
  { id: "plusGmail", label: "+Gmail" },
  { id: "dotGmail", label: ".Gmail" },
  { id: "googleMail", label: "Google Mail" },
];

interface Message {
  messageID: string;
  from: string;
  subject: string;
  time: string;
}

const TempMailGenerator: React.FC = () => {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [generatedEmail, setGeneratedEmail] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const handleServiceToggle = (service: string) => {
    setSelectedServices((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service]
    );
  };

  const generateEmail = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/temp-mail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: selectedServices }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to generate email");
      }

      const data = await response.json();
      if (data.email && data.email.length > 0) {
        setGeneratedEmail(data.email[0]);
        setMessages([]); // Clear previous messages when new email is generated
      } else {
        throw new Error("No email generated");
      }
    } catch (error) {
      console.error("Error generating email:", error);
      setError((error as Error).message);
    }
    setLoading(false);
  };

  const fetchMessages = useCallback(async () => {
    if (!generatedEmail) return;
    try {
      const response = await fetch(`/api/temp-mail?email=${generatedEmail}`);
      if (!response.ok) {
        throw new Error("Failed to fetch messages");
      }
      const data = await response.json();
      setMessages(data.messageData || []);
    } catch (error) {
      console.error("Error fetching messages:", error);
      setError("Failed to fetch messages");
    }
  }, [generatedEmail]);

  useEffect(() => {
    if (generatedEmail) {
      fetchMessages();
      const interval = setInterval(fetchMessages, 10000);
      return () => clearInterval(interval);
    }
  }, [generatedEmail, fetchMessages]);

  const handleManualRefresh = () => {
    if (isRefreshing) return;
    setIsRefreshing(true);
    fetchMessages();
    setTimeout(() => {
      setIsRefreshing(false);
    }, 5000);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const changeEmail = () => {
    generateEmail();
  };

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6 text-center">Temporary Mail</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Temporary Email Generator</h2>
        <div className="flex flex-wrap gap-4 mb-4">
          {emailServices.map((service) => (
            <label key={service.id} className="inline-flex items-center">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-blue-600"
                checked={selectedServices.includes(service.id)}
                onChange={() => handleServiceToggle(service.id)}
              />
              <span className="ml-2 text-gray-700">{service.label}</span>
            </label>
          ))}
        </div>
        <button
          onClick={generateEmail}
          disabled={loading || selectedServices.length === 0}
          className="w-full bg-blue-500 text-white px-4 py-2 rounded-md transition duration-300 ease-in-out hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {loading ? "Generating..." : "Generate Email"}
        </button>
        {error && (
          <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
            {error}
          </div>
        )}
        {generatedEmail && (
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-2">Generated Email:</h3>
            <div className="flex items-center bg-gray-100 p-3 rounded-md">
              <p className="text-lg flex-grow">{generatedEmail}</p>
              <button
                onClick={copyToClipboard}
                className="ml-2 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300 ease-in-out"
                title="Copy to clipboard"
              >
                <Copy size={20} />
              </button>
            </div>
            {copied && (
              <p className="text-green-500 text-sm mt-1">Copied to clipboard!</p>
            )}
            <div className="flex gap-2 mt-4">
              <button
                onClick={handleManualRefresh}
                disabled={isRefreshing}
                className={`flex-1 flex items-center justify-center bg-green-500 text-white px-4 py-2 rounded-md transition duration-300 ease-in-out hover:bg-green-600 ${
                  isRefreshing ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isRefreshing ? (
                  <>
                    <RefreshCw className="animate-spin mr-2" size={20} />
                    Refreshing...
                  </>
                ) : (
                  <>
                    <RefreshCw className="mr-2" size={20} />
                    Refresh Inbox
                  </>
                )}
              </button>
              <button
                onClick={changeEmail}
                disabled={loading}
                className={`flex-1 flex items-center justify-center bg-yellow-500 text-white px-4 py-2 rounded-md transition duration-300 ease-in-out hover:bg-yellow-600 ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                <RotateCw className="mr-2" size={20} />
                Change Email
              </button>
            </div>
            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-2">Inbox:</h3>
              {messages.length === 0 ? (
                <p className="text-gray-500">No messages yet.</p>
              ) : (
                <ul className="divide-y divide-gray-200">
                  {messages.map((message) => (
                    <li key={message.messageID} className="py-4">
                      <a
                        href={`https://www.emailnator.com/inbox/${generatedEmail}/${message.messageID}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block hover:bg-gray-100 p-3 rounded-md transition duration-300 ease-in-out"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="flex-shrink-0">
                            <span className="inline-block h-10 w-10 rounded-full bg-gray-200"></span>
                          </div>
                          <div className="flex-grow min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {message.from}
                            </p>
                            <p className="text-sm text-gray-500 truncate">
                              {message.subject}
                            </p>
                          </div>
                          <div className="text-sm font-semibold text-gray-900">
                            {message.time}
                          </div>
                        </div>
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TempMailGenerator;