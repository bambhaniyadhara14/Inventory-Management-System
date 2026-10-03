let products = [
    { id: "P001", name: "Dell Inspiron 15", category: "Laptops", quantity: 25, price: 749, supplier: "Dell Inc.", status: "In Stock" },
    { id: "P002", name: "Logitech Mouse", category: "Accessories", quantity: 6, price: 25, supplier: "Logitech", status: "Low Stock" },
    { id: "P003", name: "Office Chair", category: "Furniture", quantity: 0, price: 120, supplier: "FurniCo", status: "Out of Stock" },
    { id: "P004", name: "Samsung Monitor", category: "Monitors", quantity: 18, price: 199, supplier: "Samsung", status: "In Stock" },
    { id: "P005", name: "Mechanical Keyboard", category: "Accessories", quantity: 10, price: 85, supplier: "KeyTech", status: "Low Stock" },
    { id: "P006", name: "HP LaserJet Printer", category: "Printers", quantity: 7, price: 299, supplier: "HP", status: "Low Stock" },
    { id: "P007", name: "Wooden Desk", category: "Furniture", quantity: 15, price: 150, supplier: "FurniCo", status: "In Stock" },
    { id: "P008", name: "Sony Headphones", category: "Accessories", quantity: 3, price: 99, supplier: "Sony", status: "Low Stock" }
];
const productTable = document.getElementById("productTable");

const productSearch = document.getElementById("productSearch");

const categoryFilter = document.getElementById("categoryFilter");

const statusFilter = document.getElementById("statusFilter");

const productPanel = document.getElementById("productPanel");

const openProduct = document.getElementById("openProduct");

const closeProduct = document.getElementById("closeProduct");

const cancelProduct = document.getElementById("cancelProduct");

const productForm = document.getElementById("productForm");

const pagination = document.getElementById("pagination");


let currentPage = 1;

const productsPerPage = 8;

function displayProducts(data) {

    productTable.innerHTML = "";

    data.forEach((product) => {

        let statusClass = "";

        if (product.status === "In Stock") {
            statusClass = "in-stock";
        }

        else if (product.status === "Low Stock") {
            statusClass = "low-stock";
        }

        else {
            statusClass = "out-stock";
        }

        let row = document.createElement("tr");

        row.innerHTML = `

            <td>${product.id}</td>

            <td>${product.name}</td>

            <td>${product.category}</td>

            <td class="${product.quantity === 0 ? "zero" : ""}">
                ${product.quantity}
            </td>

            <td>$${product.price.toFixed(2)}</td>

            <td>${product.supplier}</td>

            <td>
                <span class="status ${statusClass}">
                    ${product.status}
                </span>
            </td>

            <td>

                <button
                    class="edit"
                    onclick="editProduct('${product.id}')">

                    <i class="fa-solid fa-pen"></i>

                </button>

                <button
                    class="delete"
                    onclick="deleteProduct('${product.id}')">

                    <i class="fa-solid fa-trash"></i>

                </button>

            </td>

        `;

        productTable.appendChild(row);
    });

   
}
