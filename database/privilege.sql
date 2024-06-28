-- Enter Username and Local Host address
GRANT ALL PRIVILEGES ON pokemon_data.* TO 'username_here'@'localhost'; -- #1
GRANT ALL PRIVILEGES ON pokemon_data.* TO 'username_here'@'localhost'; -- #2
GRANT ALL PRIVILEGES ON pokemon_data.* TO 'username_here'@'localhost'; -- #3

FLUSH PRIVILEGES;
SHOW GRANTS FOR 'username_here'@'localhost'; -- #1
SHOW GRANTS FOR 'username_here'@'localhost'; -- #2
SHOW GRANTS FOR 'username_here'@'localhost'; -- #3