@echo off
REM ---------------------------------------------------------------------------
REM What the "Night assets" scheduled task runs at one in the morning.
REM
REM Three steps, in this order and for a reason: the engine has to be up before
REM anything can be cut, it takes a few seconds to bind the port, and the runner
REM stops itself at eight whatever the task does.
REM
REM Nothing here needs a person, and no browser opens. The credential comes
REM from gcloud, which stays signed in on this machine; the runner asks for it
REM before it cuts anything and stops rather than cutting into nothing.
REM ---------------------------------------------------------------------------
cd /d "%~dp0..\.."

REM Idempotent: it checks the port first and does nothing if the engine is
REM already listening, which it usually is, because sleeping does not stop it.
call "atelier-engine\tools\atelier.cmd"

REM Loading uvicorn and the app is seconds on a warm disk. The runner fails
REM clearly if it is still not answering, rather than cutting into nothing.
timeout /t 25 /nobreak > nul

REM Overwritten each night rather than appended: this is for reading at eight
REM in the morning, not a history. It holds no credential — the token is held
REM in memory and never printed, written down, or put in an error message.
node scripts\night\cut-the-catalogue.mjs --until 08:00 > "atelier-engine\local\night.out" 2>&1
