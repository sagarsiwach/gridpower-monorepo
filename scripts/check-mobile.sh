#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

check_app() {
  local app="$1"

  cd "${ROOT_DIR}/apps/${app}"
  flutter pub get
  flutter analyze
  flutter test
}

check_app energy_app
check_app charge_app
