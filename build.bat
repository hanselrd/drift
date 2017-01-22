@echo off
call clean.bat
cd client &&^
echo Building client for server &&^
ng build %* &&^
cd .. &&^
echo Moving client/dist to server/public &&^
move /Y client\dist server\public >nul 2>&1 &&^
cd client &&^
echo Building client for electron &&^
ng build --bh ./ %* &&^
cd .. &&^
echo Moving client/dist to electron/dist &&^
move /Y client\dist electron\dist >nul 2>&1
