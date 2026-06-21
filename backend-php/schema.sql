CREATE DATABASE IF NOT EXISTS kvadroklimat
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE kvadroklimat;

CREATE TABLE IF NOT EXISTS User (
  id         VARCHAR(30) PRIMARY KEY,
  email      VARCHAR(255) NOT NULL UNIQUE,
  name       VARCHAR(255),
  phone      VARCHAR(255),
  password   VARCHAR(255),
  role       ENUM('ADMIN','MANAGER','USER') NOT NULL DEFAULT 'USER',
  image      VARCHAR(255),
  createdAt  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS Account (
  id                VARCHAR(30) PRIMARY KEY,
  userId            VARCHAR(30) NOT NULL,
  type              VARCHAR(255) NOT NULL,
  provider          VARCHAR(255) NOT NULL,
  providerAccountId VARCHAR(255) NOT NULL,
  refresh_token     VARCHAR(255),
  access_token      VARCHAR(255),
  expires_at        INT,
  token_type        VARCHAR(255),
  scope             VARCHAR(255),
  id_token          VARCHAR(255),
  session_state     VARCHAR(255),
  UNIQUE KEY uk_provider_account (provider, providerAccountId),
  FOREIGN KEY (userId) REFERENCES User(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS Session (
  id           VARCHAR(30) PRIMARY KEY,
  session_token VARCHAR(255) NOT NULL UNIQUE,
  userId       VARCHAR(30) NOT NULL,
  expires      DATETIME NOT NULL,
  FOREIGN KEY (userId) REFERENCES User(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS VerificationToken (
  identifier VARCHAR(255) NOT NULL,
  token      VARCHAR(255) NOT NULL UNIQUE,
  expires    DATETIME NOT NULL,
  UNIQUE KEY uk_identifier_token (identifier, token)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS Category (
  id          VARCHAR(30) PRIMARY KEY,
  name        VARCHAR(255) NOT NULL,
  slug        VARCHAR(255) NOT NULL UNIQUE,
  description TEXT,
  image       VARCHAR(255),
  parentId    VARCHAR(30),
  `order`     INT NOT NULL DEFAULT 0,
  createdAt   DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt   DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (parentId) REFERENCES Category(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS Product (
  id            VARCHAR(30) PRIMARY KEY,
  name          VARCHAR(255) NOT NULL,
  slug          VARCHAR(255) NOT NULL UNIQUE,
  article       VARCHAR(255) UNIQUE,
  description   LONGTEXT,
  shortDesc     TEXT,
  price         DECIMAL(10,2) NOT NULL,
  oldPrice      DECIMAL(10,2),
  installment   DECIMAL(10,2),
  rating        DOUBLE NOT NULL DEFAULT 0,
  reviewCount   INT NOT NULL DEFAULT 0,
  inStock       TINYINT(1) NOT NULL DEFAULT 1,
  isHit         TINYINT(1) NOT NULL DEFAULT 0,
  isNew         TINYINT(1) NOT NULL DEFAULT 0,
  specs         JSON,
  images        JSON NOT NULL,
  seoTitle      VARCHAR(255),
  seoDesc       TEXT,
  brand         VARCHAR(255),
  power         VARCHAR(255),
  roomArea      VARCHAR(255),
  type          VARCHAR(255),
  warranty      VARCHAR(255),
  installationPrice DECIMAL(10,2),
  categoryId    VARCHAR(30) NOT NULL,
  createdAt     DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt     DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (categoryId) REFERENCES Category(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS Review (
  id        VARCHAR(30) PRIMARY KEY,
  rating    INT NOT NULL DEFAULT 5,
  text      TEXT,
  author    VARCHAR(255) NOT NULL,
  photo     VARCHAR(255),
  productId VARCHAR(30) NOT NULL,
  createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (productId) REFERENCES Product(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `Order` (
  id            VARCHAR(30) PRIMARY KEY,
  orderNumber   VARCHAR(255) NOT NULL UNIQUE,
  status        ENUM('NEW','ACCEPTED','INSTALLATION','COMPLETED','CANCELLED') NOT NULL DEFAULT 'NEW',
  total         DECIMAL(10,2) NOT NULL,
  subtotal      DECIMAL(10,2) NOT NULL,
  deliveryCost  DECIMAL(10,2),
  promoCode     VARCHAR(255),
  discount      DECIMAL(10,2),
  customerName  VARCHAR(255) NOT NULL,
  customerPhone VARCHAR(255) NOT NULL,
  customerEmail VARCHAR(255),
  city          VARCHAR(255),
  street        VARCHAR(255),
  house         VARCHAR(255),
  apartment     VARCHAR(255),
  comment       TEXT,
  contactMethod VARCHAR(255),
  userId        VARCHAR(30),
  createdAt     DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt     DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES User(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS OrderItem (
  id        VARCHAR(30) PRIMARY KEY,
  orderId   VARCHAR(30) NOT NULL,
  productId VARCHAR(30) NOT NULL,
  name      VARCHAR(255) NOT NULL,
  price     DECIMAL(10,2) NOT NULL,
  quantity  INT NOT NULL DEFAULT 1,
  image     VARCHAR(255),
  FOREIGN KEY (orderId) REFERENCES `Order`(id) ON DELETE CASCADE,
  FOREIGN KEY (productId) REFERENCES Product(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS Service (
  id          VARCHAR(30) PRIMARY KEY,
  name        VARCHAR(255) NOT NULL,
  slug        VARCHAR(255) NOT NULL UNIQUE,
  description TEXT,
  price       DECIMAL(10,2),
  category    VARCHAR(255),
  `order`     INT NOT NULL DEFAULT 0,
  image       VARCHAR(255),
  createdAt   DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt   DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS BlogPost (
  id        VARCHAR(30) PRIMARY KEY,
  title     VARCHAR(255) NOT NULL,
  slug      VARCHAR(255) NOT NULL UNIQUE,
  excerpt   TEXT,
  content   LONGTEXT,
  image     VARCHAR(255),
  category  VARCHAR(255),
  published TINYINT(1) NOT NULL DEFAULT 0,
  seoTitle  VARCHAR(255),
  seoDesc   TEXT,
  createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS PageMeta (
  id        VARCHAR(30) PRIMARY KEY,
  page      VARCHAR(255) NOT NULL UNIQUE,
  title     VARCHAR(255),
  `desc`    TEXT,
  ogImage   VARCHAR(255),
  createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS ContactRequest (
  id        VARCHAR(30) PRIMARY KEY,
  name      VARCHAR(255) NOT NULL,
  phone     VARCHAR(255) NOT NULL,
  email     VARCHAR(255),
  message   TEXT,
  source    VARCHAR(255),
  createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
