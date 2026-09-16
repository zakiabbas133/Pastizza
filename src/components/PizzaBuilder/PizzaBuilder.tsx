import { useMemo, useState } from "react";
import { useGetWebsiteSettingsQuery } from "../../services/websiteSettingsApi";
import {
  usePlaceOrderMutation,
  type PlaceOrderType,
} from "../../services/ordersApi";
import { toast } from "react-toastify";
import "./PizzaBuilder.css";

const pizzaSizes = [
  {
    id: "small",
    name: "Small",
    description: "8 inch",
    price: 999,
  },
  {
    id: "medium",
    name: "Medium",
    description: "10 inch",
    price: 1599,
  },
  {
    id: "large",
    name: "Large",
    description: "12 inch",
    price: 2299,
  },
];

const toppings = [
  {
    id: "chicken",
    name: "Chicken",
    price: 0,
    emoji: "/firestorm/chicken.png",
  },
  {
    id: "pepperoni",
    name: "Pepperoni",
    price: 150,
    emoji: "/firestorm/pepperoni.png",
  },
  {
    id: "beef",
    name: "Beef",
    price: 180,
    emoji: "/firestorm/beef.png",
  },
  {
    id: "sausage",
    name: "Sausage",
    price: 160,
    emoji: "/firestorm/sausage.png",
  },
  {
    id: "mushrooms",
    name: "Mushrooms",
    price: 100,
    emoji: "/firestorm/mushrooms.png",
  },
  {
    id: "olives",
    name: "Olives",
    price: 80,
    emoji: "/firestorm/olive.png",
  },
  {
    id: "jalapenos",
    name: "Jalapeños",
    price: 70,
    emoji: "/firestorm/chili.png",
  },
  {
    id: "onions",
    name: "Onions",
    price: 60,
    emoji: "/firestorm/onion.png",
  },
  {
    id: "extraCheese",
    name: "Extra Cheese",
    price: 150,
    emoji: "/firestorm/cheese.png",
  },
  {
    id: "greenPeppers",
    name: "Green Peppers",
    price: 70,
    emoji: "/firestorm/green-pepper.png",
  },
  {
    id: "tomatoes",
    name: "Tomatoes",
    price: 70,
    emoji: "/firestorm/tomato.png",
  },
  {
    id: "corn",
    name: "Sweet Corn",
    price: 80,
    emoji: "/firestorm/corn.png",
  },
  {
    id: "blackOlives",
    name: "Black Olives",
    price: 90,
    emoji: "/firestorm/black-olive.png",
  },
  {
    id: "spinach",
    name: "Spinach",
    price: 70,
    emoji: "/firestorm/spinach.png",
  },
  {
    id: "garlic",
    name: "Garlic",
    price: 60,
    emoji: "/firestorm/garlic.png",
  },
  {
    id: "mozzarella",
    name: "Mozzarella",
    price: 150,
    emoji: "/firestorm/mozzarella.png",
  },
];

const pizzaPositions = [
  { top: "24%", left: "42%" },
  { top: "28%", left: "62%" },
  { top: "36%", left: "27%" },
  { top: "39%", left: "50%" },
  { top: "34%", left: "73%" },
  { top: "48%", left: "20%" },
  { top: "46%", left: "38%" },
  { top: "52%", left: "60%" },
  { top: "47%", left: "78%" },
  { top: "62%", left: "28%" },
  { top: "58%", left: "50%" },
  { top: "64%", left: "72%" },
  { top: "73%", left: "40%" },
  { top: "76%", left: "60%" },
  { top: "68%", left: "20%" },
  { top: "72%", left: "80%" },
];

const toppingRotations = [
  -12, 8, -5, 14, -9, 6, -15, 10, -7, 12, -10, 5, -14, 9, 7, -8,
];

const sauces = [
  {
    id: "tomato",
    name: "Tomato Sauce",
    price: 0,
  },
  {
    id: "bbq",
    name: "BBQ Sauce",
    price: 50,
  },
  {
    id: "spicy",
    name: "Spicy Sauce",
    price: 50,
  },
  {
    id: "garlic",
    name: "Garlic Sauce",
    price: 60,
  },
  {
    id: "ranch",
    name: "Ranch Sauce",
    price: 70,
  },
  {
    id: "peri-peri",
    name: "Peri Peri Sauce",
    price: 70,
  },
  {
    id: "cheese",
    name: "Cheese Sauce",
    price: 80,
  },
];

const crusts = [
  {
    id: "classic",
    name: "Classic Crust",
    price: 0,
  },
  {
    id: "thin",
    name: "Thin Crust",
    price: 0,
  },
  {
    id: "garlic",
    name: "Garlic Crust",
    price: 100,
  },
  {
    id: "cheese-stuffed",
    name: "Cheese Stuffed Crust",
    price: 150,
  },
  {
    id: "garlic-cheese",
    name: "Garlic Cheese Crust",
    price: 180,
  },
  {
    id: "cheese-burst",
    name: "Cheese Burst Crust",
    price: 200,
  },
];

const PizzaBuilder = () => {
  const [placeOrder, { isLoading }] = usePlaceOrderMutation();

  const { data: websiteSettings = null, isLoading: websiteSettingsLoading } =
    useGetWebsiteSettingsQuery();

  const [selectedSize, setSelectedSize] = useState("small");
  const [selectedSauce, setSelectedSauce] = useState("tomato");
  const [selectedToppings, setSelectedToppings] = useState(["chicken"]);
  const [selectedCrust, setSelectedCrust] = useState("classic");
  const [quantity, setQuantity] = useState(1);

  // Customer information
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const size =
    pizzaSizes.find((item) => item.id === selectedSize) || pizzaSizes[0];

  const sauce = sauces.find((item) => item.id === selectedSauce) || sauces[0];

  const crust = crusts.find((item) => item.id === selectedCrust) || crusts[0];

  const selectedToppingObjects = toppings.filter((topping) =>
    selectedToppings.includes(topping.id),
  );

  const totalPrice = useMemo(() => {
    const toppingsPrice = selectedToppingObjects.reduce(
      (total, topping) => total + topping.price,
      0,
    );

    return (size.price + sauce.price + crust.price + toppingsPrice) * quantity;
  }, [size, sauce, crust, selectedToppingObjects, quantity]);

  const toggleTopping = (toppingId: string) => {
    setSelectedToppings((previous) =>
      previous.includes(toppingId)
        ? previous.filter((id) => id !== toppingId)
        : [...previous, toppingId],
    );
  };

  const handleSelectAll = () => {
    const onlyChickenSelected =
      selectedToppingObjects.length === 1 &&
      selectedToppingObjects.some((item) => item.id === "chicken");

    setSelectedToppings(
      onlyChickenSelected ? toppings.map((topping) => topping.id) : ["chicken"],
    );
  };

  const createWhatsAppMessage = (order: PlaceOrderType) => {
    const toppingsText = order.toppings
      .split(",")
      .map((topping) => `• ${topping.trim()}`)
      .join("\n");

    return `*New Custom Pizza Order*

Assalamualaikum Pastizza!

I'd like to order a *Build Your Own Pizza*:

*Customer Name:* ${fullName}
*Phone:* ${phoneNumber}

*Size:* ${order.size}
*Crust:* ${order.crust}
*Sauce:* ${order.sauce}

*Toppings:*
${toppingsText}

*Pizza Quantity:* ${order.orderQuantity}

*Total:* Rs. ${order.totalPrice.toLocaleString()}

Please confirm my order.

Thank you!`;
  };

  const handleWhatsAppOrder = (order: PlaceOrderType) => {
    const orderPlaced = {
      id: order.id,
      orderType: order.orderType,
      size: order.size,
      crust: order.crust,
      sauce: order.sauce,
      toppings: order.toppings,
      orderQuantity: order.orderQuantity,
      totalPrice: order.totalPrice,
    };

    const message = createWhatsAppMessage(orderPlaced as PlaceOrderType);

    const whatsappUrl = `${
      websiteSettings?.whatsappUrl
    }?text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, "_blank");
  };

  const handleOrderNow = async () => {
    // Validate customer information
    const trimmedName = fullName.trim();
    const trimmedPhone = phoneNumber.trim();

    if (!trimmedName) {
      toast("Please enter your full name.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
        type: "warning",
      });

      return;
    }

    if (trimmedName.length < 3) {
      toast("Please enter a valid full name.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
        type: "warning",
      });

      return;
    }

    if (!trimmedPhone) {
      toast("Please enter your phone number.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
        type: "warning",
      });

      return;
    }

    const phoneDigits = trimmedPhone.replace(/\D/g, "");

    if (phoneDigits.length < 10) {
      toast("Please enter a valid phone number.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
        type: "warning",
      });

      return;
    }

    try {
      const toppingsPayload = selectedToppingObjects
        .map((x) => x.name)
        .join(", ");

      const formData = new FormData();

      formData.append("orderType", "Pizza");
      formData.append("fullName", trimmedName);
      formData.append("phoneNumber", trimmedPhone);
      formData.append("size", String(size.name));
      formData.append("crust", String(crust.name));
      formData.append("sauce", String(sauce.name));
      formData.append("toppings", toppingsPayload);
      formData.append("orderQuantity", String(quantity));
      formData.append("totalPrice", String(totalPrice));
      formData.append("orderBy", String(fullName));
      formData.append("orderByNumber", String(phoneNumber));

      const placedOrder = await placeOrder(formData).unwrap();

      if (placedOrder.success) {
        toast("Order placed. We will confirm your order in a while.", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          type: "success",
        });

        handleWhatsAppOrder(placedOrder.order);
      } else {
        toast("Unable to place order. Please try again later.", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          type: "error",
        });
      }
    } catch (error) {
      console.error("Failed to place order:", error);

      toast("Unable to place order. Please try again later.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        type: "error",
      });
    }
  };

  return (
    <div className="pizza-builder">
      <div className="pizza-builder__layout">
        {/* Preview */}
        <div className="pizza-preview">
          <div className="pizza-preview__stage">
            <div
              className={`pizza-preview__pizza pizza-preview__pizza--${selectedCrust}`}
            >
              <div className="pizza-preview__crust">
                <div className="pizza-preview__cheese">
                  {selectedToppingObjects.map((topping, index) => {
                    const position = pizzaPositions[index];
                    const rotation = toppingRotations[index];

                    if (!position) {
                      return null;
                    }

                    return (
                      <img
                        key={topping.id}
                        className="pizza-topping"
                        src={topping.emoji}
                        alt={topping.name}
                        style={{
                          top: position.top,
                          left: position.left,
                          transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
                        }}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className="pizza-preview__details">
            <h2>Your Pizza</h2>

            <div className="pizza-preview__summary">
              <span>{size.name}</span>
              <span> • </span>
              <span>{crust.name}</span>
              <span> • </span>
              <span>{sauce.name}</span>
            </div>

            <div className="pizza-preview__selected">
              {selectedToppingObjects.length > 0
                ? selectedToppingObjects
                    .map((topping) => topping.name)
                    .join(", ")
                : "No extra toppings selected"}
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="pizza-controls">
          <section className="pizza-section">
            <h3>01. Choose your size</h3>

            <div className="pizza-size-grid">
              {pizzaSizes.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={`pizza-size ${
                    selectedSize === item.id ? "pizza-size--active" : ""
                  }`}
                  onClick={() => setSelectedSize(item.id)}
                >
                  <strong>{item.name}</strong>
                  <span>{item.description}</span>
                  <b>Rs. {item.price.toLocaleString()}</b>
                </button>
              ))}
            </div>
          </section>

          <section className="pizza-section">
            <div className="pizza-section__header">
              <h3>02. Choose your crust</h3>
            </div>

            <div className="pizza-options-grid">
              {crusts.map((item) => {
                const isSelected = selectedCrust === item.id;

                return (
                  <button
                    key={item.id}
                    type="button"
                    className={`pizza-option ${
                      isSelected ? "pizza-option--selected" : ""
                    }`}
                    onClick={() => setSelectedCrust(item.id)}
                  >
                    <div className="pizza-option__content">
                      <span className="pizza-option__name">{item.name}</span>

                      <span className="pizza-option__price">
                        {item.price === 0 ? "Free" : `+ Rs. ${item.price}`}
                      </span>
                    </div>

                    <span className="pizza-option__check">
                      {isSelected ? "✓" : ""}
                    </span>
                  </button>
                );
              })}
            </div>
          </section>

          <section className="pizza-section">
            <h3>03. Choose your sauce</h3>

            <div className="pizza-option-list">
              {sauces.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={`pizza-option pizza-option--sauce ${
                    selectedSauce === item.id ? "pizza-option--active" : ""
                  }`}
                  onClick={() => setSelectedSauce(item.id)}
                >
                  <span>{item.name}</span>

                  <span>
                    {item.price === 0 ? "Free" : `+ Rs. ${item.price}`}
                  </span>
                </button>
              ))}
            </div>
          </section>

          <section className="pizza-section">
            <div className="pizza-section__header">
              <h3>04. Add your toppings</h3>

              <button
                type="button"
                className="pizza-select-all"
                onClick={handleSelectAll}
              >
                {selectedToppingObjects.length === 1 &&
                selectedToppingObjects.some((item) => item.id === "chicken")
                  ? "Select All Toppings"
                  : "Remove All Toppings"}
              </button>
            </div>

            <div className="pizza-toppings-grid">
              {toppings.map((topping) => {
                const isSelected = selectedToppings.includes(topping.id);

                return (
                  <button
                    type="button"
                    disabled={topping.id === "chicken"}
                    key={topping.id}
                    className={`pizza-topping-card ${
                      isSelected ? "pizza-topping-card--active" : ""
                    }`}
                    onClick={() => toggleTopping(topping.id)}
                  >
                    <img src={topping.emoji} alt="" />

                    <span className="pizza-topping-card__name">
                      {topping.name}
                    </span>

                    <span className="pizza-topping-card__price">
                      {topping.price === 0 ? "Free" : `+ Rs. ${topping.price}`}
                    </span>

                    <span className="pizza-topping-card__check">
                      {isSelected ? "✓" : "+"}
                    </span>
                  </button>
                );
              })}
            </div>
          </section>

          <section className="pizza-section">
            <h3>05. Quantity</h3>

            <div className="pizza-quantity">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              >
                −
              </button>

              <strong>{quantity}</strong>

              <button type="button" onClick={() => setQuantity((q) => q + 1)}>
                +
              </button>
            </div>
          </section>

          {/* Customer Information */}
          <section className="pizza-section pizza-customer-section">
            <div className="pizza-section__header">
              <div>
                <span className="pizza-customer-eyebrow">ALMOST THERE</span>

                <h3>06. Your details</h3>
              </div>
            </div>

            <p className="pizza-customer-description">
              Tell us where to reach you so we can confirm your delicious
              creation.
            </p>

            <div className="pizza-customer-fields">
              {/* Full Name */}
              <div className="pizza-input-group">
                <label htmlFor="pizza-full-name">Full Name</label>

                <div className="pizza-input-wrapper">
                  <span className="pizza-input-icon">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M20 21C20 19.3431 17.3137 18 14 18H10C6.68629 18 4 19.3431 4 21"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        strokeLinecap="round"
                      />
                      <circle
                        cx="12"
                        cy="7"
                        r="4"
                        stroke="currentColor"
                        strokeWidth="1.7"
                      />
                    </svg>
                  </span>

                  <input
                    id="pizza-full-name"
                    type="text"
                    value={fullName}
                    onChange={(event) => setFullName(event.target.value)}
                    placeholder="Enter your full name"
                    autoComplete="name"
                    maxLength={100}
                  />
                </div>
              </div>

              {/* Phone Number */}
              <div className="pizza-input-group">
                <label htmlFor="pizza-phone-number">Phone Number</label>

                <div className="pizza-input-wrapper">
                  <span className="pizza-input-icon">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6.62 10.79C8.06 13.62 10.38 15.94 13.21 17.38L15.41 15.18C15.69 14.9 16.08 14.81 16.44 14.93C17.59 15.31 18.82 15.52 20.09 15.52C20.59 15.52 21 15.93 21 16.43V20.09C21 20.59 20.59 21 20.09 21C10.65 21 3 13.35 3 3.91C3 3.41 3.41 3 3.91 3H7.58C8.08 3 8.49 3.41 8.49 3.91C8.49 5.18 8.7 6.41 9.08 7.56C9.2 7.92 9.11 8.31 8.83 8.59L6.62 10.79Z"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>

                  <input
                    id="pizza-phone-number"
                    type="tel"
                    value={phoneNumber}
                    onChange={(event) => setPhoneNumber(event.target.value)}
                    placeholder="03XX XXXXXXX"
                    autoComplete="tel"
                    inputMode="tel"
                    maxLength={20}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Checkout */}
          <div className="pizza-checkout">
            <div>
              <span>Total</span>

              <strong>Rs. {totalPrice.toLocaleString()}</strong>
            </div>

            <button
              disabled={websiteSettingsLoading || isLoading}
              type="button"
              className={
                websiteSettingsLoading || isLoading
                  ? "pizza-add-disabled-button"
                  : "pizza-add-button"
              }
              onClick={handleOrderNow}
            >
              {isLoading ? "Placing Order..." : "Order Now →"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PizzaBuilder;
