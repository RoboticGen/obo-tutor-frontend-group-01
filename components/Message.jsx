import React from "react";

function Message({ message }) {
  console.log(message);

  const isChatGpt = message.message_type === "gpt";

  return (
    <div
      className={`py-5 mx-10 rounded-xl text-white ${
        isChatGpt && "bg-[#434654]"
      }`}
    >
      <div className="flex gap-5 items-center spaxe-x-5 px-10 max-w-2xl mx-5">
        <img
          className="rounded-full w-10 h-10"
          src={isChatGpt ? "/robo-profile.jpeg" : "/prof.png"}
          alt="user"
        />
        <p className="pt-1 text-md">{message.message}</p>
      </div>
    </div>
  );
}

export default Message;
