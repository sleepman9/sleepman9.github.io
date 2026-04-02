#!/usr/bin/env zsh
set -euo pipefail

echo "[local_run]"

# Start hugo server in background so we can open browser automatically.
hugo server -D &
SERVER_PID=$!

# 轮询检查服务器是否就绪
echo "等待服务器启动..."
while ! nc -z localhost 1313 2>/dev/null; do
  sleep 0.5
done

open http://localhost:1313/
echo "浏览器已打开，按 Ctrl+C 停止服务器"

# Keep script attached to the server process.
wait "$SERVER_PID"
