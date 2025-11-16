export interface Address {
  street: string;
  houseNumber: string;
  postalCode: string;
  city: string;
  country: string;
}

export interface User {
  id: number;
  name: string;
  address?: Address;
  email: string;
  telephone: string;
}

export class AddressImpl implements Address {
  constructor(
    public street: string,
    public houseNumber: string,
    public postalCode: string,
    public city: string,
    public country: string
  ) {}
}

export class UserImpl implements User {
  constructor(
    public id: number,
    public name: string,
    public address: AddressImpl | undefined = undefined,
    public email: string = "",
    public telephone: string = ""
  ) {}
}

export async function loadUsers(): Promise<UserImpl[]> {
  try {
    console.log("Fetching from backend...");
    const res = await fetch('http://localhost:8081/users', {
      mode: 'cors'
    });
    
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    
    const data: any[] = await res.json();
    console.log("Received raw data:", data); 

    const users = data.map(item => new UserImpl(
      item.id,
      item.name,
      item.address ? new AddressImpl(
        item.address.street ?? "",
        item.address.houseNumber ?? "",
        item.address.postalCode ?? "",
        item.address.city ?? "",
        item.address.country ?? ""
      ) : undefined,
      item.email ?? "",
      item.telephone ?? ""
    ));

    console.log("Mapped users:", users);
    return users;
  } catch (err) {
    console.error("Load failed:", err);
    return [];
  }
}

function renderUsers(users: UserImpl[]) {
  const container = document.getElementById("users-container")!;
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

// AUTO-RUN
loadUsers().then(users => {
  console.log("Final users loaded:", users);
  renderUsers(users);
});