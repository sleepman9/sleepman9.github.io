#!/usr/bin/env zsh
set -euo pipefail

echo "[local_run]"

if ! command -v hugo >/dev/null 2>&1; then
	echo "[local_run] Hugo is not installed or not in PATH"
	exit 1
fi

# Start hugo server in background so we can open browser automatically.
hugo server -D &
SERVER_PID=$!

# Wait for server to initialize before opening the browser.
sleep 2
open http://localhost:1313/

# Keep script attached to the server process.
wait "$SERVER_PID"
