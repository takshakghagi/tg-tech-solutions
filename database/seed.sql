-- ============================================================
-- TG TECH SOLUTIONS — Sample Seed Data
-- ============================================================

USE tg_tech_db;

-- ============================================================
-- SEED 1: Admin User
-- Password: Admin@123 (bcrypt hashed)
-- ============================================================
INSERT INTO users (
    name, email, password, role,
    avatar, phone, city, is_verified, is_active
) VALUES (
    'Takshak Ghagi',
    'ghagitakshak@gmail.com',
    '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TiGeLfpWnDBo4QZTjFXMKlFJyBiG',
    'admin',
    NULL,
    '+917020521466',
    'Nagpur',
    TRUE,
    TRUE
);

-- ============================================================
-- SEED 2: Sample Users
-- Password: User@123
-- ============================================================
INSERT INTO users (name, email, password, role, phone, city, is_verified) VALUES
('Rahul Sharma',   'rahul@example.com',  '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TiGeLfpWnDBo4QZTjFXMKlFJyBiG', 'user', '9876543210', 'Mumbai',   TRUE),
('Priya Singh',    'priya@example.com',  '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TiGeLfpWnDBo4QZTjFXMKlFJyBiG', 'user', '9876543211', 'Delhi',    TRUE),
('Amit Kumar',     'amit@example.com',   '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TiGeLfpWnDBo4QZTjFXMKlFJyBiG', 'user', '9876543212', 'Pune',     TRUE),
('Sneha Patel',    'sneha@example.com',  '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TiGeLfpWnDBo4QZTjFXMKlFJyBiG', 'user', '9876543213', 'Nagpur',   TRUE),
('Rohan Verma',    'rohan@example.com',  '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TiGeLfpWnDBo4QZTjFXMKlFJyBiG', 'user', '9876543214', 'Nashik',   TRUE);

-- ============================================================
-- SEED 3: Services
-- ============================================================
INSERT INTO services (
    title, slug, description, short_desc,
    icon, category, features, technologies,
    delivery_days, is_active, sort_order
) VALUES
(
    'Custom Website Development',
    'custom-website-development',
    'Hum aapke business ke liye professional, responsive aur modern website banate hain. React.js, Node.js aur latest technologies use karke ek fast aur SEO-friendly website deliver karte hain.',
    'Professional & responsive website for your business',
    'FaCode',
    'web_development',
    '["Responsive Design", "SEO Optimized", "Fast Loading", "Admin Panel", "Contact Form", "WhatsApp Integration", "1 Year Support"]',
    '["React.js", "Node.js", "MySQL", "Tailwind CSS"]',
    14, TRUE, 1
),
(
    'Mobile App Development',
    'mobile-app-development',
    'Android aur iOS ke liye React Native se cross-platform mobile app development. Ek hi codebase se dono platforms pe deploy karo.',
    'Cross-platform mobile apps for Android & iOS',
    'FaMobileAlt',
    'app_development',
    '["Android & iOS Support", "Offline Mode", "Push Notifications", "Payment Integration", "Admin Dashboard", "Play Store Upload Help"]',
    '["React Native", "Node.js", "Firebase", "MySQL"]',
    21, TRUE, 2
),
(
    'Final Year Project',
    'final-year-project',
    'MCA, BCA, B.Tech aur Diploma students ke liye complete final year project — code, documentation, PPT aur viva preparation sab kuch.',
    'Complete final year projects with documentation',
    'FaGraduationCap',
    'final_year_project',
    '["Complete Source Code", "Project Documentation", "PPT Presentation", "Database Design", "Viva Preparation", "Plagiarism Free", "Live Demo"]',
    '["React.js", "Python", "Java", "PHP", "Node.js", "MySQL"]',
    10, TRUE, 3
),
(
    'IT Notes & Study Material',
    'it-notes-study-material',
    'MCA, BCA, B.Tech ke sabhi subjects ki detailed notes — PDF format mein, Hindi aur English dono mein available.',
    'Detailed notes for MCA, BCA, B.Tech students',
    'FaBook',
    'notes',
    '["PDF Format", "Hindi & English", "Semester Wise", "Previous Year Questions", "Instant Download", "Regular Updates"]',
    '["All Subjects Covered"]',
    1, TRUE, 4
),
(
    'Project Documentation',
    'project-documentation',
    'Professional project documentation, SRS, DFD, ER Diagram, Synopsis aur complete project report banate hain university standards ke according.',
    'Professional project reports & documentation',
    'FaFileAlt',
    'documentation',
    '["SRS Document", "ER Diagram", "DFD Charts", "Synopsis", "Project Report", "IEEE Format", "University Standards"]',
    '["MS Word", "LaTeX", "Draw.io"]',
    5, TRUE, 5
),
(
    'Graphic Design Services',
    'graphic-design-services',
    'Logo design, social media banners, business cards, flyers aur complete brand identity design services.',
    'Logo, banners & complete brand identity design',
    'FaPaintBrush',
    'graphic_design',
    '["Logo Design", "Business Card", "Social Media Banner", "Flyer Design", "Brand Identity", "Unlimited Revisions", "Source File Provided"]',
    '["Figma", "Adobe Illustrator", "Canva Pro"]',
    3, TRUE, 6
),
(
    'Resume & Portfolio Creation',
    'resume-portfolio-creation',
    'ATS-friendly professional resume aur portfolio website banate hain jo HR ko impress kare aur job dilane mein help kare.',
    'Professional ATS-friendly resume & portfolio',
    'FaIdCard',
    'resume',
    '["ATS Friendly Resume", "Professional Design", "Portfolio Website", "LinkedIn Optimization", "Cover Letter", "3 Revisions Free"]',
    '["React.js", "Figma", "MS Word"]',
    3, TRUE, 7
),
(
    'Internship Projects',
    'internship-projects',
    'College internship ke liye complete project development — certificate-worthy projects jo aapki profile strong banaye.',
    'Complete projects for college internships',
    'FaBriefcase',
    'internship',
    '["Complete Source Code", "Documentation", "Certificate Support", "Deployment Help", "GitHub Setup", "Technical Guidance"]',
    '["React.js", "Node.js", "Python", "Java"]',
    7, TRUE, 8
),
(
    'Software Development',
    'software-development',
    'Custom desktop aur web-based software development for businesses — ERP, CRM, Inventory Management aur more.',
    'Custom software solutions for your business',
    'FaLaptopCode',
    'software',
    '["Custom Features", "User Management", "Reports & Analytics", "Data Export", "Training Support", "Annual Maintenance"]',
    '["React.js", "Node.js", "Electron.js", "MySQL"]',
    30, TRUE, 9
);

-- ============================================================
-- SEED 4: Sample Notes
-- ============================================================
INSERT INTO notes (
    title, slug, subject, description,
    course, semester, price, is_free,
    thumbnail, preview_url, file_url,
    file_size, total_pages, language,
    tags, downloads, rating, total_ratings, is_active
) VALUES
(
    'Data Structures & Algorithms — Complete Notes',
    'data-structures-algorithms-complete-notes',
    'Data Structures',
    'Complete DSA notes covering Arrays, Linked Lists, Trees, Graphs, Sorting, Searching algorithms with examples in C++ and Java.',
    'MCA', '1st', 99.00, FALSE,
    'https://via.placeholder.com/400x300?text=DSA+Notes',
    'https://via.placeholder.com/pdf',
    'https://via.placeholder.com/pdf',
    '4.2 MB', 120, 'English',
    '["DSA", "Algorithm", "Data Structure", "MCA", "BCA"]',
    245, 4.50, 48, TRUE
),
(
    'Database Management System — Complete Guide',
    'database-management-system-complete-guide',
    'DBMS',
    'DBMS complete notes — SQL, Normalization, ER Diagram, Transactions, Concurrency Control sab cover kiya gaya hai.',
    'BCA', '3rd', 79.00, FALSE,
    'https://via.placeholder.com/400x300?text=DBMS+Notes',
    'https://via.placeholder.com/pdf',
    'https://via.placeholder.com/pdf',
    '3.8 MB', 95, 'Hindi',
    '["DBMS", "SQL", "Database", "BCA", "MCA"]',
    189, 4.30, 36, TRUE
),
(
    'Computer Networks — Full Notes',
    'computer-networks-full-notes',
    'Computer Networks',
    'OSI Model, TCP/IP, Protocols, Routing, Switching, Network Security — sab kuch detail mein explain kiya gaya hai.',
    'B.Tech', '5th', 89.00, FALSE,
    'https://via.placeholder.com/400x300?text=CN+Notes',
    'https://via.placeholder.com/pdf',
    'https://via.placeholder.com/pdf',
    '5.1 MB', 140, 'Hinglish',
    '["Networks", "OSI", "TCP/IP", "B.Tech"]',
    156, 4.20, 29, TRUE
),
(
    'Python Programming — Beginner to Advanced',
    'python-programming-beginner-to-advanced',
    'Python Programming',
    'Python basics se lekar advanced concepts tak — OOP, File Handling, Libraries, Django intro sab included.',
    'MCA', '2nd', 0.00, TRUE,
    'https://via.placeholder.com/400x300?text=Python+Notes',
    'https://via.placeholder.com/pdf',
    'https://via.placeholder.com/pdf',
    '6.3 MB', 180, 'Hindi',
    '["Python", "Programming", "Free", "MCA", "BCA"]',
    892, 4.80, 124, TRUE
),
(
    'Operating System — Complete Notes',
    'operating-system-complete-notes',
    'Operating System',
    'Process Management, Memory Management, File System, CPU Scheduling, Deadlock — complete OS notes with diagrams.',
    'B.Tech', '4th', 69.00, FALSE,
    'https://via.placeholder.com/400x300?text=OS+Notes',
    'https://via.placeholder.com/pdf',
    'https://via.placeholder.com/pdf',
    '3.5 MB', 88, 'English',
    '["OS", "Operating System", "B.Tech", "Process"]',
    134, 4.10, 22, TRUE
);

-- ============================================================
-- SEED 5: Sample Orders
-- ============================================================
INSERT INTO orders (
    order_number, user_id, service_id,
    title, description, requirements,
    budget, deadline, status, priority, is_paid
) VALUES
(
    'TG-2024-0001', 2, 3,
    'Library Management System — Final Year Project',
    'Mujhe MCA final year project chahiye — Library Management System with React frontend aur Node backend.',
    'React.js frontend, Node.js backend, MySQL database, Admin panel, User registration, Book issue/return system',
    3500.00, DATE_ADD(CURDATE(), INTERVAL 10 DAY),
    'completed', 'high', TRUE
),
(
    'TG-2024-0002', 3, 1,
    'Portfolio Website Development',
    'Ek professional portfolio website chahiye jo meri skills aur projects showcase kare.',
    'Dark theme, Animations, Contact form, Projects section, Skills section, Resume download',
    2500.00, DATE_ADD(CURDATE(), INTERVAL 7 DAY),
    'in_progress', 'medium', TRUE
),
(
    'TG-2024-0003', 4, 5,
    'Project Documentation for Hospital Management System',
    'Mera project complete hai, sirf documentation chahiye — SRS, DFD, ER Diagram, Report.',
    'IEEE format mein, 50+ pages, all diagrams required',
    1500.00, DATE_ADD(CURDATE(), INTERVAL 5 DAY),
    'pending', 'medium', FALSE
),
(
    'TG-2024-0004', 5, 7,
    'Professional Resume + LinkedIn Optimization',
    'Fresher resume chahiye — MCA graduate, looking for software developer job.',
    'ATS friendly, 1 page resume, Skills section, Projects section, LinkedIn banner bhi chahiye',
    800.00, DATE_ADD(CURDATE(), INTERVAL 3 DAY),
    'confirmed', 'low', TRUE
);

-- ============================================================
-- SEED 6: Sample Reviews
-- ============================================================
INSERT INTO reviews (
    user_id, service_id, order_id,
    rating, title, comment, is_approved, is_featured
) VALUES
(2, 3, 1, 5,
 'Excellent Work!',
 'Takshak bhai ne bahut acha kaam kiya! Project time pe deliver hua aur documentation bhi perfect thi. Viva mein bhi help kiya. Highly recommended!',
 TRUE, TRUE),
(3, 1, 2, 5,
 'Amazing Portfolio Website',
 'Meri portfolio website exactly waisi bani jaise main chahta tha. Animations beautiful hain aur mobile pe bhi perfect dikh rahi hai. Best service!',
 TRUE, TRUE),
(5, 7, 4, 4,
 'Professional Resume',
 'Resume bahut professional bana. ATS friendly hai aur design bhi clean hai. Ek revision mein perfect ho gaya. Thank you TG Tech!',
 TRUE, FALSE),
(4, 5, 3, 5,
 'Documentation Was Perfect',
 'SRS, DFD, ER Diagram sab kuch university format mein perfectly banaya. Professor ne bhi appreciate kiya. 5 stars!',
 TRUE, TRUE);

-- ============================================================
-- SEED 7: Sample Blog Posts
-- ============================================================
INSERT INTO blog_posts (
    title, slug, excerpt, content,
    author_id, category, tags,
    read_time, is_published, is_featured, published_at
) VALUES
(
    'Top 10 Final Year Project Ideas for MCA Students 2024',
    'top-10-final-year-project-ideas-mca-2024',
    'MCA final year project choose karna difficult hota hai. Is article mein hamne top 10 trending project ideas share kiye hain jo aapki university mein best marks dilayenge.',
    '<h2>Introduction</h2><p>MCA final year mein project selection sabse important decision hota hai...</p><h2>Top 10 Ideas</h2><p>1. E-Commerce Platform with AI Recommendations...</p>',
    1,
    'career',
    '["MCA", "Final Year Project", "Project Ideas", "Career"]',
    8, TRUE, TRUE, NOW()
),
(
    'How to Get a Software Job After MCA — Complete Roadmap',
    'how-to-get-software-job-after-mca-complete-roadmap',
    'MCA ke baad software job paana mushkil nahi hai agar aap sahi path follow karo. Is guide mein step-by-step roadmap diya gaya hai.',
    '<h2>Skills Required</h2><p>Pehle in skills pe focus karo...</p>',
    1,
    'placement',
    '["MCA", "Job", "Career", "Software Developer", "Placement"]',
    12, TRUE, TRUE, NOW()
),
(
    'React.js vs Vue.js vs Angular — Which Should You Learn in 2024?',
    'reactjs-vs-vuejs-vs-angular-2024',
    'Frontend frameworks mein confused ho? Janiye kaunsa framework 2024 mein learn karna chahiye aur kyun.',
    '<h2>Comparison</h2><p>React.js sabse popular hai...</p>',
    1,
    'programming',
    '["React", "Vue", "Angular", "Frontend", "JavaScript"]',
    10, TRUE, FALSE, NOW()
);

-- ============================================================
-- SEED 8: Sample Portfolios
-- ============================================================
INSERT INTO portfolios (
    title, slug, description, short_desc,
    category, tech_used, thumbnail,
    client_name, client_review,
    completion_date, is_featured, is_active, sort_order
) VALUES
(
    'E-Commerce Platform — ShopEasy',
    'ecommerce-platform-shopeasy',
    'Complete e-commerce platform with product management, cart, payment gateway, admin panel aur order tracking system.',
    'Full-stack e-commerce with payment integration',
    'web_development',
    '["React.js", "Node.js", "MySQL", "Razorpay", "Tailwind CSS"]',
    'https://via.placeholder.com/800x600?text=ShopEasy',
    'Rahul Sharma',
    'Bahut acha kaam kiya! Website exactly waisi bani jaise hum chahte the. On-time delivery aur professional work.',
    '2024-01-15', TRUE, TRUE, 1
),
(
    'Library Management System — MCA Project',
    'library-management-system-mca-project',
    'Complete library management system for MCA final year project with book issue/return, fine calculation aur admin panel.',
    'Complete final year project with documentation',
    'final_year_project',
    '["React.js", "Node.js", "MySQL", "JWT Auth"]',
    'https://via.placeholder.com/800x600?text=Library+System',
    'Priya Singh',
    'Project time pe deliver hua aur documentation bhi perfect thi. University mein A grade mili!',
    '2024-02-20', TRUE, TRUE, 2
),
(
    'Restaurant Mobile App — FoodieZone',
    'restaurant-mobile-app-foodiezone',
    'React Native se bana cross-platform restaurant app with menu, cart, order tracking aur payment integration.',
    'Cross-platform restaurant ordering app',
    'app_development',
    '["React Native", "Node.js", "Firebase", "Razorpay"]',
    'https://via.placeholder.com/800x600?text=FoodieZone',
    'Amit Patel',
    'App bahut smooth hai. Android aur iOS dono pe perfectly kaam karta hai. Customers ki bohot positive feedback aayi!',
    '2024-03-10', TRUE, TRUE, 3
);

-- ============================================================
-- SEED 9: Sample Notifications for Users
-- ============================================================
INSERT INTO notifications (
    user_id, title, message, type, action_url, is_read
) VALUES
(2, 'Order Completed! 🎉',
 'Aapka order TG-2024-0001 successfully complete ho gaya hai. Download link aapke dashboard mein available hai.',
 'order_update', '/dashboard/orders/1', FALSE),
(3, 'Order In Progress 🔄',
 'Aapka portfolio website order TG-2024-0002 ab in-progress hai. 7 din mein deliver hoga.',
 'order_update', '/dashboard/orders/2', TRUE),
(4, 'New Order Received ✅',
 'Aapka order TG-2024-0003 successfully receive ho gaya. Payment ke baad kaam shuru hoga.',
 'order_update', '/dashboard/orders/3', FALSE),
(5, 'Payment Successful 💳',
 'Aapka payment successfully receive hua. Order confirm ho gaya hai!',
 'payment_success', '/dashboard/orders/4', FALSE);

-- ============================================================
-- SEED 10: Sample Payments
-- ============================================================
INSERT INTO payments (
    payment_number, user_id, order_id,
    amount, currency,
    razorpay_order_id, razorpay_payment_id,
    payment_method, status
) VALUES
('PAY-2024-0001', 2, 1, 3500.00, 'INR',
 'order_dummy_001', 'pay_dummy_001', 'upi', 'success'),
('PAY-2024-0002', 3, 2, 2500.00, 'INR',
 'order_dummy_002', 'pay_dummy_002', 'card', 'success'),
('PAY-2024-0003', 5, 4, 800.00, 'INR',
 'order_dummy_003', 'pay_dummy_003', 'upi', 'success');

-- ============================================================
-- SEED 11: Sample Invoices
-- ============================================================
INSERT INTO invoices (
    invoice_number, payment_id, user_id,
    subtotal, tax_percent, tax_amount,
    total_amount, billing_name, billing_email,
    billing_phone, status, issued_date
) VALUES
('INV-2024-0001', 1, 2,
 2966.10, 18.00, 533.90,
 3500.00, 'Rahul Sharma', 'rahul@example.com',
 '9876543210', 'paid', CURDATE()),
('INV-2024-0002', 2, 3,
 2118.64, 18.00, 381.36,
 2500.00, 'Priya Singh', 'priya@example.com',
 '9876543211', 'paid', CURDATE()),
('INV-2024-0003', 3, 5,
 677.97, 18.00, 122.03,
 800.00, 'Rohan Verma', 'rohan@example.com',
 '9876543214', 'paid', CURDATE());

-- ============================================================
-- SEED 12: User Downloads (Note Purchases)
-- ============================================================
INSERT INTO user_downloads (user_id, note_id, payment_id, download_count, last_downloaded)
VALUES
(2, 1, NULL, 3, NOW()),
(3, 1, NULL, 1, NOW()),
(3, 2, NULL, 2, NOW()),
(4, 3, NULL, 1, NOW()),
(2, 4, NULL, 5, NOW());

-- ============================================================
-- VERIFICATION QUERIES
-- ============================================================
SELECT 'Users Count:' AS info, COUNT(*) AS total FROM users;
SELECT 'Services Count:' AS info, COUNT(*) AS total FROM services;
SELECT 'Notes Count:' AS info, COUNT(*) AS total FROM notes;
SELECT 'Orders Count:' AS info, COUNT(*) AS total FROM orders;
SELECT 'Reviews Count:' AS info, COUNT(*) AS total FROM reviews;
SELECT 'Blog Posts Count:' AS info, COUNT(*) AS total FROM blog_posts;
SELECT 'Portfolios Count:' AS info, COUNT(*) AS total FROM portfolios;
SELECT 'Payments Count:' AS info, COUNT(*) AS total FROM payments;














#****************************************************************add_missing_tables***********************************************************
USE tg_tech_db;

-- ============================================================
-- TABLE: REVIEWS
-- ============================================================
CREATE TABLE IF NOT EXISTS reviews (
    id              INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id         INT UNSIGNED NOT NULL,
    service_id      INT UNSIGNED NULL,
    note_id         INT UNSIGNED NULL,
    order_id        INT UNSIGNED NULL,
    rating          TINYINT UNSIGNED NOT NULL,
    title           VARCHAR(200) NULL,
    comment         TEXT NOT NULL,
    pros            TEXT NULL,
    cons            TEXT NULL,
    is_approved     BOOLEAN NOT NULL DEFAULT FALSE,
    is_featured     BOOLEAN NOT NULL DEFAULT FALSE,
    admin_reply     TEXT NULL,
    created_at      DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at      DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT chk_rating CHECK (rating BETWEEN 1 AND 5),

    CONSTRAINT fk_reviews_user
        FOREIGN KEY (user_id) REFERENCES users(id)
        ON DELETE CASCADE ON UPDATE CASCADE,

    CONSTRAINT fk_reviews_service
        FOREIGN KEY (service_id) REFERENCES services(id)
        ON DELETE CASCADE ON UPDATE CASCADE,

    CONSTRAINT fk_reviews_note
        FOREIGN KEY (note_id) REFERENCES notes(id)
        ON DELETE CASCADE ON UPDATE CASCADE,

    CONSTRAINT fk_reviews_order
        FOREIGN KEY (order_id) REFERENCES orders(id)
        ON DELETE SET NULL ON UPDATE CASCADE,

    INDEX idx_user_id       (user_id),
    INDEX idx_service_id    (service_id),
    INDEX idx_rating        (rating),
    INDEX idx_is_approved   (is_approved),
    INDEX idx_is_featured   (is_featured)
);

-- ============================================================
-- TABLE: BLOG_POSTS
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
    read_time       INT UNSIGNED NOT NULL DEFAULT 5,
    is_published    BOOLEAN NOT NULL DEFAULT FALSE,
    is_featured     BOOLEAN NOT NULL DEFAULT FALSE,
    published_at    DATETIME NULL,
    created_at      DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at      DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_blog_author
        FOREIGN KEY (author_id) REFERENCES users(id)
        ON DELETE CASCADE ON UPDATE CASCADE,

    INDEX idx_slug          (slug),
    INDEX idx_category      (category),
    INDEX idx_is_published  (is_published),
    INDEX idx_is_featured   (is_featured),
    FULLTEXT idx_search     (title, excerpt, content)
);

-- ============================================================
-- TABLE: NOTIFICATIONS
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

    CONSTRAINT fk_notifications_user
        FOREIGN KEY (user_id) REFERENCES users(id)
        ON DELETE CASCADE ON UPDATE CASCADE,

    INDEX idx_user_id       (user_id),
    INDEX idx_type          (type),
    INDEX idx_is_read       (is_read),
    INDEX idx_created_at    (created_at)
);

-- ============================================================
-- TABLE: FAVORITES
-- ============================================================
CREATE TABLE IF NOT EXISTS favorites (
    id              INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id         INT UNSIGNED NOT NULL,
    service_id      INT UNSIGNED NULL,
    note_id         INT UNSIGNED NULL,
    created_at      DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT uq_fav_service UNIQUE (user_id, service_id),
    CONSTRAINT uq_fav_note    UNIQUE (user_id, note_id),

    CONSTRAINT fk_favorites_user
        FOREIGN KEY (user_id) REFERENCES users(id)
        ON DELETE CASCADE ON UPDATE CASCADE,

    CONSTRAINT fk_favorites_service
        FOREIGN KEY (service_id) REFERENCES services(id)
        ON DELETE CASCADE ON UPDATE CASCADE,

    CONSTRAINT fk_favorites_note
        FOREIGN KEY (note_id) REFERENCES notes(id)
        ON DELETE CASCADE ON UPDATE CASCADE,

    INDEX idx_user_id       (user_id),
    INDEX idx_service_id    (service_id),
    INDEX idx_note_id       (note_id)
);

-- ============================================================
-- TABLE: INVOICES
-- ============================================================
CREATE TABLE IF NOT EXISTS invoices (
    id              INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    invoice_number  VARCHAR(30) NOT NULL UNIQUE,
    payment_id      INT UNSIGNED NOT NULL,
    user_id         INT UNSIGNED NOT NULL,
    invoice_url     VARCHAR(500) NULL,
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
    status          ENUM('draft','sent','paid','cancelled') NOT NULL DEFAULT 'paid',
    issued_date     DATE NOT NULL,
    due_date        DATE NULL,
    created_at      DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at      DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_invoices_payment
        FOREIGN KEY (payment_id) REFERENCES payments(id)
        ON DELETE CASCADE ON UPDATE CASCADE,

    CONSTRAINT fk_invoices_user
        FOREIGN KEY (user_id) REFERENCES users(id)
        ON DELETE CASCADE ON UPDATE CASCADE,

    INDEX idx_invoice_number    (invoice_number),
    INDEX idx_payment_id        (payment_id),
    INDEX idx_user_id           (user_id),
    INDEX idx_status            (status)
);

-- ============================================================
-- TABLE: ORDER_FILES
-- ============================================================
CREATE TABLE IF NOT EXISTS order_files (
    id              INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    order_id        INT UNSIGNED NOT NULL,
    uploaded_by     INT UNSIGNED NOT NULL,
    file_name       VARCHAR(300) NOT NULL,
    file_url        VARCHAR(500) NOT NULL,
    file_type       VARCHAR(50) NOT NULL,
    file_size       VARCHAR(20) NOT NULL,
    file_category   ENUM(
                        'requirement',
                        'delivery',
                        'reference',
                        'revision'
                    ) NOT NULL DEFAULT 'requirement',
    description     VARCHAR(300) NULL,
    created_at      DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_order_files_order
        FOREIGN KEY (order_id) REFERENCES orders(id)
        ON DELETE CASCADE ON UPDATE CASCADE,

    CONSTRAINT fk_order_files_user
        FOREIGN KEY (uploaded_by) REFERENCES users(id)
        ON DELETE CASCADE ON UPDATE CASCADE,

    INDEX idx_order_id      (order_id),
    INDEX idx_uploaded_by   (uploaded_by),
    INDEX idx_file_category (file_category)
);

-- ============================================================
-- TABLE: USER_DOWNLOADS
-- ============================================================
CREATE TABLE IF NOT EXISTS user_downloads (
    id              INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id         INT UNSIGNED NOT NULL,
    note_id         INT UNSIGNED NOT NULL,
    payment_id      INT UNSIGNED NULL,
    download_count  INT UNSIGNED NOT NULL DEFAULT 0,
    last_downloaded DATETIME NULL,
    created_at      DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT uq_user_note UNIQUE (user_id, note_id),

    CONSTRAINT fk_downloads_user
        FOREIGN KEY (user_id) REFERENCES users(id)
        ON DELETE CASCADE ON UPDATE CASCADE,

    CONSTRAINT fk_downloads_note
        FOREIGN KEY (note_id) REFERENCES notes(id)
        ON DELETE CASCADE ON UPDATE CASCADE,

    CONSTRAINT fk_downloads_payment
        FOREIGN KEY (payment_id) REFERENCES payments(id)
        ON DELETE SET NULL ON UPDATE CASCADE,

    INDEX idx_user_id   (user_id),
    INDEX idx_note_id   (note_id)
);

-- ============================================================
-- TABLE: PORTFOLIOS
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
    screenshots     JSON NULL,
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

    INDEX idx_slug          (slug),
    INDEX idx_category      (category),
    INDEX idx_is_featured   (is_featured),
    INDEX idx_is_active     (is_active),
    INDEX idx_sort_order    (sort_order)
);

-- ============================================================
-- VERIFY — Sab tables check karo
-- ============================================================
SHOW TABLES;
