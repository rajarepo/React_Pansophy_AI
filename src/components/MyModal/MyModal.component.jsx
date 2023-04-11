import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useEffect, useState } from 'react'
import './MyModal.styles.css';

export default function MyModal({ show, title, children, footer, onClose, panelClassName, footerClassName, noHeader }) {
  let [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    setIsOpen(show);
  }, [show])


  function closeModal() {
    setIsOpen(false)
    onClose();
  }

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center bg-[#000000BF]">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel
                  className={`modal-panel transform overflow-hidden rounded-2xl bg-black-P50 text-left align-middle shadow-xl transition-all ${panelClassName ? panelClassName : ' w-100 max-w-md'}`}>
                  {!noHeader ? <Dialog.Title
                    as="h3"
                    className="bg-black-P900 text-lg font-medium leading-6 text-white-P50 flex items-center justify-between border-b border-black-P600"
                  >
                    <span className='p-6'>{title}</span>
                    <span className='hover:cursor-pointer color p-6' onClick={closeModal}>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </span>
                    {/* <Button onClick={closeModal} label={'X'} type={'secondary'} className={'border-none active:border-none'} /> */}
                  </Dialog.Title> : null}
                  <div className="px-6 py-6">
                    {children}
                  </div>

                  <div
                    className={"bg-black-P900 p-6 border-t border-black-P600 " + footerClassName}>
                    {footer}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
