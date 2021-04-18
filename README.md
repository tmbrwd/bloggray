Hi there! 🤠
i just made a little beta blog

Here's what you have to do to make my little blog working properly :)

First, you need to download node.js on your computer

2. you need to download node modules by using : "npm install"
3. i attached my .env file on the folder, you can check the more details about database, host and port etc...
4. Here's my MySQL tables query :

    CREATE TABLE users (
    id int(10) NOT NULL auto-increment,
    username varchar(90) NOT NULL,
    firstname varchar(90) NOT NULL,           <----- Registered users
    lastname varchar(90) NOT NULL,
    email varchar(90) NOT NULL,
    password varchar(90) NOT NULL
);

    CREATE TABLE userUploads (
    id int(10) NOT NULL auto-increment,
    header varchar(90) NOT NULL,              <----- This one for post publishing
    highlight varchar(90) NOT NULL,
    main varchar(90) NOT NULL,
    image varchar(255) NOT NULL
);

5. My database's name is users :p
6. Enjoy!
    
