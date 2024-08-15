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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-400 via-pink-500 to-red-500">
      <style jsx>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .gradient-button {
          background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
          background-size: 400% 400%;
          animation: gradient 15s ease infinite;
        }
        .neon-button {
          box-shadow: 0 0 5px #03e9f4, 0 0 25px #03e9f4, 0 0 50px #03e9f4, 0 0 200px #03e9f4;
        }
        .scale-on-hover:hover {
          transform: scale(1.05);
          transition: transform 0.3s ease-in-out;
        }
        .glass-effect {
          background: rgba(255, 255, 255, 0.25);
          box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
          border-radius: 10px;
          border: 1px solid rgba(255, 255, 255, 0.18);
        }
        .floating {
          animation: float 6s ease-in-out infinite;
        }
        @keyframes float {
          0% { transform: translatey(0px); }
          50% { transform: translatey(-20px); }
          100% { transform: translatey(0px); }
        }
      `}</style>
      <div className="container mx-auto p-8 max-w-3xl glass-effect floating">
        <h1 className="text-4xl font-bold mb-8 text-center text-white">Temporary Mail</h1>
        <div className="bg-white bg-opacity-10 shadow-lg rounded-lg p-8">
          <h2 className="text-3xl font-semibold mb-6 text-white">Temporary Email Generator</h2>
          <div className="flex flex-wrap gap-4 mb-6">
            {emailServices.map((service) => (
              <label key={service.id} className="inline-flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 text-blue-600"
                  checked={selectedServices.includes(service.id)}
                  onChange={() => handleServiceToggle(service.id)}
                />
                <span className="ml-2 text-white">{service.label}</span>
              </label>
            ))}
          </div>
          <button
            onClick={generateEmail}
            disabled={loading || selectedServices.length === 0}
            className="w-full gradient-button text-white font-bold py-4 px-8 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Generating..." : "Generate Email"}
          </button>
          {error && (
            <div className="mt-4 p-4 bg-red-100 bg-opacity-50 border border-red-400 text-red-700 rounded-md">
              {error}
            </div>
          )}
          {generatedEmail && (
            <div className="mt-8">
              <h3 className="text-2xl font-semibold mb-4 text-white">Generated Email:</h3>
              <div className="flex items-center bg-white bg-opacity-20 p-4 rounded-lg">
                <p className="text-xl flex-grow text-white">{generatedEmail}</p>
                <button
                  onClick={copyToClipboard}
                  className="ml-2 p-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition duration-300 ease-in-out transform hover:rotate-12"
                  title="Copy to clipboard"
                >
                  <Copy size={24} />
                </button>
              </div>
              {copied && (
                <p className="text-green-300 text-sm mt-2">Copied to clipboard!</p>
              )}
              <div className="flex gap-6 mt-6">
                <button
                  onClick={handleManualRefresh}
                  disabled={isRefreshing}
                  className={`flex-1 flex items-center justify-center bg-green-500 text-white px-6 py-4 rounded-lg transition duration-300 ease-in-out neon-button scale-on-hover ${
                    isRefreshing ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {isRefreshing ? (
                    <>
                      <RefreshCw className="animate-spin mr-2" size={24} />
                      Refreshing...
                    </>
                  ) : (
                    <>
                      <RefreshCw className="mr-2" size={24} />
                      Refresh Inbox
                    </>
                  )}
                </button>
                <button
                  onClick={changeEmail}
                  disabled={loading}
                  className={`flex-1 flex items-center justify-center bg-yellow-500 text-white px-6 py-4 rounded-lg transition duration-300 ease-in-out neon-button scale-on-hover ${
                    loading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  <RotateCw className="mr-2" size={24} />
                  Change Email
                </button>
              </div>
              <div className="mt-8">
                <h3 className="text-2xl font-semibold mb-4 text-white">Inbox:</h3>
                {messages.length === 0 ? (
                  <p className="text-gray-300">No messages yet.</p>
                ) : (
                  <ul className="space-y-4">
                    {messages.map((message) => (
                      <li key={message.messageID} className="bg-white bg-opacity-10 rounded-lg overflow-hidden">
                        <a
                          href={`https://www.emailnator.com/inbox/${generatedEmail}/${message.messageID}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block hover:bg-white hover:bg-opacity-20 p-4 transition duration-300 ease-in-out transform hover:scale-105"
                        >
                          <div className="flex items-center space-x-4">
                            <div className="flex-shrink-0">
                              <span className="inline-block h-12 w-12 rounded-full bg-gradient-to-r from-green-400 to-blue-500"></span>
                            </div>
                            <div className="flex-grow min-w-0">
                              <p className="text-md font-medium text-white truncate">
                                {message.from}
                              </p>
                              <p className="text-sm text-gray-300 truncate">
                                {message.subject}
                              </p>
                            </div>
                            <div className="text-sm font-semibold text-gray-300">
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
    </div>
  );
};

export default TempMailGenerator;