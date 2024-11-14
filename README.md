# Spend Wise

Aplikacja **Spend Wise** to narzędzie do zarządzania finansami osobistymi. Składa się z backendu w Node.js i frontendu stworzonego z Vite, a jako bazę danych wykorzystuje MySQL.

## Wymagania

Do uruchomienia aplikacji lokalnie wymagane są:
- **Node.js** oraz **npm**
- **XAMPP** lub inne środowisko do zarządzania MySQL i Apache

## Konfiguracja

### Baza danych
1. Za pomocą XAMPP lub innego narzędzia utwórz bazę danych MySQL o nazwie `spend_wise_db`.
2. W XAMPP uruchom serwery Apache oraz MySQL.

### Pliki konfiguracyjne `.env`
1. W katalogu `./packages/backend-services/` utwórz plik `.env` i uzupełnij go poniższymi danymi:
    ```env
    # Ustawienia aplikacji Node.js
    ALLOWED_ORIGINS=*             # Zezwolenie na połączenia ze wszystkich adresów
    FRONTEND_URL=*                # Domyślnie aplikacja akceptuje zapytania od wszystkich adresów
    BACKEND_PORT=8081             # Port, na którym działa backend
    JWT_SECRET="JTW_SECRET_KEY"   # Sekretny klucz dla JWT
    TOKEN_EXPIRES=10d             # Czas wygaśnięcia tokenów JWT
    
    DATABASE_PORT=3306            # Port bazy danych
    DATABASE_NAME=spend_wise_db   # Nazwa bazy danych
    DATABASE_HOST=localhost       # Host bazy danych
    DATABASE_USER=root            # Domyślny użytkownik MySQL
    DATABASE_PASSWORD=''          # Hasło użytkownika MySQL (puste domyślnie)
    ```

2. W katalogu `./packages/frontend/` utwórz plik `.env` i dodaj poniższą konfigurację:
    ```env
    VITE_BACKEND_URL=http://localhost:8081
    ```

## Uruchomienie aplikacji

1. W katalogu głównym zainstaluj wszystkie wymagane paczki:
    ```bash
    npm run install
    ```

2. Zbuduj projekt:
    ```bash
    npm run build-project
    ```

3. **Uruchomienie backendu**: Otwórz nową konsolę i uruchom backend za pomocą:
    ```bash
    npm run backend:start
    ```

4. **Uruchomienie frontendu**: W tej samej konsoli uruchom frontend:
    ```bash
    npm run frontend:preview
    ```

5. W konsoli frontendowej powinien pojawić się URL, pod którym dostępna jest aplikacja. Otwórz przeglądarkę, wpisz ten adres i zacznij korzystać z aplikacji.

---

Aplikacja **Spend Wise** powinna być teraz dostępna lokalnie!
