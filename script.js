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

    document.getElementById("showingText").innerText =
        `Showing ${data.length} of ${products.length} products`;
}

function filterProducts() {

    let searchValue =
        productSearch.value.toLowerCase();

    let categoryValue =
        categoryFilter.value;

    let statusValue =
        statusFilter.value;

    let filteredProducts = products.filter((product) => {

        let searchMatch =
            product.name.toLowerCase().includes(searchValue) ||
            product.id.toLowerCase().includes(searchValue) ||
            product.supplier.toLowerCase().includes(searchValue);


        let categoryMatch =
            categoryValue === "all" ||
            product.category === categoryValue;


        let statusMatch =
            statusValue === "all" ||
            product.status === statusValue;

        return searchMatch && categoryMatch && statusMatch;

    });

    displayProducts(filteredProducts);

}




productSearch.addEventListener("input", filterProducts);

categoryFilter.addEventListener("change", filterProducts);

statusFilter.addEventListener("change", filterProducts);


document.getElementById("globalSearch")
    .addEventListener("input", function () {
        productSearch.value = this.value;
        filterProducts();
    });


openProduct.addEventListener("click", function () {
    productPanel.style.display = "block";

});




closeProduct.addEventListener("click", closePanel);
cancelProduct.addEventListener("click", closePanel);

function closePanel() {
    productPanel.style.display = "none";
}

productForm.addEventListener("submit", function (event) {

    event.preventDefault();

    let newProduct = {

        id: "P" +
            String(products.length + 1).padStart(3, "0"),

        name:
            document.getElementById("productName").value,

        category:
            document.getElementById("productCategory").value,

        quantity:
            Number(document.getElementById("quantity").value),

        price:
            Number(document.getElementById("price").value),

        supplier:
            document.getElementById("supplier").value,

        status:
            document.getElementById("productStatus").value

    };


    products.push(newProduct);

    displayProducts(products);

    productForm.reset();

    closePanel();
    updateCards();

});

function deleteProduct(id) {

    let confirmDelete =
        confirm("Are you sure you want to delete this product?");


    if (!confirmDelete) {
        return;
    }


    products = products.filter(product => product.id !== id);


    filterProducts();
    updateCards();

}

function editProduct(id) {
    let product = products.find(product => product.id === id);

    if (!product) {
        return;
    }


    document.getElementById("productName").value = product.name;

    document.getElementById("sku").value = id;

    document.getElementById("productCategory").value = product.category;

    document.getElementById("quantity").value = product.quantity;

    document.getElementById("price").value = product.price;

    document.getElementById("supplier").value = product.supplier;

    document.getElementById("productStatus").value = product.status;

    productPanel.style.display = "block";

}


function updateCards() {

    document.getElementById("totalProducts").innerText =
        products.length;

    let lowStockCount =
        products.filter(
            product => product.status === "Low Stock"
        ).length;


    document.getElementById("lowStock").innerText =
        lowStockCount;

    let categories =
        new Set(
            products.map(product => product.category)
        );

    document.getElementById("totalCategories").innerText =
        categories.size;
}

function createPagination() {

    pagination.innerHTML = "";

    let totalPages =
        Math.ceil(products.length / productsPerPage);

    for (let i = 1; i <= totalPages; i++) {

        let button =
            document.createElement("button");

        button.innerText = i;

        if (i === currentPage) {
            button.classList.add("page-active");
        }

        button.addEventListener("click", function () {

            currentPage = i;

            createPagination();

        });


        pagination.appendChild(button);

    }

}

displayProducts(products);

createPagination();

updateCards();