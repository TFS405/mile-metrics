# MileMetrics

MileMetrics is a mileage-tracking web application built for people who regularly use a personal vehicle for work, especially gig drivers working with platforms such as DoorDash and Uber Eats.

The project is designed around more than simply recording a number. MileMetrics treats each drive as a structured record that can be logged, validated, reviewed, organized, and updated over time. The current application combines trip entry, mileage summaries, detailed record management, and contextual data in a single React interface.

## Features

* **Structured mileage logging** — Record the trip date, starting and ending odometer readings, one or more work areas, and optional notes.
* **Input validation** — Prevent future trip dates, require realistic mileage data, and ensure ending mileage is greater than the starting reading.
* **Mileage dashboard** — Review mileage totals across daily, weekly, monthly, and lifetime views.
* **Location summaries** — See the areas worked during each reporting period alongside mileage totals.
* **Detailed mileage history** — Browse records in an expandable table with dates, odometer values, calculated total miles, and locations.
* **Entry management** — Edit notes, delete records, and use confirmation flows to protect against accidental destructive actions or discarded edits.
* **Sorting controls** — Sort mileage records by date, initial mileage, ending mileage, total mileage, or location with URL-backed state.
* **Date filtering UI** — Locale-aware date controls, masked input, calendar selection, and validation are being integrated into the mileage table filtering workflow.
* **Historical weather context** — Expanded entries integrate archived weather data through Open-Meteo to provide additional context for the day a trip was recorded.
* **Responsive interface** — Tailwind CSS is used throughout the application with reusable UI components and responsive layouts.

## Engineering Highlights

MileMetrics is also a project for exploring maintainable front-end architecture and real application state management.

* **React Router** provides nested application routing and URL search-parameter state.
* **TanStack Query** manages asynchronous server state, caching, loading behavior, and cache invalidation after mutations.
* **TanStack Table** powers the expandable mileage table while keeping rendering and row behavior composable.
* **Supabase** provides persistent storage and the application's create, read, update, delete, filtering, and sorting queries.
* **React Hook Form** manages mileage-entry forms and editable record data.
* **`Intl.DateTimeFormat` + `date-fns`** support locale-aware date formatting, parsing, and validation.
* **Headless UI, Radix UI, and Floating UI** are used for accessible dialogs, popovers, and interaction primitives without coupling the application to a heavy visual component library.
* **Promise-based confirmation flows** allow destructive and state-changing actions to pause for user confirmation without scattering modal logic throughout the application.

## Architectural Decisions & Tradeoffs

### On-Demand Historical Weather Requests

Historical weather is useful as supplemental context for a mileage record, but it is not required to render the primary mileage table. Fetching weather for every record as soon as the table loads would therefore create unnecessary network traffic, particularly as a user's mileage history grows.

MileMetrics instead treats weather as **on-demand data**. Each mileage entry can own an independent TanStack Query request, but the request is only enabled when the user expands the corresponding row and actually needs the additional information.

This introduces a small delay when weather is viewed for the first time, but avoids issuing potentially dozens of Open-Meteo requests during the initial table render. Once retrieved, TanStack Query can cache the result so subsequent access to the same weather data does not necessarily require another network request.

Weather queries are identified by the values that determine the result rather than by the mileage record alone. The query key includes the trip date and geographic coordinates:

```js
["weather", date, latitude, longitude]
```

Using only the date would produce a simpler cache key, but would be incorrect when two mileage records share a date while referring to different locations. Including both temporal and geographic inputs ensures that cached weather data corresponds to the actual Open-Meteo request.

The resulting tradeoff favors **lower request volume and correct cache isolation over immediate availability of secondary data**, while preserving a responsive primary mileage workflow.

## Tech Stack

* React
* Vite
* React Router
* TanStack Query
* TanStack Table
* Supabase
* Tailwind CSS
* React Hook Form
* date-fns
* DayPicker
* Radix UI
* Headless UI
* Floating UI
* Open-Meteo
* Lucide React

## Project Structure

```text
src/
├── features/
│   ├── mileage/
│   │   ├── table/
│   │   ├── AddMilesForm.jsx
│   │   ├── MileageDisplay.jsx
│   │   └── mileageApi.js
│   └── weather/
├── hooks/
├── pages/
├── services/
├── ui/
│   ├── modals/
│   └── table/
├── utils/
├── App.jsx
└── main.jsx
```

The application is organized primarily by feature, with shared interface primitives, hooks, utilities, and external-service configuration separated into their own modules.

## Getting Started

### Prerequisites

* Node.js
* npm

### Installation

```bash
npm install
npm run dev
```

Vite will start the local development server and provide the local URL in the terminal.

Backend configuration is handled through `src/services/supabase.js`. Running the application against a different backend requires a compatible Supabase project and `Miles` table.

### Available Scripts

```bash
npm run dev      # Start the Vite development server
npm run build    # Create a production build
npm run preview  # Preview the production build locally
npm run lint     # Run ESLint
```

## Current Development

MileMetrics is under active development. Current work is focused on completing the filtering pipeline, tightening the interaction between sorting and timeframe views, improving small-screen responsiveness, and hardening external weather-data behavior.

The longer-term direction is to make mileage records increasingly useful for drivers who need a reliable history of work-related vehicle use, while continuing to improve the application's organization, reporting, and overall user experience.
