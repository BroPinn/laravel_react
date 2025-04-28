# Developer Documentation for Laravel React E-commerce Project

## Project Overview
This is a full-stack e-commerce application built with Laravel (backend) and React (frontend). The application includes an admin dashboard for managing products, users, and orders, as well as a client-facing storefront for browsing and purchasing products.

## Tech Stack
- **Frontend**: React (with Vite), React Router, Axios
- **Backend**: Laravel REST API
- **Styling**: Tailwind CSS
- **Database**: MySQL (via Laravel Eloquent)
- **Authentication**: Laravel Sanctum (optional for login/register)
- **Security**: API Key in request headers (`X-API-KEY`)

## Folder Structure

### Frontend (React)
```
react-backend/
├── public/                # Static assets
├── src/
│   ├── components/        # Reusable components
│   │   ├── admin/         # Admin-specific components
│   │   ├── client/        # Client-specific components
│   ├── context/           # React Context for state management
│   ├── page/              # Page components (e.g., Home, Shop, Login)
│   ├── util/              # Utility functions (e.g., API client setup)
│   ├── App.jsx            # Main app component
│   ├── main.jsx           # React entry point
├── .env                   # Environment variables
```

### Backend (Laravel)
```
laravel-backend/
├── app/
│   ├── Http/
│   │   ├── Controllers/   # API controllers
│   │   ├── Middleware/    # Custom middleware (e.g., API key validation)
│   ├── Models/            # Eloquent models
├── config/                # Configuration files
├── database/
│   ├── migrations/        # Database migrations
│   ├── seeders/           # Database seeders
├── routes/
│   ├── api.php            # API routes
│   ├── web.php            # Web routes
├── .env                   # Environment variables
```

## API Setup

### Protecting API Routes with API Key
1. Create a middleware to validate the API key:
   ```php
   namespace App\Http\Middleware;

   use Closure;

   class ValidateApiKey
   {
       public function handle($request, Closure $next)
       {
           $apiKey = $request->header('X-API-KEY');
           if ($apiKey !== config('app.api_key')) {
               return response()->json(['error' => 'Unauthorized'], 401);
           }
           return $next($request);
       }
   }
   ```
2. Register the middleware in `Kernel.php`:
   ```php
   protected $routeMiddleware = [
       'api.key' => \App\Http\Middleware\ValidateApiKey::class,
   ];
   ```
3. Protect routes in `routes/api.php`:
   ```php
   Route::middleware('api.key')->group(function () {
       Route::get('/products', [ProductController::class, 'index']);
   });
   ```

### Sample API Route
```php
Route::middleware('api.key')->get('/products', [ProductController::class, 'index']);
```

## Frontend Setup

### Installing and Running the React App
1. Install dependencies:
   ```bash
   cd react-backend
   npm install
   ```
2. Run the development server:
   ```bash
   npm run dev
   ```

### Separating Admin and Client Routes
Use React Router to define separate routes for admin and client:
```jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminDashboard from './components/admin/AdminDashboard';
import HomePage from './components/client/HomePage';

function App() {
    return (
        <Router>
            <Routes>
                {/* Admin Routes */}
                <Route path="/admin/*" element={<AdminDashboard />} />

                {/* Client Routes */}
                <Route path="/" element={<HomePage />} />
            </Routes>
        </Router>
    );
}
export default App;
```

### Fetching Data with Axios
Set up an Axios instance to include the API key:
```javascript
import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:8000/api',
});

apiClient.interceptors.request.use((config) => {
    config.headers['X-API-KEY'] = process.env.REACT_APP_API_KEY;
    return config;
});

export default apiClient;
```

## .env Configuration

### Laravel
Create a `.env` file in the `laravel-backend` directory with the following content:
```
APP_NAME=Laravel
APP_ENV=local
APP_KEY=base64:...
APP_DEBUG=true
APP_URL=http://localhost:8000

LOG_CHANNEL=stack
LOG_DEPRECATIONS_CHANNEL=null
LOG_LEVEL=debug

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=laravel_ecommerce
DB_USERNAME=root
DB_PASSWORD=

BROADCAST_DRIVER=log
CACHE_DRIVER=file
FILESYSTEM_DISK=local
QUEUE_CONNECTION=sync
SESSION_DRIVER=file
SESSION_LIFETIME=120

SANCTUM_STATEFUL_DOMAINS=localhost:3000
API_KEY=your_api_key_here
```

### React
Create a `.env` file in the `react-backend` directory with the following content:
```
VITE_API_KEY=your_api_key_here
VITE_API_BASE_URL=http://localhost:8000/api
```

## CORS Configuration
Enable CORS in Laravel to allow requests from the React dev server:
1. Install Laravel CORS package:
   ```bash
   composer require fruitcake/laravel-cors
   ```
2. Configure `config/cors.php`:
   ```php
   'paths' => ['api/*'],
   'allowed_origins' => ['http://localhost:3000'],
   'allowed_methods' => ['*'],
   'allowed_headers' => ['*'],
   ```

## Authentication (Optional)
Use Laravel Sanctum for authentication:
1. Install Sanctum:
   ```bash
   composer require laravel/sanctum
   ```
2. Publish Sanctum configuration:
   ```bash
   php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"
   ```
3. Add Sanctum middleware to `api.php` routes:
   ```php
   Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
       return $request->user();
   });
   ```

## Running Instructions

### Laravel Backend
1. Install dependencies:
   ```bash
   cd laravel-backend
   composer install
   ```
2. Set up the database:
   ```bash
   php artisan migrate --seed
   ```
3. Run the development server:
   ```bash
   php artisan serve
   ```

### React Frontend
1. Install dependencies:
   ```bash
   cd react-backend
   npm install
   ```
2. Run the development server:
   ```bash
   npm run dev
   ```

## Deployment Tips
1. **Laravel**:
   - Use `php artisan config:cache` and `php artisan route:cache` for optimized performance.
   - Deploy on a server with HTTPS enabled.
2. **React**:
   - Build the app using `npm run build`.
   - Serve the static files using a CDN or web server (e.g., Nginx).

---
This documentation provides a comprehensive guide to setting up, running, and deploying the Laravel React e-commerce project.