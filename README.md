# legal
Making legal applications for companies
------------------------------------------
1. Clonse git `https://github.com/Marvelch/legal.git`.
2. Create a database (MYSQL) with the name legal_api
3. Run `npx sequelize-cli db:migrate`
4. Run `nodemon app/js`
5. Open postman, try doing a test by accessing
6. List endpoint :
   - localhost:5000/users (POST) :
       {
          "fullName":"Nama Pengguna",
          "email":"Emailpengguna@gmail.com",
          "password":"testkerja",
          "confirmPassword":"testkerja",
          "role":"admin"
      }
   - localhost:5000/users (GET)
   - localhost:5000/users/{id} (PUT)
       {
          "fullName": "Nama Pengguna",
          "email": "Emailpengguna@gmail.com",
          "password": "12345678910",
          "confirmPassword": "12345678910",
          "role": "admin"
      }
   - localhost:5000/users/{id} (DELETE)
   - localhost:5000/users/{id} (GET)
