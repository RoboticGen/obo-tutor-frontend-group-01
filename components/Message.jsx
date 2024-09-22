import React from "react";
import ReactMarkdown from "react-markdown";
import { useEffect } from "react";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

function Message({ message }) {
  console.log(message);

  const [related_images, setRelatedImages] = React.useState([]);

  const isChatGpt = message.message_type === "gpt";

  useEffect(() => {
    if (!message.related_images) return;
    const split_related_images = message.related_images.split(",");
    setRelatedImages(split_related_images);

    console.log(related_images, "related_images");
  }, [message]);

  useEffect(() => {
    console.log(related_images, "related_images");
  }, [related_images]);

  return (
    <div
      className={`py-5 mx-10 rounded-xl text-white ${
        isChatGpt && "bg-[#434654]"
      }`}
    >
      <div className="flex gap-5 spaxe-x-5 px-10 max-w-3xl mx-5">
        <img
          className="rounded-full w-10 h-10"
          src={isChatGpt ? "/robo-profile.jpeg" : "/prof.png"}
          alt="user"
        />

        <div className="flex flex-col  overflow-x-auto text-wrap ">
          <ReactMarkdown className="text-md markdown-body ">
            {message.message}
          </ReactMarkdown>
          {
            // Check if the message has images
            related_images && (
              <div className="flex gap-5">
                {related_images.map((image, index) => (
                  <img
                    key={index}
                    src={"/images/" + image}
                    className="w-1/2  rounded-lg mb-5 touch-pinch-zoom "
                  />
                ))}
              </div>
            )
          }
        </div>
      </div>
    </div>
  );
}

export default Message;
