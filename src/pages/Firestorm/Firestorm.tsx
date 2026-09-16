import { useState } from "react";
import { SectionHeader } from "../../components/SectionHeader/SectionHeader";
import PizzaBuilder from "../../components/PizzaBuilder/PizzaBuilder";
import "./Firestorm.css";
import PastaMaker from "../../components/PastaMaker/PastaMaker";
import BurgerMaker from "../../components/BurgerMaker/BurgerMaker";

type Tab = {
  id: string;
  label: string;
};

const tabs: Tab[] = [
  { id: "pizza", label: "Pizza" },
  { id: "pasta", label: "Pasta" },
  { id: "burger", label: "Burger" },
];

const Firestorm = () => {
  const [activeTab, setActiveTab] = useState("pizza");

  return (
    <div className="pizza-build__main-bg">
      <SectionHeader
        label="PASTIZZA STUDIO"
        title="Build Your Own Pizza"
        description="Your pizza. Your rules. Create something delicious"
        video={false}
      />
      <div className="tabs-container">
        {/* Pills */}
        <div className="tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`tab ${activeTab === tab.id ? "active" : ""}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Sections */}
        <div className="tab-content">
          {activeTab === "pizza" && (
            <section className="tab-section">
              <PizzaBuilder />
            </section>
          )}

          {activeTab === "pasta" && (
            <section className="tab-section">
              <PastaMaker />
            </section>
          )}

          {activeTab === "burger" && (
            <section className="tab-section">
              <BurgerMaker />
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default Firestorm;
