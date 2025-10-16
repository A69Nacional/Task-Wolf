"""
Build Script for Task Wolf GUI
Compiles the graphical interface to executable format
"""

import subprocess
import sys
import os

def install_requirements():
    """Install required packages"""
    requirements = [
        'pyinstaller',
        'tkinter'  # Usually comes with Python
    ]
    
    for package in requirements:
        try:
            print(f"Installing {package}...")
            subprocess.check_call([sys.executable, '-m', 'pip', 'install', package])
        except subprocess.CalledProcessError:
            print(f"Failed to install {package}")

def compile_to_exe():
    """Compile the GUI to executable"""
    try:
        print("🐺 Compiling Task Wolf GUI to .exe...")
        
        command = [
            'pyinstaller',
            '--onefile',                    # Single executable file
            '--windowed',                   # No console window
            '--name=TaskWolfGUI',          # Name of the executable
            '--icon=NONE',                 # No icon for now
            '--clean',                     # Clean cache
            'task_wolf_gui.py'             # Source file
        ]
        
        subprocess.check_call(command)
        
        print("✅ Compilation successful!")
        print("📁 Executable created in: dist/TaskWolfGUI.exe")
        print("\n🎯 Instructions:")
        print("1. Copy TaskWolfGUI.exe to your Task Wolf project folder")
        print("2. Double-click to run the GUI")
        print("3. Use the buttons to execute different test suites")
        
    except subprocess.CalledProcessError as e:
        print(f"❌ Compilation failed: {e}")
    except FileNotFoundError:
        print("❌ PyInstaller not found. Installing requirements...")
        install_requirements()
        compile_to_exe()

if __name__ == "__main__":
    compile_to_exe()