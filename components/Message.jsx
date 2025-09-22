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
import { ClipboardIcon, CheckIcon } from "@heroicons/react/24/outline";

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
        <Image
          className="rounded-full w-10 h-10"
          src={isChatGpt ? "/robo-profile.jpeg" : "/prof.png"}
          alt={isChatGpt ? "AI Assistant" : "User"}
          width={40}
          height={40}
        />

        <div className="flex flex-col overflow-x-auto text-wrap">
          <ReactMarkdown
            className="text-md markdown-body"
            remarkPlugins={[remarkMath]}
            rehypePlugins={[rehypeKatex, rehypeHighlight]}
            components={{
              a: CustomLink,
            }}
          >
            {message.message}
          </ReactMarkdown>
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
                    <Image
                      src={image}
                      alt={`Related image ${index + 1}`}
                      width={400}
                      height={300}
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
