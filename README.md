# Product Configurator API

A Node.js/Express API for building customizable product templates with option categories, choices, and compatibility rules. Uses Sequelize ORM with SQLite for persistence.

## Features
- Defined product templates with a base price
- Added option categories to templates
- Added option choices to categories, each with a price delta
- Defined compatibility rules (requires/incompatible) between option choices
- Endpoints for validating configurations and filtering available options

## Tech Stack
- Node.js
- Express
- Sequelize ORM
- SQLite (default, file-based)

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/siddharthgupta5/Product_Configurator
   cd product-configurator
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   node app.js
   ```
   The server will run on `http://localhost:3000` by default.

> **Note:** The SQLite database file (`database.sqlite`) will be created automatically in the project root.

## API Usage
All endpoints are prefixed with `/api`.

### 1. Create a Product Template
- **POST** `/api/product-templates`
- **Body:**
  ```json
  {
    "template_str_id": "laptop2024",
    "name": "Laptop 2024",
    "base_price": 999.99
  }
  ```
- **Response:** 201 Created, returns the created template object.

### 2. Add an Option Category
- **POST** `/api/product-templates/:template_str_id/option-categories`
- **Body:**
  ```json
  {
    "category_str_id": "ram",
    "name": "RAM"
  }
  ```
- **Response:** 201 Created, returns the created category object.

### 3. Add an Option Choice
- **POST** `/api/option-categories/:category_str_id/choices`
- **Body:**
  ```json
  {
    "choice_str_id": "ram16gb",
    "name": "16GB RAM",
    "price_delta": 100
  }
  ```
- **Response:** 201 Created, returns the created choice object.

### 4. Add a Compatibility Rule
- **POST** `/api/product-templates/:template_str_id/compatibility-rules`
- **Body:**
  ```json
  {
    "rule_type": "REQUIRES", // or "INCOMPATIBLE_WITH"
    "primary_choice_str_id": "ram16gb",
    "secondary_choice_str_id": "ssd1tb"
  }
  ```
- **Response:** 201 Created, returns the created rule object.

### 5. (Planned) Get Available Options
- **POST** `/api/product-templates/:template_str_id/available-options/:target_category_str_id`
- **Body:**
  ```json
  {
    "current_selections": ["ram16gb"]
  }
  ```
- **Response:** 501 Not Implemented

### 6. (Planned) Validate Configuration
- **POST** `/api/product-templates/:template_str_id/validate-configuration`
- **Body:**
  ```json
  {
    "selections": ["ram16gb", "ssd1tb"]
  }
  ```
- **Response:** 501 Not Implemented

## Project Structure
- `app.js` - Main entry point
- `models/` - Sequelize models
- `controllers/` - Route handlers
- `routes/api.js` - API route definitions
- `config/db.js` - Database config

## License
ISC 