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
import { BiEdit } from "react-icons/bi"; // Import the edit icon
import { BASE_URL } from "../App";

const EditPartModal = ({ part, setParts }) => {
  const [inputs, setInputs] = useState({
    part_id: part.part_id,
    part_name: part.part_name,
    part_number: part.part_number,
    stock_level: part.stock_level,
    unit_cost: part.unit_cost,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toast = useToast();

  const handleEditPart = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch(`${BASE_URL}/parts/${part.id}`, {
        method: "PATCH", // Use PATCH as per your backend
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputs),
      });

      if (!res.ok) {
        throw new Error("Failed to update part");
      }

      const updatedPart = await res.json();
      setParts((prevParts) =>
        prevParts.map((p) => (p.id === updatedPart.id ? updatedPart : p))
      );
      toast({
        title: "Part Updated",
        description: "Part has been updated successfully.",
        status: "success",
        duration: 2000,
        position: "top-center",
      });
      setIsModalOpen(false);
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
    <>
      <Button
        colorScheme="blue"
        onClick={() => setIsModalOpen(true)}
        size="sm"
        leftIcon={<BiEdit />} // Added icon for edit button
      >
        Edit
      </Button>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Part</ModalHeader>
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
            <Button colorScheme="blue" mr={3} onClick={handleEditPart} isLoading={isLoading}>
              Save Changes
            </Button>
            <Button onClick={() => setIsModalOpen(false)}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditPartModal;
