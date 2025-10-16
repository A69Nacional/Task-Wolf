@echo off
echo.
echo 🐺 Task Wolf GUI Compiler
echo ========================
echo.

echo Installing Python requirements...
pip install pyinstaller

echo.
echo Compiling GUI to executable...
pyinstaller --onefile --windowed --name=TaskWolfGUI --clean task_wolf_gui.py

echo.
echo ✅ Compilation complete!
echo 📁 Find your executable in: dist\TaskWolfGUI.exe
echo.
echo 🎯 Next steps:
echo 1. The TaskWolfGUI.exe file is in the 'dist' folder
echo 2. You can move it anywhere and run it
echo 3. It will automatically find your Task Wolf project
echo.
pause