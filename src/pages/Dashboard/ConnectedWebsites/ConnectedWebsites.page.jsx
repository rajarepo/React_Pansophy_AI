import React, { useState, useEffect } from 'react';
import { DashboardLayout } from 'layout';
import Text from 'components/Text/Text.component';
import Input from 'components/Input/Input.component';
import Button from 'components/Button/Button.component';
import Section from 'components/Section/Section.component';
import Icon from 'components/Icon/Icon.component';
import Banner from 'components/Banner/Banner.component';
import Table from 'components/Table/Table.component';
import Tag from 'components/Tag/Tag.component';
import Dropdown from 'components/Dropdown/Dropdown.component';
import MyModal from 'components/MyModal/MyModal.component';
import { toast } from 'react-toastify';
import { API } from 'lib/api';

const ConnectedWebsites = () => {
    const dummy = [
        { id: '1', name: 'Website', url: 'https://mywebsite.co', api_key: 'c1ac56f4-3914-4e15-8e94-f86a5036a80e', status: 'Disconnected', created_at: '22-23-2222', last_edited: '22-12-2222', selected: false },
        { id: '2', name: 'Digital Renter', url: 'https://digitalrenter.com', api_key: '21sc56f4-3914-4e15-8e94-f86a5036a80e', status: 'Pending', created_at: '22-23-2222', last_edited: '22-12-2222', selected: false },
        { id: '3', name: 'Prop Afa', url: 'https://prop.afa', api_key: '99sdf9s-3914-4e15-8e94-f86a5036a80e', status: 'In-Progress', created_at: '22-23-2222', last_edited: '22-12-2222', selected: false },
        { id: '4', name: 'Mailer', url: 'https://mailer.coe', api_key: '9sdf-3914-4e15-343-sdfsdf', status: 'Connected', created_at: '22-23-2222', last_edited: '22-12-2222', selected: false },
    ]
    const [websites, setWebsites] = useState(dummy);
    const [checkAll, setCheckAll] = useState(false);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(0);
    const [selectedWebsite, setSelectedWebsite] = useState({});
    const [newWebsite, setNewWebsite] = useState({ name: '', url: '' });
    const [showAddWebsiteModal, setShowAddWebsiteModal] = useState(false);
    const [showWebsiteAPIKeyModal, setShowWebsiteAPIKeyModal] = useState(false);
    const [showWebsiteDetailsModal, setShowWebsiteDetailsModal] = useState(false);
    const [showDeleteWebsiteModal, setShowDeleteWebsiteModal] = useState(false);

    const readData = async () => {
        console.log('loading');
        try {
            let res = await API.getConnectedWebsites(page);
            console.log(res);
            setWebsites(res.map((w, key) => ({
                id: key + 1,
                url: w.url,
                name: w.name,
                api_key: w.apikey,
                user_id: w.user_id,
                status: 'Connected',
                checked: false,
                created_at: '22-23-2222',
                last_edited: '22-23-2222',
            })
            ));
        } catch (e) {
            console.log('Erroro', e);
        }
    };

    useEffect(() => {
        readData();
    }, [])


    const revealKey = (w) => {
        setSelectedWebsite(w);
        setShowWebsiteAPIKeyModal(true);
    }

    const showDetails = (w) => {
        setSelectedWebsite(w);
        setShowWebsiteDetailsModal(true);
    }

    const confirmDelete = (w) => {
        setSelectedWebsite(w);
        setShowDeleteWebsiteModal(true);
    }

    const copyAPIKey = async () => {
        try {
            await navigator.clipboard.writeText(selectedWebsite.api_key);
            // alert('Copied to clipboard')
            toast("API key copied to clipboard succesfully");
        } catch (err) {
            console.error('Failed to copy: ', err);
        }
    }

    const saveAWebsite = async () => {
        const data = {
            name: newWebsite.name,
            url: newWebsite.url,
            user_id: 35,
            expires: "2025-04-01T20:25:19.338Z",
            updated: "2023-04-01T20:25:19.338Z",
            created: "2023-04-01T20:25:19.338Z"
        };
        // console.log({data});
        // return false;
        try {
            await API.saveAConnectedWebsite(data);
            setShowAddWebsiteModal(false)
            readData();
            toast('Website created succesfully. Reading websites now...');
        } catch (e) {
            alert('Error saving because');
        }
    }

    const onWebsiteChecked = (checkedWebsite) => {
        console.log({ checkedWebsite });
        setWebsites(websites.map(website => {
            if (website.id === checkedWebsite.id) {
                website.checked = !website.checked;
            }
            return website;
        }))
    }

    const toggleCheckAllWebsites = () => {
        setWebsites(websites.map(website => {
            website.checked = !checkAll;
            return website;
        }));
        setCheckAll(!checkAll);
    }

    return (
        <DashboardLayout>
            <div className="bg-[#08090A] gap-5 p-10 text-white h-full">
                <Section.PageHeading>
                    <Text.PageHeading text="Connected Websites" />
                    <div className='grid grid-flow-col justify-items-end'>
                        <div className=''>
                            <Button className='mr-1' type={'secondary'} label={checkAll ? "Unselect all" : "Select all"} onClick={toggleCheckAllWebsites} />
                            <Button className='ml-2' type={'primary'} label={"+ Add Website"} onClick={() => setShowAddWebsiteModal(true)} />
                        </div>
                    </div>
                </Section.PageHeading>

                {/* Sub heading */}
                <Banner
                    type={'primary'}
                    icon={<Icon.Card />}
                    title={"Subscription status"}
                    subtitle={"Expiring in 2 days"}
                    onClick={() => alert('leave me alone')}
                    buttonText={"Renew subscription"}
                />

                {/* Search bar */}
                <Input.Free
                    rightIcon={<Icon.Search />}
                    onRightClick={() => alert('Clicked me? But why?')}
                    placeholder='Search website'
                    onChange={(e) => setSearch(e.target.value)}
                />

                {/*  */}
                <div className=''>
                    <Table.T >
                        <thead>
                            <Table.Tr>
                                <Table.Th><Input.CheckBox checked={checkAll} onChange={toggleCheckAllWebsites} /></Table.Th>
                                <Table.Th>ID</Table.Th>
                                <Table.Th>Name</Table.Th>
                                <Table.Th>URL</Table.Th>
                                <Table.Th>API Key</Table.Th>
                                <Table.Th>Status</Table.Th>
                                <Table.Th>Date Created</Table.Th>
                                <Table.Th>Last Edited</Table.Th>
                                <Table.Th>Actions</Table.Th>
                            </Table.Tr>
                        </thead>
                        <tbody>
                            {websites
                                .filter(website => {
                                    if (!search) {
                                        return true;
                                    }

                                    if (website.name.includes(search) || website.url.includes(search) || website.status.includes(search) || website.created_at.includes(search) || website.last_edited.includes(search)) {
                                        return true;
                                    }

                                    return false
                                })
                                .map(website => {
                                    return (
                                        <Table.Tr>
                                            <Table.Td>
                                                <Input.CheckBox onChange={() => onWebsiteChecked(website)} checked={website.checked} />
                                            </Table.Td>
                                            <Table.Td>{website.id}</Table.Td>
                                            <Table.Td>{website.name}</Table.Td>
                                            <Table.Td><span className='link'>{website.url}</span></Table.Td>
                                            <Table.Td>{website.api_key.substr(0, 4)} <span onClick={() => revealKey(website)} className='hover:cursor-pointer pl-3 text-white-P600'>Reveal</span> </Table.Td>
                                            <Table.Td><Tag text={website.status} status={website.status} /></Table.Td>
                                            <Table.Td>{website.created_at}</Table.Td>
                                            <Table.Td>{website.last_edited}</Table.Td>
                                            {/* <Table.Td><a className='link'>View actions</a></Table.Td> */}
                                            <Table.Td>
                                                <Dropdown
                                                    onView={() => showDetails(website)}
                                                    onDelete={() => confirmDelete(website)}
                                                    btnText="View actions" />
                                            </Table.Td>
                                        </Table.Tr>
                                    )
                                })}
                        </tbody>
                    </Table.T>
                </div>

            </div>


            <MyModal
                show={showAddWebsiteModal}
                panelClassName={"w-1/3"}
                onClose={() => setShowAddWebsiteModal(false)}
                title="Add Website"
                footer={<Button label={'Add Website'} type={"primary"} className={'w-full'} onClick={saveAWebsite} />}>
                <div className="text-sm text-gray-500">
                    <Input.Free label="Name" placeholder="Enter name..." onChange={(e) => setNewWebsite({ ...newWebsite, name: e.target.value })} />
                    <Input.Free label="URL" placeholder="Enter URL..." onChange={(e) => setNewWebsite({ ...newWebsite, url: e.target.value })} />
                </div>
            </MyModal>


            <MyModal
                panelClassName={"w-1/3"}
                show={showWebsiteAPIKeyModal}
                onClose={() => setShowWebsiteAPIKeyModal(false)}
                title="API Key"
                footer={<Button label={'Close Window'} type={"secondary"} onClick={() => setShowWebsiteAPIKeyModal(false)} className={'w-full'} />}>
                <p className="text-sm rounded text-gray-500 flex items-center justify-between py-3 px-3 border-dotted border-2 border-black-P700 mb-3">
                    <p>{selectedWebsite ? selectedWebsite.api_key : '---'}</p>
                    <button className='link' onClick={copyAPIKey}>copy</button>
                </p>
                <p className='text-white-P600 text-sm leading-6 text-center'>Copy and paste your API key in the WordPress plugin in order to connect. If you don’t have the plugin, <a className='link'>download</a> now.</p>
            </MyModal>

            <MyModal
                panelClassName={"w-1/3"}
                show={showWebsiteDetailsModal}
                onClose={() => setShowWebsiteDetailsModal(false)}
                title="Website Details"
                footer={<Button label={'Close Window'} type={"secondary"} onClick={() => setShowWebsiteDetailsModal(false)} className={'w-full'} />}>

                <div className='flex items-center justify-between'>
                    <div className='flex items-center'>
                        <div className='flex'>
                            <div className='bg-primary-P50 rounded-full  items-center justify-center p-3 wd-10 my-2'>
                                <Icon.Globe width={28} height={28} color='white' />
                            </div>
                        </div>
                        <h4 className='ml-3 text-white-P50 text-xl'>{selectedWebsite.name}</h4>
                    </div>
                    <Tag text={selectedWebsite.status} status={selectedWebsite.status} />
                </div>

                <div className='p-4 bg-black-P900 mt-4 rounded'>
                    <p className='text-white-P600 text-xs'>URL</p>
                    <p className='link text-base'>{selectedWebsite.url}</p>
                </div>

                <div className='grid grid-cols-2'>
                    <div className='p-4 bg-black-P900 mt-4 mr-2 rounded'>
                        <p className='text-white-P600 text-xs'>Date Created</p>
                        <p className='text-white-P50 pt-2 text-base'>{selectedWebsite.created_at}</p>
                    </div>
                    <div className='p-4 bg-black-P900 mt-4 ml-2 rounded'>
                        <p className='text-white-P600 text-xs'>Date Updated</p>
                        <p className='text-white-P50 pt-2 text-base'>{selectedWebsite.last_edited}</p>
                    </div>
                </div>

                <div className='mt-3 rounded'>
                    <p className="text-sm rounded text-gray-500 flex items-center justify-between py-3 px-3 border-dotted border-2 border-black-P700 mb-3">
                        <p>{selectedWebsite ? selectedWebsite.api_key : '---'}</p>
                        <button className='link'>copy</button>
                    </p>
                    <p className='text-white-P600 text-sm leading-6 text-center'>Copy and paste your API key in the WordPress plugin in order to connect. If you don’t have the plugin, <a className='link'>download</a> now.</p>
                </div>
            </MyModal>

            <MyModal
                // panelClassName={"w-1/3"}
                show={showDeleteWebsiteModal}
                onClose={() => setShowDeleteWebsiteModal(false)}
                footerClassName={'border-none bg-black-P900'}
                panelClassName={'w-100  max-w-md bg-black-P900'}
                title="Delete Website"
                noHeader
                footer={<div className='flex'>
                    <Button label={'Cancel'} type={"secondary"} onClick={() => setShowDeleteWebsiteModal(false)} className={'w-full mr-2'} />
                    <Button label={'Delete Website'} type={"primary"} onClick={() => setShowDeleteWebsiteModal(false)} className={'w-full ml-2'} />
                </div>}>
                <div className='center flex justify-center'>
                    <div className='bg-red-P50 rounded-full  items-center justify-center p-4 wd-10 my-2'>
                        <Icon.Trash width={32} height={32} color='white' />
                    </div>
                </div>

                <p className="text-xl text-white-P50 py-3 px-3 mb-3 text-center">
                    <p>Delete Website</p>
                </p>
                <p className='text-white-P600 text-base text-center leading-7'>Are you sure you wish to proceed? This action is permanent can not be undone.</p>
            </MyModal>

        </DashboardLayout>
    );
};
export default ConnectedWebsites;