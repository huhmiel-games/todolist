# BACKEND

## INIT DATABASE
```BEGIN;
CREATE TABLE IF NOT EXISTS "tasks"(
  "id" INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
  "title" VARCHAR(45) NOT NULL,
  "description" VARCHAR(45),
  "done" INT NOT NULL
);
COMMIT;

INSERT INTO tasks (title, description) VALUES
('first task'),
('second task', 'with description');```