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

REM Back to the repository, because that script cds into the engine's folder to
REM find its own python, and a called script shares this one's directory. Left
REM out, every path below resolves one folder too deep: the runner is not found
REM and the redirect has nowhere to write, so the task fails in seconds having
REM done nothing at all, which is how this was found.
cd /d "%~dp0..\.."

REM Loading uvicorn and the app is seconds on a warm disk. The runner fails
REM clearly if it is still not answering, rather than cutting into nothing.
REM
REM Ping rather than `timeout`, which wants a console it does not have when the
REM scheduler runs this and then refuses to wait at all: "input redirection is
REM not supported". Twenty-six pings a second apart is twenty-five seconds.
ping -n 26 127.0.0.1 > nul 2>&1

REM Overwritten each night rather than appended: this is for reading at eight
REM in the morning, not a history. It holds no credential — the token is held
REM in memory and never printed, written down, or put in an error message.
node scripts\night\cut-the-catalogue.mjs --until 08:00 > "atelier-engine\local\night.out" 2>&1
