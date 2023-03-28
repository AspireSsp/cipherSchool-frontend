import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useToast } from '@chakra-ui/react'
import axios from 'axios'
import React, { useState } from 'react'

const PasswordModel = (props) => {
    const initialRef = React.useRef(null)
    const toast = useToast()
  const finalRef = React.useRef(null)
  const [oldPass, setOldPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confPass, setConfPass] = useState('');

  const saveNewPassword = async()=>{
    if(newPass != confPass){
        toast({
            title: 'Error',
            description: "old password and new password is not matched",
            status: 'error',
            duration: 5000,
            isClosable: true,
          })
    }else{
        console.log("savinggggggggg")
        const body = {
            userId : props?.user?.id,
            oldPassword : oldPass,
            newPassword : newPass
        }
        const res = await axios.post('https://cipherschool-backend-7j25.onrender.com/api/v1/updatePassword', body);
        console.log("------------>", res)
        props.onClose();
    }
  }
  return (
    <div>
    <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={props?.isOpen}
        onClose={props?.onClose}
      >
        <ModalOverlay />
        <ModalContent>
          {/* <ModalHeader> your account</ModalHeader> */}
          {/* <ModalCloseButton /> */}
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Current Password</FormLabel>
              <Input ref={initialRef} placeholder='Current Password' onChange={(e)=>{setOldPass(e.target.value)}} />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>New Password</FormLabel>
              <Input placeholder='New Password' onChange={(e)=>{setNewPass(e.target.value)}}/>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Confirm Password</FormLabel>
              <Input placeholder='Confirm Password' onChange={(e)=>{setConfPass(e.target.value)}} />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button onClick={saveNewPassword} colorScheme='blue' mr={3}>
              Save
            </Button>
            <Button onClick={props?.onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      
    </div>
  )
}

export default PasswordModel
