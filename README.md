# E-commerce Application

A full-stack e-commerce application built with React (frontend) and Laravel (backend).

## Project Structure

```
laravel_React_Ecom/
├── react-client/       # React frontend application
├── laravel-backend/    # Laravel API backend
└── react-backend/      # React admin dashboard
```

## Frontend Features

### Customer Portal (react-client)

- **Product Management**
  - Product listing with categories
  - Product search functionality
  - Product details view
  - Related products

- **Shopping Cart**
  - Add/remove items
  - Update quantities
  - Cart total calculation
  - Order summary

- **Checkout System**
  - Multiple payment methods:
    - PayPal integration
    - Credit Card (Visa)
    - Cash on Delivery
  - Shipping information form

- **User Interface**
  - Responsive design
  - Bootstrap & custom styling
  - Image sliders (Swiper)
  - Toast notifications

### Admin Dashboard (react-backend)

- **Dashboard Overview**
- **Product Management**
  - Product CRUD operations
  - Category management
  - Brand management
- **Order Management**
- **Customer Management**
- **Employee Management**
- **Reports & Analytics**

## Backend Features (laravel-backend)

- RESTful API
- Authentication & Authorization
- Database Models:
  - Products
  - Categories
  - Brands
  - Customers
  - Orders
  - Users/Employees
  - Suppliers

## Tech Stack

### Frontend
- React 18.x
- React Router DOM 7.x
- Context API for state management
- Bootstrap for styling
- React-Toastify for notifications
- PayPal integration
- Swiper for carousels

### Backend
- Laravel 10.x
- MySQL database
- JWT authentication
- RESTful API architecture

## Getting Started

### Frontend Setup (react-client)
1. Navigate to react-client directory:
   ```bash
   cd react-client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run development server:
   ```bash
   npm run dev
   ```

### Backend Setup (laravel-backend)
1. Navigate to laravel-backend directory:
   ```bash
   cd laravel-backend
   ```
2. Install dependencies:
   ```bash
   composer install
   ```
3. Set up environment:
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```
4. Configure database in .env file
5. Run migrations:
   ```bash
   php artisan migrate
   ```
6. Start server:
   ```bash
   php artisan serve
   ```

## Environment Variables

### Frontend (.env)
```
VITE_API_URL=http://localhost:8000/api
VITE_PAYPAL_CLIENT_ID=your_paypal_client_id
```

### Backend (.env)
```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=your_database_name
DB_USERNAME=your_username
DB_PASSWORD=your_password
```

## API Documentation

The API documentation will be available at `/api/documentation` when the backend server is running.

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the MIT License.