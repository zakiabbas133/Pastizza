import { useMemo, useState } from "react";
import "./PizzaBuilder.css";

const pizzaSizes = [
  {
    id: "small",
    name: "Small",
    description: "8 inch",
    price: 650,
  },
  {
    id: "medium",
    name: "Medium",
    description: "10 inch",
    price: 950,
  },
  {
    id: "large",
    name: "Large",
    description: "12 inch",
    price: 1250,
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
  const [selectedSize, setSelectedSize] = useState("small");
  const [selectedSauce, setSelectedSauce] = useState("tomato");
  const [selectedToppings, setSelectedToppings] = useState(["chicken"]);
  const [selectedCrust, setSelectedCrust] = useState("classic");
  const [quantity, setQuantity] = useState(1);

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

  const createWhatsAppMessage = (order: {
    name: string;
    size: string;
    crust: string;
    sauce: string;
    toppings: typeof toppings;
    quantity: number;
    totalPrice: number;
  }) => {
    const toppingsText =
      order.toppings.length > 0
        ? order.toppings.map((topping) => `• ${topping.name}`).join("\n")
        : "• None";

    return `*New Custom Pizza Order*

Assalamualaikum Pastizza!

I'd like to order a *Build Your Own Pizza*:

*Pizza:* ${order.name}
*Size:* ${order.size}
*Crust:* ${order.crust}
*Sauce:* ${order.sauce}

*Toppings:*
${toppingsText}

*Pizza Quantity:* ${order.quantity}

*Total:* Rs. ${order.totalPrice.toLocaleString()}

Please confirm my order.

Thank you!`;
  };

  const handleWhatsAppOrder = () => {
    const order = {
      name: "Build Your Own Pizza",
      size: size.name,
      crust: crust.name,
      sauce: sauce.name,
      toppings: selectedToppingObjects,
      quantity,
      totalPrice,
    };

    const message = createWhatsAppMessage(order);

    const phoneNumber = "923001234567";

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message,
    )}`;

    window.open(whatsappUrl, "_blank");
  };

  const handleOrderNow = () => {
    handleWhatsAppOrder();
  };

  return (
    <div className="pizza-builder">
      <div className="pizza-builder__header">
        <span className="pizza-builder__eyebrow">PASTIZZA STUDIO</span>

        <h1>Build Your Own Pizza</h1>

        <p>Your pizza. Your rules. Create something delicious.</p>
      </div>

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
            <h2>Your Creation</h2>

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
                    {item.price === 0 ? "Included" : `+ Rs. ${item.price}`}
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
                      {topping.price === 0
                        ? "Included"
                        : `+ Rs. ${topping.price}`}
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

          <div className="pizza-checkout">
            <div>
              <span>Total</span>

              <strong>Rs. {totalPrice.toLocaleString()}</strong>
            </div>

            <button
              type="button"
              className="pizza-add-button"
              onClick={handleOrderNow}
            >
              Order Now →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PizzaBuilder;
