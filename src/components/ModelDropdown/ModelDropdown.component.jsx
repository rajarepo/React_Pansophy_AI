import React from "react";
import { Menu } from "@headlessui/react";

function ModelDropdown({
  btnText,
  onTrain,
  onView,
  onDownload,
  onUpdate,
  onDelete,
}) {
  return (
    <Menu>
      <Menu.Button className={"link"}>{btnText}</Menu.Button>
      <Menu.Items className={"bg-black-P800 my-2 rounded-xl absolute right-12"}>
        <Menu.Item className="block ">
          {({ active }) => (
            <span
              className={`cursor-pointer py-3 pl-5 pr-20 rounded-xl ${
                active && " bg-black-P600"
              }`}
              onClick={onTrain}
            >
              Train
            </span>
          )}
        </Menu.Item>
        <Menu.Item className="block ">
          {({ active }) => (
            <span
              className={`cursor-pointer py-3 pl-5 pr-20 rounded-xl  ${
                active && " bg-black-P600"
              }`}
              onClick={onView}
            >
              View
            </span>
          )}
        </Menu.Item>
        <Menu.Item className="block ">
          {({ active }) => (
            <span
              className={`cursor-pointer py-3 pl-5 pr-20 rounded-xl  ${
                active && " bg-black-P600"
              }`}
              onClick={onDownload}
            >
              Download
            </span>
          )}
        </Menu.Item>
        <Menu.Item className="block ">
          {({ active }) => (
            <span
              className={`cursor-pointer py-3 pl-5 pr-20 rounded-xl  ${
                active && " bg-black-P600"
              }`}
              onClick={onUpdate}
            >
              Update
            </span>
          )}
        </Menu.Item>
        <Menu.Item className="block ">
          {({ active }) => (
            <span
              className={`cursor-pointer py-3 pl-5 pr-20 rounded-xl  ${
                active && " bg-black-P600"
              }`}
              onClick={onDelete}
            >
              Delete
            </span>
          )}
        </Menu.Item>
      </Menu.Items>
    </Menu>
  );
}

export default ModelDropdown;
