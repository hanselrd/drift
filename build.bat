@echo off
call clean.bat
cd client &&^
ng build --base-href ./ %* &&^
cd .. &&^
move /Y client\dist electron\dist &&^
cd client &&^
ng build %* &&^
cd .. &&^
move /Y client\dist server\public
