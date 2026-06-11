-- ============================================================================
-- VPP Monitor — Full Cleanup
-- ============================================================================
-- Removes all demo assets created by this project.
-- Does NOT remove account-level App Runtime setup (deploy role config,
-- compute pool grants, BIND SERVICE ENDPOINT grant) since those are shared
-- infrastructure that other apps may use.
--
-- Run with the deploy role (e.g. SYSADMIN):
--   snow sql -f cleanup.sql
-- ============================================================================

USE ROLE SYSADMIN;

-- 1. Remove the app service (stops billing immediately)
DROP APPLICATION SERVICE IF EXISTS SNOWFLAKE_APPS.PUBLIC.VPP_MONITOR;

-- 2. Remove app build artifacts
DROP ARTIFACT REPOSITORY IF EXISTS SNOWFLAKE_APPS.PUBLIC.VPP_MONITOR_REPO;
DROP STAGE IF EXISTS SNOWFLAKE_APPS.PUBLIC.VPP_MONITOR_CODE;

-- 3. Remove demo data (database, schema, tables, stage — all in one)
DROP DATABASE IF EXISTS EPOWER_VPP;
