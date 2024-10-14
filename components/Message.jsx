import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import rehypeHighlight from "rehype-highlight";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import "katex/dist/katex.min.css";
import "highlight.js/styles/github.css"; // Choose your style preference

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
    <div
      className={`py-5 mx-5 rounded-xl text-white ${
        isChatGpt ? "bg-[#434654]" : ""
      }`}
    >
      <div className="flex gap-5 px-10 max-w-3xl mx-5">
        <img
          className="rounded-full w-10 h-10"
          src={isChatGpt ? "/robo-profile.jpeg" : "/prof.png"}
          alt={isChatGpt ? "Chatbot profile" : "User profile"}
        />

        <div className="flex flex-col overflow-x-auto text-wrap">
          <ReactMarkdown
            className="text-md markdown-body"
            children={message.message}
            remarkPlugins={[remarkMath]}
            rehypePlugins={[rehypeKatex, rehypeHighlight]}
            components={{
              a: CustomLink,
            }}
          />
          {relatedImages.length > 0 && (
            <div className="flex gap-5">
              {relatedImages.slice(0, -1).map((image, index) => (
                <div
                  key={index}
                  className={`relative ${
                    selectedImage === index ? "border-2 border-blue-500" : ""
                  } pb-5`}
                  onClick={() => handleImageSelect(index)}
                >
                  <Zoom>
                    <img
                      src={image}
                      alt={`Related image ${index + 1}`}
                      className="w-full rounded-lg cursor-pointer"
                    />
                  </Zoom>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Message;
