import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import rehypeHighlight from "rehype-highlight";
import Zoom from "react-medium-image-zoom";
import Image from "next/image";
import "react-medium-image-zoom/dist/styles.css";
import "katex/dist/katex.min.css";
import "highlight.js/styles/github-dark.css";
import { ClipboardIcon, CheckIcon, SparklesIcon, UserCircleIcon } from "@heroicons/react/24/outline";

const CustomLink = ({ href, children }) => {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
};

function Message({ message }) {
  const [relatedImages, setRelatedImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const isChatGpt = message.message_type === "gpt";

  useEffect(() => {
    if (!message.related_images) return;
    const splitRelatedImages = message.related_images.split(",");
    setRelatedImages(splitRelatedImages);
  }, [message]);

  const handleImageSelect = (index) => {
    setSelectedImage(index);
  };

  return (
    <div className={`py-6 px-4 ${
      isChatGpt 
        ? "bg-gradient-to-r from-blue-50 to-slate-50 border-l-4 border-blue-400" 
        : "bg-white border-r-4 border-gray-300"
    }`}>
      <div className="max-w-4xl mx-auto">
        <div className={`flex gap-4 items-start ${isChatGpt ? "flex-row" : "flex-row-reverse"}`}>
          {/* Avatar */}
          <div className={`flex-shrink-0 w-10 h-10 rounded-full overflow-hidden flex items-center justify-center ${
            isChatGpt 
              ? "bg-gradient-to-r from-blue-500 to-blue-600" 
              : "bg-gradient-to-r from-gray-400 to-gray-500"
          }`}>
            {isChatGpt ? (
              <SparklesIcon className="w-6 h-6 text-white" />
            ) : (
              <UserCircleIcon className="w-6 h-6 text-white" />
            )}
          </div>

          {/* Message Content */}
          <div className={`flex-1 min-w-0 ${isChatGpt ? "text-left" : "text-right"}`}>
            <div className={`text-sm font-medium mb-2 ${
              isChatGpt ? "text-blue-700" : "text-gray-700"
            }`}>
              {isChatGpt ? "Obo Tutor" : "You"}
            </div>
            
            <div className={`prose prose-sm max-w-none ${isChatGpt ? "text-left" : "text-right"}`}>
              <ReactMarkdown
                className="text-gray-900 markdown-body"
                remarkPlugins={[remarkMath]}
                rehypePlugins={[rehypeKatex, rehypeHighlight]}
                components={{
                  a: CustomLink,
                  p: ({ children }) => (
                    <p className={`text-gray-900 mb-3 leading-relaxed ${isChatGpt ? "text-left" : "text-right"}`}>
                      {children}
                    </p>
                  ),
                  h1: ({ children }) => (
                    <h1 className={`text-2xl font-bold text-gray-900 mb-4 mt-6 ${isChatGpt ? "text-left" : "text-right"}`}>
                      {children}
                    </h1>
                  ),
                  h2: ({ children }) => (
                    <h2 className={`text-xl font-semibold text-gray-900 mb-3 mt-5 ${isChatGpt ? "text-left" : "text-right"}`}>
                      {children}
                    </h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className={`text-lg font-medium text-gray-900 mb-2 mt-4 ${isChatGpt ? "text-left" : "text-right"}`}>
                      {children}
                    </h3>
                  ),
                  ul: ({ children }) => (
                    <ul className={`list-disc text-gray-900 mb-3 space-y-1 ${isChatGpt ? "list-inside text-left" : "list-inside text-right"}`}>
                      {children}
                    </ul>
                  ),
                  ol: ({ children }) => (
                    <ol className={`list-decimal text-gray-900 mb-3 space-y-1 ${isChatGpt ? "list-inside text-left" : "list-inside text-right"}`}>
                      {children}
                    </ol>
                  ),
                  li: ({ children }) => (
                    <li className="text-gray-900">{children}</li>
                  ),
                  code: ({ children }) => (
                    <code className="bg-gray-200 text-gray-900 px-1.5 py-0.5 rounded text-sm font-mono">
                      {children}
                    </code>
                  ),
                  pre: ({ children }) => (
                    <pre className="bg-gray-800 text-gray-100 rounded-lg overflow-x-auto mb-4 p-4">
                      <code className="text-gray-100">{children}</code>
                    </pre>
                  ),
                }}
              >
                {message.message}
              </ReactMarkdown>
            </div>
            
            {/* Related Images */}
            {relatedImages.length > 0 && (
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {relatedImages.slice(0, -1).map((image, index) => (
                  <div
                    key={index}
                    className={`relative rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-pointer ${
                      selectedImage === index ? "ring-2 ring-blue-500" : ""
                    }`}
                    onClick={() => handleImageSelect(index)}
                  >
                    <Zoom>
                      <Image
                        src={image}
                        alt={`Related image ${index + 1}`}
                        width={300}
                        height={200}
                        className="w-full h-48 object-cover"
                      />
                    </Zoom>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Message;
