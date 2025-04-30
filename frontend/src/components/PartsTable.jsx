import React, { useState, useEffect } from "react";
import {
  Button,
  Container,
  Flex,
  Heading,
  Input,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useToast,
  useColorMode,
} from "@chakra-ui/react";
import { BiTrash, BiDuplicate, BiDownload } from "react-icons/bi";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable"; // Import correctly
import { BASE_URL } from "../App";
import EditPartModal from "./EditPartModal";
import CreatePartModal from "./CreatePartModal";

const PartsTable = ({ setParts }) => {
  const [parts, setPartsState] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const toast = useToast();
  const { colorMode } = useColorMode();

  useEffect(() => {
    fetch(`${BASE_URL}/parts`)
      .then((res) => res.json())
      .then((data) => setPartsState(data))
      .catch((err) => console.error("Error fetching parts:", err));
  }, []);

  const handleDeletePart = async (id) => {
    try {
      const res = await fetch(`${BASE_URL}/parts/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setPartsState((prevParts) => prevParts.filter((part) => part.id !== id));

      toast({
        status: "success",
        title: "Part Deleted",
        description: "The part has been deleted successfully.",
        duration: 2000,
        position: "top",
      });
    } catch (error) {
      console.error("Error deleting part:", error);
      toast({
        status: "error",
        title: "Error",
        description: "An error occurred while deleting the part.",
        duration: 2000,
        position: "top",
      });
    }
  };

  // Function to download parts data as PDF
  const handleDownloadPDF = () => {
    if (parts.length === 0) {
      toast({
        status: "warning",
        title: "No Data",
        description: "There are no parts available to download.",
        duration: 2000,
        position: "top",
      });
      return;
    }

    const doc = new jsPDF();
    doc.text("Parts Inventory Report", 20, 10);

    // Define table columns
    const columns = ["Part ID", "Part Name", "Part Number", "Stock Level", "Unit Cost"];
    const rows = parts.map((part) => [
      part.part_id,
      part.part_name,
      part.part_number,
      part.stock_level,
      `LKR ${formatCurrency(part.unit_cost)}`,
    ]);

    autoTable(doc, {
      head: [columns],
      body: rows,
      startY: 20,
    });

    doc.save("Parts_Inventory.pdf");

    toast({
      status: "success",
      title: "Download Successful",
      description: "PDF has been generated.",
      duration: 2000,
      position: "top",
    });
  };

  // Format currency with commas
  const formatCurrency = (amount) => {
    return amount ? amount.toLocaleString() : "0";
  };

  // Filter parts based on search query
  const filteredParts = parts.filter(
    (part) =>
      part.part_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      part.part_number.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container maxW="1200px" my={4}>
      <Flex justify="space-between" mb={4}>
        <Heading as="h3" size="lg">
          Parts Inventory
        </Heading>

        <Input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by part name or number"
          size="sm"
          width="300px"
          bg={colorMode === "light" ? "white" : "gray.700"}
          color={colorMode === "light" ? "black" : "white"}
          border="1px solid"
          borderColor={colorMode === "light" ? "gray.300" : "gray.600"}
        />

        <Flex gap={2}>
          {/* Create Part Button */}
          <Button onClick={() => setCreateModalOpen(true)} colorScheme="teal" leftIcon={<BiDuplicate />}>
            Create Part
          </Button>

          {/* Download PDF Button */}
          <Button onClick={handleDownloadPDF} colorScheme="teal" leftIcon={<BiDownload />}>
            Download PDF
          </Button>
        </Flex>
      </Flex>

      <Table variant="simple">
        <Thead bg={colorMode === "light" ? "gray.200" : "gray.700"}>
          <Tr>
            <Th textAlign="center">Part ID</Th>
            <Th textAlign="center">Part Name</Th>
            <Th textAlign="center">Part Number</Th>
            <Th textAlign="center">Stock Level</Th>
            <Th textAlign="center">Unit Cost</Th>
            <Th textAlign="center">Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {filteredParts.length === 0 ? (
            <Tr>
              <Td colSpan="6" textAlign="center">
                No parts available or matching your search.
              </Td>
            </Tr>
          ) : (
            filteredParts.map((part, index) => (
              <Tr
                key={part.id}
                bg={colorMode === "light"
                  ? index % 2 === 0
                    ? "gray.50"
                    : "white"
                  : index % 2 === 0
                  ? "gray.800"
                  : "gray.900"}
              >
                <Td textAlign="center">{part.part_id}</Td>
                <Td textAlign="center">{part.part_name}</Td>
                <Td textAlign="center">{part.part_number}</Td>
                <Td textAlign="center">{part.stock_level}</Td>
                <Td textAlign="center">LKR {formatCurrency(part.unit_cost)}</Td>
                <Td textAlign="center">
                  <EditPartModal part={part} setParts={setPartsState} />
                  <Button
                    colorScheme="red"
                    onClick={() => handleDeletePart(part.id)}
                    leftIcon={<BiTrash />}
                    size="sm"
                    ml={2}
                  >
                    Delete
                  </Button>
                </Td>
              </Tr>
            ))
          )}
        </Tbody>
      </Table>

      {/* Create Part Modal */}
      <CreatePartModal isOpen={isCreateModalOpen} onClose={() => setCreateModalOpen(false)} setParts={setPartsState} />
    </Container>
  );
};

export default PartsTable;
