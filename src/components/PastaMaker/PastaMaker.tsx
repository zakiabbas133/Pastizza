import { useMemo, useState } from "react";
import { useGetWebsiteSettingsQuery } from "../../services/websiteSettingsApi";
import {
  usePlaceOrderMutation,
  type PlaceOrderType,
} from "../../services/ordersApi";
import { toast } from "react-toastify";
import "./PastaMaker.css";

type Option = {
  id: string;
  name: string;
  price: number;
  image?: string;
};

const pastaSizes: Option[] = [
  {
    id: "regular",
    name: "Regular",
    price: 699,
  },
  {
    id: "large",
    name: "Large",
    price: 999,
  },
  {
    id: "family",
    name: "Family",
    price: 1499,
  },
];

const pastaTypes: Option[] = [
  {
    id: "penne",
    name: "Penne",
    price: 0,
    image: "/firestorm/pasta-penne.png",
  },
  {
    id: "spaghetti",
    name: "Spaghetti",
    price: 0,
    image: "/firestorm/pasta-spaghetti.png",
  },
  {
    id: "fettuccine",
    name: "Fettuccine",
    price: 50,
    image: "/firestorm/pasta-fettuccine.png",
  },
  {
    id: "fusilli",
    name: "Fusilli",
    price: 50,
    image: "/firestorm/pasta-fusilli.png",
  },
  {
    id: "macaroni",
    name: "Macaroni",
    price: 0,
    image: "/firestorm/pasta-macaroni.png",
  },
];

const sauces: Option[] = [
  {
    id: "alfredo",
    name: "Creamy Alfredo",
    price: 100,
  },
  {
    id: "pink",
    name: "Pink Sauce",
    price: 100,
  },
  {
    id: "arrabbiata",
    name: "Arrabbiata",
    price: 70,
  },
  {
    id: "creamy-garlic",
    name: "Creamy Garlic",
    price: 100,
  },
  {
    id: "mushroom-cream",
    name: "Mushroom Cream",
    price: 130,
  },
  {
    id: "pakistani-spicy",
    name: "Pakistani Spicy",
    price: 80,
  },
  {
    id: "pesto",
    name: "Pesto",
    price: 150,
  },
  {
    id: "cheese",
    name: "Cheese Sauce",
    price: 120,
  },
];

const proteins: Option[] = [
  {
    id: "chicken",
    name: "Chicken",
    price: 150,
    image: "/firestorm/chicken.png",
  },
  {
    id: "beef",
    name: "Beef",
    price: 200,
    image: "/firestorm/beef.png",
  },
  {
    id: "seekh-kebab",
    name: "Seekh Kebab",
    price: 220,
    image: "/firestorm/beef.png",
  },
  {
    id: "sausage",
    name: "Sausage",
    price: 160,
    image: "/firestorm/sausage.png",
  },
  {
    id: "pepperoni",
    name: "Pepperoni",
    price: 180,
    image: "/firestorm/pepperoni.png",
  },
  {
    id: "shrimp",
    name: "Shrimp",
    price: 280,
    image: "/firestorm/shrimp.png",
  },
];

const vegetables: Option[] = [
  {
    id: "mushrooms",
    name: "Mushrooms",
    price: 80,
    image: "/firestorm/mushrooms.png",
  },
  {
    id: "olives",
    name: "Olives",
    price: 70,
    image: "/firestorm/olive.png",
  },
  {
    id: "jalapenos",
    name: "Jalapeños",
    price: 60,
    image: "/firestorm/chili.png",
  },
  {
    id: "onions",
    name: "Onions",
    price: 50,
    image: "/firestorm/onion.png",
  },
  {
    id: "capsicum",
    name: "Capsicum",
    price: 60,
    image: "/firestorm/green-pepper.png",
  },
  {
    id: "tomatoes",
    name: "Tomatoes",
    price: 60,
    image: "/firestorm/tomato.png",
  },
  {
    id: "corn",
    name: "Sweet Corn",
    price: 70,
    image: "/firestorm/corn.png",
  },
  {
    id: "black-olives",
    name: "Black Olives",
    price: 80,
    image: "/firestorm/black-olive.png",
  },
  {
    id: "spinach",
    name: "Spinach",
    price: 60,
    image: "/firestorm/spinach.png",
  },
  {
    id: "broccoli",
    name: "Broccoli",
    price: 80,
    image: "/firestorm/broccoli.png",
  },
];

const cheeses: Option[] = [
  {
    id: "mozzarella",
    name: "Mozzarella",
    price: 120,
    image: "/firestorm/mozzarella.png",
  },
  {
    id: "cheddar",
    name: "Cheddar",
    price: 130,
    image: "/firestorm/cheese.png",
  },
  {
    id: "parmesan",
    name: "Parmesan",
    price: 180,
    image: "/firestorm/parmesan.png",
  },
  {
    id: "extra-cheese",
    name: "Extra Cheese",
    price: 150,
    image: "/firestorm/cheese.png",
  },
];

const extras: Option[] = [
  {
    id: "garlic",
    name: "Fresh Garlic",
    price: 40,
    image: "/firestorm/garlic.png",
  },
  {
    id: "garlic-butter",
    name: "Garlic Butter",
    price: 60,
    image: "/firestorm/garlic.png",
  },
  {
    id: "cream",
    name: "Extra Cream",
    price: 60,
  },
  {
    id: "butter",
    name: "Butter",
    price: 40,
  },
  {
    id: "oregano",
    name: "Oregano",
    price: 20,
  },
  {
    id: "chili-flakes",
    name: "Chili Flakes",
    price: 20,
    image: "/firestorm/chili.png",
  },
  {
    id: "black-pepper",
    name: "Black Pepper",
    price: 20,
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

const pastaColors: Record<string, string> = {
  penne: "#e5b45a",
  spaghetti: "#e8c66b",
  fettuccine: "#efd47d",
  fusilli: "#dfad4e",
  macaroni: "#e7b75b",
};

const PastaMaker = () => {
  const [placeOrder, { isLoading }] = usePlaceOrderMutation();

  const { data: websiteSettings = null, isLoading: websiteSettingsLoading } =
    useGetWebsiteSettingsQuery();

  const [selectedSize, setSelectedSize] = useState("regular");
  const [selectedPasta, setSelectedPasta] = useState("penne");
  const [selectedSauce, setSelectedSauce] = useState("alfredo");

  const [selectedProteins, setSelectedProteins] = useState<string[]>([
    "chicken",
  ]);

  const [selectedVegetables, setSelectedVegetables] = useState<string[]>([
    "mushrooms",
    "capsicum",
  ]);

  const [selectedCheeses, setSelectedCheeses] = useState<string[]>([
    "mozzarella",
  ]);

  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);

  const [selectedSpice, setSelectedSpice] = useState("medium");

  const [quantity, setQuantity] = useState(1);

  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const size =
    pastaSizes.find((item) => item.id === selectedSize) || pastaSizes[0];

  const pasta =
    pastaTypes.find((item) => item.id === selectedPasta) || pastaTypes[0];

  const sauce = sauces.find((item) => item.id === selectedSauce) || sauces[0];

  const spice =
    spiceLevels.find((item) => item.id === selectedSpice) || spiceLevels[0];

  const selectedProteinObjects = proteins.filter((item) =>
    selectedProteins.includes(item.id),
  );

  const selectedVegetableObjects = vegetables.filter((item) =>
    selectedVegetables.includes(item.id),
  );

  const selectedCheeseObjects = cheeses.filter((item) =>
    selectedCheeses.includes(item.id),
  );

  const selectedExtraObjects = extras.filter((item) =>
    selectedExtras.includes(item.id),
  );

  const totalPrice = useMemo(() => {
    const proteinPrice = selectedProteinObjects.reduce(
      (total, item) => total + item.price,
      0,
    );

    const vegetablePrice = selectedVegetableObjects.reduce(
      (total, item) => total + item.price,
      0,
    );

    const cheesePrice = selectedCheeseObjects.reduce(
      (total, item) => total + item.price,
      0,
    );

    const extrasPrice = selectedExtraObjects.reduce(
      (total, item) => total + item.price,
      0,
    );

    return (
      (size.price +
        pasta.price +
        sauce.price +
        spice.price +
        proteinPrice +
        vegetablePrice +
        cheesePrice +
        extrasPrice) *
      quantity
    );
  }, [
    size,
    pasta,
    sauce,
    spice,
    selectedProteinObjects,
    selectedVegetableObjects,
    selectedCheeseObjects,
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

    return `*New Custom Pasta Order*

Assalamualaikum Pastizza!

I'd like to order a *Build Your Own Pasta*:

*Customer Name:* ${fullName}
*Phone:* ${phoneNumber}

*Portion:* ${order.size}
*Pasta:* ${order.crust}
*Sauce:* ${order.sauce}

*Customizations:*
${toppingsText}

*Quantity:* ${order.orderQuantity}

*Total:* Rs. ${order.totalPrice.toLocaleString()}

Please confirm my order.

Thank you!`;
  };

  const handleWhatsAppOrder = (order: PlaceOrderType) => {
    const message = createWhatsAppMessage(order);

    const whatsappUrl = `${
      websiteSettings?.whatsappUrl
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
        `Pasta: ${pasta.name}`,
        `Spice: ${spice.name}`,

        selectedProteinObjects.length
          ? `Protein: ${selectedProteinObjects
              .map((item) => item.name)
              .join(", ")}`
          : "Protein: None",

        selectedVegetableObjects.length
          ? `Vegetables: ${selectedVegetableObjects
              .map((item) => item.name)
              .join(", ")}`
          : "Vegetables: None",

        selectedCheeseObjects.length
          ? `Cheese: ${selectedCheeseObjects
              .map((item) => item.name)
              .join(", ")}`
          : "Cheese: None",

        selectedExtraObjects.length
          ? `Extras: ${selectedExtraObjects
              .map((item) => item.name)
              .join(", ")}`
          : "Extras: None",
      ];

      const toppingsPayload = customizationParts.join(", ");

      const formData = new FormData();

      formData.append("orderType", "Pasta");
      formData.append("fullName", trimmedName);
      formData.append("phoneNumber", trimmedPhone);

      formData.append("size", String(size.name));

      // Existing backend contract uses "crust".
      // For pasta we store the pasta shape here.
      formData.append("crust", String(pasta.name));

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
      console.error("Failed to place pasta order:", error);

      toast("Unable to place order. Please try again later.", {
        position: "top-right",
        autoClose: 3000,
        theme: "light",
        type: "error",
      });
    }
  };

  const previewToppings = [
    ...selectedProteinObjects,
    ...selectedVegetableObjects,
    ...selectedCheeseObjects,
  ];

  return (
    <div className="pasta-maker">
      <div className="pasta-maker__layout">
        {/* =========================================
            PREVIEW
        ========================================== */}

        <div className="pasta-preview">
          <div className="pasta-preview__stage">
            <div className="pasta-preview__glow" />

            <div
              className={`pasta-bowl pasta-bowl--${selectedPasta}`}
              style={
                {
                  "--pasta-color": pastaColors[selectedPasta] || "#e5b45a",
                } as React.CSSProperties
              }
            >
              <div className="pasta-bowl__rim">
                <div className="pasta-bowl__inside">
                  <div className="pasta-preview__sauce" />

                  <div className="pasta-noodles">
                    {Array.from({ length: 22 }).map((_, index) => (
                      <span
                        key={index}
                        className="pasta-noodle"
                        style={
                          {
                            "--i": index,
                          } as React.CSSProperties
                        }
                      />
                    ))}
                  </div>

                  {previewToppings.map((item, index) => {
                    const positions = [
                      { top: "25%", left: "38%" },
                      { top: "32%", left: "60%" },
                      { top: "42%", left: "25%" },
                      { top: "43%", left: "72%" },
                      { top: "54%", left: "35%" },
                      { top: "55%", left: "60%" },
                      { top: "68%", left: "48%" },
                      { top: "30%", left: "75%" },
                      { top: "68%", left: "72%" },
                      { top: "66%", left: "25%" },
                      { top: "45%", left: "50%" },
                      { top: "23%", left: "55%" },
                    ];

                    const position = positions[index % positions.length];

                    if (!item.image) return null;

                    return (
                      <img
                        key={`${item.id}-${index}`}
                        className="pasta-topping"
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

                  <div className="pasta-herbs">
                    <span />
                    <span />
                    <span />
                    <span />
                    <span />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="pasta-preview__details">
            <h2>Your Pasta</h2>

            <div className="pasta-preview__summary">
              <span>{size.name}</span>
              <span>•</span>
              <span>{pasta.name}</span>
              <span>•</span>
              <span>{sauce.name}</span>
            </div>

            <div className="pasta-preview__selected">
              {previewToppings.length > 0
                ? previewToppings.map((item) => item.name).join(", ")
                : "Build your pasta with your favourite ingredients"}
            </div>
          </div>
        </div>

        {/* =========================================
            CONTROLS
        ========================================== */}

        <div className="pasta-controls">
          {/* SIZE */}

          <section className="pasta-section">
            <h3>01. Choose your portion</h3>

            <div className="pasta-size-grid">
              {pastaSizes.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={`pasta-size ${
                    selectedSize === item.id ? "pasta-size--active" : ""
                  }`}
                  onClick={() => setSelectedSize(item.id)}
                >
                  <strong>{item.name}</strong>

                  <span>
                    {item.id === "regular"
                      ? "Perfect for one"
                      : item.id === "large"
                        ? "Hungry mode"
                        : "Made for sharing"}
                  </span>

                  <b>Rs. {item.price.toLocaleString()}</b>
                </button>
              ))}
            </div>
          </section>

          {/* PASTA TYPE */}

          <section className="pasta-section">
            <h3>02. Choose your pasta</h3>

            <div className="pasta-options-grid">
              {pastaTypes.map((item) => {
                const isSelected = selectedPasta === item.id;

                return (
                  <button
                    key={item.id}
                    type="button"
                    className={`pasta-option ${
                      isSelected ? "pasta-option--selected" : ""
                    }`}
                    onClick={() => setSelectedPasta(item.id)}
                  >
                    {item.image && (
                      <img
                        src={item.image}
                        alt=""
                        className="pasta-option__image"
                      />
                    )}

                    <div className="pasta-option__content">
                      <span className="pasta-option__name">{item.name}</span>

                      <span className="pasta-option__price">
                        {item.price === 0 ? "Included" : `+ Rs. ${item.price}`}
                      </span>
                    </div>

                    <span className="pasta-option__check">
                      {isSelected ? "✓" : ""}
                    </span>
                  </button>
                );
              })}
            </div>
          </section>

          {/* SAUCE */}

          <section className="pasta-section">
            <h3>03. Pick your sauce</h3>

            <div className="pasta-sauce-grid">
              {sauces.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={`pasta-sauce ${
                    selectedSauce === item.id ? "pasta-sauce--active" : ""
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

          {/* PROTEIN */}

          <section className="pasta-section">
            <div className="pasta-section__header">
              <div>
                <span className="pasta-section__eyebrow">MAKE IT HEARTY</span>

                <h3>04. Add protein</h3>
              </div>

              <button
                type="button"
                className="pasta-select-all"
                onClick={() =>
                  setSelectedProteins(
                    selectedProteins.length === proteins.length
                      ? []
                      : proteins.map((item) => item.id),
                  )
                }
              >
                {selectedProteins.length === proteins.length
                  ? "Remove All"
                  : "Select All"}
              </button>
            </div>

            <div className="pasta-toppings-grid">
              {proteins.map((item) => {
                const selected = selectedProteins.includes(item.id);

                return (
                  <button
                    key={item.id}
                    type="button"
                    className={`pasta-topping-card ${
                      selected ? "pasta-topping-card--active" : ""
                    }`}
                    onClick={() => toggleItem(item.id, setSelectedProteins)}
                  >
                    {item.image && <img src={item.image} alt="" />}

                    <span className="pasta-topping-card__name">
                      {item.name}
                    </span>

                    <span className="pasta-topping-card__price">
                      + Rs. {item.price}
                    </span>

                    <span className="pasta-topping-card__check">
                      {selected ? "✓" : "+"}
                    </span>
                  </button>
                );
              })}
            </div>
          </section>

          {/* VEGETABLES */}

          <section className="pasta-section">
            <div className="pasta-section__header">
              <div>
                <span className="pasta-section__eyebrow">FRESH & CRUNCHY</span>

                <h3>05. Add vegetables</h3>
              </div>

              <button
                type="button"
                className="pasta-select-all"
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

            <div className="pasta-toppings-grid">
              {vegetables.map((item) => {
                const selected = selectedVegetables.includes(item.id);

                return (
                  <button
                    key={item.id}
                    type="button"
                    className={`pasta-topping-card ${
                      selected ? "pasta-topping-card--active" : ""
                    }`}
                    onClick={() => toggleItem(item.id, setSelectedVegetables)}
                  >
                    {item.image && <img src={item.image} alt="" />}

                    <span className="pasta-topping-card__name">
                      {item.name}
                    </span>

                    <span className="pasta-topping-card__price">
                      + Rs. {item.price}
                    </span>

                    <span className="pasta-topping-card__check">
                      {selected ? "✓" : "+"}
                    </span>
                  </button>
                );
              })}
            </div>
          </section>

          {/* CHEESE */}

          <section className="pasta-section">
            <div className="pasta-section__header">
              <div>
                <span className="pasta-section__eyebrow">CHEESY FINISH</span>

                <h3>06. Choose your cheese</h3>
              </div>
            </div>

            <div className="pasta-toppings-grid">
              {cheeses.map((item) => {
                const selected = selectedCheeses.includes(item.id);

                return (
                  <button
                    key={item.id}
                    type="button"
                    className={`pasta-topping-card ${
                      selected ? "pasta-topping-card--active" : ""
                    }`}
                    onClick={() => toggleItem(item.id, setSelectedCheeses)}
                  >
                    {item.image && <img src={item.image} alt="" />}

                    <span className="pasta-topping-card__name">
                      {item.name}
                    </span>

                    <span className="pasta-topping-card__price">
                      + Rs. {item.price}
                    </span>

                    <span className="pasta-topping-card__check">
                      {selected ? "✓" : "+"}
                    </span>
                  </button>
                );
              })}
            </div>
          </section>

          {/* SPICE */}

          <section className="pasta-section">
            <h3>07. How spicy?</h3>

            <div className="pasta-spice-grid">
              {spiceLevels.map((item) => {
                const selected = selectedSpice === item.id;

                return (
                  <button
                    key={item.id}
                    type="button"
                    className={`pasta-spice ${
                      selected ? "pasta-spice--active" : ""
                    }`}
                    onClick={() => setSelectedSpice(item.id)}
                  >
                    <span className="pasta-spice__dots">
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

          <section className="pasta-section">
            <div className="pasta-section__header">
              <div>
                <span className="pasta-section__eyebrow">FINAL TOUCH</span>

                <h3>08. Add extras</h3>
              </div>

              <button
                type="button"
                className="pasta-select-all"
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

            <div className="pasta-extra-grid">
              {extras.map((item) => {
                const selected = selectedExtras.includes(item.id);

                return (
                  <button
                    key={item.id}
                    type="button"
                    className={`pasta-extra ${
                      selected ? "pasta-extra--active" : ""
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

          <section className="pasta-section">
            <h3>09. Quantity</h3>

            <div className="pasta-quantity">
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

          <section className="pasta-section pasta-customer-section">
            <div className="pasta-section__header">
              <div>
                <span className="pasta-customer-eyebrow">ALMOST THERE</span>

                <h3>10. Your details</h3>
              </div>
            </div>

            <p className="pasta-customer-description">
              Tell us where to reach you so we can confirm your custom pasta.
            </p>

            <div className="pasta-customer-fields">
              <div className="pasta-input-group">
                <label htmlFor="pasta-full-name">Full Name</label>

                <div className="pasta-input-wrapper">
                  <span className="pasta-input-icon">
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
                    id="pasta-full-name"
                    type="text"
                    value={fullName}
                    onChange={(event) => setFullName(event.target.value)}
                    placeholder="Enter your full name"
                    autoComplete="name"
                    maxLength={100}
                  />
                </div>
              </div>

              <div className="pasta-input-group">
                <label htmlFor="pasta-phone-number">Phone Number</label>

                <div className="pasta-input-wrapper">
                  <span className="pasta-input-icon">
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
                    id="pasta-phone-number"
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

          <div className="pasta-checkout">
            <div>
              <span>Total</span>

              <strong>Rs. {totalPrice.toLocaleString()}</strong>
            </div>

            <button
              disabled={websiteSettingsLoading || isLoading}
              type="button"
              className={
                websiteSettingsLoading || isLoading
                  ? "pasta-add-disabled-button"
                  : "pasta-add-button"
              }
              onClick={handleOrderNow}
            >
              {isLoading ? "Placing Order..." : "Order Pasta →"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PastaMaker;
