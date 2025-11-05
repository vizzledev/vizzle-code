@echo off
echo ============================================
echo Vizzle Virtual Try-On Setup Script
echo ============================================
echo.

REM Check if .env.local exists
if exist .env.local (
    echo [OK] .env.local already exists
) else (
    echo [INFO] Creating .env.local file...
    echo NEXT_PUBLIC_API_BASE_URL=https://vizzle-backend-vvc6.onrender.com > .env.local
    echo [OK] .env.local created successfully
)
echo.

REM Install dependencies
echo [INFO] Installing dependencies...
call npm install
if %errorlevel% neq 0 (
    echo [ERROR] Failed to install dependencies
    pause
    exit /b 1
)
echo [OK] Dependencies installed successfully
echo.

REM Build check (optional)
echo [INFO] Checking TypeScript types...
call npm run lint
if %errorlevel% neq 0 (
    echo [WARNING] Linting found some issues
) else (
    echo [OK] No linting issues found
)
echo.

echo ============================================
echo Setup Complete!
echo ============================================
echo.
echo Next steps:
echo 1. Run: npm run dev
echo 2. Visit: http://localhost:3000/api-test
echo 3. Test: http://localhost:3000/main/scan
echo.
echo Documentation:
echo - README.md         - Project overview
echo - SETUP.md          - Detailed setup guide
echo - API_INTEGRATION.md - API documentation
echo.
pause

