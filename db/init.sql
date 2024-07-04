CREATE SCHEMA social;

CREATE TABLE social.users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE social.posts (
    post_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES social.users(user_id),
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE social.comments (
    comment_id SERIAL PRIMARY KEY,
    post_id INTEGER REFERENCES social.posts(post_id),
    user_id INTEGER REFERENCES social.users(user_id),
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO social.users (username, email) VALUES
('user1', 'user1@example.com'),
('user2', 'user2@example.com');

INSERT INTO social.posts (user_id, title, content) VALUES
(1, 'First Post', 'This is the content of the first post'),
(2, 'Second Post', 'This is the content of the second post');

INSERT INTO social.comments (post_id, user_id, content) VALUES
(1, 2, 'This is a comment on the first post'),
(2, 1, 'This is a comment on the second post');
