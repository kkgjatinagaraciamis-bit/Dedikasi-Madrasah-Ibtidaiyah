# Security Specification - Teachers Portal Firestore

## 1. Data Invariants
- A Menu must contain an `id`, `title`, `icon`, `isActive`, and `order`.
- Non-admin users are strictly read-only.
- Only the specific administrator email `kkgjatinagaraciamis@gmail.com` can create, update, or delete menus.

## 2. Dirty Dozen Security Payloads (Expected to Fail / be Denied)
1. Anonymous user trying to write a Menu document.
2. Authenticated non-admin (e.g., `user@gmail.com`) trying to write a Menu document.
3. Authenticated non-admin trying to delete `/menus/perangkat-ajar`.
4. Spoofed Administrator email (e.g., authenticated as `kkgjatinagaraciamis@gmail.com` but with `email_verified: false`).
5. Self-assigned admin fields injected in high-privilege metadata.
6. Over-sized ID injection where `menuId` is longer than 128 characters.
7. Over-sized menu title (e.g., payload title size is 5MB) to initiate resource exhaustion.
8. Injection of un-whitelisted fields into Menu (such as `isSystemRoot: true` or custom system configs).
9. Malicious update changing the key `id`.
10. Bypassing state checks by sending negative `order` values.
11. Attempting to blanket read private settings.
12. Creating a menu with an empty title or invalid layout types.

## 3. Test Runner Outline
Verification of standard permission rejections for any requests not authenticated as the verified admin: `kkgjatinagaraciamis@gmail.com`.
