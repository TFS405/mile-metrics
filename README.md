# MileMetrics

MileMetrics is a mileage-tracking web application for people who regularly use a personal vehicle for work, especially gig drivers working with platforms such as DoorDash and Uber Eats.

Rather than treating mileage as a single number, MileMetrics treats each drive as a structured record that can include a trip date, starting and ending odometer readings, one or more structured locations, mileage categories, and optional notes.

The project is under active development and is also used to explore reusable front-end architecture, accessible interaction patterns, server-state management, form design, and data-driven UI behavior.

## Features

- **Structured mileage entry** — Capture trip dates, starting and ending odometer readings, locations, mileage categories, and notes.
- **Dependent geographic selection** — Build locations through a country → region → locality hierarchy.
- **Multiple location entries** — Add additional location blocks dynamically using React Hook Form field arrays.
- **Mileage categories** — Choose Personal, Business, Charity, or enter a custom category.
- **Keyboard-aware tile navigation** — Custom focus handling allows keyboard movement between predefined radio tiles and the custom text-entry tile.
- **Mileage summaries** — Review daily, weekly, monthly, and lifetime mileage totals.
- **Location summaries** — Review worked locations alongside mileage totals for each reporting period.
- **Detailed mileage history** — Browse mileage records through an expandable TanStack Table interface.
- **Entry editing and deletion** — Update record notes, delete entries, and protect state-changing actions with confirmation flows.
- **Sorting controls** — Sort mileage records by date, initial mileage, ending mileage, total mileage, or location using URL search parameters.
- **Date filtering controls** — Masked date inputs, calendar selection, validation, and URL-backed date parameters are implemented in the table UI while the final filtering pipeline is still being connected.
- **Historical weather context** — Mileage detail rows display archived weather information retrieved from Open-Meteo.
- **Reusable UI primitives** — Shared buttons, selectors, date controls, popovers, form fields, radio tiles, and table controls are separated from feature-specific components.

## Engineering Highlights

- **React Router** handles application routing and URL-backed sorting and filtering state.
- **TanStack Query** manages mileage and weather server state, caching, loading states, and query refresh behavior.
- **TanStack Table** provides composable table rows, cells, and expandable record behavior.
- **Supabase** provides the application's persistent mileage data layer and CRUD query helpers.
- **React Hook Form** manages form state, controlled inputs, validation rules, and dynamic location field arrays.
- **React Aria Components** provide accessible primitives for date controls, radio groups, text fields, buttons, and keyboard interaction.
- **Headless UI** powers reusable selection and field components.
- **Base UI** is used for shared button primitives.
- **Floating UI** powers lightweight positioned popovers around table actions.
- **Radix UI + DayPicker** are used by the table's date-filter controls.
- **Tailwind CSS** handles the visual system, focus states, interaction states, layout, and component styling.
- **Promise-based confirmation flows** allow destructive or state-changing actions to await a user's decision without duplicating modal-state logic across handlers.
- **Custom context and refs** coordinate focus behavior across nested category controls where default keyboard behavior needs to be extended.

## Architecture

### Feature-Oriented Organization

Mileage and weather behavior are grouped under `src/features`, while reusable UI primitives, hooks, utilities, pages, and external-service configuration live in dedicated top-level folders.

This keeps feature-specific behavior close together while allowing shared interface components and utilities to remain reusable throughout the application.

### Structured Geography

Mileage locations use a progressively narrower hierarchy:

```text
Country → Region → Locality
```

Geographic data is provided through `@countrystatecity/countries-browser` and accessed through focused custom hooks:

```js
useGetCountries()
useGetRegions(countryCode)
useGetLocalities(countryCode, regionCode)
useGetGeoOptions(control, index)
```

`useGetGeoOptions` connects the geographic lookup hooks to the current React Hook Form values.

The selected country determines the available regions, and the selected region determines the available localities.

When a higher-level selection changes, dependent form fields are reset so stale region or locality values are not retained.

### Keyboard and Focus Management

The mileage category control combines standard radio options with a custom text-entry option.

This creates an interaction boundary between two keyboard models: arrow keys normally navigate radio groups, while text fields also use arrow keys for caret movement.

MileMetrics handles these exceptional cases with refs, context, event propagation control, and programmatic focus.

For example, keyboard behavior can move focus from the custom text tile back to the final predefined radio option without allowing the same arrow-key event to continue into the radio group's default navigation behavior.

Additional keyboard handling also allows the form to advance focus from category controls to the next location-related action.

The goal is to preserve accessible native and React Aria behavior while extending it only where the compound control requires custom interaction.

### Server State and URL State

Mileage records are retrieved through Supabase and consumed through TanStack Query.

Daily, weekly, monthly, and lifetime views build different query configurations around the same mileage API helper.

Sorting is represented in the URL with parameters such as:

```text
sort
direction
```

The detail page reads those values and maps them to the corresponding Supabase sorting configuration.

Date-filter controls also store values in URL search parameters such as:

```text
from
to
```

The date-filter UI and validation are implemented, but those values are not yet connected to the final mileage-query configuration.

### Historical Weather

Archived weather is retrieved from Open-Meteo and rendered inside mileage detail rows.

The current weather implementation is an intermediate version.

Weather queries currently use the mileage record ID as the TanStack Query cache key:

```js
['weather', row.original.id]
```

The Open-Meteo request currently uses a fixed Oklahoma City coordinate pair:

```js
latitude: '35.46'
longitude: '-97.51'
```

The trip date is used as both the request's start and end date.

Location-aware coordinate lookup and more refined weather-request behavior remain active development areas.

### Confirmation Flow

Editing and deletion actions use a promise-based confirmation helper:

```js
requestConfirmation()
```

The helper stores a resolver function in confirmation state and allows the calling handler to await the user's decision.

This keeps confirmation behavior close to the action that requested it while avoiding duplicated modal-control logic across individual handlers.

## Tech Stack

### Core

- React 19
- Vite
- React Router
- Tailwind CSS
- Supabase
- TanStack Query
- TanStack Table
- React Hook Form

### UI and Interaction

- React Aria Components
- Headless UI
- Base UI
- Radix UI
- Floating UI
- DayPicker
- React Input Mask
- React Number Format
- Lucide React
- Heroicons
- Iconify
- Meteocons

### Data and Utilities

- date-fns
- `@countrystatecity/countries-browser`
- Open-Meteo
- clsx
- tailwind-merge
- react-hot-toast

## Project Structure

```text
src/
├── App.jsx
├── assets/
│   └── mileMetricsLogo.png
├── features/
│   ├── mileage/
│   │   ├── form/
│   │   │   ├── AddLocationButton.jsx
│   │   │   ├── FormDatePicker.jsx
│   │   │   ├── FormHeader.jsx
│   │   │   ├── FormMilesInput.jsx
│   │   │   ├── FormNotes.jsx
│   │   │   ├── FormTiles.jsx
│   │   │   ├── LocationEntryContext.js
│   │   │   ├── LocationEntry.jsx
│   │   │   ├── MileageLocationFields.jsx
│   │   │   └── SubmitButton.jsx
│   │   ├── table/
│   │   │   ├── MileageExpandedRow.jsx
│   │   │   ├── MileageRow.jsx
│   │   │   └── MileageTable.jsx
│   │   ├── mileageApi.js
│   │   ├── MileageDisplay.jsx
│   │   └── MileageNavbar.jsx
│   └── weather/
│       ├── weatherApi.js
│       └── WeatherDisplay.jsx
├── hooks/
│   ├── useConfirmation.js
│   ├── useGetCountries.js
│   ├── useGetGeoOptions.js
│   ├── useGetLocalities.js
│   └── useGetRegions.js
├── pages/
│   ├── AddMilesPage.jsx
│   ├── HomePage.jsx
│   ├── MileageDetailsPage.jsx
│   └── ViewMilesPage.jsx
├── services/
│   └── supabase.js
├── ui/
│   ├── icon/
│   ├── modals/
│   │   ├── ConfirmationModal.jsx
│   │   └── SettingsModal.jsx
│   ├── table/
│   │   ├── filtering/
│   │   │   ├── DateFilterControls.jsx
│   │   │   └── FilterBy.jsx
│   │   ├── sorting/
│   │   │   └── SortBy.jsx
│   │   ├── SettingsButton.jsx
│   │   └── TableOperations.jsx
│   ├── AppLayout.jsx
│   ├── Button.jsx
│   ├── ButtonLink.jsx
│   ├── Calendar.jsx
│   ├── Checkbox.jsx
│   ├── Chevron.jsx
│   ├── ControlledNumericField.jsx
│   ├── DateInput.jsx
│   ├── DatePicker.jsx
│   ├── FieldLabel.jsx
│   ├── Fieldset.jsx
│   ├── Loader.jsx
│   ├── Popover.jsx
│   ├── RadioTile.jsx
│   └── Select.jsx
├── utils/
│   ├── cn.js
│   ├── dateUtils.js
│   ├── formattingUtils.js
│   ├── handleError.js
│   ├── mileageUtils.js
│   └── validationUtils.js
├── index.css
└── main.jsx
```

## Routes

```text
/                       Home
/add-miles              Mileage entry form
/view-miles             Mileage summary dashboard
/view-miles/:timeFrame  Daily, weekly, monthly, or lifetime mileage details
```

## Getting Started

### Prerequisites

- Node.js
- npm

### Installation

```bash
npm install
npm run dev
```

Vite will start the development server and print the local URL in the terminal.

### Supabase

The Supabase client is configured in:

```text
src/services/supabase.js
```

Running MileMetrics against another backend requires a compatible Supabase project and `Miles` table.

## Available Scripts

```bash
npm run dev      # Start the Vite development server
npm run build    # Create a production build
npm run preview  # Preview the production build locally
npm run lint     # Run ESLint
```

## Current Development

MileMetrics is actively being developed.

Current work includes:

- Completing the table filtering pipeline
- Tightening the interaction between sorting and timeframe views
- Continuing keyboard and focus polish in compound form controls
- Improving location precision and connecting geographic data to weather requests
- Hardening Open-Meteo request behavior
- Refining mileage-entry submission and validation behavior
- Improving responsive behavior
- Continuing to extract reusable UI primitives from feature-specific code

Known issues currently tracked in the project include:

- Some August entries displaying as September
- Open-Meteo requests occasionally returning HTTP `429`
- Minor table-control layout polish
- Refactoring parts of mileage-row expansion behavior

The longer-term goal is to make MileMetrics a reliable and organized mileage-history tool for drivers while continuing to improve the application's accessibility, reporting, maintainability, and overall user experience.
