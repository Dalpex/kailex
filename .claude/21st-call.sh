#!/bin/bash
# Helper to call 21st.dev MCP tools via stdio
# Usage: ./21st-call.sh <tool_name> '<json_params>'

TOOL_NAME="$1"
PARAMS="$2"
API_KEY="c7aa26565d36fe3cc16383a6cfeb3f229bf6cccf0a979a40ce13b2466c7ce2cd"

INIT='{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2024-11-05","capabilities":{},"clientInfo":{"name":"claude","version":"1.0"}}}'
CALL=$(printf '{"jsonrpc":"2.0","id":2,"method":"tools/call","params":{"name":"%s","arguments":%s}}' "$TOOL_NAME" "$PARAMS")

printf '%s\n%s\n' "$INIT" "$CALL" | \
  API_KEY="$API_KEY" npx -y @21st-dev/magic@latest 2>/dev/null | \
  grep -v "window/logMessage" | \
  grep '"id":2' | \
  python3 -c "import sys,json; data=json.loads(sys.stdin.read()); result=data.get('result',{}); content=result.get('content',[]); [print(c['text']) for c in content if c.get('type')=='text']"
