export class AddressImpl {
    street;
    houseNumber;
    postalCode;
    city;
    country;
    constructor(street, houseNumber, postalCode, city, country) {
        this.street = street;
        this.houseNumber = houseNumber;
        this.postalCode = postalCode;
        this.city = city;
        this.country = country;
    }
}
export class UserImpl {
    id;
    name;
    address;
    email;
    telephone;
    constructor(id, name, address = undefined, email = "", telephone = "") {
        this.id = id;
        this.name = name;
        this.address = address;
        this.email = email;
        this.telephone = telephone;
    }
}
export async function loadUsers() {
    try {
        console.log("Fetching from backend...");
        const res = await fetch('http://localhost:8081/users', {
            mode: 'cors'
        });
        if (!res.ok)
            throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        console.log("Received raw data:", data);
        const users = data.map(item => new UserImpl(item.id, item.name, item.address ? new AddressImpl(item.address.street ?? "", item.address.houseNumber ?? "", item.address.postalCode ?? "", item.address.city ?? "", item.address.country ?? "") : undefined, item.email ?? "", item.telephone ?? ""));
        console.log("Mapped users:", users);
        return users;
    }
    catch (err) {
        console.error("Load failed:", err);
        return [];
    }
}
function renderUsers(users) {
    const container = document.getElementById("users-container");
    container.innerHTML = users.map(user => {
        const addr = user.address
            ? `${user.address.street} ${user.address.houseNumber}<br>
         ${user.address.postalCode} ${user.address.city}<br>
         ${user.address.country}`
            : "<em>Not provided</em>";
        const email = user.email || "—";
        const phone = user.telephone || "—";
        return `
      <div class="card">
        <h2>${user.name} (ID: ${user.id})</h2>
        <p><span class="label">Email:</span> ${email}</p>
        <p><span class="label">Phone:</span> ${phone}</p>
        <p class="address"><span class="label">Address:</span><br>${addr}</p>
      </div>
    `;
    }).join("");
}
loadUsers().then(users => {
    console.log("Final users loaded:", users);
    renderUsers(users);
});
//# sourceMappingURL=users.js.map