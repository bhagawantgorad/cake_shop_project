// ----------------------------
// PRICE CALCULATION LOGIC
// ----------------------------

// Base prices of cakes
const basePrices = {
    "Chocolate": 500,
    "Vanilla": 400,
    "Strawberry": 450
};

// Multipliers for size
const sizeMultiplier = {
    "Small": 1,
    "Medium": 1.5,
    "Large": 2
};

// Extra item prices
const extraPrices = {
    "Nuts": 50,
    "Chocolate Chips": 70,
    "Extra Cream": 60
};

function calculateTotal() {
    const flavor = document.getElementById("flavor").value;
    const size = document.getElementById("size").value;

    const extras = Array.from(document.querySelectorAll(".extra:checked"))
                        .map(e => e.value);

    if (!flavor || !size) {
        document.getElementById("total").innerText = "Total: ₹0";
        document.getElementById("hiddenTotal").value = "";
        return;
    }

    let total = basePrices[flavor] * sizeMultiplier[size];

    extras.forEach(extra => {
        total += extraPrices[extra];
    });

    // Update UI
    document.getElementById("total").innerText = "Total: ₹" + total;

    // Save into hidden field
    document.getElementById("hiddenTotal").value = total;
}

// Add listeners
document.getElementById("flavor").addEventListener("change", calculateTotal);
document.getElementById("size").addEventListener("change", calculateTotal);
document.querySelectorAll(".extra").forEach(chk => chk.addEventListener("change", calculateTotal));


// ----------------------------
// FORM SUBMIT LOGIC
// ----------------------------
document.getElementById("cakeForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const date = document.getElementById("date").value;
    const flavor = document.getElementById("flavor").value;
    const size = document.getElementById("size").value;

    const extras = Array.from(document.querySelectorAll(".extra:checked"))
                        .map(e => e.value);

    const total = document.getElementById("hiddenTotal").value;

    // Check if total is calculated
    if (total === "" || isNaN(total)) {
        alert("Please select flavor and size to calculate total before placing order.");
        return;
    }

    const response = await fetch("http://127.0.0.1:5000/order", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name,
            date,
            flavor,
            size,
            extras,
            total
        })
    });

    const result = await response.json();

    if (result.message === "success") {
        document.getElementById("success").style.display = "block";
    }
});
