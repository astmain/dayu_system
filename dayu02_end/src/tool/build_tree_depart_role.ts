export default function build_tree_depart_role(arr) {
    arr = JSON.parse(JSON.stringify(arr))
    return arr.map(item => {
        // Create a new object without ref_position
        const newItem = {...item};

        // Initialize children array if it doesn't exist
        if (!newItem.children) {
            newItem.children = [];
        }

        // If ref_position exists and has items, add them to children
        if (newItem.ref_position && newItem.ref_position.length > 0) {
            newItem.children = [...newItem.children, ...newItem.ref_position];
        }

        // Remove ref_position from the item
        delete newItem.ref_position;

        // Recursively process children if they exist
        if (newItem.children && newItem.children.length > 0) {
            newItem.children = build_tree_depart_role(newItem.children);
        }

        return newItem;
    });
}