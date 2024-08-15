"use client";
import React, { useState, useEffect, useCallback } from "react";

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

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Temporary Email Generator</h1>
      <div className="mb-4">
        {emailServices.map((service) => (
          <label key={service.id} className="inline-flex items-center mr-4">
            <input
              type="checkbox"
              className="form-checkbox"
              checked={selectedServices.includes(service.id)}
              onChange={() => handleServiceToggle(service.id)}
            />
            <span className="ml-2">{service.label}</span>
          </label>
        ))}
      </div>
      <button
        onClick={generateEmail}
        disabled={loading || selectedServices.length === 0}
        className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-400"
      >
        {loading ? "Generating..." : "Generate Email"}
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {generatedEmail && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold">Generated Email:</h2>
          <p className="text-lg">{generatedEmail}</p>
          <button
            onClick={handleManualRefresh}
            disabled={isRefreshing}
            className={`bg-green-500 text-white px-4 py-2 rounded mt-2 ${
              isRefreshing ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isRefreshing ? (
              <div className="flex items-center justify-center">
                <svg
                  className="animate-spin h-5 w-5 mr-3 text-white"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0l5 5-5 5V8a6 6 0 00-6 6H4z"
                  ></path>
                </svg>
                Refreshing...
              </div>
            ) : (
              "Refresh Inbox"
            )}
          </button>
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Inbox:</h3>
            <ul className="divide-y divide-gray-200">
              {messages.map((message) => (
                <li key={message.messageID} className="py-4">
                  <a
                    href={`https://www.emailnator.com/inbox/${generatedEmail}/${message.messageID}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block hover:bg-gray-100 p-2 rounded-md"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <span className="inline-block h-8 w-8 rounded-full bg-gray-200"></span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {message.from}
                        </p>
                        <p className="text-sm text-gray-500 truncate">
                          {message.subject}
                        </p>
                      </div>
                      <div className="inline-flex items-center text-sm font-semibold text-gray-900">
                        {message.time}
                      </div>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default TempMailGenerator;
