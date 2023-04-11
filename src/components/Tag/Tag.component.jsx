import React from "react";

function Tag({ text, status }) {
  let cl = "";

  switch (status) {
    case "Pending":
      cl = "bg-yellow-P600 text-yellow-P50";
      break;

    case "Disconnected":
      cl = "bg-red-P600 text-red-P50";
      break;

    case "Failed":
      cl = "bg-red-P600 text-red-P50";
      break;

    case "Connected":
      cl = "bg-green-P600 text-green-P50";
      break;

    case "Completed":
      cl = "bg-green-P600 text-green-P50";
      break;

    case "In-Progress":
      cl = "bg-purple-P600 text-purple-P50";
      break;

    default:
      break;
  }
  return <label className={`${cl}  py-1.5 px-3 rounded-xl`}>{text}</label>;
}

export default Tag;
