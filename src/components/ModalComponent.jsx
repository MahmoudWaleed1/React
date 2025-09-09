import React from 'react'
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader} from '@heroui/react'

export default function ModalComponent({isOpen, onOpenChange, title, description, deleteFunction, isLoading}) {
  return (
<Modal isOpen={isOpen} onOpenChange={onOpenChange}>
    <ModalContent>
            {(onClose) => (
    <>
        <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
        <ModalBody>
                <p>
                      {description}
                </p>
        </ModalBody>
        <ModalFooter>
                <Button color="default" variant="light" onPress={onClose}>
                    Cancel
                </Button>
                <Button isLoading={isLoading} color="danger" onPress={()=>deleteFunction(onClose)}>
                    Delete
                </Button>
        </ModalFooter>
    </>
     )}
        </ModalContent>
    </Modal>
  )
}
