PRAGMA foreign_keys = OFF;
BEGIN;
CREATE TABLE IF NOT EXISTS "tasks"(
  "id" INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
  "title" VARCHAR(45) NOT NULL,
  "description" VARCHAR(),
  "done" INT NOT NULL
);
COMMIT;
INSERT INTO tasks (title, description, done) VALUES
('first task', '', 0),
('second task', 'with description', 0);