import React, { useState } from "react";
import { Line, Bar } from "react-chartjs-2";
import './App.css';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const cities = [
  "Toronto", "Montreal", "Vancouver", "Calgary", "Ottawa",
  "Edmonton", "Winnipeg", "Quebec City", "Halifax", "Saskatoon",
  "Victoria", "St. John's", "Regina", "Charlottetown", "Whitehorse"
];

const months = [
  "2024-07", "2024-08", "2024-09", "2024-10", "2024-11", "2024-12",
  "2025-01", "2025-02", "2025-03", "2025-04", "2025-05", "2025-06"
];

const rentData = Object.fromEntries(cities.map(city => [city, Array(12).fill().map(() => +(Math.random() * 1000 + 1000).toFixed(2))]));
const groceryData = Object.fromEntries(cities.map(city => [city, Array(12).fill().map(() => +(Math.random() * 100 + 300).toFixed(2))]));
const utilitiesData = Object.fromEntries(cities.map(city => [city, Array(12).fill().map(() => +(Math.random() * 60 + 80).toFixed(2))]));

const translations = {
  en: {
    title: "Cost of Living Dashboard",
    selectCity: "Select City:",
    rentTitle: "Monthly Rent Trend",
    rentDesc: "Shows average rent per month for the selected city.",
    groceryTitle: "Average Grocery Cost by City",
    groceryDesc: "Compares the average grocery cost across all cities.",
    utilitiesTitle: "Monthly Utilities Trend",
    utilitiesDesc: "Displays estimated monthly utility costs for the selected city.",
    groceryLabel: "Grocery Cost (CAD/month)",
    footerNote: "Note: All data is synthetic and generated for academic purposes only. All values are in Canadian dollars (CAD).",
    rentLabel: (city) => `Rent in ${city} (CAD/month)`,
    utilitiesLabel: (city) => `Utilities in ${city} (CAD/month)`
  },
  fr: {
    title: "Tableau du Coût de la Vie",
    selectCity: "Sélectionnez une ville :",
    rentTitle: "Tendance du Loyer Mensuel",
    rentDesc: "Affiche le loyer moyen par mois pour la ville choisie.",
    groceryTitle: "Coût Moyen des Épiceries par Ville",
    groceryDesc: "Compare le coût moyen des épiceries entre les villes.",
    utilitiesTitle: "Tendance des Coûts des Services Publics",
    utilitiesDesc: "Affiche les coûts mensuels estimés des services publics pour la ville choisie.",
    groceryLabel: "Coût de l’épicerie (CAD/mois)",
    footerNote: "Remarque : Les données sont synthétiques et générées à des fins éducatives. Toutes les valeurs sont en dollars canadiens (CAD).",
    rentLabel: (city) => `Loyer à ${city} (CAD/mois)`,
    utilitiesLabel: (city) => `Services à ${city} (CAD/mois)`
  }
};

export default function Dashboard() {
  const [selectedCity, setSelectedCity] = useState("Toronto");
  const [language, setLanguage] = useState("en");
  const t = translations[language];

  const rentChart = {
    labels: months,
    datasets: [
      {
        label: t.rentLabel(selectedCity),
        data: rentData[selectedCity],
        borderColor: "#3B82F6",
        backgroundColor: "rgba(59, 130, 246, 0.5)",
        fill: true,
      },
    ],
  };

  const groceryChart = {
    labels: cities,
    datasets: [
      {
        label: t.groceryLabel,
        data: cities.map(
          (city) => groceryData[city].reduce((a, b) => a + b, 0) / groceryData[city].length
        ),
        backgroundColor: cities.map(
          (city) => (city === selectedCity ? "#10B981" : "#E5E7EB")
        ),
      },
    ],
  };

  const utilitiesChart = {
    labels: months,
    datasets: [
      {
        label: t.utilitiesLabel(selectedCity),
        data: utilitiesData[selectedCity],
        borderColor: "#F97316",
        backgroundColor: "rgba(249, 115, 22, 0.5)",
        fill: true,
      },
    ],
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-3xl font-bold">
          {t.title}
        </h1>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="p-1 border rounded"
        >
          <option value="en">English (CA)</option>
          <option value="fr">Français (CA)</option>
        </select>
      </div>

      <p className="text-center text-sm text-gray-500 mb-6">
        {t.footerNote}
      </p>

      <div className="flex justify-start gap-4 mb-6">
        <label htmlFor="city" className="text-lg font-medium">
          {t.selectCity}
        </label>
        <select
          id="city"
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
          className="p-2 border rounded"
        >
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-2 text-center">
          {t.rentTitle}
        </h2>
        <p className="text-center text-sm text-gray-600 mb-4">{t.rentDesc}</p>
        <Line data={rentChart} />
      </div>

      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-2 text-center">
          {t.utilitiesTitle}
        </h2>
        <p className="text-center text-sm text-gray-600 mb-4">{t.utilitiesDesc}</p>
        <Line data={utilitiesChart} />
      </div>

      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-2 text-center">
          {t.groceryTitle}
        </h2>
        <p className="text-center text-sm text-gray-600 mb-4">{t.groceryDesc}</p>
        <Bar data={groceryChart} />
      </div>
    </div>
  );
}
