-- ============================================================
-- TG TECH SOLUTIONS — Complete MySQL Database Schema
-- Author: Takshak Ghagi
-- Location: Nagpur, Maharashtra
-- Version: 1.0.0
-- ============================================================

-- Database Create karo
CREATE DATABASE IF NOT EXISTS tg_tech_db
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

-- Database use karo
USE tg_tech_db;

-- ============================================================
-- TABLE 1: USERS
-- ============================================================
CREATE TABLE IF NOT EXISTS users (
    id              INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name            VARCHAR(100) NOT NULL,
    email           VARCHAR(150) NOT NULL UNIQUE,
    password        VARCHAR(255) NULL,              -- NULL for Google login users
    google_id       VARCHAR(255) NULL UNIQUE,
    role            ENUM('user', 'admin') NOT NULL DEFAULT 'user',
    avatar          VARCHAR(500) NULL DEFAULT NULL,
    phone           VARCHAR(15) NULL,
    city            VARCHAR(100) NULL,
    bio             TEXT NULL,
    is_verified     BOOLEAN NOT NULL DEFAULT FALSE,
    is_active       BOOLEAN NOT NULL DEFAULT TRUE,
    otp             VARCHAR(6) NULL,
    otp_expiry      DATETIME NULL,
    last_login      DATETIME NULL,
    created_at      DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at      DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    -- Indexes
    INDEX idx_email         (email),
    INDEX idx_google_id     (google_id),
    INDEX idx_role          (role),
    INDEX idx_is_active     (is_active),
    INDEX idx_created_at    (created_at)
);

-- ============================================================
-- TABLE 2: SERVICES
-- ============================================================
CREATE TABLE IF NOT EXISTS services (
    id              INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    title           VARCHAR(200) NOT NULL,
    slug            VARCHAR(200) NOT NULL UNIQUE,
    description     TEXT NOT NULL,
    short_desc      VARCHAR(500) NOT NULL,
    icon            VARCHAR(100) NOT NULL,           -- Icon name (e.g., 'FaCode')
    category        ENUM(
                        'web_development',
                        'app_development',
                        'final_year_project',
                        'notes',
                        'documentation',
                        'graphic_design',
                        'resume',
                        'internship',
                        'software'
                    ) NOT NULL,
    features        JSON NOT NULL,                   -- Array of features
    technologies    JSON NULL,                       -- Tech stack used
    delivery_days   INT UNSIGNED NOT NULL DEFAULT 7,
    is_active       BOOLEAN NOT NULL DEFAULT TRUE,
    sort_order      INT UNSIGNED NOT NULL DEFAULT 0,
    created_at      DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at      DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    -- Indexes
    INDEX idx_slug          (slug),
    INDEX idx_category      (category),
    INDEX idx_is_active     (is_active),
    INDEX idx_sort_order    (sort_order)
);

-- ============================================================
-- TABLE 3: ORDERS
-- ============================================================
CREATE TABLE IF NOT EXISTS orders (
    id              INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    order_number    VARCHAR(20) NOT NULL UNIQUE,     -- e.g., TG-2024-0001
    user_id         INT UNSIGNED NOT NULL,
    service_id      INT UNSIGNED NOT NULL,
    title           VARCHAR(300) NOT NULL,
    description     TEXT NOT NULL,
    requirements    TEXT NULL,
    budget          DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    deadline        DATE NOT NULL,
    status          ENUM(
                        'pending',
                        'confirmed',
                        'in_progress',
                        'review',
                        'completed',
                        'cancelled',
                        'refunded'
                    ) NOT NULL DEFAULT 'pending',
    priority        ENUM('low', 'medium', 'high', 'urgent') NOT NULL DEFAULT 'medium',
    admin_note      TEXT NULL,
    delivery_url    VARCHAR(500) NULL,               -- Final delivery link
    is_paid         BOOLEAN NOT NULL DEFAULT FALSE,
    created_at      DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at      DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    -- Foreign Keys
    CONSTRAINT fk_orders_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    CONSTRAINT fk_orders_service
        FOREIGN KEY (service_id)
        REFERENCES services(id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE,

    -- Indexes
    INDEX idx_order_number  (order_number),
    INDEX idx_user_id       (user_id),
    INDEX idx_service_id    (service_id),
    INDEX idx_status        (status),
    INDEX idx_is_paid       (is_paid),
    INDEX idx_created_at    (created_at)
);

-- ============================================================
-- TABLE 4: NOTES
-- ============================================================
CREATE TABLE IF NOT EXISTS notes (
    id              INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    title           VARCHAR(300) NOT NULL,
    slug            VARCHAR(300) NOT NULL UNIQUE,
    subject         VARCHAR(200) NOT NULL,
    description     TEXT NOT NULL,
    course          ENUM(
                        'MCA',
                        'BCA',
                        'B.Tech',
                        'Diploma',
                        'MBA',
                        'M.Tech',
                        'BSC',
                        'Other'
                    ) NOT NULL,
    semester        VARCHAR(20) NOT NULL,            -- e.g., '1st', '2nd', '3rd'
    price           DECIMAL(8,2) NOT NULL DEFAULT 0.00,
    is_free         BOOLEAN NOT NULL DEFAULT FALSE,
    thumbnail       VARCHAR(500) NULL,
    preview_url     VARCHAR(500) NULL,               -- Free preview PDF
    file_url        VARCHAR(500) NOT NULL,           -- Full notes PDF
    file_size       VARCHAR(20) NULL,                -- e.g., '2.5 MB'
    total_pages     INT UNSIGNED NULL,
    language        ENUM('Hindi', 'English', 'Hinglish') NOT NULL DEFAULT 'English',
    tags            JSON NULL,
    downloads       INT UNSIGNED NOT NULL DEFAULT 0,
    rating          DECIMAL(3,2) NOT NULL DEFAULT 0.00,
    total_ratings   INT UNSIGNED NOT NULL DEFAULT 0,
    is_active       BOOLEAN NOT NULL DEFAULT TRUE,
    created_at      DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at      DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    -- Indexes
    INDEX idx_slug          (slug),
    INDEX idx_course        (course),
    INDEX idx_subject       (subject),
    INDEX idx_price         (price),
    INDEX idx_is_free       (is_free),
    INDEX idx_is_active     (is_active),
    INDEX idx_downloads     (downloads),
    INDEX idx_rating        (rating),
    FULLTEXT idx_search     (title, subject, description)
);

-- ============================================================
-- TABLE 5: PAYMENTS
-- ============================================================
CREATE TABLE IF NOT EXISTS payments (
    id                      INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    payment_number          VARCHAR(30) NOT NULL UNIQUE,    -- e.g., PAY-2024-0001
    user_id                 INT UNSIGNED NOT NULL,
    order_id                INT UNSIGNED NULL,              -- NULL for note purchases
    note_id                 INT UNSIGNED NULL,              -- NULL for service orders
    amount                  DECIMAL(10,2) NOT NULL,
    currency                VARCHAR(5) NOT NULL DEFAULT 'INR',
    razorpay_order_id       VARCHAR(100) NULL UNIQUE,
    razorpay_payment_id     VARCHAR(100) NULL UNIQUE,
    razorpay_signature      VARCHAR(300) NULL,
    payment_method          VARCHAR(50) NULL,              -- upi, card, netbanking
    status                  ENUM(
                                'created',
                                'pending',
                                'success',
                                'failed',
                                'refunded'
                            ) NOT NULL DEFAULT 'created',
    failure_reason          TEXT NULL,
    refund_id               VARCHAR(100) NULL,
    refund_amount           DECIMAL(10,2) NULL,
    refund_date             DATETIME NULL,
    created_at              DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at              DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    -- Foreign Keys
    CONSTRAINT fk_payments_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    CONSTRAINT fk_payments_order
        FOREIGN KEY (order_id)
        REFERENCES orders(id)
        ON DELETE SET NULL
        ON UPDATE CASCADE,

    CONSTRAINT fk_payments_note
        FOREIGN KEY (note_id)
        REFERENCES notes(id)
        ON DELETE SET NULL
        ON UPDATE CASCADE,

    -- Indexes
    INDEX idx_payment_number        (payment_number),
    INDEX idx_user_id               (user_id),
    INDEX idx_order_id              (order_id),
    INDEX idx_note_id               (note_id),
    INDEX idx_razorpay_order_id     (razorpay_order_id),
    INDEX idx_razorpay_payment_id   (razorpay_payment_id),
    INDEX idx_status                (status),
    INDEX idx_created_at            (created_at)
);

-- ============================================================
-- TABLE 6: REVIEWS
-- ============================================================
CREATE TABLE IF NOT EXISTS reviews (
    id              INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id         INT UNSIGNED NOT NULL,
    service_id      INT UNSIGNED NULL,               -- NULL if review for notes
    note_id         INT UNSIGNED NULL,               -- NULL if review for service
    order_id        INT UNSIGNED NULL,               -- Which order this review for
    rating          TINYINT UNSIGNED NOT NULL,       -- 1 to 5
    title           VARCHAR(200) NULL,
    comment         TEXT NOT NULL,
    pros            TEXT NULL,
    cons            TEXT NULL,
    is_approved     BOOLEAN NOT NULL DEFAULT FALSE,
    is_featured     BOOLEAN NOT NULL DEFAULT FALSE,  -- Show on home page
    admin_reply     TEXT NULL,
    created_at      DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at      DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    -- Constraints
    CONSTRAINT chk_rating CHECK (rating BETWEEN 1 AND 5),
    CONSTRAINT chk_review_target
        CHECK (
            (service_id IS NOT NULL AND note_id IS NULL) OR
            (service_id IS NULL AND note_id IS NOT NULL)
        ),

    -- Foreign Keys
    CONSTRAINT fk_reviews_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    CONSTRAINT fk_reviews_service
        FOREIGN KEY (service_id)
        REFERENCES services(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    CONSTRAINT fk_reviews_note
        FOREIGN KEY (note_id)
        REFERENCES notes(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    CONSTRAINT fk_reviews_order
        FOREIGN KEY (order_id)
        REFERENCES orders(id)
        ON DELETE SET NULL
        ON UPDATE CASCADE,

    -- Indexes
    INDEX idx_user_id       (user_id),
    INDEX idx_service_id    (service_id),
    INDEX idx_note_id       (note_id),
    INDEX idx_rating        (rating),
    INDEX idx_is_approved   (is_approved),
    INDEX idx_is_featured   (is_featured)
);

-- ============================================================
-- TABLE 7: BLOG_POSTS
-- ============================================================
CREATE TABLE IF NOT EXISTS blog_posts (
    id              INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    title           VARCHAR(300) NOT NULL,
    slug            VARCHAR(300) NOT NULL UNIQUE,
    excerpt         VARCHAR(500) NOT NULL,
    content         LONGTEXT NOT NULL,
    author_id       INT UNSIGNED NOT NULL,
    thumbnail       VARCHAR(500) NULL,
    category        ENUM(
                        'programming',
                        'career',
                        'placement',
                        'interview',
                        'technology',
                        'tutorial',
                        'news'
                    ) NOT NULL DEFAULT 'programming',
    tags            JSON NULL,
    meta_title      VARCHAR(200) NULL,
    meta_desc       VARCHAR(300) NULL,
    views           INT UNSIGNED NOT NULL DEFAULT 0,
    read_time       INT UNSIGNED NOT NULL DEFAULT 5,  -- Minutes
    is_published    BOOLEAN NOT NULL DEFAULT FALSE,
    is_featured     BOOLEAN NOT NULL DEFAULT FALSE,
    published_at    DATETIME NULL,
    created_at      DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at      DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    -- Foreign Keys
    CONSTRAINT fk_blog_author
        FOREIGN KEY (author_id)
        REFERENCES users(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    -- Indexes
    INDEX idx_slug          (slug),
    INDEX idx_author_id     (author_id),
    INDEX idx_category      (category),
    INDEX idx_is_published  (is_published),
    INDEX idx_is_featured   (is_featured),
    INDEX idx_views         (views),
    INDEX idx_published_at  (published_at),
    FULLTEXT idx_search     (title, excerpt, content)
);

-- ============================================================
-- TABLE 8: NOTIFICATIONS
-- ============================================================
CREATE TABLE IF NOT EXISTS notifications (
    id              INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id         INT UNSIGNED NOT NULL,
    title           VARCHAR(200) NOT NULL,
    message         TEXT NOT NULL,
    type            ENUM(
                        'order_update',
                        'payment_success',
                        'payment_failed',
                        'download_ready',
                        'review_approved',
                        'new_message',
                        'admin_alert',
                        'system',
                        'promotion'
                    ) NOT NULL DEFAULT 'system',
    action_url      VARCHAR(500) NULL,
    is_read         BOOLEAN NOT NULL DEFAULT FALSE,
    created_at      DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    -- Foreign Keys
    CONSTRAINT fk_notifications_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    -- Indexes
    INDEX idx_user_id       (user_id),
    INDEX idx_type          (type),
    INDEX idx_is_read       (is_read),
    INDEX idx_created_at    (created_at)
);

-- ============================================================
-- TABLE 9: FAVORITES
-- ============================================================
CREATE TABLE IF NOT EXISTS favorites (
    id              INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id         INT UNSIGNED NOT NULL,
    service_id      INT UNSIGNED NULL,
    note_id         INT UNSIGNED NULL,
    created_at      DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    -- Constraints: Ek cheez ek hi baar favorite ho
    CONSTRAINT uq_fav_service UNIQUE (user_id, service_id),
    CONSTRAINT uq_fav_note    UNIQUE (user_id, note_id),
    CONSTRAINT chk_fav_target
        CHECK (
            (service_id IS NOT NULL AND note_id IS NULL) OR
            (service_id IS NULL AND note_id IS NOT NULL)
        ),

    -- Foreign Keys
    CONSTRAINT fk_favorites_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    CONSTRAINT fk_favorites_service
        FOREIGN KEY (service_id)
        REFERENCES services(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    CONSTRAINT fk_favorites_note
        FOREIGN KEY (note_id)
        REFERENCES notes(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    -- Indexes
    INDEX idx_user_id       (user_id),
    INDEX idx_service_id    (service_id),
    INDEX idx_note_id       (note_id)
);

-- ============================================================
-- TABLE 10: INVOICES
-- ============================================================
CREATE TABLE IF NOT EXISTS invoices (
    id              INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    invoice_number  VARCHAR(30) NOT NULL UNIQUE,     -- e.g., INV-2024-0001
    payment_id      INT UNSIGNED NOT NULL,
    user_id         INT UNSIGNED NOT NULL,
    invoice_url     VARCHAR(500) NULL,               -- PDF URL on Cloudinary
    subtotal        DECIMAL(10,2) NOT NULL,
    tax_percent     DECIMAL(5,2) NOT NULL DEFAULT 18.00,
    tax_amount      DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    discount        DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    total_amount    DECIMAL(10,2) NOT NULL,
    billing_name    VARCHAR(100) NOT NULL,
    billing_email   VARCHAR(150) NOT NULL,
    billing_phone   VARCHAR(15) NULL,
    billing_address TEXT NULL,
    notes           TEXT NULL,
    status          ENUM('draft', 'sent', 'paid', 'cancelled') NOT NULL DEFAULT 'paid',
    issued_date     DATE NOT NULL,
    due_date        DATE NULL,
    created_at      DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at      DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    -- Foreign Keys
    CONSTRAINT fk_invoices_payment
        FOREIGN KEY (payment_id)
        REFERENCES payments(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    CONSTRAINT fk_invoices_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    -- Indexes
    INDEX idx_invoice_number    (invoice_number),
    INDEX idx_payment_id        (payment_id),
    INDEX idx_user_id           (user_id),
    INDEX idx_status            (status),
    INDEX idx_issued_date       (issued_date)
);

-- ============================================================
-- TABLE 11: ORDER_FILES
-- ============================================================
CREATE TABLE IF NOT EXISTS order_files (
    id              INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    order_id        INT UNSIGNED NOT NULL,
    uploaded_by     INT UNSIGNED NOT NULL,           -- user_id
    file_name       VARCHAR(300) NOT NULL,
    file_url        VARCHAR(500) NOT NULL,
    file_type       VARCHAR(50) NOT NULL,            -- e.g., 'application/pdf'
    file_size       VARCHAR(20) NOT NULL,            -- e.g., '2.5 MB'
    file_category   ENUM(
                        'requirement',               -- User uploads
                        'delivery',                  -- Admin uploads
                        'reference',
                        'revision'
                    ) NOT NULL DEFAULT 'requirement',
    description     VARCHAR(300) NULL,
    created_at      DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    -- Foreign Keys
    CONSTRAINT fk_order_files_order
        FOREIGN KEY (order_id)
        REFERENCES orders(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    CONSTRAINT fk_order_files_user
        FOREIGN KEY (uploaded_by)
        REFERENCES users(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    -- Indexes
    INDEX idx_order_id      (order_id),
    INDEX idx_uploaded_by   (uploaded_by),
    INDEX idx_file_category (file_category)
);

-- ============================================================
-- TABLE 12: USER_DOWNLOADS (Notes Purchase Track)
-- ============================================================
CREATE TABLE IF NOT EXISTS user_downloads (
    id              INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id         INT UNSIGNED NOT NULL,
    note_id         INT UNSIGNED NOT NULL,
    payment_id      INT UNSIGNED NULL,
    download_count  INT UNSIGNED NOT NULL DEFAULT 0,
    last_downloaded DATETIME NULL,
    created_at      DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    -- Ek user ek note ek baar hi purchase kare
    CONSTRAINT uq_user_note UNIQUE (user_id, note_id),

    -- Foreign Keys
    CONSTRAINT fk_downloads_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    CONSTRAINT fk_downloads_note
        FOREIGN KEY (note_id)
        REFERENCES notes(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    CONSTRAINT fk_downloads_payment
        FOREIGN KEY (payment_id)
        REFERENCES payments(id)
        ON DELETE SET NULL
        ON UPDATE CASCADE,

    -- Indexes
    INDEX idx_user_id       (user_id),
    INDEX idx_note_id       (note_id)
);

-- ============================================================
-- TABLE 13: PORTFOLIOS
-- ============================================================
CREATE TABLE IF NOT EXISTS portfolios (
    id              INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    title           VARCHAR(300) NOT NULL,
    slug            VARCHAR(300) NOT NULL UNIQUE,
    description     TEXT NOT NULL,
    short_desc      VARCHAR(500) NOT NULL,
    category        ENUM(
                        'web_development',
                        'app_development',
                        'final_year_project',
                        'graphic_design',
                        'other'
                    ) NOT NULL,
    tech_used       JSON NOT NULL,
    thumbnail       VARCHAR(500) NULL,
    screenshots     JSON NULL,                       -- Array of image URLs
    live_url        VARCHAR(500) NULL,
    github_url      VARCHAR(500) NULL,
    client_name     VARCHAR(100) NULL,
    client_review   TEXT NULL,
    completion_date DATE NULL,
    is_featured     BOOLEAN NOT NULL DEFAULT FALSE,
    is_active       BOOLEAN NOT NULL DEFAULT TRUE,
    sort_order      INT UNSIGNED NOT NULL DEFAULT 0,
    created_at      DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at      DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    -- Indexes
    INDEX idx_slug          (slug),
    INDEX idx_category      (category),
    INDEX idx_is_featured   (is_featured),
    INDEX idx_is_active     (is_active),
    INDEX idx_sort_order    (sort_order)
);

-- ============================================================
-- VIEWS — Commonly Used Queries
-- ============================================================

-- View 1: Order Details with User and Service Info
CREATE OR REPLACE VIEW view_order_details AS
SELECT
    o.id,
    o.order_number,
    o.title AS order_title,
    o.status,
    o.budget,
    o.deadline,
    o.is_paid,
    o.created_at,
    u.name AS user_name,
    u.email AS user_email,
    u.phone AS user_phone,
    s.title AS service_name,
    s.category AS service_category
FROM orders o
JOIN users u ON o.user_id = u.id
JOIN services s ON o.service_id = s.id;

-- View 2: Revenue Summary
CREATE OR REPLACE VIEW view_revenue_summary AS
SELECT
    DATE(created_at) AS date,
    COUNT(*) AS total_payments,
    SUM(amount) AS total_revenue,
    SUM(CASE WHEN status = 'success' THEN amount ELSE 0 END) AS successful_revenue,
    SUM(CASE WHEN status = 'refunded' THEN refund_amount ELSE 0 END) AS total_refunds
FROM payments
GROUP BY DATE(created_at)
ORDER BY date DESC;

-- View 3: Notes with Purchase Count
CREATE OR REPLACE VIEW view_notes_stats AS
SELECT
    n.id,
    n.title,
    n.course,
    n.semester,
    n.price,
    n.downloads,
    n.rating,
    COUNT(ud.id) AS total_purchases
FROM notes n
LEFT JOIN user_downloads ud ON n.id = ud.note_id
GROUP BY n.id;

-- View 4: User Stats
CREATE OR REPLACE VIEW view_user_stats AS
SELECT
    u.id,
    u.name,
    u.email,
    u.role,
    u.created_at,
    COUNT(DISTINCT o.id) AS total_orders,
    COUNT(DISTINCT ud.id) AS total_downloads,
    COALESCE(SUM(p.amount), 0) AS total_spent
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
LEFT JOIN user_downloads ud ON u.id = ud.user_id
LEFT JOIN payments p ON u.id = p.user_id AND p.status = 'success'
GROUP BY u.id;

#************************************************************************************
USE tg_tech_db;

-- Admin password update karo
UPDATE users 
SET password = '$2b$12$HAmLPwyHKBwgWG0QvF0KleAKhRgxOPvp.0j8itbwTFUj1jSHQPpKG'
WHERE email = 'ghagitakshak@gmail.com';

-- Sab users ka password update karo
UPDATE users 
SET password = '$2b$12$9NpQFqXqmLEJOySXLrzx5.XtJkOf0gdnsEAgNCfULSlWDWAB51DG.'
WHERE email != 'ghagitakshak@gmail.com';

-- Verify karo
SELECT id, name, email, role, is_verified FROM users;

#**********************************************************
USE tg_tech_db;

-- Admin password update
UPDATE users
SET password    = '$2b$12$0lJGJPpYCsElPZ1CRsL.WunSHHWrSOy3yJBqf/GPotB8WMy9YEAUW',
    is_verified = TRUE,
    is_active   = TRUE,
    otp         = NULL,
    otp_expiry  = NULL
WHERE email = 'ghagitakshak@gmail.com';

-- Verify karo
SELECT id, name, email, role, is_verified, is_active
FROM users
WHERE email = 'ghagitakshak@gmail.com';

#***********************************
USE tg_tech_db;

-- Dekho user ka data kaisa hai
SELECT id, name, email, role, 
       is_verified, is_active, 
       LEFT(password, 20) as pass_preview
FROM users 
WHERE email = 'ghagitakshak@gmail.com';
#************************************************
USE tg_tech_db;

UPDATE users 
SET password = '$2b$12$e4YhA35hwwlPrtvkRVQej.tz7p/JIB7jIwJGdPQ91Z9KXRNWKqYhi'
WHERE email = 'ghagitakshak@gmail.com';

-- Verify
SELECT LEFT(password, 30) as pass_preview 
FROM users 
WHERE email = 'ghagitakshak@gmail.com';

#*************************************************************
USE tg_tech_db;

INSERT INTO reviews (user_id, service_id, rating, title, comment, is_approved, is_featured) VALUES
(2, 3, 5, 'Excellent Work!', 
 'Project time pe deliver hua. Documentation bhi perfect thi. Highly recommended!', 
 TRUE, TRUE),
(3, 1, 5, 'Amazing Portfolio Website', 
 'My portfolio website was exactly what I wanted. Beautiful animations and mobile friendly!', 
 TRUE, TRUE),
(4, 5, 5, 'Documentation Was Perfect', 
 'SRS, DFD, ER Diagram sab kuch perfectly banaya. Professor ne bhi appreciate kiya.', 
 TRUE, TRUE),
(5, 7, 4, 'Professional Resume', 
 'Resume bahut professional bana. ATS friendly hai aur design bhi clean hai.', 
 TRUE, FALSE);
 
 #***********************************
 USE tg_tech_db;

UPDATE notifications 
SET 
  title   = 'Order Placed Successfully! 🎉',
  message = REPLACE(
    REPLACE(message, 'successfully place ho gaya. Hum jald contact karenge!', 
    'has been successfully placed. We will contact you soon!'),
    'Aapka order', 'Your order'
  )
WHERE type = 'order_update';
#*****************************************************************
