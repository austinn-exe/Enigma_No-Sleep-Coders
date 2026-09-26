# ♻️ OilLoop

> **A digital circular-economy platform for collecting, tracking, and
> repurposing used cooking oil.**

------------------------------------------------------------------------

## 👥 Team

### Team Name

# **No Sleep Coders**

### Team Members

  Name
  ----------------------
  **Akshaya Dhurai**
  **Ramya Iyer**
  **Vedika Chaudhari**
  **Austin Dhason**

------------------------------------------------------------------------

## 📌 Problem Statement

Used cooking oil is often disposed of improperly or treated as waste.
This can create environmental problems while also wasting a valuable raw
material that can be processed into useful products.

**OilLoop** provides a digital platform that connects **suppliers,
collectors, and processing partners** to create a more organized
circular system for used cooking oil.

The platform helps track collected oil, predict future availability,
visualize environmental impact, and identify possible applications for
recovered oil.

### Our Goals

-   ♻️ Reduce improper disposal of used cooking oil.
-   🤝 Connect oil suppliers with collectors.
-   🚚 Help collectors manage collection activities.
-   📊 Track the amount of oil recovered.
-   📈 Predict future oil availability using collection history.
-   🌱 Visualize the environmental impact of oil recovery.
-   🧪 Support the classification and routing of collected oil.
-   🔄 Promote the reuse of oil as a valuable industrial resource.

------------------------------------------------------------------------

# 🚀 Key Features

## 🏪 Supplier Dashboard

Suppliers can:

-   Add used cooking oil collection information.
-   Track collection requests.
-   Monitor the status of their oil batches.
-   View relevant supplier information.

------------------------------------------------------------------------

## 🚛 Collector Dashboard

The Collector dashboard helps manage the collection process.

### Features include:

-   View pending collection requests.
-   Track suppliers and collection batches.
-   Manage collection status.
-   View collection history.
-   **Future availability prediction** based on previous collection
    data.

The prediction visualization provides an overview of the expected oil
volume that may become available in the future.

------------------------------------------------------------------------

## 🏭 Partner Dashboard

The Partner section represents the processing side of the OilLoop
ecosystem.

Recovered oil can be directed toward different processing applications
depending on its properties and intended use.

------------------------------------------------------------------------

## 🌱 Impact Dashboard

The Impact dashboard provides visual insights into the amount of oil
recovered through the platform.

It includes:

-   Total oil collected.
-   Collection statistics.
-   Supplier-type collection breakdown.
-   Visual impact charts.
-   Recovered-oil metrics.

------------------------------------------------------------------------

## 🧴 Oil Uses Dashboard

OilLoop includes a separate dashboard showing possible applications of
recovered oil.

### Possible Uses

  Application               Example Purpose
  ------------------------- --------------------------------------
  🧼 **Soap**               Soap and cleaning products
  🕯️ **Candles**            Candle and wax-related products
  ⚙️ **Grease**             Industrial and mechanical grease
  🧪 **Bioplastics**        Bio-based material production
  🧴 **Resins**             Resin and polymer applications
  🫧 **Surfactants**        Cleaning and chemical products
  ⛽ **Renewable Diesel**   Renewable transportation fuel
  🏭 **Industrial Fuel**    Industrial energy applications
  🧬 **Oleochemicals**      Chemical and industrial applications

> **Note:** Actual suitability of collected oil for a specific
> application depends on its quality, composition, treatment
> requirements, and laboratory/process validation.

------------------------------------------------------------------------

# 🛠️ Tech Stack

## Frontend

  Technology              Purpose
  ----------------------- -----------------------------------
  **React.js**            Building the user interface
  **Vite**                Development server and build tool
  **JavaScript (ES6+)**   Application logic
  **HTML5**               Page structure
  **CSS3**                Styling and responsive design

## Development Tools

-   **Node.js** --- JavaScript runtime
-   **npm** --- Dependency management
-   **Git** --- Version control
-   **GitHub** --- Repository and collaboration

------------------------------------------------------------------------

# 📂 Project Structure

``` text
OilLoop/
│
├── public/
│
├── src/
│   │
│   ├── components/
│   │   ├── Home.jsx
│   │   ├── Supplier.jsx
│   │   ├── Collector.jsx
│   │   ├── Partner.jsx
│   │   ├── Impact.jsx
│   │   └── OilUses.jsx
│   │
│   ├── context/
│   │   └── StoreContext.jsx
│   │
│   ├── utils/
│   │   └── logic.js
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── package.json
├── vite.config.js
└── README.md
```

> The exact structure may change as the project develops.

------------------------------------------------------------------------

# 💻 Setup & Installation

## Prerequisites

Make sure you have installed:

-   [Node.js](https://nodejs.org/)
-   npm
-   Git *(optional if downloading the ZIP)*

Check your installation:

``` bash
node --version
npm --version
```

------------------------------------------------------------------------

## 1️⃣ Clone the Repository

Open your terminal and run:

``` bash
git clone https://github.com/austinn-exe/Enigma_No-Sleep-Coders.git
```

Then move into the project directory:

``` bash
cd Enigma_No-Sleep-Coders
```

------------------------------------------------------------------------

## 2️⃣ Install Dependencies

Run:

``` bash
npm install
```

This installs all packages required by the project.

------------------------------------------------------------------------

## 3️⃣ Start the Development Server

Run:

``` bash
npm run dev
```

You should see a local URL similar to:

``` text
http://localhost:5173/
```

Open the URL in your browser.

------------------------------------------------------------------------

# 🔄 Application Flow

``` text
                ┌──────────────────┐
                │     SUPPLIER     │
                │ Used Cooking Oil │
                └────────┬─────────┘
                         │
                         ▼
                ┌──────────────────┐
                │    COLLECTOR     │
                │ Pickup & Tracking│
                └────────┬─────────┘
                         │
                         ▼
                ┌──────────────────┐
                │   OIL TESTING    │
                │ & CLASSIFICATION │
                └────────┬─────────┘
                         │
                         ▼
                ┌──────────────────┐
                │    PARTNERS      │
                │ Processing / Use │
                └────────┬─────────┘
                         │
                         ▼
              ┌──────────────────────┐
              │     OIL USES         │
              │                      │
              │ Soap • Candles       │
              │ Grease • Bioplastics │
              │ Resins • Surfactants │
              │ Renewable Diesel    │
              │ Industrial Fuel     │
              │ Oleochemicals       │
              └──────────────────────┘
                         │
                         ▼
                ┌──────────────────┐
                │      IMPACT      │
                │ Environmental &  │
                │ Collection Data  │
                └──────────────────┘
```

------------------------------------------------------------------------

# ▶️ Running the Project

### Development

``` bash
npm install
npm run dev
```

### Production Build

``` bash
npm run build
```

### Preview Production Build

``` bash
npm run preview
```

------------------------------------------------------------------------

# 🔮 Future Scope

The current project is a frontend prototype. Future versions can
include:

-   🔐 User authentication and role-based access.
-   🗄️ Backend API and database integration.
-   🧪 Real laboratory-based oil quality testing.
-   🤖 AI-assisted oil classification.
-   📍 GPS-based collection tracking.
-   🗺️ Collection route optimization.
-   📈 More advanced availability prediction.
-   🔔 Automated notifications for suppliers and collectors.
-   🏭 Integration with real processing partners.
-   🌍 More detailed environmental impact calculations.
-   📱 Mobile application support.

------------------------------------------------------------------------

# 🌍 Vision

**OilLoop aims to turn used cooking oil from a waste product into a
valuable resource by connecting collection, processing, and reuse
through a single digital platform.**

> **Collect → Track → Classify → Process → Reuse → Create Impact ♻️**

------------------------------------------------------------------------

## 📄 License

This project is developed as a prototype/project demonstration by **No
Sleep Coders**.
