import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

function Message({ message }) {
  const [related_images, setRelatedImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const isChatGpt = message.message_type === "gpt";

  useEffect(() => {
    if (!message.related_images) return;
    const split_related_images = message.related_images.split(",");
    setRelatedImages(split_related_images);
  }, [message]);

  const handleImageSelect = (index) => {
    setSelectedImage(index);
  };

  return (
    <div
      className={`py-5 mx-5 rounded-xl text-white ${
        isChatGpt && "bg-[#434654]"
      }`}
    >
      <div className="flex gap-5 space-x-5 px-10 max-w-3xl mx-5">
        <img
          className="rounded-full w-10 h-10"
          src={isChatGpt ? "/robo-profile.jpeg" : "/prof.png"}
          alt="user"
        />

        <div className="flex flex-col overflow-x-auto overflow-y-hidden text-wrap">
          <ReactMarkdown className="text-md markdown-body">
            {message.message}
          </ReactMarkdown>
          {related_images.length > 0 && (
            <div className="flex gap-5">
              {related_images.slice(0, -1).map((image, index) => (
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
                      alt={`Image ${index + 1}`}
                      className="w-full  rounded-lg  cursor-pointer"
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
