"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserImpl = exports.AddressImpl = void 0;
exports.loadUsers = loadUsers;
var AddressImpl = /** @class */ (function () {
    function AddressImpl(street, houseNumber, postalCode, city, country) {
        this.street = street;
        this.houseNumber = houseNumber;
        this.postalCode = postalCode;
        this.city = city;
        this.country = country;
    }
    return AddressImpl;
}());
exports.AddressImpl = AddressImpl;
var UserImpl = /** @class */ (function () {
    function UserImpl(id, name, address, email, telephone) {
        if (address === void 0) { address = undefined; }
        if (email === void 0) { email = ""; }
        if (telephone === void 0) { telephone = ""; }
        this.id = id;
        this.name = name;
        this.address = address;
        this.email = email;
        this.telephone = telephone;
    }
    return UserImpl;
}());
exports.UserImpl = UserImpl;
function loadUsers() {
    return __awaiter(this, void 0, void 0, function () {
        var res, data, users, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    console.log("Fetching from backend...");
                    return [4 /*yield*/, fetch('http://localhost:8081/users', {
                            mode: 'cors' // QUAN TRỌNG: CHO PHÉP CORS
                        })];
                case 1:
                    res = _a.sent();
                    if (!res.ok)
                        throw new Error("HTTP ".concat(res.status));
                    return [4 /*yield*/, res.json()];
                case 2:
                    data = _a.sent();
                    console.log("Received raw data:", data);
                    users = data.map(function (item) {
                        var _a, _b, _c, _d, _e, _f, _g;
                        return new UserImpl(item.id, item.name, item.address ? new AddressImpl((_a = item.address.street) !== null && _a !== void 0 ? _a : "", (_b = item.address.houseNumber) !== null && _b !== void 0 ? _b : "", (_c = item.address.postalCode) !== null && _c !== void 0 ? _c : "", (_d = item.address.city) !== null && _d !== void 0 ? _d : "", (_e = item.address.country) !== null && _e !== void 0 ? _e : "") : undefined, (_f = item.email) !== null && _f !== void 0 ? _f : "", (_g = item.telephone) !== null && _g !== void 0 ? _g : "");
                    });
                    console.log("Mapped users:", users);
                    return [2 /*return*/, users];
                case 3:
                    err_1 = _a.sent();
                    console.error("Load failed:", err_1);
                    return [2 /*return*/, []];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function renderUsers(users) {
    var container = document.getElementById("users-container");
    container.innerHTML = users.map(function (user) {
        var addr = user.address
            ? "".concat(user.address.street, " ").concat(user.address.houseNumber, "<br>\n         ").concat(user.address.postalCode, " ").concat(user.address.city, "<br>\n         ").concat(user.address.country)
            : "<em>Not provided</em>";
        var email = user.email || "—";
        var phone = user.telephone || "—";
        return "\n      <div class=\"card\">\n        <h2>".concat(user.name, " (ID: ").concat(user.id, ")</h2>\n        <p><span class=\"label\">Email:</span> ").concat(email, "</p>\n        <p><span class=\"label\">Phone:</span> ").concat(phone, "</p>\n        <p class=\"address\"><span class=\"label\">Address:</span><br>").concat(addr, "</p>\n      </div>\n    ");
    }).join("");
}
// AUTO-RUN
loadUsers().then(function (users) {
    console.log("Final users loaded:", users);
    renderUsers(users);
});
