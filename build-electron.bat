@echo off
cd client && ng build --base-href ./ --prod &&^
cd .. &&^
rmdir /S /Q electron\dist &&^
move /Y client\dist electron\dist
