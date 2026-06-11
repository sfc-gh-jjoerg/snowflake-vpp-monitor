# Plan: Simplify Authentication & Add RBAC Section to README

## Context

The current README ([README.md](README.md), lines 124-147) has a "How Authentication Works" subsection with an ASCII diagram showing the internal OAuth token flow (`/snowflake/session/token -> SDK -> SQL`). This is accurate but overly technical for a getting-started guide.

The user wants:
1. A simpler explanation that the app uses Snowflake SSO
2. Clear explanation of deploy role vs. app access role separation
3. The SPCS Concepts table left as-is (useful reference)

From the Snowflake docs, the key RBAC facts for App Runtime are:
- `USAGE` on the Application Service lets a role open the app
- `OPERATE` lets a role suspend/resume/upgrade
- `MONITOR` lets a role view logs
- The app's runtime queries execute as the logged-in user's active role (table-level RBAC applies automatically)

## Implementation Steps

### Step 1: Replace "How Authentication Works" with concise version

Replace the current subsection (lines 124-137) with a shorter explanation:
- Users access the app via Snowflake SSO (same login they use for Snowsight)
- No passwords, API keys, or connection strings needed
- Keep one sentence about how it works under the hood (session token) for the curious, but not the full ASCII diagram

### Step 2: Add "Roles & Access Control" subsection

Insert a new subsection between the simplified auth and the existing SPCS Concepts table. Content:
- A table showing the three distinct role concerns: deploy, app access, data access
- SQL example showing how to grant another role access to the app (`GRANT USAGE ON APPLICATION SERVICE`)
- A note that deploy role and app-user roles are independent
- Mention `OPERATE` and `MONITOR` grants briefly for completeness

### Step 3: Leave SPCS Concepts table unchanged

No changes to the SPCS Concepts table (lines 139-147). It stays as-is for reference.

## Target Structure (after changes)

```
### How Authentication Works

[3-4 lines: Snowflake SSO, no credentials, queries run as user's role]

### Roles & Access Control

[Table: deploy role / app access / data access]
[GRANT USAGE SQL example]
[Note about independence of deploy and access roles]

### SPCS Concepts (Reference)

[Unchanged table]
```

## Verification

- Read the final README to confirm the auth section is concise and clear
- Confirm the SPCS Concepts table is untouched
- Verify section flow reads naturally from auth -> roles -> SPCS reference

## Critical Files

- README.md - Only file being modified (auth + RBAC section rewrite)
