@echo off
REM ---------------------------------------------------------------------------
REM Started by Windows when the atelier page opens `atelier://start`.
REM
REM A browser cannot launch a program — if it could, any website could. So the
REM page asks Windows instead, through a protocol it has been told about once,
REM and Windows runs this.
REM
REM Registered by tools\atelier-protocol.reg, which points at this file.
REM ---------------------------------------------------------------------------
cd /d "%~dp0.."

REM Already listening? Then there is nothing to do. Without this check a second
REM press starts a second engine, which fails to bind the port and leaves an
REM error window open for no reason.
".venv\Scripts\python.exe" -c "import socket,sys; s=socket.socket(); s.settimeout(0.4); sys.exit(0 if s.connect_ex(('127.0.0.1',7860))==0 else 1)"
if %errorlevel%==0 exit /b 0

REM Minimised rather than hidden: when something goes wrong, the reason is in
REM that window, and a hidden window is a failure with no explanation.
start "atelier engine" /MIN "%~dp0..\.venv\Scripts\python.exe" -m uvicorn engine.service:app --host 127.0.0.1 --port 7860
