# ============================================================================
# CLAUDE.md — Project Guidelines for Claude Code
# ============================================================================
# Adapted from Karpathy's LLM coding observations + operational workflow rules.
# Customised for: FastAPI + React + TypeScript + PostgreSQL stack
# ============================================================================


# ----------------------------------------------------------------------------
# 1. THINK BEFORE CODING (Plan Mode Default)
# ----------------------------------------------------------------------------
# Don't assume. Don't hide confusion. Surface tradeoffs.

## Rules
- STOP and ask before making any assumption about:
  - Database schema or table relationships
  - API contract changes (request/response shapes)
  - Auth/permissions logic
  - Environment-specific config (dev vs prod vs staging)
- Enter plan mode for ANY non-trivial task (3+ steps or architectural decisions).
- If something goes sideways mid-implementation, STOP and re-plan immediately.
  Don't keep pushing down a broken path.
- Write detailed specs upfront to reduce ambiguity.
- If a task has multiple valid approaches, present them as a brief comparison:
  - Approach A: [what] → [tradeoff]
  - Approach B: [what] → [tradeoff]
  - Recommendation: [which and why]
- Never silently pick an ORM pattern, state management approach, or API design
  without stating why.
- If you don't understand existing code, say so. Don't guess what it does.


# ----------------------------------------------------------------------------
# 2. SIMPLICITY FIRST
# ----------------------------------------------------------------------------
# Minimum code that solves the problem. Nothing speculative.

## Rules
- No speculative abstractions. If it's used once, inline it.
- No "just in case" error handling for impossible scenarios.
- No wrapper functions that just call another function.
- No utility files with a single function.
- FastAPI routes: Keep route handlers thin. Business logic in service layer.
  But don't create a service layer for a 3-line operation.
- React components: No premature component extraction. If a piece of JSX is
  used once and is under 30 lines, keep it inline.
- TypeScript: Don't over-type. Use inference where the type is obvious.
  Don't create interfaces for objects used in one place.
- SQL/Database: Prefer raw SQL via SQLAlchemy text() for complex queries
  over chaining 15 ORM methods. Simpler to read, simpler to debug.

## The Test
Would a senior engineer reviewing this PR say "why is this so complicated?"
If yes, simplify.


# ----------------------------------------------------------------------------
# 3. SURGICAL CHANGES
# ----------------------------------------------------------------------------
# Touch only what you must. Clean up only your own mess.

## Rules
- Every changed line must trace directly to what was asked.
- Do NOT "improve" adjacent code, comments, or formatting.
- Do NOT refactor things that aren't broken.
- Do NOT rename variables/functions for "consistency" unless asked.
- Match the existing code style, even if you'd do it differently:
  - If the project uses snake_case in Python, use snake_case.
  - If the project uses camelCase in TypeScript, use camelCase.
  - If existing React components use function declarations, don't switch
    to arrow functions.
- If your changes make something unused, remove it (imports, variables,
  functions). But don't remove pre-existing dead code unless asked.
- If you notice unrelated issues, mention them in a comment at the end
  of your response. Don't fix them silently.

## Migration Safety
- Never modify existing Alembic migration files.
- New migrations only. Always generate with: alembic revision --autogenerate
- If a migration could break prod data, flag it explicitly.


# ----------------------------------------------------------------------------
# 4. VERIFICATION BEFORE DONE
# ----------------------------------------------------------------------------
# Never mark a task complete without proving it works.

## Rules
- Before implementing, restate the goal as a verifiable outcome:
  - BAD: "Add validation to the form"
  - GOOD: "Form rejects empty email, shows inline error, doesn't submit"
- For bug fixes:
  1. Write or describe a test that reproduces the bug
  2. Fix the bug
  3. Verify the test passes
- For multi-step tasks, state a brief plan:
  ```
  1. [Step] → verify: [how to check]
  2. [Step] → verify: [how to check]
  3. [Step] → verify: [how to check]
  ```
- Diff behaviour between main and your changes when relevant.
- Ask yourself: "Would a staff engineer approve this?"
- Run the code/tests when possible. Don't just say "this should work."
- Run tests, check logs, demonstrate correctness before declaring done.


# ----------------------------------------------------------------------------
# 5. SELF-IMPROVEMENT LOOP
# ----------------------------------------------------------------------------
# Learn from mistakes. Don't repeat them.

## Rules
- After ANY correction from the user, update `tasks/lessons.md` with:
  - What went wrong
  - The pattern that caused it
  - A rule to prevent it next time
  - Example format:
    ```
    ## Lesson: [Date] — [Short title]
    **Mistake:** [What happened]
    **Root cause:** [Why it happened]
    **Rule:** [What to do differently]
    ```
- Review `tasks/lessons.md` at the start of each session for the
  relevant project.
- Ruthlessly iterate on these lessons until mistake rate drops.
- If the same type of mistake appears twice, escalate the rule to
  this CLAUDE.md file as a permanent convention.


# ----------------------------------------------------------------------------
# 6. TASK MANAGEMENT
# ----------------------------------------------------------------------------
# Plan first. Track progress. Document results.

## Workflow
1. **Plan First:** Write plan to `tasks/todo.md` with checkable items.
2. **Verify Plan:** Check in with the user before starting implementation.
3. **Track Progress:** Mark items complete as you go.
4. **Explain Changes:** High-level summary at each step.
5. **Document Results:** Add a review section to `tasks/todo.md` when done.
6. **Capture Lessons:** Update `tasks/lessons.md` after any corrections.

## File Structure
```
tasks/
├── todo.md        # Current task plan with checkboxes
└── lessons.md     # Accumulated mistake patterns and rules
```

## Format for todo.md
```markdown
# Task: [Short description]
## Plan
- [ ] Step 1: [what] → verify: [how]
- [ ] Step 2: [what] → verify: [how]
- [ ] Step 3: [what] → verify: [how]

## Review
- [Summary of what was done]
- [Any deviations from plan and why]
```


# ----------------------------------------------------------------------------
# 7. AUTONOMOUS BUG FIXING (with guardrails)
# ----------------------------------------------------------------------------
# Fix what you can. Pause when stakes are high.

## Fix Autonomously (no check-in needed)
- Lint errors, type errors, import issues
- Failing tests where the fix is obvious and isolated
- UI rendering bugs (styling, layout, missing props)
- Typos in strings, comments, or variable names
- Missing null checks or simple validation gaps
- Console errors from missing dependencies

## STOP and Check In Before Fixing
- Anything touching auth, permissions, or session logic
- Database migrations or schema changes
- Payment/billing related code
- Multi-tenant data isolation (especially ANSWR)
- Web scraping logic or Apify actor changes (PropertyScope)
- API contract changes that could break frontend or integrations
- n8n workflow triggers or webhook endpoints
- Environment config, secrets, or deployment files
- Any fix that requires changing more than 3 files

## When Fixing Autonomously
- Point at the log, error, or failing test first
- Show the fix
- Demonstrate it's resolved (run test, show output)
- Zero context switching required from the user

## The Rule
If you're asking yourself "should I check in on this?" — the answer is yes.


# ----------------------------------------------------------------------------
# 8. PROJECT-SPECIFIC CONVENTIONS
# ----------------------------------------------------------------------------
# Stack: FastAPI · React · TypeScript · PostgreSQL · n8n
# Deployment: Multiple environments, offshore dev teams

## Backend (FastAPI + Python)
- Python 3.11+, type hints on all function signatures.
- Pydantic v2 models for request/response schemas.
- Async endpoints by default. Sync only when calling blocking libraries.
- Database: SQLAlchemy 2.0 async style with AsyncSession.
- Alembic for all schema changes. No manual DDL.
- Environment config via pydantic-settings, never hardcoded.
- Logging: use structlog or standard logging, never print().

## Frontend (React + TypeScript)
- Functional components only. No class components.
- State management: Keep it simple — useState/useReducer first,
  context only when prop drilling goes 3+ levels deep.
- API calls: centralised in /api or /services directory.
- No any types. If you must, use unknown and narrow.
- Error boundaries around route-level components.

## Database (PostgreSQL)
- All tables need created_at and updated_at timestamps.
- Soft deletes (deleted_at) where business logic requires audit trail.
- Foreign keys always. No orphan records.
- Index any column used in WHERE clauses with >10k rows.

## File Organisation
- When creating code files, separate sections with clear comment headers:
  ```python
  # ============================================================================
  # IMPORTS
  # ============================================================================

  # ----------------------------------------------------------------------------
  # MODELS / SCHEMAS
  # ----------------------------------------------------------------------------

  # ----------------------------------------------------------------------------
  # SERVICE LAYER
  # ----------------------------------------------------------------------------

  # ----------------------------------------------------------------------------
  # ROUTE HANDLERS
  # ----------------------------------------------------------------------------
  ```

## What NOT to Do
- Don't install new dependencies without asking first.
- Don't change docker-compose or CI/CD config without flagging it.
- Don't modify .env files or commit secrets.
- Don't add console.log or print statements to committed code.
- Don't create new n8n workflows — describe the automation needed and
  I'll wire it up.


# ----------------------------------------------------------------------------
# 9. SUBAGENT STRATEGY (Optional — Claude Code specific)
# ----------------------------------------------------------------------------
# Use subagents to keep the main context window clean.

## When to Use Subagents
- Offload research, exploration, and parallel analysis.
- For complex problems, throw more compute at it via subagents.
- One task per subagent for focused execution.
- Keep the main context for decision-making and orchestration.

## When NOT to Use Subagents
- Simple, single-file changes.
- Tasks that require full project context to be correct.
- When the overhead of spinning up a subagent exceeds the task itself.


# ----------------------------------------------------------------------------
# 10. COMMUNICATION STYLE
# ----------------------------------------------------------------------------

- Be direct. No fluff, no "Great question!" preamble.
- If something is risky, say so upfront.
- If you're not sure, say "I'm not sure" rather than guessing.
- When presenting code, explain WHY, not just WHAT.
- Flag anything that could break existing functionality.
