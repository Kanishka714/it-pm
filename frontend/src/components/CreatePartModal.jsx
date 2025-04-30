// src/components/CreatePartModal.jsx

import React, { useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useToast,
} from "@chakra-ui/react";
import { BASE_URL } from "../App";

const CreatePartModal = ({ isOpen, onClose, setParts }) => {
  const [inputs, setInputs] = useState({
    part_id: "",
    part_name: "",
    part_number: "",
    stock_level: "",
    unit_cost: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const handleCreatePart = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch(`${BASE_URL}/parts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputs),
      });

      if (!res.ok) {
        throw new Error("Failed to create part");
      }

      const newPart = await res.json();
      setParts((prevParts) => [...prevParts, newPart]);
      toast({
        title: "Part Created",
        description: "New part has been added successfully.",
        status: "success",
        duration: 2000,
        position: "top-center",
      });
      setInputs({ part_id: "", part_name: "", part_number: "", stock_level: "", unit_cost: "" });
      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        status: "error",
        duration: 4000,
        position: "top-center",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create New Part</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl mb={4}>
            <FormLabel>Part ID</FormLabel>
            <Input
              type="text"
              value={inputs.part_id}
              onChange={(e) => setInputs({ ...inputs, part_id: e.target.value })}
            />
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>Part Name</FormLabel>
            <Input
              type="text"
              value={inputs.part_name}
              onChange={(e) => setInputs({ ...inputs, part_name: e.target.value })}
            />
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>Part Number</FormLabel>
            <Input
              type="text"
              value={inputs.part_number}
              onChange={(e) => setInputs({ ...inputs, part_number: e.target.value })}
            />
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>Stock Level</FormLabel>
            <Input
              type="number"
              value={inputs.stock_level}
              onChange={(e) => setInputs({ ...inputs, stock_level: e.target.value })}
            />
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>Unit Cost</FormLabel>
            <Input
              type="number"
              value={inputs.unit_cost}
              onChange={(e) => setInputs({ ...inputs, unit_cost: e.target.value })}
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleCreatePart} isLoading={isLoading}>
            Create Part
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreatePartModal;
