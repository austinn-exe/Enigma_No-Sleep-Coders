OilLoop

Team Name: No Sleep Coders

Team Members

Akshaya Dhurai

Ramya Iyer

Vedika Chaudhari

Austin Dhason

Problem Statement

Used cooking oil is often disposed of improperly or discarded as waste,
which can cause environmental problems and results in the loss of a
potentially useful raw material.

OilLoop is designed as a digital platform for creating a circular system
for used cooking oil. The platform connects oil suppliers, collectors,
and processing partners so that collected oil can be tracked and
directed toward suitable reuse and processing applications.

The system aims to:

Make used cooking oil collection easier to manage.

Connect suppliers with collectors.

Help collectors track and manage collected oil.

Provide future availability predictions based on collection history.

Show the environmental impact of recovered oil.

Classify and present possible uses of recovered oil.

Support the conversion of waste oil into useful products such as:

Soap

Candles

Grease

Bioplastics

Resins

Surfactants

Renewable diesel

Industrial fuel

Oleochemicals

Tech Stack

Frontend

React.js --- User interface and component-based application
structure.

Vite --- Frontend development server and build tool.

JavaScript (ES6+) --- Application logic.

HTML5 --- Application structure.

CSS3 --- Styling, responsive layouts, dashboards, charts, and
visual components.

Development Tools

Node.js --- JavaScript runtime.

npm --- Package and dependency management.

Git / GitHub --- Version control and project collaboration.

Main Modules

Supplier Dashboard

Allows suppliers to manage their used cooking oil collection information
and track collection activity.

Collector Dashboard

Provides collectors with:

Collection requests.

Collection status.

Supplier information.

Future availability prediction.

Collection history.

Partner Dashboard

Provides a view for processing partners to work with recovered oil and
its potential applications.

Impact Dashboard

Displays the environmental and collection impact of OilLoop, including
visual summaries of recovered oil.

Oil Uses Dashboard

Provides a dedicated view of potential applications for recovered oil,
including:

Soap

Candles

Grease

Bioplastics

Resins

Surfactants

Renewable diesel

Industrial fuel

Oleochemicals

Setup Instructions

Prerequisites

Install the following before running the project:

Node.js

npm

Git (optional, for version control)

Check the installations:

node --version
npm --version

1. Download or Clone the Project

Using Git:

git clone <repository-url>

Then enter the project directory:

cd OilLoop

If you downloaded the ZIP file, extract it and open the extracted
project folder in VS Code.

2. Install Dependencies

Open a terminal inside the project folder and run:

npm install

This installs all dependencies listed in package.json.

3. Start the Development Server

Run:

npm run dev

Vite will start the development server and display a local URL similar
to:

http://localhost:5173/

Open that URL in your browser.

Project Structure

A typical project structure is:

OilLoop/
│
├── public/
│
├── src/
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

The exact structure may vary depending on the current version of the
project.

Running the Project

The basic workflow is:

npm install
npm run dev

Then open the Vite URL shown in the terminal.

For a production build:

npm run build

To preview the production build locally:

npm run preview

Application Flow

Supplier
   ↓
Used Cooking Oil Collection
   ↓
Collector
   ↓
Oil Tracking & Availability Prediction
   ↓
Processing / Partner
   ↓
Potential Oil Uses
   ↓
Environmental Impact

Future Scope

Possible future improvements include:

Backend API integration.

Database integration.

User authentication and role-based access.

Real-time collection tracking.

Laboratory-based oil quality testing.

AI-assisted oil classification.

More advanced availability prediction.

Collection route optimization.

Automated notifications.

Production and processing partner integration.

Real-world environmental impact calculations.

License

This project is developed as a prototype/project demonstration for the
OilLoop initiative.