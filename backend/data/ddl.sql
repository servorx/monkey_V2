DROP DATABASE IF EXISTS monkey_db;
CREATE DATABASE IF NOT EXISTS monkey_db;
USE monkey_db;

-- -----------------------------------------------------------------------
-- JWT, AND USER SETTINGS, DON'T TOUCH
-- -----------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(50) NOT NULL UNIQUE,
  -- TODO: revisar longitud del password si es necesario de acuerdo al hasheo
  password VARCHAR(255) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  -- informacion del perfil del usuario adicional
  profile_picture_url VARCHAR(255) NULL,
  bio TEXT NULL,
  keyboard VARCHAR(50) NULL,
  github_username VARCHAR(50) NULL,
  twitter_username VARCHAR(50) NULL,
  website_url VARCHAR(255) NULL,
  profile_score INT DEFAULT 0,
  tests_started INT DEFAULT 0,
  tests_completed INT DEFAULT 0,
  time_typing TIME,
  preferred_language VARCHAR(5) NOT NULL DEFAULT 'en', -- idioma por defecto
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=INNODB;

CREATE TABLE IF NOT EXISTS refresh_tokens (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  token TEXT NOT NULL,
  expires_at TIMESTAMP NOT NULL,
  is_revoked BOOLEAN NOT NULL DEFAULT FALSE,
  revoked_at TIMESTAMP NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_refresh_token_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  -- uso del index para optimizar la consulta de tokens revocados
  INDEX idx_is_revoked_user (is_revoked, user_id),
  -- otro index para optimizar la consulta de tokens expirados
  INDEX idx_is_revoked_expires_at (expires_at)
) ENGINE=INNODB;

CREATE TABLE IF NOT EXISTS roles (
  id INT PRIMARY KEY AUTO_INCREMENT,
  role_name VARCHAR(20) NOT NULL,
  description VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=INNODB;

CREATE TABLE IF NOT EXISTS user_roles (
  user_id INT NOT NULL,
  role_id INT NOT NULL,
  PRIMARY KEY (user_id, role_id),
  CONSTRAINT fk_ur_user_id FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  CONSTRAINT fk_ur_role_id FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE
) ENGINE=INNODB;

-- -----------------------------------------------------------------------
-- user settings
-- -----------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS user_settings (
  user_id INT PRIMARY KEY,
  theme_name VARCHAR(50) NOT NULL DEFAULT 'vscore',
  font_name VARCHAR(50) NOT NULL DEFAULT 'Roboto Mono',
  test_options JSON, -- JSON para guardar opciones complejas de prueba (puntuacion, errores)
  -- esto para saber en que momento se actualizo el settings
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_us_user_id FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=INNODB;

-- -----------------------------------------------------------------------
-- datos de la aplicacion
-- -----------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS words (
  id INT PRIMARY KEY AUTO_INCREMENT,
  word VARCHAR(100) NOT NULL,
  -- 'points' podria ser un peso o dificultad de la palabra
  points INT DEFAULT 0, 
  -- user_id para palabras añadidas por el usuario (custom)
  user_id INT, 
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_w_user_id FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=INNODB;

CREATE TABLE IF NOT EXISTS languages (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL UNIQUE, -- es unique por si un usuario quiere crear una categoria con el mismo nombre
  description TEXT NULL
) ENGINE=INNODB;

CREATE TABLE IF NOT EXISTS languages_words (
  languague_id INT NOT NULL,
  word_id INT NOT NULL,
  PRIMARY KEY (languague_id, word_id),
  CONSTRAINT fk_cw_languague_id FOREIGN KEY (languague_id) REFERENCES languages(id) ON DELETE CASCADE,
  CONSTRAINT fk_cw_word_id FOREIGN KEY (word_id) REFERENCES words(id) ON DELETE CASCADE
) ENGINE=INNODB;

CREATE TABLE IF NOT EXISTS users_words (
  -- usar para 'palabras favoritas' o 'lista de palabras personalizadas' por el usuario a traves de un scv 
  user_id INT NOT NULL,
  word_id INT NOT NULL,
  PRIMARY KEY (user_id, word_id),
  CONSTRAINT fk_uw_user_id FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  CONSTRAINT fk_uw_word_id FOREIGN KEY (word_id) REFERENCES words(id) ON DELETE CASCADE
) ENGINE=INNODB;

-- -----------------------------------------------------------------------
-- STATS
-- -----------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS word_mastery (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  word_id INT NOT NULL,
  total_correct_attempts INT DEFAULT 0,
  total_error_count INT DEFAULT 0,
  confidence_score DECIMAL(5,4) DEFAULT 0.0000, -- Puntuación de confianza calculada
  last_played TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  -- Se asegura que un usuario solo tenga una entrada por palabra
  UNIQUE KEY uk_user_word (user_id, word_id), 
  CONSTRAINT fk_wm_user_id FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  CONSTRAINT fk_wm_word_id FOREIGN KEY (word_id) REFERENCES words(id) ON DELETE CASCADE
) ENGINE=INNODB;

CREATE TABLE IF NOT EXISTS test_runs (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  wpm DECIMAL(5,2) NOT NULL,
  accuracy DECIMAL(5,2) NOT NULL,
  raw_wpm DECIMAL(5,2) NOT NULL,
  consistency DECIMAL(5,2) NOT NULL,
  error_count INT NOT NULL,
  mode_type VARCHAR(50) NOT NULL, -- son datos como "time", "words", "zen"
  mode_value INT NOT NULL, -- son datos como "60" (segundos), "100" (palabras)
  duration_ms INT NOT NULL, -- duracion de la prueba en milisegundos 
  raw_data JSON, -- tiempo de tecleo por palabra u otra informacion detallada
  language_id INT NULL,
  score INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- momento de creacion de la prueba 
  CONSTRAINT fk_tr_user_id FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  CONSTRAINT fk_tr_language_id FOREIGN KEY (language_id) REFERENCES languages(id) ON DELETE CASCADE
) ENGINE=INNODB;

CREATE TABLE IF NOT EXISTS leaderboard_entries_time_frames (
  id INT PRIMARY KEY AUTO_INCREMENT,
  time_frame VARCHAR(50) NOT NULL
) ENGINE=INNODB;

CREATE TABLE IF NOT EXISTS leaderboard_entries (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  test_run_id INT NOT NULL, -- enlaza al test_run original
  time_frame_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY uk_leaderboard_entry (user_id, time_frame_id), -- Un solo mejor score por modo y marco de tiempo
  CONSTRAINT fk_le_user_id FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  CONSTRAINT fk_le_test_run_id FOREIGN KEY (test_run_id) REFERENCES test_runs(id) ON DELETE CASCADE,
  CONSTRAINT fk_le_time_frame FOREIGN KEY (time_frame_id) REFERENCES leaderboard_entries_time_frames(id) ON DELETE CASCADE
) ENGINE=INNODB;

-- -----------------------------------------------------------------------
-- BADGES
-- -----------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS badges (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  icon_url VARCHAR(255),
  min_score INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS user_badges (
  user_id INT NOT NULL,
  badge_id INT NOT NULL,
  earned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (user_id, badge_id),
  CONSTRAINT fk_ub_user_id FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  CONSTRAINT fk_ub_badge_id FOREIGN KEY (badge_id) REFERENCES badges(id) ON DELETE CASCADE
);