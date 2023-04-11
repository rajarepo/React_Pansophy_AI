import React, { useState, useEffect } from "react";
import { DashboardLayout } from "layout";
import Text from "components/Text/Text.component";
import Input from "components/Input/Input.component";
import Button from "components/Button/Button.component";
import Section from "components/Section/Section.component";
import Icon from "components/Icon/Icon.component";
import Banner from "components/Banner/Banner.component";
import Table from "components/Table/Table.component";
import Tag from "components/Tag/Tag.component";
import Dropdown from "components/Dropdown/Dropdown.component";
import MyModal from "components/MyModal/MyModal.component";
import { toast } from "react-toastify";
import { API } from "lib/api";
import ModelDropdown from "components/ModelDropdown/ModelDropdown.component";
import { Select } from "antd";

const InputSelect = ({ options, placeholder }) => {
  const onChange = (value) => {
    console.log(`selected ${value}`);
  };
  const onSearch = (value) => {
    console.log("search:", value);
  };

  // <Select
  //   showSearch
  //   className="w-full my-3 text-sm input text-white-P600 active focus-visible:ring-1 focus-visible:border-black-P600 focus-visible:outline-none focus-visible:bg-primary-P600 focus:ring-0"
  //   style={{ backgroundColor: "#000" }}
  //   placeholder={placeholder}
  //   optionFilterProp="children"
  //   onChange={onChange}
  //   onSearch={onSearch}
  //   filterOption={(input, option) =>
  //     (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
  //   }
  //   options={[
  //     {
  //       value: "Da-Vinci",
  //       label: "Da-Vinci",
  //     },
  //     {
  //       value: "Random dataset",
  //       label: "Random dataset",
  //     },
  //     {
  //       value: "10 days",
  //       label: "10 days",
  //     },
  //   ]}
  // />
  return (
    <select
      name="filter"
      className="w-full py-3 pl-5 pr-12 my-3 text-sm input text-white-P600 active focus-visible:ring-1 focus-visible:border-black-P600 focus-visible:outline-none focus-visible:bg-primary-P600 focus:ring-0"
      style={{ border: "1px solid #16191F" }}
      disabled
    >
      <option value="1" disabled selected>
        {placeholder}
      </option>
    </select>
  );
};

const Home = () => {
  const dummy = [
    {
      uuid: "1391e37e-bcfc",
      modelName: "Model XYZ",
      modelSize: "2 MB",
      status: "Pending",
      baseModel: "Da-Vinci",
      created_at: "22-12-23",
      last_edited: "24-12-23",
    },
    {
      uuid: "1391e37e-bcfc",
      modelName: "Model XYZ",
      modelSize: "2 MB",
      status: "Completed",
      baseModel: "Da-Vinci",
      created_at: "22-12-23",
      last_edited: "24-12-23",
    },
    {
      uuid: "1391e37e-bcfc",
      modelName: "Model XYZ",
      modelSize: "2 MB",
      status: "In-Progress",
      baseModel: "Da-Vinci",
      created_at: "22-12-23",
      last_edited: "24-12-23",
    },
    {
      uuid: "1391e37e-bcfc",
      modelName: "Model XYZ",
      modelSize: "2 MB",
      status: "Failed",
      baseModel: "Da-Vinci",
      created_at: "22-12-23",
      last_edited: "24-12-23",
    },
    {
      uuid: "1391e37e-bcfc",
      modelName: "Model XYZ",
      modelSize: "2 MB",
      status: "In-Progress",
      baseModel: "Da-Vinci",
      created_at: "22-12-23",
      last_edited: "24-12-23",
    },
    {
      uuid: "1391e37e-bcfc",
      modelName: "Model XYZ",
      modelSize: "2 MB",
      status: "Failed",
      baseModel: "Da-Vinci",
      created_at: "22-12-23",
      last_edited: "24-12-23",
    },
    {
      uuid: "1391e37e-bcfc",
      modelName: "Model XYZ",
      modelSize: "2 MB",
      status: "In-Progress",
      baseModel: "Da-Vinci",
      created_at: "22-12-23",
      last_edited: "24-12-23",
    },
    {
      uuid: "1391e37e-bcfc",
      modelName: "Model XYZ",
      modelSize: "2 MB",
      status: "Failed",
      baseModel: "Da-Vinci",
      created_at: "22-12-23",
      last_edited: "24-12-23",
    },
  ];
  const [websites, setWebsites] = useState(dummy);
  const [checkAll, setCheckAll] = useState(false);
  const [search, setSearch] = useState("");
  // const [page, setPage] = useState(0);
  const [selectedWebsite, setSelectedWebsite] = useState({});
  const [newWebsite, setNewWebsite] = useState({ name: "", url: "" });
  const [showAddModelModal, setShowAddModelModal] = useState(false);
  const [showWebsiteAPIKeyModal, setShowWebsiteAPIKeyModal] = useState(false);
  const [showWebsiteDetailsModal, setShowWebsiteDetailsModal] = useState(false);
  const [showDeleteWebsiteModal, setShowDeleteWebsiteModal] = useState(false);

  const showDetails = (w) => {
    setSelectedWebsite(w);
    setShowWebsiteDetailsModal(true);
  };

  const confirmDelete = (w) => {
    setSelectedWebsite(w);
    setShowDeleteWebsiteModal(true);
  };

  const copyAPIKey = async () => {
    try {
      await navigator.clipboard.writeText(selectedWebsite.api_key);
      // alert('Copied to clipboard')
      toast("API key copied to clipboard succesfully");
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  const saveAWebsite = async () => {
    const data = {
      name: newWebsite.name,
      url: newWebsite.url,
      user_id: 35,
      expires: "2025-04-01T20:25:19.338Z",
      updated: "2023-04-01T20:25:19.338Z",
      created: "2023-04-01T20:25:19.338Z",
    };
    // console.log({data});
    // return false;
    try {
      await API.saveAConnectedWebsite(data);
      setShowAddModelModal(false);
      // readData();
      toast("Website created succesfully. Reading websites now...");
    } catch (e) {
      alert("Error saving because");
    }
  };

  return (
    <DashboardLayout>
      <div className="bg-[#08090A] gap-5 p-10 text-white h-full">
        <Section.PageHeading>
          <Text.PageHeading text="Models" />
          <div className="grid grid-flow-col justify-items-end">
            <div className="">
              <Button
                className="ml-2"
                type={"primary"}
                label={"+ Add Model"}
                onClick={() => setShowAddModelModal(true)}
              />
            </div>
          </div>
        </Section.PageHeading>

        {/* Sub heading */}
        <Banner
          type={"primary"}
          icon={<Icon.Card />}
          title={"Subscription status"}
          subtitle={"Expiring in 2 days"}
          onClick={() => alert("leave me alone")}
          buttonText={"Renew subscription"}
        />

        {/* Search bar & sorting */}
        <div className="flex items-center justify-center gap-6 md:justify-between md:flex-nowrap">
          <div className="relative w-full">
            <input
              type="text"
              className="min-w-full px-4 py-3 text-xs bg-[#08090A] border-[#16191F] rounded-md focus:outline-none placeholder-[#6C757D]"
              style={{ border: "1px solid #16191F" }}
              placeholder="Search by name or ID..."
            />
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <div className="cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4 text-[#6C757D]"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div className="w-1/4 filter">
            <select
              name="filter"
              className="min-w-full bg-[#08090A] px-1 py-3 pl-5 pr-12 bg-P600 text-xs border-[#16191F] rounded-md text-white-P600 active focus-visible:ring-1 focus-visible:border-black-P600 focus-visible:outline-none focus:ring-0"
              style={{ border: "1px solid #16191F" }}
            >
              <option value="1" disabled selected>
                Filter by...
              </option>
              <option value="2">Status</option>
              <option value="3">Size</option>
            </select>
          </div>
        </div>
        {/* Table */}
        <div className="">
          <Table.T>
            <thead>
              <Table.Tr>
                <Table.Th>ID - UUID</Table.Th>
                <Table.Th>Model Name</Table.Th>
                <Table.Th>Model Size</Table.Th>
                <Table.Th>Status</Table.Th>
                <Table.Th>Base Model</Table.Th>
                <Table.Th>Date Created</Table.Th>
                <Table.Th>Last Edited</Table.Th>
                <Table.Th>Actions</Table.Th>
              </Table.Tr>
            </thead>
            <tbody>
              {websites
                .filter((website) => {
                  if (!search) {
                    return true;
                  }

                  if (
                    website.name.includes(search) ||
                    website.url.includes(search) ||
                    website.status.includes(search) ||
                    website.created_at.includes(search) ||
                    website.last_edited.includes(search)
                  ) {
                    return true;
                  }

                  return false;
                })
                .map((model) => {
                  return (
                    <Table.Tr>
                      <Table.Td>{model.uuid}</Table.Td>
                      <Table.Td>{model.modelName}</Table.Td>
                      <Table.Td>
                        <span>{model.modelSize}</span>
                      </Table.Td>
                      <Table.Td>
                        <Tag text={model.status} status={model.status} />
                      </Table.Td>
                      <Table.Td>{model.baseModel}</Table.Td>

                      <Table.Td>{model.created_at}</Table.Td>
                      <Table.Td>{model.last_edited}</Table.Td>
                      {/* <Table.Td><a className='link'>View actions</a></Table.Td> */}
                      <Table.Td>
                        <ModelDropdown
                          onView={() => showDetails(model)}
                          onDelete={() => confirmDelete(model)}
                          btnText="View actions"
                        />
                      </Table.Td>
                    </Table.Tr>
                  );
                })}
            </tbody>
          </Table.T>
        </div>
        {/* Pagination */}
        <div className="flex items-center justify-center gap-2 mt-4">
          <button
            className="px-2.5 py-2.5 rounded-md "
            style={{ border: "1px solid #16191F" }}
          >
            <Icon.ArrowLeft />
          </button>
          <button
            className="px-3 py-2.5 rounded-md bg-[#023E8A]"
            style={{ border: "1px solid #16191F" }}
          >
            1
          </button>
          <button
            className="px-3 py-2.5 rounded-md"
            style={{ border: "1px solid #16191F" }}
          >
            2
          </button>
          <button
            className="px-3 py-2.5 rounded-md "
            style={{ border: "1px solid #16191F" }}
          >
            3
          </button>
          <button
            className="px-2.5 py-2.5 rounded-md "
            style={{ border: "1px solid #16191F" }}
          >
            <Icon.ArrowRight />
          </button>
        </div>
      </div>

      <MyModal
        show={showAddModelModal}
        panelClassName={"w-1/3"}
        onClose={() => setShowAddModelModal(false)}
        title="Add Model"
        footer={
          <Button
            label={"Add Model"}
            type={"primary"}
            className={"w-full"}
            onClick={saveAWebsite}
          />
        }
      >
        <div className="text-sm text-gray-500">
          <Input.Free
            label="Model Name"
            placeholder="Model XYZ"
            onChange={(e) =>
              setNewWebsite({ ...newWebsite, name: e.target.value })
            }
          />
          <Input.Free
            label="Suffix"
            placeholder="Mind2Matter"
            onChange={(e) =>
              setNewWebsite({ ...newWebsite, url: e.target.value })
            }
          />

          <label htmlFor="exampleFormControlInput1" className="input-label">
            Base Model
          </label>
          <InputSelect className="p-4" placeholder="Da-Vinci" />

          <label htmlFor="exampleFormControlInput1" className="input-label">
            Random Dataset
          </label>
          <InputSelect placeholder="Random Dataset" />

          <label htmlFor="exampleFormControlInput1" className="input-label">
            Auto-Train w/ Updated Dataset
          </label>
          <InputSelect placeholder="Mind2Matter" />
        </div>
      </MyModal>

      <MyModal
        panelClassName={"w-1/3"}
        show={showWebsiteAPIKeyModal}
        onClose={() => setShowWebsiteAPIKeyModal(false)}
        title="API Key"
        footer={
          <Button
            label={"Close Window"}
            type={"secondary"}
            onClick={() => setShowWebsiteAPIKeyModal(false)}
            className={"w-full"}
          />
        }
      >
        <p className="flex items-center justify-between px-3 py-3 mb-3 text-sm text-gray-500 border-2 border-dotted rounded border-black-P700">
          <p>{selectedWebsite ? selectedWebsite.api_key : "---"}</p>
          <button className="link" onClick={copyAPIKey}>
            copy
          </button>
        </p>
        <p className="text-sm leading-6 text-center text-white-P600">
          Copy and paste your API key in the WordPress plugin in order to
          connect. If you don’t have the plugin,{" "}
          <a className="link">download</a> now.
        </p>
      </MyModal>

      <MyModal
        panelClassName={"w-1/3"}
        show={showWebsiteDetailsModal}
        onClose={() => setShowWebsiteDetailsModal(false)}
        title="Website Details"
        footer={
          <Button
            label={"Close Window"}
            type={"secondary"}
            onClick={() => setShowWebsiteDetailsModal(false)}
            className={"w-full"}
          />
        }
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="flex">
              <div className="items-center justify-center p-3 my-2 rounded-full bg-primary-P50 wd-10">
                <Icon.Globe width={28} height={28} color="white" />
              </div>
            </div>
            <h4 className="ml-3 text-xl text-white-P50">
              {selectedWebsite.name}
            </h4>
          </div>
          <Tag text={selectedWebsite.status} status={selectedWebsite.status} />
        </div>

        <div className="p-4 mt-4 rounded bg-black-P900">
          <p className="text-xs text-white-P600">URL</p>
          <p className="text-base link">{selectedWebsite.url}</p>
        </div>

        <div className="grid grid-cols-2">
          <div className="p-4 mt-4 mr-2 rounded bg-black-P900">
            <p className="text-xs text-white-P600">Date Created</p>
            <p className="pt-2 text-base text-white-P50">
              {selectedWebsite.created_at}
            </p>
          </div>
          <div className="p-4 mt-4 ml-2 rounded bg-black-P900">
            <p className="text-xs text-white-P600">Date Updated</p>
            <p className="pt-2 text-base text-white-P50">
              {selectedWebsite.last_edited}
            </p>
          </div>
        </div>

        <div className="mt-3 rounded">
          <p className="flex items-center justify-between px-3 py-3 mb-3 text-sm text-gray-500 border-2 border-dotted rounded border-black-P700">
            <p>{selectedWebsite ? selectedWebsite.api_key : "---"}</p>
            <button className="link">copy</button>
          </p>
          <p className="text-sm leading-6 text-center text-white-P600">
            Copy and paste your API key in the WordPress plugin in order to
            connect. If you don’t have the plugin,{" "}
            <a className="link">download</a> now.
          </p>
        </div>
      </MyModal>

      <MyModal
        // panelClassName={"w-1/3"}
        show={showDeleteWebsiteModal}
        onClose={() => setShowDeleteWebsiteModal(false)}
        footerClassName={"border-none bg-black-P900"}
        panelClassName={"w-100  max-w-md bg-black-P900"}
        title="Delete Website"
        noHeader
        footer={
          <div className="flex">
            <Button
              label={"Cancel"}
              type={"secondary"}
              onClick={() => setShowDeleteWebsiteModal(false)}
              className={"w-full mr-2"}
            />
            <Button
              label={"Delete Website"}
              type={"primary"}
              onClick={() => setShowDeleteWebsiteModal(false)}
              className={"w-full ml-2"}
            />
          </div>
        }
      >
        <div className="flex justify-center center">
          <div className="items-center justify-center p-4 my-2 rounded-full bg-red-P50 wd-10">
            <Icon.Trash width={32} height={32} color="white" />
          </div>
        </div>

        <p className="px-3 py-3 mb-3 text-xl text-center text-white-P50">
          <p>Delete Website</p>
        </p>
        <p className="text-base leading-7 text-center text-white-P600">
          Are you sure you wish to proceed? This action is permanent can not be
          undone.
        </p>
      </MyModal>
    </DashboardLayout>
  );
};
export default Home;
