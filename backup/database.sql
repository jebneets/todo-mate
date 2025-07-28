-- USERS TABLE
CREATE TABLE "User" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT,
    email TEXT UNIQUE,
    image TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- ACCOUNT LINKING TABLE (NextAuth.js uses this for OAuth)
CREATE TABLE "Account" (
    id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES "User"(id) ON DELETE CASCADE,
    type TEXT NOT NULL,
    provider TEXT NOT NULL,
    provider_account_id TEXT NOT NULL,
    refresh_token TEXT,
    access_token TEXT,
    expires_at BIGINT,
    token_type TEXT,
    scope TEXT,
    id_token TEXT,
    session_state TEXT,
    UNIQUE(provider, provider_account_id)
);

-- SESSION TABLE
CREATE TABLE "Session" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_token TEXT UNIQUE,
    user_id UUID REFERENCES "User"(id) ON DELETE CASCADE,
    expires TIMESTAMP NOT NULL
);

-- VERIFICATION TOKENS (for email login, if ever used)
CREATE TABLE "VerificationToken" (
    identifier TEXT NOT NULL,
    token TEXT NOT NULL,
    expires TIMESTAMP NOT NULL,
    PRIMARY KEY (identifier, token)
);

-- TASK LISTS TABLE
CREATE TABLE "TaskList" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES "User"(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    icon TEXT, -- e.g., emoji or icon identifier
    created_at TIMESTAMP DEFAULT NOW()
);

-- TASKS TABLE
CREATE TABLE "Task" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    task_list_id UUID REFERENCES "TaskList"(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    notes TEXT,
    due_date DATE,
    is_complete BOOLEAN DEFAULT FALSE,
    priority TEXT CHECK (priority IN ('low', 'medium', 'high')) DEFAULT 'medium',
    created_at TIMESTAMP DEFAULT NOW()
);
