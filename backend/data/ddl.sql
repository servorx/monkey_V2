DROP DATABASE IF EXISTS monkey_db;
CREATE DATABASE IF NOT EXISTS monkey_db;
USE monkey_db;

-- JWT, DON'T TOUCH
CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS refresh_tokens (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    token VARCHAR(255) NOT NULL,
    CONSTRAINT fk_rt_user_id FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS roles (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS user_roles (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    role_id INT NOT NULL,
    CONSTRAINT fk_ur_user_id FOREIGN KEY (user_id) REFERENCES users(id),
    CONSTRAINT fk_ur_role_id FOREIGN KEY (role_id) REFERENCES roles(id)
);

CREATE TABLE IF NOT EXISTS words (
    id INT PRIMARY KEY AUTO_INCREMENT,
    word VARCHAR(255) NOT NULL,
    definition VARCHAR(255) NOT NULL,
    example VARCHAR(255) NOT NULL,
    synonyms VARCHAR(255) NOT NULL,
    antonyms VARCHAR(255) NOT NULL,
    general_sense VARCHAR(255) NOT NULL,
    meaning VARCHAR(255) NOT NULL,
    usage VARCHAR(255) NOT NULL,
    source VARCHAR(255) NOT NULL,
    notes VARCHAR(255) NOT NULL,
    user_id INT NOT NULL,
    CONSTRAINT fk_w_user_id FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS categories (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL
);

-- general db of the app 
CREATE TABLE IF NOT EXISTS stats (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    word_id INT NOT NULL,
    category_id INT NOT NULL,
    CONSTRAINT fk_st_user_id FOREIGN KEY (user_id) REFERENCES users(id),
    CONSTRAINT fk_st_word_id FOREIGN KEY (word_id) REFERENCES words(id),
    CONSTRAINT fk_st_category_id FOREIGN KEY (category_id) REFERENCES categories(id)
);


CREATE TABLE IF NOT EXISTS categories_words (
    id INT PRIMARY KEY AUTO_INCREMENT,
    category_id INT NOT NULL,
    word_id INT NOT NULL,
    FOREIGN KEY (category_id) REFERENCES categories(id),
    FOREIGN KEY (word_id) REFERENCES words(id)
);

CREATE TABLE IF NOT EXISTS users_words (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    word_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (word_id) REFERENCES words(id)
);
