import React from 'react'
import { Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure, addToast } from '@heroui/react'
export default function CardDropDown({onOpen, setIsInUpdateMode}) {
  return (
        <Dropdown>
             <DropdownTrigger>
                  <svg className="w-fit rotate-90 cursor-pointer" xmlns="http://www.w3.org/2000/svg" width={27} height={27} viewBox="0 0 24 24" fill="none" stroke="#b0b0b0" strokeWidth={2} strokeLinecap="square" strokeLinejoin="round"><circle cx={12} cy={12} r={1} /><circle cx={19} cy={12} r={1} /><circle cx={5} cy={12} r={1} /></svg>
                </DropdownTrigger>
                    <DropdownMenu aria-label="Static Actions">
                        <DropdownItem onPress={() => setIsInUpdateMode(true)} key="edit">Edit</DropdownItem>
                        <DropdownItem onPress={onOpen} key="delete" className="text-danger" color="danger">
                            Delete 
                        </DropdownItem>
                    </DropdownMenu>
         </Dropdown>
  )
}
