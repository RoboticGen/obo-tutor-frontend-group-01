import React from "react";

function Message({ message }) {
  console.log(message);

  const isChatGpt = message.role === "admin";

  return (
    <div className={`py-5 text-white ${isChatGpt && "bg-[#434654]"}`}>
      <div className="flex spaxe-x-5 px-10 max-w-2xl mx-auto">
        <p className="pt-1 text-sm">{message.msg}</p>
      </div>
    </div>
  );
}

export default Message;
