INSERT INTO "User" ("id", "name", "email", "image", "created_at") VALUES
('e43a44ec-610a-4aa8-a5d3-a87860cece39', 'Alice Johnson', 'alice@example.com', 'https://example.com/avatar1.png', '2025-07-27T20:14:57.961913'),
('71b209c3-94a6-4e39-a030-35fbf034ba97', 'Bob Smith', 'bob@example.com', 'https://example.com/avatar2.png', '2025-07-27T20:14:57.961993');
INSERT INTO "TaskList" ("id", "user_id", "name", "icon", "created_at") VALUES
('eec83377-c0dd-4955-81ab-439b16a60036', 'e43a44ec-610a-4aa8-a5d3-a87860cece39', 'List 1 for Alice', '💼', '2025-07-27T20:14:57.962077'),
('2f765de8-efca-4b54-99d6-61dbd4657305', 'e43a44ec-610a-4aa8-a5d3-a87860cece39', 'List 2 for Alice', '🛒', '2025-07-27T20:14:57.962423'),
('70e90e32-e661-44be-9e34-ba0e48f2252f', '71b209c3-94a6-4e39-a030-35fbf034ba97', 'List 1 for Bob', '📚', '2025-07-27T20:14:57.962626'),
('a8ca5cd6-ea0c-45d5-a19c-687276a164a5', '71b209c3-94a6-4e39-a030-35fbf034ba97', 'List 2 for Bob', '🛒', '2025-07-27T20:14:57.962996');
INSERT INTO "Task" ("id", "task_list_id", "title", "notes", "due_date", "is_complete", "priority", "created_at") VALUES
('af3d71a2-a460-4333-96c3-0b8b92464d94', 'eec83377-c0dd-4955-81ab-439b16a60036', 'Task 1 in List 1', 'Details for Task 1', '2025-07-29', 'True', 'low', '2025-07-27T20:14:57.962132'),
('c0b2eb5a-cce0-41e1-93c2-da0e6a692df9', 'eec83377-c0dd-4955-81ab-439b16a60036', 'Task 2 in List 1', 'Details for Task 2', '2025-07-30', 'True', 'high', '2025-07-27T20:14:57.962230'),
('5f6e19c7-2d96-41d6-a25c-7c05ff9b1a84', 'eec83377-c0dd-4955-81ab-439b16a60036', 'Task 3 in List 1', 'Details for Task 3', '2025-08-03', 'False', 'medium', '2025-07-27T20:14:57.962274'),
('63b3d498-2ee7-48c0-b391-928de7384445', '2f765de8-efca-4b54-99d6-61dbd4657305', 'Task 1 in List 2', 'Details for Task 1', '2025-07-28', 'False', 'low', '2025-07-27T20:14:57.962519'),
('d18446e3-033f-4ce9-99c4-107f3ab5ebb6', '2f765de8-efca-4b54-99d6-61dbd4657305', 'Task 2 in List 2', 'Details for Task 2', '2025-08-02', 'True', 'high', '2025-07-27T20:14:57.962548'),
('68a1ffdb-ff08-4aee-8b65-23c4114c78ef', '2f765de8-efca-4b54-99d6-61dbd4657305', 'Task 3 in List 2', 'Details for Task 3', '2025-08-01', 'False', 'low', '2025-07-27T20:14:57.962587'),
('382effac-156c-49a8-8163-636a8a4a9b3f', '70e90e32-e661-44be-9e34-ba0e48f2252f', 'Task 1 in List 1', 'Details for Task 1', '2025-08-04', 'True', 'medium', '2025-07-27T20:14:57.962694'),
('ce7962c6-b354-474d-811f-ae5aac74ec7a', '70e90e32-e661-44be-9e34-ba0e48f2252f', 'Task 2 in List 1', 'Details for Task 2', '2025-08-06', 'False', 'medium', '2025-07-27T20:14:57.962939'),
('60127218-6ec0-41ac-a478-41a1dce27f15', '70e90e32-e661-44be-9e34-ba0e48f2252f', 'Task 3 in List 1', 'Details for Task 3', '2025-08-03', 'False', 'medium', '2025-07-27T20:14:57.962984'),
('05558041-e0ce-418b-891e-b3dce6b1c5e4', 'a8ca5cd6-ea0c-45d5-a19c-687276a164a5', 'Task 1 in List 2', 'Details for Task 1', '2025-07-29', 'False', 'high', '2025-07-27T20:14:57.963012'),
('fdfe484b-bb7f-4076-a477-fe24b14e86f1', 'a8ca5cd6-ea0c-45d5-a19c-687276a164a5', 'Task 2 in List 2', 'Details for Task 2', '2025-08-02', 'True', 'low', '2025-07-27T20:14:57.963026'),
('9de4bded-b86d-4bfd-ae9d-e48670fc4d64', 'a8ca5cd6-ea0c-45d5-a19c-687276a164a5', 'Task 3 in List 2', 'Details for Task 3', '2025-08-01', 'False', 'medium', '2025-07-27T20:14:57.963040');
