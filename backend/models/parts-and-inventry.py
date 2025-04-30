# parts-and-inventory.py

# Dictionary to store inventory data
inventory = {}

# Class to represent a Part
class Part:
    def __init__(self, name, part_number, quantity):
        self.name = name
        self.part_number = part_number
        self.quantity = quantity

    def __str__(self):
        return f"Part Name: {self.name}, Part Number: {self.part_number}, Quantity: {self.quantity}"

# Function to add a part to the inventory
def add_part():
    name = input("Enter Part Name: ")
    part_number = input("Enter Part Number: ")
    quantity = int(input("Enter Quantity: "))
    
    # Check if part already exists
    if part_number in inventory:
        print("Part Number already exists! Use update to modify it.")
        return
    
    # Add new part to inventory
    inventory[part_number] = Part(name, part_number, quantity)
    print("Part added successfully!")

# Function to view all parts in the inventory
def view_inventory():
    if not inventory:
        print("No parts in inventory.")
        return
    
    print("\nInventory List:")
    for part in inventory.values():
        print(part)

# Function to update a part in the inventory
def update_part():
    part_number = input("Enter Part Number to update: ")
    
    if part_number not in inventory:
        print("Part not found!")
        return
    
    name = input("Enter New Part Name: ")
    quantity = int(input("Enter New Quantity: "))
    
    # Update the part
    inventory[part_number] = Part(name, part_number, quantity)
    print("Part updated successfully!")

# Function to delete a part from the inventory
def delete_part():
    part_number = input("Enter Part Number to delete: ")
    
    if part_number not in inventory:
        print("Part not found!")
        return
    
    del inventory[part_number]
    print("Part deleted successfully!")

# Main menu function
def display_menu():
    print("\nParts and Inventory Management System")
    print("1. Add Part")
    print("2. View Inventory")
    print("3. Update Part")
    print("4. Delete Part")
    print("5. Exit")

# Main function to run the program
def main():
    while True:
        display_menu()
        choice = input("Enter your choice (1-5): ")
        
        if choice == "1":
            add_part()
        elif choice == "2":
            view_inventory()
        elif choice == "3":
            update_part()
        elif choice == "4":
            delete_part()
        elif choice == "5":
            print("Exiting program. Goodbye!")
            break
        else:
            print("Invalid choice! Please try again.")

# Run the program
if __name__ == "__main__":
    main()