import { useMemo, useState } from "react";
import { useGetWebsiteSettingsQuery } from "../../services/websiteSettingsApi";
import {
  usePlaceOrderMutation,
  type PlaceOrderType,
} from "../../services/ordersApi";
import { toast } from "react-toastify";
import "./BurgerMaker.css";

type Option = {
  id: string;
  name: string;
  price: number;
  image?: string;
};

const burgerSizes: Option[] = [
  {
    id: "single",
    name: "Single",
    price: 699,
  },
  {
    id: "double",
    name: "Double",
    price: 999,
  },
  {
    id: "tower",
    name: "Tower",
    price: 1399,
  },
];

const buns: Option[] = [
  {
    id: "classic",
    name: "Classic Bun",
    price: 0,
    image: "/firestorm/burger-bun.png",
  },
  {
    id: "sesame",
    name: "Sesame Bun",
    price: 50,
    image: "/firestorm/burger-bun.png",
  },
  {
    id: "brioche",
    name: "Brioche Bun",
    price: 100,
    image: "/firestorm/burger-bun.png",
  },
  {
    id: "garlic",
    name: "Garlic Bun",
    price: 80,
    image: "/firestorm/burger-bun.png",
  },
];

const patties: Option[] = [
  {
    id: "beef",
    name: "Beef Patty",
    price: 0,
    image: "/firestorm/beef.png",
  },
  {
    id: "chicken",
    name: "Chicken Patty",
    price: 0,
    image: "/firestorm/chicken.png",
  },
  {
    id: "crispy-chicken",
    name: "Crispy Chicken",
    price: 80,
    image: "/firestorm/chicken.png",
  },
  {
    id: "zinger",
    name: "Zinger Patty",
    price: 100,
    image: "/firestorm/chicken.png",
  },
  {
    id: "beef-smash",
    name: "Smash Beef",
    price: 100,
    image: "/firestorm/beef.png",
  },
  {
    id: "seekh-kebab",
    name: "Seekh Kebab",
    price: 120,
    image: "/firestorm/beef.png",
  },
];

const cheeses: Option[] = [
  {
    id: "cheddar",
    name: "Cheddar",
    price: 100,
    image: "/firestorm/cheese.png",
  },
  {
    id: "mozzarella",
    name: "Mozzarella",
    price: 120,
    image: "/firestorm/mozzarella.png",
  },
  {
    id: "american",
    name: "American Cheese",
    price: 100,
    image: "/firestorm/cheese.png",
  },
  {
    id: "extra-cheese",
    name: "Extra Cheese",
    price: 150,
    image: "/firestorm/cheese.png",
  },
];

const vegetables: Option[] = [
  {
    id: "lettuce",
    name: "Lettuce",
    price: 40,
    image: "/firestorm/lettuce.png",
  },
  {
    id: "tomatoes",
    name: "Tomatoes",
    price: 50,
    image: "/firestorm/tomato.png",
  },
  {
    id: "onions",
    name: "Onions",
    price: 40,
    image: "/firestorm/onion.png",
  },
  {
    id: "jalapenos",
    name: "Jalapeños",
    price: 60,
    image: "/firestorm/chili.png",
  },
  {
    id: "pickles",
    name: "Pickles",
    price: 60,
    image: "/firestorm/pickle.png",
  },
  {
    id: "capsicum",
    name: "Capsicum",
    price: 60,
    image: "/firestorm/green-pepper.png",
  },
  {
    id: "mushrooms",
    name: "Mushrooms",
    price: 80,
    image: "/firestorm/mushrooms.png",
  },
  {
    id: "black-olives",
    name: "Black Olives",
    price: 80,
    image: "/firestorm/black-olive.png",
  },
  {
    id: "corn",
    name: "Sweet Corn",
    price: 70,
    image: "/firestorm/corn.png",
  },
];

const sauces: Option[] = [
  {
    id: "burger-special",
    name: "Burger Special",
    price: 80,
  },
  {
    id: "mayonnaise",
    name: "Mayonnaise",
    price: 50,
  },
  {
    id: "garlic-mayo",
    name: "Garlic Mayo",
    price: 70,
  },
  {
    id: "bbq",
    name: "BBQ Sauce",
    price: 70,
  },
  {
    id: "spicy",
    name: "Spicy Sauce",
    price: 60,
  },
  {
    id: "chipotle",
    name: "Chipotle",
    price: 90,
  },
  {
    id: "honey-mustard",
    name: "Honey Mustard",
    price: 80,
  },
  {
    id: "cheese",
    name: "Cheese Sauce",
    price: 100,
  },
];

const extras: Option[] = [
  {
    id: "fried-egg",
    name: "Fried Egg",
    price: 100,
    image: "/firestorm/egg.png",
  },
  {
    id: "beef-bacon",
    name: "Beef Bacon",
    price: 180,
    image: "/firestorm/beef.png",
  },
  {
    id: "onion-rings",
    name: "Onion Rings",
    price: 100,
    image: "/firestorm/onion.png",
  },
  {
    id: "crispy-chicken",
    name: "Crispy Chicken",
    price: 150,
    image: "/firestorm/chicken.png",
  },
  {
    id: "extra-patty",
    name: "Extra Patty",
    price: 200,
    image: "/firestorm/beef.png",
  },
  {
    id: "extra-sauce",
    name: "Extra Sauce",
    price: 50,
  },
  {
    id: "extra-cheese",
    name: "Extra Cheese",
    price: 150,
    image: "/firestorm/cheese.png",
  },
];

const spiceLevels: Option[] = [
  {
    id: "mild",
    name: "Mild",
    price: 0,
  },
  {
    id: "medium",
    name: "Medium",
    price: 0,
  },
  {
    id: "spicy",
    name: "Spicy",
    price: 0,
  },
  {
    id: "pakistani-hot",
    name: "Pakistani Hot",
    price: 30,
  },
];

const bunColors: Record<string, string> = {
  classic: "#c98a42",
  sesame: "#d7a65a",
  brioche: "#e4b66b",
  garlic: "#c58b43",
};

const BurgerMaker = () => {
  const [placeOrder, { isLoading }] = usePlaceOrderMutation();

  const { data: websiteSettings = null, isLoading: websiteSettingsLoading } =
    useGetWebsiteSettingsQuery();

  const [selectedSize, setSelectedSize] = useState("single");
  const [selectedBun, setSelectedBun] = useState("classic");
  const [selectedPatty, setSelectedPatty] = useState("beef");
  const [selectedSauce, setSelectedSauce] = useState("burger-special");

  const [selectedCheeses, setSelectedCheeses] = useState<string[]>(["cheddar"]);

  const [selectedVegetables, setSelectedVegetables] = useState<string[]>([
    "lettuce",
    "tomatoes",
    "onions",
  ]);

  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
  const [selectedSpice, setSelectedSpice] = useState("medium");

  const [quantity, setQuantity] = useState(1);

  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const size =
    burgerSizes.find((item) => item.id === selectedSize) || burgerSizes[0];

  const bun = buns.find((item) => item.id === selectedBun) || buns[0];

  const patty = patties.find((item) => item.id === selectedPatty) || patties[0];

  const sauce = sauces.find((item) => item.id === selectedSauce) || sauces[0];

  const spice =
    spiceLevels.find((item) => item.id === selectedSpice) || spiceLevels[0];

  const selectedCheeseObjects = cheeses.filter((item) =>
    selectedCheeses.includes(item.id),
  );

  const selectedVegetableObjects = vegetables.filter((item) =>
    selectedVegetables.includes(item.id),
  );

  const selectedExtraObjects = extras.filter((item) =>
    selectedExtras.includes(item.id),
  );

  const totalPrice = useMemo(() => {
    const cheesePrice = selectedCheeseObjects.reduce(
      (total, item) => total + item.price,
      0,
    );

    const vegetablePrice = selectedVegetableObjects.reduce(
      (total, item) => total + item.price,
      0,
    );

    const extrasPrice = selectedExtraObjects.reduce(
      (total, item) => total + item.price,
      0,
    );

    return (
      (size.price +
        bun.price +
        patty.price +
        sauce.price +
        spice.price +
        cheesePrice +
        vegetablePrice +
        extrasPrice) *
      quantity
    );
  }, [
    size,
    bun,
    patty,
    sauce,
    spice,
    selectedCheeseObjects,
    selectedVegetableObjects,
    selectedExtraObjects,
    quantity,
  ]);

  const toggleItem = (
    id: string,
    setter: React.Dispatch<React.SetStateAction<string[]>>,
  ) => {
    setter((previous) =>
      previous.includes(id)
        ? previous.filter((item) => item !== id)
        : [...previous, id],
    );
  };

  const createWhatsAppMessage = (order: PlaceOrderType) => {
    const toppingsText = order.toppings
      .split(",")
      .map((item) => `• ${item.trim()}`)
      .join("\n");

    return `*New Custom Burger Order*

Assalamualaikum Pastizza!

I'd like to order a *Build Your Own Burger*:

*Customer Name:* ${fullName}
*Phone:* ${phoneNumber}

*Size:* ${order.size}
*Bun:* ${order.crust}
*Patty:* ${patty.name}
*Sauce:* ${order.sauce}

*Customizations:*
${toppingsText}

*Quantity:* ${order.orderQuantity}

*Total:* Rs. ${order.totalPrice.toLocaleString()}

Please confirm my order.

Thank you!`;
  };

  const handleWhatsAppOrder = (order: PlaceOrderType) => {
    if (!websiteSettings?.whatsappUrl) {
      toast("Order placed, but WhatsApp is unavailable.", {
        position: "top-right",
        autoClose: 3000,
        theme: "light",
        type: "warning",
      });

      return;
    }

    const message = createWhatsAppMessage(order);

    const whatsappUrl = `${
      websiteSettings.whatsappUrl
    }?text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, "_blank");
  };

  const handleOrderNow = async () => {
    const trimmedName = fullName.trim();
    const trimmedPhone = phoneNumber.trim();

    if (!trimmedName) {
      toast("Please enter your full name.", {
        position: "top-right",
        autoClose: 3000,
        theme: "light",
        type: "warning",
      });

      return;
    }

    if (trimmedName.length < 3) {
      toast("Please enter a valid full name.", {
        position: "top-right",
        autoClose: 3000,
        theme: "light",
        type: "warning",
      });

      return;
    }

    if (!trimmedPhone) {
      toast("Please enter your phone number.", {
        position: "top-right",
        autoClose: 3000,
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
        theme: "light",
        type: "warning",
      });

      return;
    }

    try {
      const customizationParts = [
        `Bun: ${bun.name}`,
        `Patty: ${patty.name}`,
        `Spice: ${spice.name}`,

        selectedCheeseObjects.length
          ? `Cheese: ${selectedCheeseObjects
              .map((item) => item.name)
              .join(", ")}`
          : "Cheese: None",

        selectedVegetableObjects.length
          ? `Vegetables: ${selectedVegetableObjects
              .map((item) => item.name)
              .join(", ")}`
          : "Vegetables: None",

        selectedExtraObjects.length
          ? `Extras: ${selectedExtraObjects
              .map((item) => item.name)
              .join(", ")}`
          : "Extras: None",
      ];

      const toppingsPayload = customizationParts.join(", ");

      const formData = new FormData();

      formData.append("orderType", "Burger");
      formData.append("fullName", trimmedName);
      formData.append("phoneNumber", trimmedPhone);

      formData.append("size", String(size.name));

      // Existing backend contract uses "crust".
      // For burgers we store the selected bun here.
      formData.append("crust", String(bun.name));

      formData.append("sauce", String(sauce.name));
      formData.append("toppings", toppingsPayload);

      formData.append("orderQuantity", String(quantity));
      formData.append("totalPrice", String(totalPrice));

      formData.append("orderBy", trimmedName);
      formData.append("orderByNumber", trimmedPhone);

      const placedOrder = await placeOrder(formData).unwrap();

      if (placedOrder.success) {
        toast("Order placed. We will confirm your order in a while.", {
          position: "top-right",
          autoClose: 3000,
          theme: "light",
          type: "success",
        });

        handleWhatsAppOrder(placedOrder.order);
      } else {
        toast("Unable to place order. Please try again later.", {
          position: "top-right",
          autoClose: 3000,
          theme: "light",
          type: "error",
        });
      }
    } catch (error) {
      console.error("Failed to place burger order:", error);

      toast("Unable to place order. Please try again later.", {
        position: "top-right",
        autoClose: 3000,
        theme: "light",
        type: "error",
      });
    }
  };

  const previewToppings = [
    ...selectedCheeseObjects,
    ...selectedVegetableObjects,
    ...selectedExtraObjects,
  ];

  const toppingPositions = [
    { top: "34%", left: "32%" },
    { top: "30%", left: "53%" },
    { top: "39%", left: "72%" },
    { top: "48%", left: "26%" },
    { top: "50%", left: "48%" },
    { top: "47%", left: "70%" },
    { top: "61%", left: "34%" },
    { top: "62%", left: "57%" },
    { top: "65%", left: "75%" },
    { top: "28%", left: "78%" },
    { top: "40%", left: "45%" },
    { top: "57%", left: "20%" },
    { top: "67%", left: "48%" },
    { top: "33%", left: "20%" },
    { top: "55%", left: "80%" },
    { top: "72%", left: "66%" },
  ];

  return (
    <div className="burger-maker">
      <div className="burger-maker__layout">
        {/* =========================================
            PREVIEW
        ========================================== */}

        <div className="burger-preview">
          <div className="burger-preview__stage">
            <div className="burger-preview__glow" />

            <div
              className={`burger-stack burger-stack--${selectedBun}`}
              style={
                {
                  "--bun-color": bunColors[selectedBun] || "#c98a42",
                } as React.CSSProperties
              }
            >
              <div className="burger-bun burger-bun--top">
                <div className="burger-bun__seeds">
                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                </div>
              </div>

              <div className="burger-layer burger-layer--lettuce">
                <span />
                <span />
                <span />
                <span />
              </div>

              <div className="burger-layer burger-layer--cheese">
                <span />
                <span />
              </div>

              <div className="burger-layer burger-layer--patty">
                <div className="burger-patty__grill grill-one" />
                <div className="burger-patty__grill grill-two" />
                <div className="burger-patty__grill grill-three" />
              </div>

              <div className="burger-layer burger-layer--tomato">
                <span />
                <span />
                <span />
              </div>

              <div className="burger-layer burger-layer--onion">
                <span />
                <span />
                <span />
              </div>

              {previewToppings.map((item, index) => {
                const position =
                  toppingPositions[index % toppingPositions.length];

                if (!item.image) return null;

                return (
                  <img
                    key={`${item.id}-${index}`}
                    className="burger-topping"
                    src={item.image}
                    alt={item.name}
                    style={{
                      top: position.top,
                      left: position.left,
                      transform: `translate(-50%, -50%) rotate(${
                        index % 2 === 0 ? -8 : 8
                      }deg)`,
                    }}
                  />
                );
              })}

              <div className="burger-bun burger-bun--bottom" />
            </div>
          </div>

          <div className="burger-preview__details">
            <h2>Your Burger</h2>

            <div className="burger-preview__summary">
              <span>{size.name}</span>
              <span>•</span>
              <span>{bun.name}</span>
              <span>•</span>
              <span>{patty.name}</span>
            </div>

            <div className="burger-preview__selected">
              {previewToppings.length > 0
                ? previewToppings.map((item) => item.name).join(", ")
                : "Build your burger with your favourite ingredients"}
            </div>
          </div>
        </div>

        {/* =========================================
            CONTROLS
        ========================================== */}

        <div className="burger-controls">
          {/* SIZE */}

          <section className="burger-section">
            <h3>01. Choose your size</h3>

            <div className="burger-size-grid">
              {burgerSizes.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={`burger-size ${
                    selectedSize === item.id ? "burger-size--active" : ""
                  }`}
                  onClick={() => setSelectedSize(item.id)}
                >
                  <strong>{item.name}</strong>

                  <span>
                    {item.id === "single"
                      ? "Perfect for one"
                      : item.id === "double"
                        ? "Double the goodness"
                        : "Made for sharing"}
                  </span>

                  <b>Rs. {item.price.toLocaleString()}</b>
                </button>
              ))}
            </div>
          </section>

          {/* BUN */}

          <section className="burger-section">
            <h3>02. Choose your bun</h3>

            <div className="burger-options-grid">
              {buns.map((item) => {
                const isSelected = selectedBun === item.id;

                return (
                  <button
                    key={item.id}
                    type="button"
                    className={`burger-option ${
                      isSelected ? "burger-option--selected" : ""
                    }`}
                    onClick={() => setSelectedBun(item.id)}
                  >
                    {item.image && <img src={item.image} alt="" />}

                    <div className="burger-option__content">
                      <span className="burger-option__name">{item.name}</span>

                      <span className="burger-option__price">
                        {item.price === 0 ? "Included" : `+ Rs. ${item.price}`}
                      </span>
                    </div>

                    <span className="burger-option__check">
                      {isSelected ? "✓" : ""}
                    </span>
                  </button>
                );
              })}
            </div>
          </section>

          {/* PATTY */}

          <section className="burger-section">
            <h3>03. Choose your patty</h3>

            <div className="burger-patty-grid">
              {patties.map((item) => {
                const isSelected = selectedPatty === item.id;

                return (
                  <button
                    key={item.id}
                    type="button"
                    className={`burger-patty-card ${
                      isSelected ? "burger-patty-card--active" : ""
                    }`}
                    onClick={() => setSelectedPatty(item.id)}
                  >
                    {item.image && <img src={item.image} alt="" />}

                    <span className="burger-patty-card__name">{item.name}</span>

                    <span className="burger-patty-card__price">
                      {item.price === 0 ? "Included" : `+ Rs. ${item.price}`}
                    </span>

                    <span className="burger-patty-card__check">
                      {isSelected ? "✓" : "+"}
                    </span>
                  </button>
                );
              })}
            </div>
          </section>

          {/* SAUCE */}

          <section className="burger-section">
            <h3>04. Pick your sauce</h3>

            <div className="burger-sauce-grid">
              {sauces.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={`burger-sauce ${
                    selectedSauce === item.id ? "burger-sauce--active" : ""
                  }`}
                  onClick={() => setSelectedSauce(item.id)}
                >
                  <span>{item.name}</span>

                  <small>
                    {item.price === 0 ? "Free" : `+ Rs. ${item.price}`}
                  </small>
                </button>
              ))}
            </div>
          </section>

          {/* CHEESE */}

          <section className="burger-section">
            <div className="burger-section__header">
              <div>
                <span className="burger-section__eyebrow">CHEESY GOODNESS</span>

                <h3>05. Choose your cheese</h3>
              </div>
            </div>

            <div className="burger-toppings-grid">
              {cheeses.map((item) => {
                const selected = selectedCheeses.includes(item.id);

                return (
                  <button
                    key={item.id}
                    type="button"
                    className={`burger-topping-card ${
                      selected ? "burger-topping-card--active" : ""
                    }`}
                    onClick={() => toggleItem(item.id, setSelectedCheeses)}
                  >
                    {item.image && <img src={item.image} alt="" />}

                    <span className="burger-topping-card__name">
                      {item.name}
                    </span>

                    <span className="burger-topping-card__price">
                      + Rs. {item.price}
                    </span>

                    <span className="burger-topping-card__check">
                      {selected ? "✓" : "+"}
                    </span>
                  </button>
                );
              })}
            </div>
          </section>

          {/* VEGETABLES */}

          <section className="burger-section">
            <div className="burger-section__header">
              <div>
                <span className="burger-section__eyebrow">FRESH & CRUNCHY</span>

                <h3>06. Add vegetables</h3>
              </div>

              <button
                type="button"
                className="burger-select-all"
                onClick={() =>
                  setSelectedVegetables(
                    selectedVegetables.length === vegetables.length
                      ? []
                      : vegetables.map((item) => item.id),
                  )
                }
              >
                {selectedVegetables.length === vegetables.length
                  ? "Remove All"
                  : "Select All"}
              </button>
            </div>

            <div className="burger-toppings-grid">
              {vegetables.map((item) => {
                const selected = selectedVegetables.includes(item.id);

                return (
                  <button
                    key={item.id}
                    type="button"
                    className={`burger-topping-card ${
                      selected ? "burger-topping-card--active" : ""
                    }`}
                    onClick={() => toggleItem(item.id, setSelectedVegetables)}
                  >
                    {item.image && <img src={item.image} alt="" />}

                    <span className="burger-topping-card__name">
                      {item.name}
                    </span>

                    <span className="burger-topping-card__price">
                      + Rs. {item.price}
                    </span>

                    <span className="burger-topping-card__check">
                      {selected ? "✓" : "+"}
                    </span>
                  </button>
                );
              })}
            </div>
          </section>

          {/* SPICE */}

          <section className="burger-section">
            <h3>07. How spicy?</h3>

            <div className="burger-spice-grid">
              {spiceLevels.map((item) => {
                const selected = selectedSpice === item.id;

                return (
                  <button
                    key={item.id}
                    type="button"
                    className={`burger-spice ${
                      selected ? "burger-spice--active" : ""
                    }`}
                    onClick={() => setSelectedSpice(item.id)}
                  >
                    <span className="burger-spice__dots">
                      <i />
                      <i />
                      <i />
                      <i />
                    </span>

                    <strong>{item.name}</strong>

                    {item.price > 0 && <small>+ Rs. {item.price}</small>}
                  </button>
                );
              })}
            </div>
          </section>

          {/* EXTRAS */}

          <section className="burger-section">
            <div className="burger-section__header">
              <div>
                <span className="burger-section__eyebrow">FINAL TOUCH</span>

                <h3>08. Add extras</h3>
              </div>

              <button
                type="button"
                className="burger-select-all"
                onClick={() =>
                  setSelectedExtras(
                    selectedExtras.length === extras.length
                      ? []
                      : extras.map((item) => item.id),
                  )
                }
              >
                {selectedExtras.length === extras.length
                  ? "Remove All"
                  : "Select All"}
              </button>
            </div>

            <div className="burger-extra-grid">
              {extras.map((item) => {
                const selected = selectedExtras.includes(item.id);

                return (
                  <button
                    key={item.id}
                    type="button"
                    className={`burger-extra ${
                      selected ? "burger-extra--active" : ""
                    }`}
                    onClick={() => toggleItem(item.id, setSelectedExtras)}
                  >
                    <span>{item.name}</span>

                    <small>+ Rs. {item.price}</small>

                    <b>{selected ? "✓" : "+"}</b>
                  </button>
                );
              })}
            </div>
          </section>

          {/* QUANTITY */}

          <section className="burger-section">
            <h3>09. Quantity</h3>

            <div className="burger-quantity">
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

          {/* CUSTOMER */}

          <section className="burger-section burger-customer-section">
            <div className="burger-section__header">
              <div>
                <span className="burger-customer-eyebrow">ALMOST THERE</span>

                <h3>10. Your details</h3>
              </div>
            </div>

            <p className="burger-customer-description">
              Tell us where to reach you so we can confirm your custom burger.
            </p>

            <div className="burger-customer-fields">
              <div className="burger-input-group">
                <label htmlFor="burger-full-name">Full Name</label>

                <div className="burger-input-wrapper">
                  <span className="burger-input-icon">
                    <svg viewBox="0 0 24 24" fill="none">
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
                    id="burger-full-name"
                    type="text"
                    value={fullName}
                    onChange={(event) => setFullName(event.target.value)}
                    placeholder="Enter your full name"
                    autoComplete="name"
                    maxLength={100}
                  />
                </div>
              </div>

              <div className="burger-input-group">
                <label htmlFor="burger-phone-number">Phone Number</label>

                <div className="burger-input-wrapper">
                  <span className="burger-input-icon">
                    <svg viewBox="0 0 24 24" fill="none">
                      <path
                        d="M6.62 10.79C8.06 13.62 10.38 15.94 13.21 17.38L15.41 15.18C15.69 14.9 16.08 14.81 16.44 14.93C17.59 15.31 18.82 15.52 20.09 15.52C20.59 15.93 21 15.93 21 16.43V20.09C21 20.59 20.59 21 20.09 21C10.65 21 3 13.35 3 3.91C3 3.41 3.41 3 3.91 3H7.58C8.08 3 8.49 3.41 8.49 3.91C8.49 5.18 8.7 6.41 9.08 7.56C9.2 7.92 9.11 8.31 8.83 8.59L6.62 10.79Z"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>

                  <input
                    id="burger-phone-number"
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

          {/* CHECKOUT */}

          <div className="burger-checkout">
            <div>
              <span>Total</span>

              <strong>Rs. {totalPrice.toLocaleString()}</strong>
            </div>

            <button
              disabled={websiteSettingsLoading || isLoading}
              type="button"
              className={
                websiteSettingsLoading || isLoading
                  ? "burger-add-disabled-button"
                  : "burger-add-button"
              }
              onClick={handleOrderNow}
            >
              {isLoading ? "Placing Order..." : "Order Burger →"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BurgerMaker;
