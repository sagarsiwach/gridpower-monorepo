# Grid Platform foundation

This repository is the shared implementation spine for DeltaEV's GridEnergy and GridCharge products. Public product names stay separate; internal packages use `@grid-platform/*`.

## Deployable surfaces

- `apps/console-energy`: internal GridEnergy commercial and fleet operations.
- `apps/portal-gridos`: isolated GridOS customer portal.
- `apps/console-charge`: GridCharge operator console retained from the existing platform.
- `apps/energy_app` and `apps/charge_app`: Flutter customer/driver companions.
- `apps/api`: modular Hono application API.
- `apps/ocpp`: replaceable OCPP protocol adapter boundary.
- `services/pollers`: replaceable vendor-cloud telemetry adapters.

## Binding boundaries

1. Contracts are sovereign. Client surfaces consume versioned API contracts and cannot reach persistence directly.
2. OCPP owns charger communication. The platform owns identity, tariffs, sessions, accounting and settlement.
3. Every ingress is replayable and idempotent. Raw events precede projections.
4. Customer and internal operations are separate deployments and security surfaces.
5. Mock data is always labelled. No mock metric or commercial number may be presented as live or sourced.
6. Stored customer value is excluded until the payment and regulatory model is ruled.

## Local ports

| Surface              |  Port |
| -------------------- | ----: |
| API                  | 14780 |
| OCPP simulator       | 14781 |
| Energy operations    |  5174 |
| GridOS portal        |  5175 |
| PostgreSQL/Timescale | 55432 |

## Production direction

Web surfaces remain edge-deployable. API, OCPP, workers and PostgreSQL/Timescale use a server-friendly deployment with explicit memory limits, immutable image tags, staged migrations, backup/restore proof and manual production promotion.
