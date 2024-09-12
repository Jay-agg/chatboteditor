import React, { useState } from "react";
import { motion } from "framer-motion";
import { HexColorPicker } from "react-colorful";
import { Send } from "lucide-react";

const LeftPanel = ({ settings, updateSettings }) => {
  const [showColorPicker, setShowColorPicker] = useState(false);

  return (
    <div className="w-1/2 p-8 bg-gradient-to-br from-gray-50 to-gray-100 rounded-l-3xl">
      <h2 className="text-3xl font-bold mb-8 text-gray-800">
        Chatbot Settings
      </h2>
      <div className="space-y-6">
        <InputField
          id="title"
          label="Chatbot Title"
          value={settings.title}
          onChange={(e) => updateSettings({ title: e.target.value })}
        />
        <InputField
          id="initialMessage"
          label="Initial Message"
          value={settings.initialMessage}
          onChange={(e) => updateSettings({ initialMessage: e.target.value })}
        />
        <InputField
          id="placeholder"
          label="Placeholder Text"
          value={settings.placeholder}
          onChange={(e) => updateSettings({ placeholder: e.target.value })}
        />
        <div>
          <label
            htmlFor="userBubbleColor"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            User Message Color
          </label>
          <div className="flex items-center space-x-4">
            <div
              className="w-10 h-10 rounded-full shadow-inner cursor-pointer"
              style={{ backgroundColor: settings.userBubbleColor }}
              onClick={() => setShowColorPicker(!showColorPicker)}
            ></div>
            <span className="text-sm text-gray-600">
              {settings.userBubbleColor}
            </span>
          </div>
          {showColorPicker && (
            <div className="mt-2">
              <HexColorPicker
                color={settings.userBubbleColor}
                onChange={(color) => updateSettings({ userBubbleColor: color })}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const InputField = ({ id, label, value, onChange }) => (
  <div>
    <label
      htmlFor={id}
      className="block text-sm font-medium text-gray-700 mb-2"
    >
      {label}
    </label>
    <input
      id={id}
      type="text"
      value={value}
      onChange={onChange}
      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition duration-200 text-gray-800 placeholder-gray-400"
      placeholder={`Enter ${label.toLowerCase()}...`}
    />
  </div>
);

const RightPanel = ({ settings }) => {
  return (
    <div className="w-1/2 p-8 bg-gray-50 flex items-center justify-center rounded-r-3xl">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100"
      >
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6">
          <h2 className="text-white text-2xl font-bold">{settings.title}</h2>
        </div>
        <div className="h-96 overflow-y-auto p-6 space-y-4">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="flex justify-start"
          >
            <div className="bg-gray-100 p-4 rounded-2xl max-w-[75%] shadow-sm">
              {settings.initialMessage}
            </div>
          </motion.div>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="flex justify-end"
          >
            <div
              className="p-4 rounded-2xl max-w-[75%] text-white shadow-sm"
              style={{ backgroundColor: settings.userBubbleColor }}
            >
              Sample user message
            </div>
          </motion.div>
        </div>
        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center">
            <input
              type="text"
              placeholder={settings.placeholder}
              className="flex-grow px-5 py-3 rounded-full border-2 border-gray-200 focus:border-blue-400 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition duration-200 text-gray-800 placeholder-gray-400"
            />
            <button className="ml-4 bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600 transition duration-200 shadow-md">
              <Send />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const ChatbotEditor = () => {
  const [settings, setSettings] = useState({
    title: "Chatbot",
    initialMessage: "Hello! How can I assist you today?",
    placeholder: "Type your message here...",
    userBubbleColor: "#3B82F6",
  });

  const updateSettings = (newSettings) => {
    setSettings({ ...settings, ...newSettings });
  };

  return (
    <div className="flex h-screen font-sans ">
      <LeftPanel settings={settings} updateSettings={updateSettings} />
      <RightPanel settings={settings} />
    </div>
  );
};

export default ChatbotEditor;
